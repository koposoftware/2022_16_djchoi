package kr.ac.kopo.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MailVO {
	private String address;		// 메일주소
	private String title;		// 메일 제목
	private String content;		// 메일 내용
}
