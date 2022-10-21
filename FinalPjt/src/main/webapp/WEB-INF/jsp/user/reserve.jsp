<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Review</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
</head>
<body>
	<jsp:include page="../include/topMenu.jsp"></jsp:include>
	
	<section id="contact" class="contact my-5">
		<div class="container">

			<div class="row gy-5 gx-lg-5 my-3">
				<div class="col-lg-3"></div>
				<div class="col-lg-6">

					<form action="/user/reserve" method="post" name="ReserveVO">
						<div class="info mb-2 text-center">
							<h3><i class="fa-regular fa-clock" style="color: #249782"></i> 상담 예약하기</h3>
							<p>고객님의 궁금증을 미리 얘기해 주세요</p>
							<div class="info-item d-flex text-center">
								<div>
									<h4>주제</h4>
									<select name="title" style="width: 500px; height: 35px">
										<option value="none">선택</option>
										<option value="예/적금">예/적금</option>
										<option value="보험">보험</option>
										<option value="대출">대출</option>
										<option value="펀드">펀드</option>
										<option value="외환">외환</option>
										<option value="카드">카드</option>
										<option value="기타">기타</option>
									</select>
								</div>
							</div>
							<!-- End Info Item -->

							<div class="info-item d-flex text-center">
								<div class="info-item d-flex text-center col-4">
									<div>
										<h4>예약자</h4>
										<input type="text" class="form-control text-center" name="userName" size="13" value="${ User.name }" readonly>
									</div>
								</div>
								<div class="info-item d-flex text-center col-4 m-0 p-0 border-0">
									<div>
										<h4>예약일</h4>
										<input type="date" class="form-control text-center" name="rDate" id="rDate" style="width: 150px">
									</div>
								</div>
								<div class="info-item d-flex text-center col-4 m-0 p-0 border-0">
									<div>
										<h4>시간</h4>
										<input type="text" class="timepicker form-control text-center" name="rTime" id="rTime" style="width: 150px" autocomplete="off">
									</div>
								</div>
							</div>
							<div class="info-item d-flex text-center">
								<div>
									<h4>문의 내용</h4>
									<textarea name="content" rows="8" cols="64" placeholder="문의 내용을 입력해주세요."></textarea>
								</div>
							</div>
							<!-- End Info Item -->
						</div>
						<div class="text-center mt-2">
							<input type="submit" class="btn btn-outline-success" value="작성완료">
						</div>
					</form>
				</div>
				<div class="col-lg-3"></div>
			</div>

		</div>
	</section>
	

	<jsp:include page="../include/footer.jsp"></jsp:include>
	<jsp:include page="../include/script.jsp"></jsp:include>
	<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
	
	<script type="text/javascript">
	$(document).ready(function () {
		$('input.timepicker').timepicker({
	            timeFormat: 'HH:mm',
	            interval: 30,
	            startTime: '09:00',
	            dynamic: false,
	            dropdown: true,
	            scrollbar: true
	        });
	    })
		
	    
		let now_utc = Date.now()
		let timeOff = new Date().getTimezoneOffset()*60000;
		let today = new Date(now_utc-timeOff).toISOString().split("T")[0];
		document.getElementById("rDate").setAttribute("min", today);
	</script>
</body>
</html>