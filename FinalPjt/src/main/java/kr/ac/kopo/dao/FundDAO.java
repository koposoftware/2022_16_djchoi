package kr.ac.kopo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.ac.kopo.vo.CheckingAccountVO;
import kr.ac.kopo.vo.FundAccountVO;
import kr.ac.kopo.vo.FundVO;

@Mapper
public interface FundDAO {

	public List<FundVO> getAllFund();
	public List<FundVO> getRecommendFund();
	public List<FundAccountVO> getAllMyFund(String userName);
	public List<String> getMyAccount(String userId);
	public List<CheckingAccountVO> getAllMyAccount(String userId);
	public void insertFund(FundAccountVO fundAccountVO);
}
