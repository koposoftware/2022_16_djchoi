package kr.ac.kopo.vo;

import lombok.Data;

@Data
public class FundAccountVO {

	private String accountNo;			// 계좌번호
	private String name;				// 계좌명
	private String password;			// 계좌비밀번호
	private String userName;			// 고객명
	private String investMoney;			// 투자원금
	private String valuationAmount;		// 평가금액
	private String cumulativeReturn;	// 누적 수익율
	private String startDate;			// 신규일
	private String endDate;				// 만기일
	private String term;				// 기간
	private String lastTrading;			// 최근거래일
	private String saveType;			// 저축 유형
	private String linkAccount;			// 연동계좌
	private String autoRedemption;		// 자동환매서비스
}
