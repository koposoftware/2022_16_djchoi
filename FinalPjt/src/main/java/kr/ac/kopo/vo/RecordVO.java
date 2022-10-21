package kr.ac.kopo.vo;

import lombok.Data;

@Data
public class RecordVO {
	private String title;		// 상담 분류
	private String subtitle;	// 상담 주제
	private String content;		// 상담 내용
	private String userName;	// 고객명
	private String teller;		// 상담사명
	private String regDate;		// 상담일
}
