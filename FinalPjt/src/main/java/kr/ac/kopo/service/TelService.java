package kr.ac.kopo.service;

import java.util.HashMap;
import java.util.Random;

import org.springframework.stereotype.Service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class TelService {

	public String sendSMS(String phoneNumber) throws CoolsmsException {
		
		String api_key = "api키 입력";
		String api_secret = "api_secret키 입력";
		
		Message coolsms = new Message(api_key, api_secret);
		
		Random rand = new Random();
		
		String numStr = "";
		
		// 랜덤한 숫자 4개 생성
		for(int i = 0; i < 4; i++) {
			String ran = Integer.toString(rand.nextInt(10));
			numStr += ran;
		}
		
		HashMap<String, String> params = new HashMap<>();
		params.put("to", phoneNumber);		// 수신자
		params.put("from", "발신자번호 입력");	// 발신자
		params.put("type", "sms");
		params.put("text", "인증번호는 [" + numStr + "] 입니다.");
		
		coolsms.send(params);	// 메세지 전송
		
		return numStr;
	}
}
