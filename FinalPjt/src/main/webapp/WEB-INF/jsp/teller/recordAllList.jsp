<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>RecordList</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="../include/topMenu_teller.jsp"></jsp:include>
	
	
	<section class="m-5 text-center">
	
	
		<h1>상담 리스트 조회</h1>
		<table class="table table-hover mx-4">
			<thead class="table-success">
				<tr>
					<th scope="col" class="text-center">손님</th>
					<th scope="col" class="text-center">상담 분류</th>
					<th scope="col" class="text-center">제목</th>
					<th scope="col" class="text-center">내용</th>
					<th scope="col" class="text-center">텔러</th>
					<th scope="col" class="text-center">상담 일시</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${ recordAllList }" var="record">			
					<tr>
						<td style="width: 7%" class="text-center">${ record.userName }</td>
						<td style="width: 10%" class="text-center">${ record.title }</td>
						<td style="width: 18%" class="text-center">${ record.subtitle }</td>
						<td style="width: 40%" class="text-center">${ record.content }</td>
						<td style="width: 7%" class="text-center">${ record.teller }</td>
						<td style="width: 18%" class="text-center">${ record.regDate }</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</section>

	<jsp:include page="../include/footer.jsp"></jsp:include>
	<jsp:include page="../include/script.jsp"></jsp:include>
	
	
</body>
</html>