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

					<li><a class="nav-link scrollto" href="index.html#about">��ȸ</a></li>
					<li><a class="nav-link scrollto" href="index.html#services">��ü</a></li>
					<li><a class="nav-link scrollto" href="index.html#team">������</a></li>
					<li><a class="nav-link scrollto" href="index.html#portfolio">��ȯ</a></li>
					<li><a class="nav-link scrollto" href="index.html#blog">������ǰ</a></li>
				</ul>
				<i class="bi bi-list mobile-nav-toggle d-none"></i>
			</nav>
			<!-- .navbar -->
			
			<c:choose>
				<c:when test="${ empty User }">
					<a class="btn-getstarted scrollto" href="/user/login">�α���</a>				
				</c:when>
				<c:otherwise>
					<span>${ User.name }�� ȯ���մϴ�.</span>
					<a class="btn-getstarted scrollto" href="/user/logout">�α׾ƿ�</a>
				</c:otherwise>
			</c:choose>

		</div>
	</header>
	<!-- End Header -->
</body>
</html>