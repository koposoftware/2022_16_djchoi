<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Video</title>
	<jsp:include page="../include/link.jsp"></jsp:include>	
	<link href='/assets/css/chatt_user.css' rel='stylesheet'>
	<style type="text/css">
		
		button {
			background-color: white;
			border-radius: 15px;
			border: 1px solid #cecece;
			/* color: white; */
		}
		
		@font-face {
		    font-family: 'tellerfont';
		    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
		}
		
		#volatilityBtn:hover{
			background-color: #249782;
			color: white;
		}
		
		#popularBtn:hover{
			background-color: #249782;
			color: white;
		}
		
		#showInv:hover{
			background-color: #249782;
			color: white;
		}
		
		.swal2-header>div{
			margin: 30px 0;
		}
		
		.swal2-actions>button{
			margin: 0px 10px;
		}
		
		#joinForm{width: 460px;margin: 0 auto;}
		ul.join_box{padding:0px; border: 1px solid #ddd;background-color: #fff;}
		.clearfix{padding:0px}
		.checkBox,.checkBox>ul{position: relative;}
		.checkBox>ul>li{float: left;}
		.checkBox>ul>li:first-child{width: 85%;padding: 15px;font-weight: 600;color: #888;}
		.checkBox>ul>li:nth-child(2){position: absolute;top: 50%;right: 30px;margin-top: -12px;}
		.checkBox textarea{width: 96%;height: 90px; margin: 0 2%;background-color: #f7f7f7;color: #888; border: none; font-size:13px;}
		.footBtwrap{margin-top: 15px;}
		.footBtwrap>li{float: left;width: 50%;height: 60px;}
		.footBtwrap>li>button{display: block; width: 100%;height: 100%; font-size: 20px;text-align: center;line-height: 60px;}
		.fpmgBt1{background-color: #fff;color:#888}
		.fpmgBt2{background-color: lightsalmon;color: #fff}
		ul>li{list-style: none}
		a{text-decoration: none;}
		.clearfix::after{content: "";display: block;clear: both;}
		
		
	</style>
	<script src="https://kit.fontawesome.com/5f3d37272a.js"></script>
	
</head>
<body>
	<jsp:include page="../include/topMenu.jsp"></jsp:include>
	
	
	<div id="call" class="pt-5 my-4">
		<div id="myStream" class="my-4">
			<!-- 			
			<div class="d-flex" style="margin-left: 60px; font-family: tellerfont">
				<div ><i class="fa-solid fa-record-vinyl" style="font-size: 20px; color: red"></i> Record</div>
				<div class="ms-1" id="stopwatch">00:00:00</div>
			</div>
			 -->
			<div id="container" class="mx-5 mt-3  p-0" style="position: relative;">
				<video id="peerFace" class="p-0 rounded-5"
					style="width: 800px; max-height: 600px; position: absolute; left: 0; top: 0;"
					autoplay></video>
				<video id="myFace" class="p-0 border border-3 rounded-5"
					style="width: 200px; height: 150px; position: absolute; left: 0; top: 0; border-color: #dddddd !important;"
					autoplay></video>
			</div>
			
			
			<div id='chat' class="p-0 mt-3" style="margin-left: 870px" >
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
			
 			<div class="d-flex justify-content-center align-items-center py-3" style="margin-top:35px">
				<div style="font-family: tellerfont" class="d-flex">
					<div>
						<button id="mute" class="mx-2 btn-lg fs-4" style="background-color: #249782;"><i class="fa-solid fa-microphone" style="color: white; display: inline-block;"></i></button>
						<div class="mt-1 ms-3" style="color: #c0c0c0">마이크</div>					
					</div>
					<div>
						<button id="camera" class="ms-2 btn-lg fs-4" style="background-color: #249782;"><i class="fa-solid fa-video" style="color: white;"></i></button>
						<div class="mt-1 ms-4" style="color: #c0c0c0">화면</div>					
					</div>
					<div>
						<button id="account" onclick="showMyAccount();" class="mx-3 btn-lg fs-4" style="background-color: white;"><i class="fa-solid fa-wallet" style="color: #cecece;"></i></button>
						<div class="mt-1 ms-4" style="color: #c0c0c0">내 계좌</div>					
					</div>
					<div>
						<button onclick="moveReview();" class="btn-lg fs-4"><i class="fa-solid fa-arrow-right-from-bracket" style="color: #cecece;"></i></button>
						<div class="mt-1 ms-2" style="color: #c0c0c0">나가기</div>
					</div>
				</div>
			</div>
			
			<div id="fundTable" class="ms-5" style="width: 90%; height: 250px; overflow-y: auto; display:none;">
				
			</div>
		</div>
		
	</div>
	
	
	<input type="hidden" value="${ User.name }" id="userName">
	<input type="hidden" value="${ User.id }" id="userId">
	<input type="hidden" value="${ User.tel }" id="userTel">
	<input type="hidden" value="${ User.email }" id="userMail">
	<input type="hidden" value="${ User.idNum }" id="userIdNum">
	<input type="hidden" value="${ roomId }" id="roomId">
	
	
	
	<%-- <jsp:include page="../include/footer.jsp"></jsp:include> --%>
	<jsp:include page="../include/script.jsp"></jsp:include>
	
	<script src='/assets/js/userConsulting.js'></script>
	
	<script type="text/javascript">
		// const roomId = document.getElementById("roomId").value;
	

		 
		/* 
		function openDocPop(){
			let href = "/user/emailPOPUP";
			let options = 'top=250, left=250, width=500, height=250, status=no, menubar=no, toolbar=no';
			
			//팝업창 생성
			var popup = window.open(href,'popup',options);
			  
			//기본이벤트 제거
			event.preventDefault();
		}
		 */
	</script>
</body>
</html>