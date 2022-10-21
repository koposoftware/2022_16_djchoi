package kr.ac.kopo.vo;

import lombok.Data;

@Data
public class ConsultingContentVO {
	private String roomId;			// 상담 방 번호
	private String userName;		// 손님
	private String tellerName;		// 상담사
	private String regDate;			// 작성일
	private String speaker;
	private String msg;
}
