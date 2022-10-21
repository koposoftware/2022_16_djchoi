<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
	<style type="text/css">
		@font-face {
		    font-family: 'tellerfont';
		    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
		}
	</style>
</head>
<body>
	<jsp:include page="../include/topMenu.jsp"></jsp:include>

	<section id="contact" class="contact my-5" style="padding: 145px 0;">
		<div class="container">
			<div class="section-header">
				<h2 style="font-family: tellerfont">Login</h2>
			</div>
		</div>
		<div class="container">

			<div class="row gy-5 gx-lg-5">
				<div class="col-lg-3"></div>
				<div class="col-lg-6">

					<form action="/user/login" method="post" name="UserVO">
						<div class="info mb-4">
							<div class="text-center"><h3 style="font-family: tellerfont">회원 로그인</h3></div>
							<div class="info-item d-flex">
								<i class="bi bi-person-fill" style="color: #006f85"></i>
								<div>
									<h4 style="font-family: tellerfont">아이디:</h4>
									<input type="text" class="form-control" name="id" id="id" size="43" placeholder="Your ID" required autofocus>
								</div>
							</div>
							<!-- End Info Item -->

							<div class="info-item d-flex mb-3">
								<i class="bi bi-lock" style="color: #006f85"></i>
								<div>
									<h4 style="font-family: tellerfont">비밀번호:</h4>
									<input type="password" class="form-control" name="password" id="password" size="43" placeholder="Your Password" required>
								</div>
							</div>
							
							<div class="text-center pt-4" style="font-family: tellerfont">
								<span class="text-danger">이용자 비밀번호 5회 연속 오류 시,</span> <br>
								<span>이용자 아이디/비밀번호 로그인 이용이 제한됩니다.</span>
							</div>
							
							<!-- End Info Item -->

						</div>
						<div class="text-center">
							<input type="submit" class="btn btn-outline-success" value="로그인">
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
		if("${ msg }" === "fail"){
			alert("로그인에 실패 했습니다. \n아이디 비밀번호를 다시 확인해 주세요.");
		}
	
	</script>

</body>
</html>