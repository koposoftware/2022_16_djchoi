<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
	<style type="text/css">
		@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
		@font-face {
		    font-family: 'tellerfont';
		    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
		}
		body{
			font-family: 'Noto Sans KR', sans-serif;
		}
		
		textarea {
			border-color: #cecece;
			font-size: 14px;
		}
		button {
			border: 1px solid #cecece;
			background-color: white;
			color: #6F6F6F;
			width: 170px;
			height: 48px;
			font-size: 17px;
			font-weight: 700;
		}
		
		button:hover {
			background-color: #249782;
			color : white !important;
		}
		
	</style>
</head>
<body>
	<section class="text-center" style="background-color: #E6EEF0; padding-top: 40px">
		<h2 class="fw-light mb-0" style="color: #2c8587">화상상담 업무를 위한</h2>
		<div class="fw-bolder" style="font-size: 35px; color: #008586">개인정보 수집, 이용 동의</div>
		<div class="mt-1"><img src="/assets/img/docpop.png" width="50%"></div>
		<h5 class="my-3 fw-bold" style="color: #2c8587">개인정보 수집 및 이용에 동의하시겠습니까?</h5>
		<textarea class="mt-2 p-2" rows="7" cols="47" readonly="readonly">고객님의 상담업무를 처리하기 위해서는 개인정보보호법 제15조 1항 및 제24조 1항에 따라 아래의 내용에 대하여 고객님의 동의가 필요합니다.

1. 개인정보의 수집,이용목적
서비스 이용에 따른 상담업무 처리를 위한 본인식별, 본인의사확인 및 상담결과 통보

2. 수집하는 개인정보의 항목
성명, 생년월일, 채팅내용

3. 개인정보의 보유 및 이용 기간
위 개인정보는 수집·이용에 관한 동의 이후 처리 종료일로부터 5년간 위 이용목적을 위하여 보유·이용됩니다.단,(금융)거래 종료일 후에는 금융사고 조사, 분쟁 해결, 민원처리, 법령상 의무이행 및 당행의 리스크 관리업무만을 위하여 보유·이용됩니다.

4. 고객님은 개인정보 수집 및 이용을 거부할 권리가 있으며 권리행사 시 상담이 거부될 수 있습니다.

- 은행은 [채팅] 상담시 손님의 개인정보(주민등록번호, 계좌번호, 비밀번호 등)를 요구하지 않으며, 개인정보 입력으로 인한 어떠한 사고도 책임지지 않으니 개인정보 관리에 유의하시기 바랍니다.

- 본인확인이 필요한 상담과 법인손님은 일부 상담이 제한될 수 있으니, 신속한 상담을 원하실 때는 전화상담(1599-1111)을 이용해 주시기 바랍니다.
		</textarea>
		<div class="mt-4"> <button class="mx-2" onclick="closePage()">동의함</button> <button class="mx-2" style="border: 1px solid #1E9293; color: #1E9293">동의하지않음</button>  </div>
	</section>
	<script type="text/javascript">
		function closePage(){
			window.close();
		}
	</script>
</body>
</html>