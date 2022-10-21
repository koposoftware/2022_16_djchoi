<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<h1>로그인</h1>
	<form:form action="/user/login" method="post" modelAttribute="UserVO">
		<div>ID : <form:input path="id"/> <form:errors path="id" /> </div>
		<div>Password : <form:input path="password"/> <form:errors path="password" /> </div>
		<input type="submit" value="로그인">
	</form:form>
	
	<script type="text/javascript">
		if("${ msg }" === "fail"){
			alert("로그인에 실패 했습니다. \n아이디 비밀번호를 다시 확인해 주세요.");
		}
	
	</script>
</body>
</html>