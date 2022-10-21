<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Top Menu_teller</title>
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
	<header id="header" class="header " data-scrollto-offset="0">
		<div class="container-fluid d-flex align-items-center justify-content-around">

			<a href="/teller" class="logo d-flex align-items-center scrollto me-auto me-lg-0">
				<img src="/assets/img/Hana_Logo.png" alt="">
			</a>

			<nav id="navbar" class="navbar">
				<ul>
					<li><a class="nav-link scrollto" style="font-family: tellerfont" href="/teller">Home</a></li>
					<li><a class="nav-link scrollto" style="font-family: tellerfont" href="#">상담서비스</a></li>
					<li><a class="nav-link scrollto" style="font-family: tellerfont" href="/teller/recordList">상담내역 조회</a></li>
					<li><a class="nav-link scrollto" style="font-family: tellerfont" href="#">상담후기 조회</a></li>
				</ul>
				<i class="bi bi-list mobile-nav-toggle d-none"></i>
			</nav>
			<!-- .navbar -->
			
			<c:choose>
				<c:when test="${ empty Teller }">
					<a class="btn-getstarted scrollto" href="/teller/login" style="background-color: #008485; font-family: tellerfont">로그인</a>
				</c:when>
				<c:otherwise>
					<span style="font-family: tellerfont">${ Teller.name }님 어서오세요. <a class="btn-getstarted scrollto" href="/teller/logout" style="background-color: #008485; font-family: tellerfont">로그아웃</a></span>
				</c:otherwise>
			</c:choose>

		</div>
	</header>
	<!-- End Header -->
</body>
</html>