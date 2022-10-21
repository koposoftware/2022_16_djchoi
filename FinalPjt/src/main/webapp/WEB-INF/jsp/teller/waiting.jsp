<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>화상 상담</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
	<style type="text/css">
		@font-face {
		    font-family: 'tellerfont';
		    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
		}
		
		h2, h3 {
			font-family: tellerfont !important;
		}
	</style>
</head>
<body>
	<!-- ======= Header ======= -->
	<jsp:include page="../include/topMenu_teller.jsp"></jsp:include>
	<!-- End Header -->

	<main id="main">
		<section id="featured-services" class="featured-services">
			<div class="container text-center">
				<h2 class="mt-5 pt-5" style="font-family: tellerfont">${ Teller.name }님, 상담 준비 후 바로 시작해주세요</h2>
				<h3 class="mt-3 text-muted">항상 웃는 얼굴로 손님을 맞이해주세요☺</h3>
				<div class="row my-5 py-5"  style="font-family: tellerfont">
					<div class="col-1"></div>
					<div class="col-5 my-5 pt-3">
						<h3 id="customer" style="display: none; color: red;">고객 대기 중...</h3>
						<h3 class="fw-bold m-0 pt-5">오늘의 기준금리 : 3.00%</h3>
						<!-- <h3 class="fw-bold m-0">오늘의 상담 : 4건</h3> -->
					</div>
					<div class="col-5 my-1">
						<a id="waitingIcon">
							<img src="/assets/img/smile2.gif" style="width:40%;"><br>
							<span class=" fs-3">상담 대기 중</span>
						</a>
						
						<a href="/teller/chat/${roomId}" id="startIcon" style="display: none;">
							<img src="/assets/img/phone.gif" style="width:40%;"><br>
							<span class=" fs-3" style="color: #008485;">상담 시작 하기</span>
						</a>
					</div>
					<div class="col-1"></div>
				</div>
			</div>
		</section>
		
		<input type="hidden" value="${ Teller.name }" id="tellerName">
		<input type="hidden" value="${ Teller.dept }" id="tellerDept">
	</main>
	<!-- End #main -->

	<%-- <jsp:include page="../include/footer.jsp"></jsp:include> --%>
	<jsp:include page="../include/script.jsp"></jsp:include>
	
	<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
	<script src='/assets/js/tellerWaiting.js'></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#startBtn").click(function() {
				<c:choose>
					<c:when test="${ not empty User}">
						location.href = "/user/chat";
					</c:when>
					<c:otherwise>
						location.href = "/user/login";
					</c:otherwise>
				</c:choose>
			});
		})
	</script>
</body>
</html>