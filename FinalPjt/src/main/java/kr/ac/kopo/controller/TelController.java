package kr.ac.kopo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.kopo.service.TelService;
import lombok.RequiredArgsConstructor;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Controller
@RequiredArgsConstructor
public class TelController {

	private final TelService telService;
	
	@ResponseBody
	@PostMapping("/check/tel")
	public String sendSMS(@RequestParam(value="tel") String phoneNumber) throws CoolsmsException{
		return telService.sendSMS(phoneNumber);
	}
}
