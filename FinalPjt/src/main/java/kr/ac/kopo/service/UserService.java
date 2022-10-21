package kr.ac.kopo.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import kr.ac.kopo.dao.FundDAO;
import kr.ac.kopo.dao.UserDAO;
import kr.ac.kopo.vo.CheckingAccountVO;
import kr.ac.kopo.vo.FundAccountVO;
import kr.ac.kopo.vo.ReserveVO;
import kr.ac.kopo.vo.ReviewVO;
import kr.ac.kopo.vo.RoomVO;
import kr.ac.kopo.vo.UserVO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserDAO userDao;
	private final FundDAO fundDao;
	
	public UserVO login(UserVO userVO) {
		return userDao.login(userVO);
	}
	
	public void inputReview(ReviewVO reviewVO) {
		userDao.inputReview(reviewVO);
	}
	
	// 사용자의 상담 예약가져오기
	public List<ReserveVO> checkReserve(String userName) {
		List<ReserveVO> reserve = userDao.checkReserve(userName);
		
		return reserve;
	}
	
	// room 가져오기
	public List<RoomVO> getRooms() {
		return userDao.getRooms();
	}
	
	// 상담 종료 후 room상태 업데이트
	public void updateRoom(String roomId) {
		System.out.println(roomId);
		userDao.updateRoom(roomId);
	}
	
	// 방에 입장하기
	public void enterRoom(String roomId, String userName) {
		Map<String , String> room = new HashMap<>();
		room.put("roomId", roomId);
		room.put("userName", userName);
		
		userDao.enterRoom(room);
	}
	
	// 투자성향 DB에 넣기
	public void inputInvestType(String investType, String id) {
		userDao.inputInvestType(investType, id);
	}
	
	// 사용자명의 모든 계좌 가져오기
	public List<Map<String, String>> getAllAccount(String userName, String userId){
		
		List<Map<String, String>> accountList = new ArrayList<>();
		
		List<FundAccountVO> fundList = fundDao.getAllMyFund(userName);
		List<CheckingAccountVO> checkAccountList = fundDao.getAllMyAccount(userId);
		
		for (FundAccountVO FundAccountVO : fundList) {
			Map<String, String> account = new HashMap<>();
			
			account.put("accountNo", FundAccountVO.getAccountNo());
			account.put("type", "펀드");
			account.put("name", FundAccountVO.getName());
			account.put("money", FundAccountVO.getValuationAmount());
			account.put("regDate", FundAccountVO.getStartDate());
			
			accountList.add(account);
		}
		
		for (CheckingAccountVO checkingAccountVO : checkAccountList) {
			Map<String, String> account = new HashMap<>();
			
			account.put("accountNo", checkingAccountVO.getAccountNo());
			account.put("type", "입/출금");
			account.put("name", "급여하나 통장");
			account.put("money", checkingAccountVO.getBalance()+"");
			account.put("regDate", checkingAccountVO.getRegDate());
			
			accountList.add(account);
		}
		
		return accountList;
	}
	
	
	// 사용자명의 입출금계좌 가져오기
	public List<CheckingAccountVO> getCheckAccount(String userId){
		
		return fundDao.getAllMyAccount(userId);
	}
	// 사용자명의 펀드 계좌 가져오기
	public List<FundAccountVO> getFundAccount(String userName){
		
		return fundDao.getAllMyFund(userName);
	}
}
