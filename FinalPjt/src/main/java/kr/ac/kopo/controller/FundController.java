package kr.ac.kopo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.kopo.service.FundService;
import kr.ac.kopo.vo.FundAccountVO;
import kr.ac.kopo.vo.FundVO;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class FundController {

	private final FundService fundService;
	
	// 펀드 상품 가져오기
	@ResponseBody
	@GetMapping("/fund")
	public List<FundVO> getAllFund() {
		
		List<FundVO> fundList = fundService.getAllFund();
		
		return fundList;
	}
	
	@ResponseBody
	@GetMapping("/fundInfo")
	public List<FundVO> getRecommendFund(){
		
		List<FundVO> fundList = fundService.getRecommendFund();
		
		return fundList;
	}
	
	
	// 하이차트로 모든 펀드 정보 가져오기
	@ResponseBody
	@GetMapping("/fund/highChart")
	public List<List<Map<String, Object>>>  getAllFundHighChart() {
		
		List<List<Map<String, Object>>> data = new ArrayList<>();
		
		// 인기있는 펀드 리스트와 변동성이 큰 펀드 리스트
		List<Map<String, Object>> popularFund = new ArrayList<>();
		List<Map<String, Object>> volatilityFund = new ArrayList<>();
		
		List<FundVO> fundList = fundService.getAllFund();
		
		
		int i = 1;
		for (FundVO fundVO : fundList) {
			Map<String, Object> popularFundMap = new HashMap<>();
			Map<String, Object> volatilityFundMap = new HashMap<>();
			
			int index = fundVO.getScale().indexOf('억');
			
			popularFundMap.put("x", Float.parseFloat(fundVO.getScale().substring(0, index)) );
			volatilityFundMap.put("x", Float.parseFloat(fundVO.getDeviation()) );
			
			popularFundMap.put("y", Float.parseFloat(fundVO.getYield()) );
			volatilityFundMap.put("y", Float.parseFloat(fundVO.getYield()) );
			
			// map.put("z", Math.round( ( Math.abs(Float.parseFloat(fundVO.getYield()))  / Float.parseFloat(fundVO.getScale().substring(0, index)) ) * 1000) /100.0 );
			popularFundMap.put("z", Float.parseFloat(fundVO.getDeviation()) );
			volatilityFundMap.put("z", Float.parseFloat(fundVO.getScale().substring(0, index)) );
			
			// popularFundMap.put("color", "Highcharts.getOptions().colors[" + i++ +"]" );
			
			
			popularFundMap.put("name", fundVO.getName().substring(0, 7)+"...");
			volatilityFundMap.put("name", fundVO.getName().substring(0, 7)+"...");
			popularFundMap.put("fullName", fundVO.getName());
			volatilityFundMap.put("fullName", fundVO.getName());
			
			popularFund.add(popularFundMap);
			volatilityFund.add(volatilityFundMap);
		}
		
		data.add(popularFund);
		data.add(volatilityFund);
		
		return data;
	}
	
	
	
	
	// 내가 보유한 펀드 가져오기
	@ResponseBody
	@GetMapping("/getFund")
	public List<FundAccountVO> getAllMyFund(@RequestParam String userName) {
		
		List<FundAccountVO> myFundList = fundService.getAllMyFund(userName);
		
		return myFundList;
	}
	
	
	// 내가 보유한 입출금 계좌 가져오기
	@ResponseBody
	@PostMapping("/getMyAccount")
	public List<String> getMyAccount(@RequestParam String userId){
		List<String> myAccountList = fundService.getMyAccount(userId);
		
		return myAccountList;
	}
	
	// 펀드 상품 가입하기
	@ResponseBody
	@PostMapping("/joinProcess")
	public List<FundAccountVO> joinProcess(@ModelAttribute FundAccountVO fundAccountVO) {
		System.out.println(fundAccountVO.toString());
		
		fundService.insertFund(fundAccountVO);
		
		String userName = fundAccountVO.getUserName();
		
		List<FundAccountVO> myFundList = fundService.getAllMyFund(userName);
		
		return myFundList;
	}
}
