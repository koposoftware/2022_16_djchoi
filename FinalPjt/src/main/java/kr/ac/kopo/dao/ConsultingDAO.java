package kr.ac.kopo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.ac.kopo.vo.ConsultingContentVO;
import kr.ac.kopo.vo.ReserveVO;
import kr.ac.kopo.vo.ReviewVO;

@Mapper
public interface ConsultingDAO {
	
	public void reserveConsulting(ReserveVO reserveVO);
	public List<ReserveVO> getMyConsulting(String tellerName);
	public void insertConsultingContent(ConsultingContentVO consultingContentVO);
	public List<ConsultingContentVO> getConsultingContent(ConsultingContentVO consultingContentVO);
	
	public List<ReviewVO> getMyConsultingReview(String userName);
	public List<ReserveVO> getMyConsultingReserve(String userName);
}
