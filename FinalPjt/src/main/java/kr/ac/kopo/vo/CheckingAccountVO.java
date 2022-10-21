package kr.ac.kopo.vo;

import lombok.Data;

@Data
public class CheckingAccountVO {
	private String accountNo;	// 계좌번호
	private String goodsCode;	// 상품코드
	private String password;	// 계좌 비밀번호
	private String userId;		// 사용자 아이디
	private int balance;		// 잔액
	private int tranLimit;		// 1일 이체 한도
	private String status;		// 계좌 상태(휴먼계좌인지 아닌지)
	private String eFinance;	// 전자금융 가입 여부
	private String regDate;		// 가입일
	
}
