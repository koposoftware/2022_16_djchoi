<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>화상 상담</title>
	<jsp:include page="include/link.jsp"></jsp:include>
	<!-- fullcalendar CDN -->  
	<link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.8.0/main.min.css' rel='stylesheet' />  
	<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.8.0/main.min.js'></script>  
	<!-- fullcalendar 언어 CDN -->  
	<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.8.0/locales-all.min.js'></script>
	<style type="text/css">
		@font-face {
		    font-family: 'tellerfont';
		    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
		}
		
		.fc-toolbar-title {
			font-family: tellerfont;
		}
		
		
		.fc-daygrid-day-bottom a {
			color: #008485 !important;
			font-size: 15px;
			font-weight: bolder;
		}
		
		a {
			color: black;
		}
		
		.fc-day-sun a {
		  color: red;
		  text-decoration: none;
		}
		
		/* 토요일 날짜 파란색 */
		.fc-day-sat a {
		  color: blue;
		  text-decoration: none;
		}
	</style>
</head>
<body>
	<!-- ======= Header ======= -->
	<jsp:include page="include/topMenu_teller.jsp"></jsp:include>
	<!-- End Header -->

	<section id="hero-static" class="hero-static d-flex align-items-center" style="font-family: tellerfont; padding-top: 0; padding-bottom: 0">
		<div class="container d-flex flex-column justify-content-center align-items-center text-center position-relative" data-aos="zoom-out">
			<h2 style="font-family: tellerfont">
				화상 상담 <span style="color: #008485">시작!</span>
			</h2>
			<p>지금 바로 손님의 소리에 귀 기울여 주세요.</p>
			<div class="d-flex">
				<a id="startBtn" class="btn-get-started scrollto" style="background-color: #008485; font-family: tellerfont "><i class="bi bi-play-circle"></i> 화상 상담 시작하기</a>
			</div>
		</div>
		<input type="hidden" value="${ Teller.name }" id="tellerName">
	</section>
		<div id='calendar-container' class="mb-5" style="margin-left: 170px; margin-right: 170px">
			<!-- <button class="fs-5 mb-3" style="font-family: tellerfont; color: #006f85; background-color: white" onclick="showCalendar();" id="showCal">나의 상담 일정</button> -->
			<div id='calendar'></div>
		</div>
	
	<!-- End #main -->

	<jsp:include page="include/footer.jsp"></jsp:include>
	<jsp:include page="include/script.jsp"></jsp:include>
	<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>


	<script type="text/javascript">
		
		$(document).ready(function() {
			<c:if test="${ empty Teller }">
				document.getElementById("calendar-container").style.visibility = "hidden";
			</c:if>
			
			$("#startBtn").click(function() {
				<c:choose>
					<c:when test="${ not empty Teller}">
						location.href = "/teller/waiting";
					</c:when>
					<c:otherwise>
						location.href = "/teller/login";
					</c:otherwise>
				</c:choose>
			});
		})
	</script>
	
	<script>
		/* 
		function showCalendar(){	// 토글 확인
			if(document.getElementById("calendar").style.visibility == "hidden"){
				document.getElementById("calendar").style.visibility = "visible";
				document.getElementById("showCal").innerText = "일정 접기";
			}else{
				document.getElementById("calendar").style.visibility = "hidden";
				document.getElementById("showCal").innerText = "나의 상담 일정";
			}
		}
		 */
		 
		(function(){
			$(function(){
				const teller = document.getElementById("tellerName").value;
				$.ajax({
					url:"/getMyCalendar",
					method: "post",
					data : {
						teller : teller,
					}, success : (data) => {
						console.log(data);
						// calendar element 취득
						var calendarEl = $('#calendar')[0];
						// full-calendar 생성하기
						var calendar = new FullCalendar.Calendar(calendarEl, {
							height: '500px', 	// calendar 높이 설정
							expandRows: true, 	// 화면에 맞게 높이 재설정
							slotMinTime: '09:00', // Day 캘린더에서 시작 시간
							slotMaxTime: '22:00', // Day 캘린더에서 종료 시간
							// 해더에 표시할 툴바
							headerToolbar: {
								left: 'prev,next',
								center: 'title',
								right: 'dayGridMonth,timeGridWeek,timeGridDay'
							},
							initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
							navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크        
							editable: true, // 수정 가능?        
							selectable: true, // 달력 일자 드래그 설정가능        
							nowIndicator: true, // 현재 시간 마크        
							dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
							locale: 'ko', // 한국어 설정        
							
							// 이벤트
							
							eventClick: function(obj){
								// alert(obj.event.startStr.substr(0,10) +" "+ obj.event.startStr.substr(11,11) + "\n" + obj.event.title);
								Swal.fire({
								  title:  obj.event.startStr.substr(0,10) +" "+ obj.event.startStr.substr(11,11).substr(0,8),
								  icon: 'info',
								  html: '<strong>' + obj.event.title + '</strong>',
								  showCloseButton: true,
								  focusConfirm: false,
								  confirmButtonText:
								    '확인',
								})
								
							},
							events: data,
						});
						// 캘린더 랜더링
						calendar.render();
					}, error : () => {
						alert('실패');
					}
				});
				
			});  
		})();
	</script>
</body>
</html>