package kr.ac.kopo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.ac.kopo.vo.RecordVO;
import kr.ac.kopo.vo.RoomVO;
import kr.ac.kopo.vo.TellerVO;

@Mapper
public interface TellerDAO {
	
	public List<TellerVO> getAllTeller(String title);
	public TellerVO login(TellerVO tellerVO);
	public void inputRocord(RecordVO recordVO);
	public List<RecordVO> selectByName(String tellerName);
	public List<RecordVO> selectAll();
	public void makeRoom(RoomVO room);
}
