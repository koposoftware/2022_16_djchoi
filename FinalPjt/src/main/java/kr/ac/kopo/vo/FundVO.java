package kr.ac.kopo.vo;

import lombok.Data;

@Data
public class FundVO {

	private String name;		// 펀드명
	private String type;		// 상품유형
	private String scale;		// 설정액(운영규모)
	private String risk;		// 위험등급
	private String region;		// 투자지역
	private String yield;		// 최근 3개월 수익률
	private String deviation;	// 표준편차
}
