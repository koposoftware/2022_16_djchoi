package kr.ac.kopo.vo;

import lombok.Data;

@Data
public class RoomVO {
	private String roomId;		// 방 번호
	private String teller;		// 텔러
	private String title;		// 부서(ex 펀드)
	private String username;	// 고객
	private String roomcondition;
	private String regdate;
}
