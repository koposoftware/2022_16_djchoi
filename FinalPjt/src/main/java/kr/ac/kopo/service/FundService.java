package kr.ac.kopo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.ac.kopo.dao.FundDAO;
import kr.ac.kopo.vo.FundAccountVO;
import kr.ac.kopo.vo.FundVO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FundService {

	private final FundDAO fundDao;
	
	// 모든 펀드 상품 가져오기
	public List<FundVO> getAllFund() {
		return fundDao.getAllFund();
	}
	
	// 내가 보유한 펀드 계좌 가져오기
	public List<FundAccountVO> getAllMyFund(String userName) {
		return fundDao.getAllMyFund(userName);
	}
	
	// 추천 펀드 상위 5개
	public List<FundVO> getRecommendFund() {
		return fundDao.getRecommendFund();
	}
	
	// 내가 보유한 입출금 계좌 가져오기
	public List<String> getMyAccount(String userId){
		return fundDao.getMyAccount(userId);
	}
	
	// 펀드 계좌 생성
	public void insertFund(FundAccountVO fundAccountVO) {
		String accountNo = "830-";
		
		// 계좌번호 랜덤 생성
		for(int i = 0; i < 6; i++) {
			accountNo += (int)(Math.random()*10);
		}
		accountNo += "-";
		accountNo += (int)(Math.random()*100 -1 ) ;
		
		fundAccountVO.setAccountNo(accountNo);
		
		System.out.println(fundAccountVO.toString());
		
		fundDao.insertFund(fundAccountVO);
	}
}
