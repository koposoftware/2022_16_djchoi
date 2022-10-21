package kr.ac.kopo.vo;

import lombok.Data;

@Data
public class ReserveVO {
	
	private String rDate;		// 예약일
	private String rTime;		// 예약시간
	private String userName;	// 고객명
	private String title;		// 주제
	private String content;		// 문의내용
	private String teller;		// 상담사
}
