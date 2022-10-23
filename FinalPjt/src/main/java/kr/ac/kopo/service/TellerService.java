package kr.ac.kopo.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import kr.ac.kopo.dao.TellerDAO;
import kr.ac.kopo.vo.RecordVO;
import kr.ac.kopo.vo.RoomVO;
import kr.ac.kopo.vo.TellerVO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TellerService {
	
	private final TellerDAO tellerDao;
	Set<String> roomSet = new HashSet<>();
	
	// 로그인
	public TellerVO login(TellerVO tellerVO) {
		return tellerDao.login(tellerVO);
	}
	
	// 상담 Room 생성
	public String makeRoom(TellerVO teller) {
		RoomVO room = new RoomVO();
		
		// 중복제거
		while (true) {
			int before = roomSet.size();
			
			char[] codeTable = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
					'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 
					'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'};
			Random random = new Random(System.currentTimeMillis());
			String randomCode = "";
			
			for(int i = 0; i < 4; i++) {
				randomCode += codeTable[random.nextInt(codeTable.length)];
			}
			
			roomSet.add(randomCode);
			
			if(roomSet.size() > before) {
				room.setRoomId(randomCode);
				break;
			}
			
		}
		
		room.setTeller(teller.getName());
		room.setTitle(teller.getDept());
		
		tellerDao.makeRoom(room);
		
		return room.getRoomId();
	}
	
	// 상담 내역 저장
	public void inputRecord(RecordVO recordVO) {
		tellerDao.inputRocord(recordVO);
	}
	
	// 특정 상담사 상담 내역 가져오기
	public List<RecordVO> selectByName(String tellerName){
		List<RecordVO> recordList = tellerDao.selectByName(tellerName);
		
		return recordList;
	}
	
	// 전체 상담 기록 가져오기
	public List<RecordVO> selectAll(){
		List<RecordVO> recordAllList = tellerDao.selectAll();
		
		return recordAllList;
	}
	
	// 신분증 체크
	public String checkId(String fileName) {
		String apiURL = "apiURL 입력";
		String secretKey = "secretKey 입력";
		String imageFile = "파일경로" + fileName + ".png";
		
		try {
			URL url = new URL(apiURL);
			HttpURLConnection con = (HttpURLConnection)url.openConnection();
			con.setUseCaches(false);
			con.setDoInput(true);
			con.setDoOutput(true);
			con.setReadTimeout(30000);
			con.setRequestMethod("POST");
			String boundary = "----" + UUID.randomUUID().toString().replaceAll("-", "");
			con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
			con.setRequestProperty("X-OCR-SECRET", secretKey);

			JSONObject json = new JSONObject();
			json.put("version", "V2");
			json.put("requestId", UUID.randomUUID().toString());
			json.put("timestamp", System.currentTimeMillis());
			JSONObject image = new JSONObject();
			image.put("format", "jpg");
			image.put("name", "demo");
			JSONArray images = new JSONArray();
			images.put(image);
			json.put("images", images);
			String postParams = json.toString();

			con.connect();
			DataOutputStream wr = new DataOutputStream(con.getOutputStream());
			long start = System.currentTimeMillis();
			File file = new File(imageFile);
			writeMultiPart(wr, postParams, file, boundary);
			wr.close();

			int responseCode = con.getResponseCode();
			BufferedReader br;
			if (responseCode == 200) {
				br = new BufferedReader(new InputStreamReader(con.getInputStream()));
			} else {
				br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
			}
			String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = br.readLine()) != null) {
				response.append(inputLine);
			}
			br.close();

			System.out.println(response);
			
			return response.toString();
			
		} catch (Exception e) {
			System.out.println(e);
		}
		
		
		return null;
	}
	
	
	private static void writeMultiPart(OutputStream out, String jsonMessage, File file, String boundary) throws
		IOException {
		StringBuilder sb = new StringBuilder();
		sb.append("--").append(boundary).append("\r\n");
		sb.append("Content-Disposition:form-data; name=\"message\"\r\n\r\n");
		sb.append(jsonMessage);
		sb.append("\r\n");
	
		out.write(sb.toString().getBytes("UTF-8"));
		out.flush();
	
		if (file != null && file.isFile()) {
			out.write(("--" + boundary + "\r\n").getBytes("UTF-8"));
			StringBuilder fileString = new StringBuilder();
			fileString
				.append("Content-Disposition:form-data; name=\"file\"; filename=");
			fileString.append("\"" + file.getName() + "\"\r\n");
			fileString.append("Content-Type: application/octet-stream\r\n\r\n");
			out.write(fileString.toString().getBytes("UTF-8"));
			out.flush();
	
			try (FileInputStream fis = new FileInputStream(file)) {
				byte[] buffer = new byte[8192];
				int count;
				while ((count = fis.read(buffer)) != -1) {
					out.write(buffer, 0, count);
				}
				out.write("\r\n".getBytes());
			}
	
			out.write(("--" + boundary + "--\r\n").getBytes("UTF-8"));
		}
		out.flush();
	}
	
}
