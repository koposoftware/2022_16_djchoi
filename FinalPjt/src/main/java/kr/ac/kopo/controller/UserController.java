package kr.ac.kopo.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.kopo.service.UserService;
import kr.ac.kopo.vo.UserVO;
import kr.ac.kopo.vo.CheckingAccountVO;
import kr.ac.kopo.vo.FundAccountVO;
import kr.ac.kopo.vo.ReserveVO;
import kr.ac.kopo.vo.ReviewVO;
import kr.ac.kopo.vo.RoomVO;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	// 로그인
	@GetMapping("/user/login")
	public String login(Model model) {
		return "user/login";
	}
	
	@PostMapping("/user/login")
	public String loginProcess(@ModelAttribute UserVO userVO, Model model, HttpSession session ) {
		UserVO user = userService.login(userVO);
		
		if(user == null) {
			model.addAttribute("msg", "fail");
			return "user/login";
		}
		
		session.setAttribute("User", user);
		
		return "redirect:/";
	}
	
	// 내 상담 예약 있는지 확인
	@ResponseBody
	@GetMapping("/user/checkMyreserve")
	public boolean checkMyReserve(@RequestParam("userName") String userName) {
		List<ReserveVO> reserveList = userService.checkReserve(userName);
		LocalDate today = LocalDate.now();
		
		for (ReserveVO reserveVO : reserveList) {
			if(reserveVO.getRDate().substring(0, 10).equals(today.toString())) {
				return true;
			}
		}
		return false;
	}
	
	// 로그아웃
	@GetMapping("/user/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("User");
		return "redirect:/";
	}
	
	// 상담 예약페이지 이동
	@GetMapping("/user/reserve")
	public String reserve(HttpSession session) {
		
		UserVO user = (UserVO) session.getAttribute("User");
		
		if(user == null) {
			return "user/login";
		}
		return "user/reserve";
	}
	
	
	// 상담 유형 선택
	@GetMapping("/user/waiting")
	public String waiting() {
		return "user/waiting";
	}
	
	@ResponseBody
	@GetMapping("/user/goRoom")
	public String goRoom(@RequestParam("userName") String userName) {
		// 해당 유저의 예약이 있는지 확인
		List<ReserveVO> reserve = userService.checkReserve(userName);
		System.out.println(reserve.toString());
		List<RoomVO> rooms = userService.getRooms();
		System.out.println(rooms.toString());
		LocalDate today = LocalDate.now();
		System.out.println(today);
		
		// 예약 없을시 진행
		if(reserve.size() == 0) {
			for (RoomVO roomVO : rooms) {
				// 상담 대기중의 빈 방이면
				System.out.println(roomVO.toString());
				if(roomVO.getRoomcondition().equals("대기")) {
					String roomId = roomVO.getRoomId();
					userService.enterRoom(roomId, userName);
					System.out.println(roomId);
					return roomId;
				}
			}		
		}
		// 예약 있을 시
		for (ReserveVO reserveVO : reserve) {
			// 오늘 날짜 예약일때
			if(reserveVO.getRDate().equals(today)) {
				for (RoomVO roomVO : rooms) {
					// 상담자가 일치하고 빈 방이면
					if(roomVO.getRoomcondition().equals("대기") && roomVO.getTeller().equals(reserveVO.getTeller())) {
						String roomId = roomVO.getRoomId();
						userService.enterRoom(roomId, userName);
						System.out.println(roomId);
						return roomId;
					}
				}
			}else {
				// 오늘 예약이 아닐 때
				for (RoomVO roomVO : rooms) {
					// 상담 대기중의 빈 방이면
					if(roomVO.getRoomcondition().equals("대기")) {
						String roomId = roomVO.getRoomId();
						userService.enterRoom(roomId, userName);
						System.out.println(roomId);
						return roomId;
					}
				}	
			}
		}
		
		// 예약 있을 시 내 예약들 불러오고 날짜 비교해서 오늘날짜에 누구랑 상담인지 확인 후 그 방에 들어간다.
		return "";
	}
	
	
	// 상담 입장
	@GetMapping("/user/chat/{roomId}")
	public String chat(@PathVariable("roomId") String roomId, Model model) {
		
		model.addAttribute("check", "check");
		model.addAttribute("roomId", roomId);
		
		return "user/userRoom";
	}
	
	// 투자성향 제출
	@ResponseBody
	@PostMapping("/user/invest")
	public Map<String, String> invest(@RequestParam("one") int a, @RequestParam("two") int b, @RequestParam("three") int c, @RequestParam("four") int d,
					@RequestParam("five") int e, @RequestParam("six") int f, @RequestParam("seven") int g, @RequestParam("eight") int h, HttpSession session) {
		Map<String, String> result = new HashMap<>();
		
		int sum = a+b+c+d+e+f+g+h;
		String investType;
		
		if(sum <= 42) {
			// 안전형
			investType = "안전형";
		}else if(sum <= 54) {
			// 안전추구형
			investType = "안전추구형";
		}else if(sum <= 67) {
			// 위험중립형
			investType = "위험중립형";
		}else if(sum <= 80) {
			// 적극투자형
			investType = "적극투자형";
		}else {
			// 공격투자형
			investType = "공격투자형";
		}
		
		String total = sum+"";
		
		result.put("total", total);
		result.put("investType", investType);
		
		
		UserVO user = (UserVO)session.getAttribute("User");
		// 투자성향 DB넣기
		userService.inputInvestType(investType, user.getId());
		
		System.out.println(sum);
		System.out.println(total);
		
		return result;
	}

	// 상담후기
	@GetMapping("/user/review/{roomId}")
	public String review(@PathVariable("roomId") String roomId) {
		
		userService.updateRoom(roomId);
		
		return "user/review";
	}
	
	// 상담 후기 작성
	@PostMapping("/user/review")
	public String reviewProcess(@ModelAttribute ReviewVO reviewVO) {
		
		userService.inputReview(reviewVO);
		
		return "redirect:/";
	}
	
	@PostMapping("/user/review/json")
	public List<ReviewVO> reviewList(){
		
		
		return null;
	}
	
	
	// 자신의 모든 계좌 가져오기
	@ResponseBody
	@GetMapping("/user/account")
	public List<Map<String, String>> getAllAccount(HttpSession session){
		
		UserVO user = (UserVO) session.getAttribute("User");
		
		List<Map<String, String>> myAccountList = userService.getAllAccount(user.getName(), user.getId());
		
		return myAccountList;
	}
	
	//마이페이지
	@GetMapping("/user/mypage")
	public String myPage(HttpSession session, Model model) {
		UserVO user = (UserVO) session.getAttribute("User");
		if(user == null) {
			return "user/login";
		}
		
		List<CheckingAccountVO> checkList = userService.getCheckAccount(user.getId());
		List<FundAccountVO> fundList = userService.getFundAccount(user.getName());
		
		String dateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyy-MM-dd HH:mm:ss"));
		String myIp = null;
		
		try {
			myIp = InetAddress.getLocalHost().getHostAddress();
	    } catch (UnknownHostException e) {
	    	myIp = "";
	    }
		
		model.addAttribute("checkList", checkList);
		model.addAttribute("myIp", myIp);
		model.addAttribute("fundList", fundList);
		model.addAttribute("dateTime", dateTime);
		
		return "user/mypage";
	}

	
	// 지점찾기
	@GetMapping("/user/location")
	public String moveEmail() {
		return "user/location";
	}
	
	@GetMapping("/user/docPOPUP")
	public String openPOP() {
		return "user/popup";
	}

}
