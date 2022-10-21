<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Top Menu</title>
</head>
<body>
	<!-- ======= Header ======= -->
	<header id="header" class="header fixed-top" data-scrollto-offset="0">
		<div class="container-fluid d-flex align-items-center justify-content-between">

			<a href="index-4.html" class="logo d-flex align-items-center scrollto me-auto me-lg-0">
				<img src="assets/img/Hana_Logo.png" alt="">
			</a>

			<nav id="navbar" class="navbar">
				<ul>

					<li class="dropdown"><a href="#"><span>Home</span> <i
							class="bi bi-chevron-down dropdown-indicator"></i></a>
						<ul>
							<li><a href="index.html">Home 1 - index.html</a></li>
							<li><a href="index-4.html" class="active">Home 4 - index-4.html</a></li>
						</ul></li>

					<li><a class="nav-link scrollto" href="index.html#about">조회</a></li>
					<li><a class="nav-link scrollto" href="index.html#services">이체</a></li>
					<li><a class="nav-link scrollto" href="index.html#team">공과금</a></li>
					<li><a class="nav-link scrollto" href="index.html#portfolio">외환</a></li>
					<li><a class="nav-link scrollto" href="index.html#blog">금융상품</a></li>
				</ul>
				<i class="bi bi-list mobile-nav-toggle d-none"></i>
			</nav>
			<!-- .navbar -->
			
			<c:choose>
				<c:when test="${ empty User }">
					<a class="btn-getstarted scrollto" href="/user/login">로그인</a>				
				</c:when>
				<c:otherwise>
					<span>${ User.name }님 환영합니다.</span>
					<a class="btn-getstarted scrollto" href="/user/logout">로그아웃</a>
				</c:otherwise>
			</c:choose>

		</div>
	</header>
	<!-- End Header -->
</body>
</html>