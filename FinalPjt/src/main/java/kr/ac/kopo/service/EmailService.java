package kr.ac.kopo.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import kr.ac.kopo.vo.MailVO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {
	
	private final JavaMailSender emailSender;
	
	public void sendSimpleMessage(MailVO mailVO) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("cdj6995@gmail.com");
		message.setTo(mailVO.getAddress());
		message.setSubject(mailVO.getTitle());
		message.setText(mailVO.getContent());
		emailSender.send(message);
	}

}
