package kr.ac.kopo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import kr.ac.kopo.dao.ConsultingDAO;
import kr.ac.kopo.dao.TellerDAO;
import kr.ac.kopo.vo.ConsultingContentVO;
import kr.ac.kopo.vo.ReserveVO;
import kr.ac.kopo.vo.ReviewVO;
import kr.ac.kopo.vo.TellerVO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultingService {
	
	private final ConsultingDAO consultingDao;
	private final TellerDAO tellerDao;
	private int cnt = 0;
	
	// 상담 예약
	public void reserveConsulting(ReserveVO reserveVO) {
		
		String title = reserveVO.getTitle();
		
		// 모든 상담사 부르기
		List<TellerVO> tellerList = tellerDao.getAllTeller(title);
		
		if(cnt >= tellerList.size()) {
			cnt = 0;
		}
		reserveVO.setTeller(tellerList.get(cnt).getName());
		cnt++;
		
		consultingDao.reserveConsulting(reserveVO);
	}
	
	// 나의 상담예약 가져오기
	public List<Map<String, String>> getMyConsulting(String tellerName){
		
		List<ReserveVO> consultingList = consultingDao.getMyConsulting(tellerName);
		
		List<Map<String, String>> data = new ArrayList<>();
		Map<String, String> map;
		for (ReserveVO reserveVO : consultingList) {
			map = new HashMap<>();
			map.put("title", reserveVO.getContent());
			map.put("start", reserveVO.getRDate()+"T"+  reserveVO.getRTime().substring(0, 2)+"00:00");
			data.add(map);
		}

		return data;
	}
	
	// 상담 내용 기록
	public void insertContent(ConsultingContentVO consultingContentVO) {
		consultingDao.insertConsultingContent(consultingContentVO);
	}
	
	// 하고 있는 상담 내용 가져오기
	public List<ConsultingContentVO> getConsultingContent(ConsultingContentVO consultingContentVO) {
		
		return consultingDao.getConsultingContent(consultingContentVO);
	}
	
	
	// 나의 상담 일정 가져오기
	public List<Map<String, String>> myConsultingList(String userName){
		
		List<Map<String, String>> consultingList = new ArrayList<>();
		
		List<ReviewVO> reviewList = consultingDao.getMyConsultingReview(userName);
		List<ReserveVO> reserveList = consultingDao.getMyConsultingReserve(userName);
		
		for (ReviewVO reviewVO : reviewList) {
			Map<String, String> consulting = new HashMap<>();
			consulting.put("userName", reviewVO.getUserName());
			consulting.put("title", reviewVO.getTitle());
			consulting.put("regDate", reviewVO.getRegDate());
			consulting.put("reserveType", "N");
			
			consultingList.add(consulting);
		}
		
		for (ReserveVO reserveVO : reserveList) {
			Map<String, String> consulting = new HashMap<>();
			consulting.put("userName", reserveVO.getUserName());
			consulting.put("title", reserveVO.getTitle());
			consulting.put("regDate", reserveVO.getRDate());
			consulting.put("reserveType", "Y");
			
			consultingList.add(consulting);
		}
		
		return consultingList;
	}
	
}
