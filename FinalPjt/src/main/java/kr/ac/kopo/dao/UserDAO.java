package kr.ac.kopo.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.ac.kopo.vo.ReserveVO;
import kr.ac.kopo.vo.ReviewVO;
import kr.ac.kopo.vo.RoomVO;
import kr.ac.kopo.vo.UserVO;

@Mapper
public interface UserDAO {
	
	public UserVO login(UserVO userVO);
	public void inputReview(ReviewVO reviewVO);
	public List<ReserveVO> checkReserve(String userName);
	public List<RoomVO> getRooms();
	public void enterRoom(Map<String, String> room);
	public void inputInvestType(String investType, String id);
	public void updateRoom(String roomId);
}
