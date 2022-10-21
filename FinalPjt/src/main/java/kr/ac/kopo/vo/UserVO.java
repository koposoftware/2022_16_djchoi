package kr.ac.kopo.vo;

import lombok.Data;

@Data
public class UserVO {
	
	private String id;
	private String password;
	private String name;
	private String gender;
	private String tel;
	private String email;
	private String idNum;
	private String regDate;
	private String investType;
}
