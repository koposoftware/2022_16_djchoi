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
	<h1>�α���</h1>
	<form:form action="/user/login" method="post" modelAttribute="UserVO">
		<div>ID : <form:input path="id"/> <form:errors path="id" /> </div>
		<div>Password : <form:input path="password"/> <form:errors path="password" /> </div>
		<input type="submit" value="�α���">
	</form:form>
	
	<script type="text/javascript">
		if("${ msg }" === "fail"){
			alert("�α��ο� ���� �߽��ϴ�. \n���̵� ��й�ȣ�� �ٽ� Ȯ���� �ּ���.");
		}
	
	</script>
</body>
</html>