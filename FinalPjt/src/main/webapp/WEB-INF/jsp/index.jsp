<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>화상 상담</title>
	<jsp:include page="include/link.jsp"></jsp:include>
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
	<!-- ======= Header ======= -->
	<jsp:include page="include/topMenu.jsp"></jsp:include>	
	<!-- End Header -->

	<section id="hero-static" class="hero-static d-flex align-items-center" style="font-family: tellerfont">
		<div class="container d-flex flex-column justify-content-center align-items-center text-center position-relative" data-aos="zoom-out">
			<h2 style="font-family: tellerfont">
				<span>원큐</span> 금융 상담서비스
			</h2>
			<p>언제, 어디서든 당신이 있는 그 장소에서 지금 바로 실시간 비대면 화상 상담을 시작해보세요.</p>
			<div class="d-flex">
				<a id="startBtn" class="btn-get-started scrollto mx-2" style="font-family: tellerfont"><i class="bi bi-play-circle"></i> 화상 상담 시작하기</a>
				<a id="startReserve" href="/user/reserve" class="btn-get-started scrollto mx-2" style="font-family: tellerfont"><i class="bi bi-play-circle"></i> 상담 예약하기</a>
			</div>
		</div>
	</section>

	<main id="main">

		<!-- ======= Featured Services Section ======= -->
		<section id="featured-services" class="featured-services">
			<div class="container">
				<div class="row gy-4">

					<div class="col-xl-2 col-md-6 d-flex" data-aos="zoom-out">
						<div class="service-item position-relative">
							<div class="icon">
								<img src="/assets/img/saving.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a href="" class="stretched-link">예/적금</a>
							</h4>
						</div>
					</div>
					<!-- End Service Item -->

					<div class="col-xl-2 col-md-6 d-flex" data-aos="zoom-out"
						data-aos-delay="200">
						<div class="service-item position-relative">
							<div class="icon">
								<img src="/assets/img/insurance.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a href="" class="stretched-link">보험</a>
							</h4>
						</div>
					</div>
					<!-- End Service Item -->

					<div class="col-xl-2 col-md-6 d-flex" data-aos="zoom-out"
						data-aos-delay="400">
						<div class="service-item position-relative">
							<div class="icon">
								<img src="/assets/img/loan.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a href="" class="stretched-link">대출</a>
							</h4>
						</div>
					</div>
					<!-- End Service Item -->

					<div class="col-xl-2 col-md-6 d-flex" data-aos="zoom-out"
						data-aos-delay="600">
						<div class="service-item position-relative">
							<div class="icon">
								<img src="/assets/img/fund.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a href="" class="stretched-link">펀드</a>
							</h4>
						</div>
					</div>
					
					<div class="col-xl-2 col-md-6 d-flex" data-aos="zoom-out"
						data-aos-delay="600">
						<div class="service-item position-relative">
							<div class="icon">
								<img src="/assets/img/global.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a href="" class="stretched-link">외환</a>
							</h4>
						</div>
					</div>
					
					<div class="col-xl-2 col-md-6 d-flex" data-aos="zoom-out"
						data-aos-delay="600">
						<div class="service-item position-relative">
							<div class="icon">
								<img src="/assets/img/credit.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a href="" class="stretched-link">카드</a>
							</h4>
						</div>
					</div>
					
					<!-- End Service Item -->

				</div>

			</div>
		</section>
		<!-- End Featured Services Section -->

		<!-- ======= F.A.Q Section ======= -->
		<section id="faq" class="faq">
			<div class="container-fluid" data-aos="fade-up">

				<div class="row gy-4">

					<div
						class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

						<div class="content px-xl-5">
							<h3>
								자주 묻는 <strong>질문</strong>
								<a class="btn-getstarted scrollto" href="https://www.kebhana.com/cont/customer/customer01/index.jsp?_menuNo=98824">더보기</a>
							</h3>
						</div>

						<div class="accordion accordion-flush px-xl-5" id="faqlist">

							<div class="accordion-item" data-aos="fade-up" data-aos-delay="200">
								<h3 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-1">
										<i class="bi bi-question-circle question-icon"></i> 
										인터넷으로 대출 신청시 이용절차가 어떻게 되나요?
									</button>
								</h3>
								<div id="faq-content-1" class="accordion-collapse collapse"
									data-bs-parent="#faqlist">
									<div class="accordion-body">
										1. 원하시는 대출상품 선택 및 주요 내용확인 <br>
										2. 신청하기 클릭 <br>
										3. 신용정보 조회 등 동의서 작성 <br>
										4. 기본정보 투입(거주지, 직장, 대출신청금액 등) <br>
										5. 대출신청 완료 및 증빙서류 팩스송부 <br>
										6. 대출심사 및 결과통보 <br>
										7. 약정서 등 채권서류 작성 및 대출실행 인터넷뱅킹 등에서 전자적 형태로 약정서 작성 및 대출 실행금 계좌 입금 <br><br>
										단, 경우에 따라 담당 영업점에 내점해야할 수 있습니다.
									</div>
								</div>
							</div>
							<!-- # Faq item-->

							<div class="accordion-item" data-aos="fade-up" data-aos-delay="300">
								<h3 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-2">
										<i class="bi bi-question-circle question-icon"></i>
										인터넷으로 아파트 담보대출을 받을 수 있나요?
									</button>
								</h3>
								<div id="faq-content-2" class="accordion-collapse collapse" data-bs-parent="#faqlist">
									<div class="accordion-body">
										네, 원클릭모기지 상품으로 이용하시면 가능합니다. <br><br>
										원클릭모기지란 영업점 방문 없이 인터넷이나 전화를 통해 간편하게 대출을 신청하신 후 당행 홈페이지에서 대출 약정을 통해 받는 무서류, 무방문, 무자서 아파트담보대출 입니다. <br><br>
										※ 단, 제3자 담보제공 또는 공동소유인 경우 영업점 방문하여 신청하여야 하며, 미등기 아파트 및 입주전 잔금대출은 취급 불가함. <br>
										개인뱅킹 - 대출 - 원클릭모기지 메뉴에서 상담 신청가능함.
									</div>
								</div>
							</div>
							<!-- # Faq item-->

							<div class="accordion-item" data-aos="fade-up" data-aos-delay="400">
								<h3 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-3">
										<i class="bi bi-question-circle question-icon"></i> 
										하나 플러스 통장은 인터넷뱅킹에서 가입할 수 있나요?
									</button>
								</h3>
								<div id="faq-content-3" class="accordion-collapse collapse" data-bs-parent="#faqlist">
									<div class="accordion-body">
										아닙니다. 신규 가입은 영업점, 비대면 계좌개설 서비스를 통한 신규 가입만 가능합니다. <br>
										단, 기존에 가입한 일반 통장에서 하나 플러스 통장으로의 전환은 은행 창구 및 인터넷뱅킹, 스마트폰뱅킹(하나 원큐), 고객센터에서 가능합니다.
									</div>
								</div>
							</div>
							<!-- # Faq item-->

							<div class="accordion-item" data-aos="fade-up" data-aos-delay="500">
								<h3 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-4">
										<i class="bi bi-question-circle question-icon"></i>
										급여통장 추천상품 알려주세요
									</button>
								</h3>
								<div id="faq-content-4" class="accordion-collapse collapse" data-bs-parent="#faqlist">
									<div class="accordion-body">
										<i class="bi bi-question-circle question-icon"></i>
										급여하나통장은 급여실적만으로 수수료 우대혜택을 제공하며, 만 35세 이하 청년직장인을 대상으로 우대금리가 제공됩니다.
									</div>
								</div>
							</div>
							<!-- # Faq item-->

							<div class="accordion-item" data-aos="fade-up" data-aos-delay="600">
								<h3 class="accordion-header">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-5">
										<i class="bi bi-question-circle question-icon"></i>
										자동이체 거래신청·해지·변경을 하고 싶어요.
									</button>
								</h3>
								<div id="faq-content-5" class="accordion-collapse collapse" data-bs-parent="#faqlist">
									<div class="accordion-body">
										자동이체는 고객님께서 원하시는 금액을 자유롭게 변경을 하실 수 있습니다. <br><br><br>
										이용하시는 방법은 3가지가 있습니다. <br><br><br>
										첫 번째, 폰뱅킹이 가입되어 있으신 회원의 경우에는 1599-1111번으로 문의주시어 543번 누르시면 저희 직원을 통해 변경이 가능합니다. <br><br><br>
										두 번째, 인터넷 뱅킹이 가입되어 있으신 회원의 경우에는 <br><br>
										- 해지시 : 홈페이지→개인뱅킹→이체→자동이체→조회/변경/취소→기존 자동이체 취소 <br>
										- 변경시 : 홈페이지→개인뱅킹→이체→자동이체→조회/변경/취소→출금계좌선택후 해당 자동이체 등록내역 확인해서 변경 버튼누르고 거래하면 됩니다. <br><br><br>
										세 번째, 영업점 방문하실 때에는 통장, 도장, 신분증 지참 후 방문하시면 변경이 가능합니다. 이 때 방문하실 분은 본인께서 직접 방문하시면 됩니다. <br><br>
										가능한 거래는 다음과 같습니다. <br><br>
										- 요구불 자동이체(입출금 통장) <br>
										- 타행 자동이체(당행 입출금 통장-타행간 이체) <br>
										- 월부금 자동이체(정기적금, 장기주택마련저축(또는 신비과세 장기저축), 상호부금 <br>
										- 대출금 이자 자동이체 <br>
									</div>
								</div>
							</div>
							<!-- # Faq item-->
		
						</div>

					</div>

					<div class="col-lg-5 align-items-stretch order-1 order-lg-2 img"
						style='background-image: url("assets/img/Ques2.png");'>&nbsp;</div>
				</div>

			</div>
		</section>
		<!-- End F.A.Q Section -->

	</main>
	<!-- End #main -->

	<jsp:include page="include/footer.jsp"></jsp:include>

	<jsp:include page="include/script.jsp"></jsp:include>
	<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
	<script type="text/javascript">
	
		$(document).ready(function() {
			
			// 금일 예약 상담이 있는지 확인
			<c:choose>
				<c:when test="${ empty User }">
				</c:when>
				<c:otherwise>
					$.ajax({
						url:"/user/checkMyreserve",
						method:"get",
						data:{
							userName : "${ User.name }"
						},success:(result)=>{
							if(result){
								Swal.fire({
								  title: "금일 상담이 예약되어있습니다.",
								  icon: "info",
								  showCloseButton: true,
								  focusConfirm: false,
								  confirmButtonText:
								    '확인',
								})
							}
						},error:()=>{
							alert("fail");
						}
					})
				</c:otherwise>
			</c:choose>
			
			
			
			// 상담 버튼 누를 때 로그인 되있는지 확인(controller에서 확인 말고 이렇게도 가능)
			$("#startBtn").click(function() {
				<c:choose>
					<c:when test="${ not empty User}">
						location.href = "/user/waiting";
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
