<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Review</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Questrial&display=swap" rel="stylesheet">
	<style type="text/css">
		@font-face {
		    font-family: 'tellerfont';
		    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
		}
		
		button:hover{
			background-color: #249782 !important;
			color: white !important;
		}
		
		.nav-link{
			color: black !important;
		}
		.nav-link.active{
			color: #249782 !important;
		}
	</style>
	<script src="https://kit.fontawesome.com/5f3d37272a.js"></script>
</head>
<body>
	<jsp:include page="../include/topMenu.jsp"></jsp:include>
	
	<section id="contact" class="contact mt-5">
		<div class="container">
			<div class="section-header">
				<h2 style="font-family: tellerfont">마이페이지</h2>
			</div>
		</div>
		<div class="container">

			<div class="row gy-5 gx-lg-5">
				<!-- <div class="col-lg-1"></div>
				<div class="col-lg-10">
					<div class="info mb-4">
						<img src="/assets/img/mypage.png" style="width:100%">
					</div>
				</div>
				<div class="col-lg-1"></div>
				 -->
				
				<div class="col-lg-1"></div>
				<div class="col-lg-10">
					<div class="d-flex info mb-4" style="font-family: 'Questrial', sans-serif; padding: 60px">
						<div class="border-end" style="width:30%;">
							<div class="d-flex mt-2">
								<div class="mb-3" style="font-size: small; color: #249782; font-weight: 600; width: 60%">Green</div>
								<div style="width: 20%"><img src="/assets/img/icon1.png" style="width:100%"></div>
								<div style="width: 20%"></div>							
							</div>
							<div style="font-size:23px; font-weight:900; ;">${ User.name }<span style="font-weight: 300;">님</span></div>
							<div class="mb-4" style="font-size: 23px;">안녕하세요 😋</div>
							<button class="rounded-2" style="font-size:small; background-color: white; width: 40%; height: 37px; border: 1px solid #cecece;">상담하기</button>
							<button type="button" class="rounded-2" onclick="myConsultingList()" style="font-size:small; background-color: white; width: 40%; height: 37px; border: 1px solid #cecece;">상담내역</button>
						</div>
						<div class="ms-4" style="width:70%">
							<div class="mb-3" style="font-size: small; font-weight: bol;">나의 은행 순 자산</div>
							<div class="mb-4" style="font-size:30px; font-weight: 500;">총 자산 <span><fmt:formatNumber value="${ checkList[0].balance }" pattern="#,###"/>원</span> </div>
							<div class="mb-1">
								<span style="font-size: 12px; font-weight: 600; margin-right: 13px;">최종 로그인 일시</span> <input class="me-3 ps-3" value="${ dateTime }" size="22" style="font-family:tellerfont;font-size:small; border: 0; background-color: #F0F4F6; height: 30px" readonly>
								<span style="font-size: 12px; font-weight: 600; margin-right: 13px;">최근상담일</span> <input class="ps-3" value="2021-08-30"size="22" style="font-family:tellerfont;font-size:small; border: 0; background-color: #F0F4F6; height: 30px" readonly>
							</div>
							<div>
								<span style="font-size: 12px; font-weight: 600; margin-right: 39px;">최근 이체일</span> <input class="me-3 ps-3" value="2022-10-13" size="22" style="font-family:tellerfont;font-size:small; border: 0; background-color: #F0F4F6; height: 30px" readonly>
								<span style="font-size: 12px; font-weight: 600; margin-right: 13px;">최종접속 IP</span> <input class="ps-3" value="${ myIp }"size="22" style="font-family:tellerfont;font-size:small; border: 0; background-color: #F0F4F6; height: 30px" readonly>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-1"></div>
			
				<div class="col-lg-1"></div>
				<div class="col-lg-10">
					
					<div class="info mb-4">
						<div class="mb-3"><h5 style="font-family: tellerfont">자유입출금계좌</h5></div>
						<table style="width:100%; font-family: tellerfont" class="table table-bordered">
							<thead style="background-color: #F2F6F7">
								<tr>
									<th scope="col" class="text-center">예금명(별칭)</th>
									<th scope="col" class="text-center">계좌번호</th>
									<th scope="col" class="text-center">신규일</th>
									<th scope="col" class="text-center">최종거래일</th>
									<th scope="col" class="text-center">잔액(원)</th>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${ checkList }" var="cAccount">
									<tr>
										<td class="text-center">저축예금</td>
										<td class="text-center">${ cAccount.accountNo }</td>
										<td class="text-center">${ cAccount.regDate }</td>
										<td class="text-center">2023-04-26</td>
										<td class="text-center"><fmt:formatNumber value="${ cAccount.balance }" pattern="#,###"/></td>
									</tr>
								</c:forEach>							
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-lg-1"></div>
				
				
				<div class="col-lg-1"></div>
				<div class="col-lg-10">
					
					<div class="info mb-4">
						<div class="mb-3"><h5 style="font-family: tellerfont">펀드계좌</h5></div>
						<table style="width:100%;  font-family: tellerfont;"  class="table table-bordered">
							<thead style="background-color: #F2F6F7">
								<tr>
									<th rowspan="2" scope="col" class="text-center" style="line-height: 4">펀드명(별칭)</th>
									<th rowspan="2" scope="col" class="text-center" style="line-height: 4">계좌번호</th>
									<th scope="col" class="text-center">신규일</th>
									<th rowspan="2" scope="col" class="text-center" style="line-height: 4">수익률</th>
									<th scope="col" class="text-center">투자원금(원)</th>
									
								</tr>
								<tr>
									<th scope="col" class="text-center">만기일</th>
									<th scope="col" class="text-center">평가금액(원)</th>
								</tr>
							</thead>
							<tbody>
								<c:forEach items="${ fundList }" var="fAccount">
									<tr>
										<td rowspan="2" class="text-center" style="line-height: 4">${ fAccount.name }</td>
										<td rowspan="2" class="text-center" style="line-height: 4">${ fAccount.accountNo }</td>
										<td class="text-center">${ fAccount.startDate }</td>
										<td rowspan="2" class="text-center" style="line-height: 4">${ fAccount.cumulativeReturn }</td>
										<td class="text-center"><fmt:formatNumber value="${ fAccount.investMoney }" pattern="#,###"/></td>
									</tr>
									<tr>
										<td class="text-center">${ fAccount.endDate }</td>
										<td class="text-center"><fmt:formatNumber value="${ fAccount.valuationAmount }" pattern="#,###"/></td>
									</tr>
								</c:forEach>							
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-lg-1"></div>
				
				
				
				
				<div class="col-lg-1"></div>
				<div class="col-lg-10">
					
					<div class="info mb-4">
						<div class="mb-3"><h5 style="font-family: tellerfont">안내</h5></div>
						<div style="font-size: smaller"><i class="fa-solid fa-check m-2" style="color: #6BE0CB"></i> 연금저축계좌의 납입금액은 고객이 납입한 원금을 기준으로 하며, 일부 인출이 있을 경우 소득세법에서 정한 인출순서를 반영하여 계산한 금액입니다.</div>
						<div style="font-size: smaller"><i class="fa-solid fa-check m-2" style="color: #6BE0CB"></i> 평가금액은 조회일자 기준으로 보유하고 있는 개별 집합투자증권의 평가금액의 합계액 입니다.</div>
						<div style="font-size: smaller"><i class="fa-solid fa-check m-2" style="color: #6BE0CB"></i> 원화펀드의 매입신청 금액은 투자자예탁금으로 표시되나, 외화펀드(외화ELF/DLF 등)는 표시되지 않습니다.<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp(체결 후 잔액에 반영)</div>
					</div>
				</div>
				<div class="col-lg-1"></div>
				
			</div>

		</div>
	</section>
	
	<input type="hidden" value="${ User.name }" id="userName">
	
	<%-- <jsp:include page="../include/footer.jsp"></jsp:include> --%>
	<jsp:include page="../include/script.jsp"></jsp:include>
	
	<script src='/assets/js/userConsultingList.js'></script>
	
</body>
</html>