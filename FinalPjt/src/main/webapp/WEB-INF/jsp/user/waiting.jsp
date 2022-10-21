<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>상담 대기</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
	<style type="text/css">
		@font-face {
		    font-family: 'tellerfont';
		    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
		}
		
		h2, h4, h5 {
			font-family: tellerfont !important;
		}
		
		h5 {
			opacity: 0.7;
		}
		
		.loadingoverlay {
			justify-content : center !important;
		}
		.loadingoverlay_element{
			color: #008485;
		}
		.loadingoverlay_text {
			margin-top: 30px !important;
			font-family: tellerfont;
		}
		
		[data-aos][data-aos][data-aos-duration="1000"], body[data-aos-duration="1000"] [data-aos] {
		    transition-duration: 0.6s;
		}
		
	</style>
</head>
<body>
	<!-- ======= Header ======= -->
	<jsp:include page="../include/topMenu.jsp"></jsp:include>
	<!-- End Header -->
	

	<main id="main">
		
		<!-- ======= Featured Services Section ======= -->
		<section id="featured-services" class="featured-services">
			<div class="container text-center" style="font-family: tellerfont">
				<h2 class="m-5 mb-3 p-5 pb-3">${ User.name }님, 원하시는 상담 유형을 선택해주세요.</h2>
				<p class="text-muted">상담사, 그들도 누군가의 아들, 딸, 어머니, 아버지입니다.</p>
				<p class="text-muted mb-4 pb-3">고객님의 따뜻한 한마디가 그들에게는 큰 힘이 됩니다</p>
				<div class="row gy-4 d-flex justify-content-evenly">

					<div class="col-md-5 d-flex service-item justify-content-center border border-1 border-success rounded mx-3" data-aos="zoom-out">
						<div class="position-relative">
							<div class="icon">
								<img src="/assets/img/saving.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a onclick="openDocPop();" class="stretched-link">예/적금</a>
							</h4>
							<h5>부자되는 알짜 정보</h5>
						</div>
					</div>
					<!-- End Service Item -->

					<div class="col-md-5 d-flex service-item justify-content-center border border-1 border-success rounded mx-3" data-aos="zoom-out"
						data-aos-delay="100">
						<div class="position-relative">
							<div class="icon">
								<img src="/assets/img/insurance.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a onclick="openDocPop();" class="stretched-link">보험</a>
							</h4>
							<h5>든든한 노후를 위해</h5>
						</div>
					</div>
					<!-- End Service Item -->

					<div class="col-md-5 d-flex service-item justify-content-center border border-1 border-success rounded mx-3" data-aos="zoom-out"
						data-aos-delay="100">
						<div class="position-relative">
							<div class="icon">
								<img src="/assets/img/loan.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a onclick="openDocPop();" class="stretched-link">대출</a>
							</h4>
							<h5>3분이면 한도조회 OK!</h5>
						</div>
					</div>
					<!-- End Service Item -->
					
					<div class="col-md-5 d-flex service-item justify-content-center border border-1 border-success rounded mx-3" data-aos="zoom-out"
						data-aos-delay="100">
						<div class="position-relative">
							<div class="icon">
								<img src="/assets/img/fund.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a onclick="openDocPop();" class="stretched-link">펀드</a>
							</h4>
							<h5>한 눈에 보는 펀드랭킹</h5>
						</div>
					</div>
					
					<div class="col-md-5 d-flex service-item justify-content-center border border-1 border-success rounded mx-3" data-aos="zoom-out"
						data-aos-delay="100">
						<div class="position-relative">
							<div class="icon">
								<img src="/assets/img/global.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a onclick="openDocPop();" class="stretched-link">외환</a>
							</h4>
							<h5>알뜰하게 환전하기</h5>
						</div>
					</div>
					
					
					<div class="col-md-5 d-flex service-item justify-content-center border border-1 border-success rounded mx-3" data-aos="zoom-out"
						data-aos-delay="100">
						<div class="position-relative">
							<div class="icon">
								<img src="/assets/img/credit.png" style="width:60px; height:60px" alt="">
							</div>
							<h4>
								<a onclick="openDocPop();" class="stretched-link">카드</a>
							</h4>
							<h5>내게 맞는 카드 추천</h5>
						</div>
					</div>
					<!-- End Service Item -->


				</div>
				

			</div>
			
			<div id="loadingImg"></div>
		</section>
		<!-- End Featured Services Section -->

	</main>
	<!-- End #main -->

	<jsp:include page="../include/footer.jsp"></jsp:include>
	<jsp:include page="../include/script.jsp"></jsp:include>
	
	<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
	<script type="text/javascript">
	
		async function LoadingProcess(roomId) {
			$.LoadingOverlay("show", {
				image :"/assets/img/loading.gif",
				text : "상담사 매칭 중 입니다.",
				imageAutoResize : false,
				maxSize : 90
			});
			
			setTimeout(function(){
				$.LoadingOverlay("text", "잠시만 기다려 주십시오");
			}, 2000);
			
			setTimeout(function(){
				location.href = "/user/chat/"+roomId;
			}, 4000);
		}
	
	
		function openDocPop(){
			let href = "/user/docPOPUP";
			let options = 'top=150, left=300, width=500, height=730, status=no, menubar=no, toolbar=no';
			
			//팝업창 생성
			let popup = window.open(href,'popup',options);
			  
			//기본이벤트 제거
			event.preventDefault();
			
			popup.onbeforeunload = ()=>{
				$.ajax({
					url:"/user/goRoom",
					method:"get",
					data:{
						userName: '${ User.name }'
					},
					success:(roomId)=>{
						LoadingProcess(roomId);
					},error:()=>{
						alert("현재 입장 불가")
					}
				})
				
				
			}
		}
		
		
	</script>
</body>
</html>