<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Record</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="../include/topMenu_teller.jsp"></jsp:include>
	
	<section id="contact" class="contact pt-3">
		<div class="container">

			<div class="row gy-5 gx-lg-5">
				<div class="col-lg-3"></div>
				<div class="col-lg-6">

					<form action="/teller/record" method="post" name="recordVO">
						<div class="info mb-2 text-center">
							<h3><i class="fa-solid fa-pen-to-square" style="color:#009692"></i> 상담 내용 작성</h3>
							<p>상담 내용은 추후 고객 성향 분석 및 고객 서비스 발전, 상품 개발에<br> 참고 자료로 사용될 예정입니다.</p>
							<div class="info-item d-flex text-center">
								<div>
									<h4>주제</h4>
									<input type="text" class="form-control text-center" name="title" size="64" value="${ Teller.dept }" readonly>
								</div>
							</div>
							<!-- End Info Item -->
							<div class="info-item d-flex text-center">
								<div>
									<h4>세부 주제</h4>
									<input type="text" class="form-control text-center" name="subtitle" size="64" placeholder="세부 주제를 입력해주세요.">
								</div>
							</div>
							<!-- End Info Item -->
							<div class="info-item d-flex text-center">
								<div class="info-item d-flex text-center col-6">
									<div>
										<h4>고객명</h4>
										<input type="text" class="form-control text-center" id="userName" name="userName" size="43" readonly>
									</div>
								</div>
								<div class="info-item d-flex text-center col-6 m-0 p-0 border-0">
									<div>
										<h4>상담사명</h4>
										<input type="text" class="form-control text-center" name="teller" size="43" value="${ Teller.name }" readonly>
									</div>
								</div>
							
							</div>
							<!-- End Info Item -->
							<div class="info-item d-flex text-center">
								<div>
									<h4>상담내용</h4>
									<textarea name="content" rows="8" cols="68" placeholder="상담내용를 작성해 주세요."></textarea>
								</div>
							</div>
							<!-- End Info Item -->

						</div>
						<div class="text-center">
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
	<script type="text/javascript">
	
		const userName = sessionStorage.getItem("userName");
		
		document.addEventListener("DOMContentLoaded", ()=>{
        	document.getElementById("userName").value = userName;
        });
		
	</script>
	
</body>
</html>