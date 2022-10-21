<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Top Menu</title>
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
	<header id="header" class="header fixed-top border-2"  data-scrollto-offset="0"  style="background-color: white">
		<div class="container-fluid d-flex align-items-center justify-content-around">

			<a href="/" class="logo d-flex align-items-center scrollto me-auto me-lg-0">
				<img src="/assets/img/Hana_Logo.png" alt="">
			</a>

			<nav id="navbar" class="navbar">
				<ul>
					<li><a class="nav-link scrollto" style="font-family: tellerfont" href="/">Home</a></li>
					<li><a class="nav-link scrollto" style="font-family: tellerfont" href="/user/reserve">상담예약</a></li>
					<li><a class="nav-link scrollto" style="font-family: tellerfont" href="/user/mypage">마이페이지</a></li>
					<li><a class="nav-link scrollto" style="font-family: tellerfont" href="/user/location">지점찾기</a></li>
				</ul>
				<i class="bi bi-list mobile-nav-toggle d-none"></i>
			</nav>
			<!-- .navbar -->
			
			<c:choose>
				<c:when test="${ empty User }">
					<a class="btn-getstarted scrollto" style="background-color: #249782; font-family: tellerfont" href="/user/login">로그인</a>				
				</c:when>
				<c:otherwise>
					<span style="font-family: tellerfont">${ User.name }님 환영합니다. <a class="btn-getstarted scrollto" style="background-color: #249782; font-family: tellerfont" href="/user/logout">로그아웃</a></span>
				</c:otherwise>
			</c:choose>

		</div>
	</header>
	<!-- End Header -->
</body>
</html>