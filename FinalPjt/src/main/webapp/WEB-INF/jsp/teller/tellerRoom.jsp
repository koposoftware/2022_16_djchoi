<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Video</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
	<link href='/assets/css/chatt_teller.css' rel='stylesheet'>
	<style type="text/css">
		button {
			background-color: #249782;
			color: white;
		}
		
		.ivBtn {
			background-color: white;
			border-radius: 15px;
			border: 1px solid #cecece;
			color: black;
		}
		
		@font-face {
		    font-family: 'tellerfont';
		    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
		}
		
		h3, h5{
			font-family: tellerfont;
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
		
		#showInv:hover{
			background-color: #249782;
			color: white;
		}
		
		#volatilityBtn:hover{
			background-color: #249782;
			color: white;
		}
		
		#popularBtn:hover{
			background-color: #249782;
			color: white;
		}
		
		.swal2-header>div{
			margin: 30px 0;
		}
		
		.swal2-actions>button{
			margin: 0px 10px;
		}
		
	</style>
</head>
<body>
	<jsp:include page="../include/topMenu_teller.jsp"></jsp:include>


	<div id="call" class="row">
		
		
		<div class="col-1"></div>
		<div id="myStream" class="row col-10 my-3 d-flex justify-content-between">
		
		<!-- 
			<div class="d-flex p-0 mb-2" style="font-family: tellerfont">
				<div ><i class="fa-solid fa-record-vinyl" style="font-size: 20px; color: red"></i> Record</div>
				<div class="ms-1" id="stopwatch">00:00:00</div>				
			</div>
		 -->
			<div id="container" class="row col-7 p-0" style="position: relative;">
				<video id="peerFace" class="col-12 p-0  rounded-5"
					style="width: auto; max-height: 450px; position: absolute; left: 0; top: 0;"
					autoplay></video>
				<video id="myFace" class="col-12 p-0 border border-4 rounded-5"
					style="width: 150px; height: 110px; position: absolute; left: 0; top: 0; border-color: #008485 !important;"
					autoplay></video>
			</div>

			<div id='chat' class="col-4 p-0">
				<c:choose>
					<c:when test="${ empty check }">
						<input type='text' id='mid' value='상담사' hidden="">
					</c:when>
					<c:otherwise>
						<input type='text' id='mid' value='고객' hidden="">
					</c:otherwise>
				</c:choose>
				<div id='talk' style="position: relative;" class="border-0">
					<input id="title" value="Message" class="ms-3 fs-4 text-center" style="font-family: tellerfont" readonly>
				</div>
				<div id='sendZone' class="d-flex">
					<input id='msg' type="text" class="mb-3 position-absolute bottom-0 start-50 translate-middle-x border-0" placeholder=" 메세지를 입력하세요.">
					<button type="button" id='btnSend' class="me-4 mb-3 position-absolute bottom-0 end-0 border-0"><i class="fa-solid fa-paper-plane" style="color: white"></i></button>				
				</div>
			</div>
			<%-- <div id='chat' class="row col-4 p-0 m-0" style="align-content: flex-start;">
				<div class="col-12 p-0">
					<c:choose>
						<c:when test="${ empty check }">
							<input type='text' id='mid' value='상담사' hidden="">
						</c:when>
						<c:otherwise>
							<input type='text' id='mid' value='고객' hidden="">
						</c:otherwise>
					</c:choose>
					<div id='talk'></div>
					<div id='sendZone'>
						<textarea id='msg' class="p-0"></textarea>
						<input type='button' value='전송' id='btnSend' class="p-0">
					</div>
				</div>
			</div> --%>

			<div class="col-1 d-flex flex-column justify-content-between px-0" style="font-family: tellerfont">
				<button class="border-0 btn-lg fs-6" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">업무<br>목록</button>
				<button class="border-0 btn-lg fs-6" id="sendInvest">투자<br>성향<br>분석</button>
				<button class="border-0 btn-lg fs-6" id="screenShareButton" onclick="shareScreen();">화면<br>공유</button>
				<button class="border-0 btn-lg fs-6" onclick="moveRecord();">상담<br>종료</button>
			</div>

			<div class="col-12 mt-2 p-0" style="font-family: tellerfont">
				<div class="d-flex border-top">
					<h5 class="m-0 d-flex align-items-center">
						○ 손님정보(<input type="text" id="userName" size="4" style="border: none; outline: none;" readonly>)
					</h5>
					<input	type="hidden" id="userId" >
				</div>
				<div class="d-flex flex-column justify-content-between mb-4">
					<div class="mt-1 pe-0">
						<span style="display:inline-block; width: 300px;">전화번호 : <input type="text" id="userTel" size="13" style="border: none; outline: none;" readonly></span>
						<button class="btn-danger btn-sm border-0" style="font-family: tellerfont" id="sendTel">미 인증</button>
					</div>
					<div class="mt-2 pe-0">
						<span style="display:inline-block; width: 300px;">이메일 : <input type="text" id="userMail" style="border: none; outline: none;" readonly></span>
						<button class="btn-danger btn-sm border-0" style="font-family: tellerfont" id="sendEmail">미 인증</button>
					</div>
					<div class="mt-2 pe-3">
						<span style="display:inline-block; width: 300px;">주민등록번호 : <input type="text" id="userIdNum" style="border: none; outline: none;" readonly></span>
						<button class="btn-danger btn-sm border-0" style="font-family: tellerfont" id="captureBtn" data-bs-toggle="modal" data-bs-target="#idNum">미 인증</button>
					</div>
				</div>
				<div id="aboutFund" class="d-flex justify-content-between align-items-center mt-2 py-2 border-top border-bottom" style="display: none !important;">
					<div class="col-5">
						<h3 class="m-0">펀드 상품 정보</h3>
					</div>
					<div class="col-7 d-flex justify-content-end" style="font-family: tellerfont">
						<button class=" mx-1 border-0 btn-lg fs-6" id="showUserFund">펀드 보유현황</button>
						<button class=" mx-1 border-0 btn-lg fs-6" id="showFunds">상품 정보</button>
						<button class="mx-1 border-0 btn-lg fs-6" id="setJoinFund">상품 가입</button>
					</div>
				</div>

			</div>

			<div id="fundTable" style="width: 100%; height: 300px; overflow-y: auto;">
				
			</div>

		</div>
		
	</div>






	<!-- 업무 목록 창 -->
	<div class="offcanvas offcanvas-start" tabindex="-1"
		id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
		<div class="offcanvas-header">
			<h3 class="offcanvas-title" id="offcanvasExampleLabel">업무 목록</h3>
			<button type="button" class="btn-close text-reset"
				data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body fs-6" style="font-family: tellerfont">
			<input type="text" size="20">
			<button style="border: none;">검색</button>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 계좌조회(1000)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 자유입출금 업무(1001)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 예금 업무(1003)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 적금 업무(1004)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 전자금융(1006)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 체크카드 상담(1008)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 신용카드 상담(1009)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 방카슈랑스 상담(1011)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 대출 상담(1012)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a onclick="showAboutFund()" style="color: black !important;"> 펀드 상담(1013)</a></div>
			<div class="mt-4 pb-3 border-3 border-bottom" style="width: 250px"><a href="#" style="color: black !important;"> 외환 상담(1015)</a></div>
		
		</div>
	</div>


	<!-- 주민번호 인증 모달 창 -->
	<div class="modal fade" id="idNum" data-bs-backdrop="static"
		data-bs-keyboard="false" tabindex="-1"
		aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">캡쳐가 완료되었습니다.</h5>
				</div>
				<div class="modal-body text-center">
					<canvas id="canvas" style="display: none;"></canvas>
					<div id="images"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="checkId()" id="checkIdNum">신분증 확인</button>
					<button type="button" class="btn btn-primary" onclick="changeBtn()" data-bs-dismiss="modal">확인</button>
				</div>
			</div>
		</div>
	</div>


	<input type="hidden" value="${ Teller.name }" id="tellerName">
	<input type="hidden" value="${ Teller.dept }" id="tellerDept">
	<input type="hidden" value="${ roomId }" id="roomId">
	
	<!-- ------------------------------------------------------------------------------------------------------------------- -->
	<%-- <jsp:include page="../include/footer.jsp"></jsp:include> --%>
	<jsp:include page="../include/script.jsp"></jsp:include>

	<script src='/assets/js/tellerConsulting.js'></script>
	<script type="text/javascript">
		function changeBtn() {
			document.getElementById('captureBtn').className = 'btn-primary';
			document.getElementById('captureBtn').innerText = "인증 완료";
		};
		
		
		
		
		$(document).ajaxSend(function(event, jqxhr, settings){
			$.LoadingOverlay("show", {
				image :"/assets/img/loading.gif",
				text : "데이터 처리중입니다.",
				imageAutoResize : false,
				maxSize : 70
			});
		});
		$(document).ajaxComplete(function(event, jqxhr, settings){
		    $.LoadingOverlay("hide");
		});
		
		
		function showAboutFund(){
			document.getElementById('aboutFund').style.display = "none";
		}
	</script>
</body>
</html>