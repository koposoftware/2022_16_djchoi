package kr.ac.kopo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.kopo.service.ConsultingService;
import kr.ac.kopo.vo.ConsultingContentVO;
import kr.ac.kopo.vo.ReserveVO;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ConsultingController {
	
	private final ConsultingService consultingService;
	
	
	// 상담 예약하기
	@PostMapping("/user/reserve")
	public String reserveConsulting(@ModelAttribute ReserveVO reserveVO) {
		System.out.println(reserveVO.toString());
		
		consultingService.reserveConsulting(reserveVO);
		
		return "redirect:/";
	}
	
	@ResponseBody
	@PostMapping("/getMyCalendar")
	public List<Map<String, String>> getMyConsulting(@RequestParam String teller){
		
		List<Map<String, String>> data = consultingService.getMyConsulting(teller);
		
		return data;
	}
	
	@GetMapping("/teller/recordList")
	public String moveRecordList() {
		return "teller/recordList";
	}
	
	@ResponseBody
	@PostMapping("/consulting/content")
	public void consultingInsert(@ModelAttribute ConsultingContentVO consultingContentVO) {
		consultingService.insertContent(consultingContentVO);
	}
	
	@ResponseBody
	@GetMapping("/getConsulting/content/teller")
	public List<ConsultingContentVO> getConsultingContentTeller(@ModelAttribute ConsultingContentVO consultingContentVO){
		
		List<ConsultingContentVO> contentList = consultingService.getConsultingContent(consultingContentVO);
		
		System.out.println(contentList.toString());
		
		return contentList;
	}
	
	@ResponseBody
	@GetMapping("/getConsulting/content/user")
	public List<ConsultingContentVO> getConsultingContentUser(@ModelAttribute ConsultingContentVO consultingContentVO){
		
		List<ConsultingContentVO> contentList = consultingService.getConsultingContent(consultingContentVO);
		
		System.out.println(contentList.toString());
		
		return contentList;
	}
	
	@ResponseBody
	@GetMapping("/consulting/list")
	public List<Map<String, String>> myConsultingList (@RequestParam("userName") String userName){
		
		List<Map<String, String>> consultingtList = consultingService.myConsultingList(userName);
		return consultingtList;
		
	}
	
}


