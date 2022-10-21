package kr.ac.kopo.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.kopo.service.TellerService;
import kr.ac.kopo.vo.TellerVO;
import kr.ac.kopo.vo.RecordVO;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class TellerController {
	
	private final TellerService tellerService;
	
	// 상담사 페이지 이동
	@GetMapping("/teller")
	public String teller() {
		return "index_teller";
	}
	
	// 로그인
	@GetMapping("/teller/login")
	public void login() {}
	
	@PostMapping("/teller/login")
	public String loginProcess(@ModelAttribute TellerVO tellerVO, Model model, HttpSession session) {
		TellerVO teller = tellerService.login(tellerVO);
		
		if(teller == null) {
			model.addAttribute("msg", "fail");
			return "teller/login";
		}
		
		session.setAttribute("Teller", teller);
		
		return "redirect:/teller";
	}
	
	// 로그아웃
	@GetMapping("/teller/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("Teller");
		return "redirect:/teller";
	}
	
	// 상담 대기 화면
	@GetMapping("/teller/waiting")
	public String waiting(HttpSession session, Model model) {
		 TellerVO teller = (TellerVO)session.getAttribute("Teller");
		// room 생성
		String roomId = tellerService.makeRoom(teller);
		
		model.addAttribute("roomId", roomId);
		
		return "teller/waiting";
	}
	
	// 상담 입장
	@GetMapping("/teller/chat/{roomId}")
	public String telchat(Model model, @PathVariable("roomId") String roomId) {
		
		model.addAttribute("roomId", roomId);
		
		return "teller/tellerRoom";
	}
	
	// 상담내역 페이지로 이동
	@GetMapping("/teller/record")
	public String record() {
		
		return "teller/record";
	} 	
	
	// 상담내용 입력 후 오늘 상담사가 한 상담 목록 페이지로 이동
	@PostMapping("/teller/record")
	public String recordProcess(@ModelAttribute RecordVO recordVO, Model model) {
		
		String tellerName = recordVO.getTeller();
		
		// 상담 내역 DB에 저장
		tellerService.inputRecord(recordVO);
		
		// 현재 teller의 상담 기록 가져오기
		List<RecordVO> recordList = tellerService.selectByName(tellerName);
		model.addAttribute("recordList", recordList);
		
		for(RecordVO record : recordList) {
			System.out.println(record.toString());
		}
		
		return "teller/recordList";
	}
	
	// 이달의 상담내역 가져오기
	@ResponseBody
	@PostMapping("/teller/record/json")
	public List<RecordVO> recordJson(HttpSession session) {
		
		// TellerVO teller = (TellerVO) session.getAttribute("Teller");
		// String tellerName = teller.getName();
		
		List<RecordVO> data = tellerService.selectAll();
		
		return data;
	}
	
	
	// 모든 상담 내용 가져오기
	@GetMapping("/teller/allRecord")
	public String allRecord(Model model) {
		
		List<RecordVO> recordAllList = tellerService.selectAll();
		model.addAttribute("recordAllList", recordAllList);
		
		return "teller/recordAllList";
	}
	
	
	// 고객 계좌 정보 가져오기
	@ResponseBody
	@PostMapping("/teller/getAccount")
	public String getAccount(String userId) {
		// tellerService.getAccount(userId);
		
		return "";
	}
	
	
	// 신분증 정보 확인(OCR)
	@ResponseBody
	@PostMapping("/teller/checkId")
	public String checkId(@RequestParam String fileName) {
		
		String response = tellerService.checkId(fileName);
		
		return response;
	}
	
}
