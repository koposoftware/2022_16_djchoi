package kr.ac.kopo.controller;

import java.util.Random;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.kopo.service.EmailService;
import kr.ac.kopo.vo.MailVO;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MailController {
	
	private final EmailService emailService;
	
	@GetMapping("/mail")
	public String mail() {
		return "mail";
	}
	
	@ResponseBody
	@PostMapping("/mail")
	public String sendMail(MailVO mailVO) {
		// 랜덤한 인증 코드 생성
		char[] codeTable = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
                			'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 
                			'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'};
		Random random = new Random(System.currentTimeMillis());
		String randomCode = "";
		
		for(int i = 0; i < 8; i++) {
			randomCode += codeTable[random.nextInt(codeTable.length)];
		}
		
		mailVO.setContent("아래 인증번호를 입력해주세요. \n\n 인증번호 : " + randomCode);
		
		emailService.sendSimpleMessage(mailVO);
		System.out.println("메일 전송 완료");
		return randomCode;
	}
}
