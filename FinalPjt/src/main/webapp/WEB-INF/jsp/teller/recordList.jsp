<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>RecordList</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
	<link rel="stylesheet" href="https://cdn.datatables.net/t/bs-3.3.6/jqc-1.12.0,dt-1.10.11/datatables.min.css"/>
	<style type="text/css">
		@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
		td {
			max-width: 350px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		
		#recordDataList_wrapper{
			width: 1270px;
		}
		
		#recordDataList_paginate{
			margin-top: 15px;
		}
		
		.pagination>.active>a,
		.pagination>.active>a:focus,
		.pagination>.active>a:hover, 
		.pagination>.active>span, 
		.pagination>.active>span:focus, 
		.pagination>.active>span:hover {
		
			background-color: #008485;
			border-color: #008485; 
		}
		
		
		.pagination>li>a, .pagination>li>span{
			color: #008485;
		}
		
		table.dataTable thead .sorting_asc:after{
			display: none;
		}
		
		table.dataTable thead .sorting:after {
			display: none;
		}
		
		table.dataTable thead>tr>th.sorting_asc, 
		table.dataTable thead>tr>th.sorting_desc, 
		table.dataTable thead>tr>th.sorting, 
		table.dataTable thead>tr>td.sorting_asc, 
		table.dataTable thead>tr>td.sorting_desc, table.dataTable thead>tr>td.sorting {
			padding-right: 8px;
		}
		
		.dataTables_info {
			width: 150px;
		}
	</style>
</head>
<body>
	<jsp:include page="../include/topMenu_teller.jsp"></jsp:include>
	
	
	<section class="m-5 pt-2 text-center">
	
	
		<h1 style=" font-family: 'Noto Sans KR', sans-serif;">상담 기록 관리</h1>
		
		<div style="justify-content: center; margin-left: 35px">
			<table id="recordDataList" class="table table-hover fs-4">
				<thead class="table-success">
					<tr>
						<th scope="col" class="text-center">손님</th>
						<th scope="col" class="text-center">상담 분류</th>
						<th scope="col" class="text-center">제목</th>
						<th scope="col" class="text-center">내용</th>
						<th scope="col" class="text-center">텔러</th>
						<th scope="col" class="text-center">상담 일시</th>
					</tr>
				</thead>
				<tbody> 
				<%-- 
					<c:forEach items="${ recordList }" var="record">			
						<tr>
							<td style="width: 70px" class="text-center">${ record.userName }</td>
							<td style="width: 90px" class="text-center">${ record.title }</td>
							<td style="width: 300px" class="text-center">${ record.subtitle }</td>
							<td style="max-width: 20px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${ record.content }</td>
							<td style="width: 70px" class="text-center">${ record.teller }</td>
							<td style="width: 180px" class="text-center">${ record.regDate }</td>
						</tr>
					</c:forEach>
				 --%>	
				</tbody>
			</table>
		
		</div>
		
	</section>

	<%-- <jsp:include page="../include/footer.jsp"></jsp:include> --%>
	<jsp:include page="../include/script.jsp"></jsp:include>
	<script src="https://cdn.datatables.net/t/bs-3.3.6/jqc-1.12.0,dt-1.10.11/datatables.min.js"></script>

	<script type="text/javascript">
		$('#recordDataList').DataTable({
			ajax : { url: '/teller/record/json', type:"post", dataSrc:''},
			columns : [
				{data: "userName"},
				{data: "title" },
				{data: "subtitle" },
				{data: "content" },
				{data: "teller" },
				{data: "regDate" }
			],
			columnDefs : [
				  { targets: 0, width: '60px',},
				  { targets: 1, width: '100px',},
				  { targets: 2, width: '200px',},
				  { targets: 3, width: '350px', className:"nolong"},
				  { targets: 4, width: '60px',},
				  { targets: 5, width: '200px',}
			],
			language : {
				info : "현재 _START_-_END_ / 총 _TOTAL_건",
				loadingRecords: "로딩중...",
				processing : "잠시만 기다려 주세요...",
				search : "검색 : ",
				paginate : {
					"next" : "다음",
					"previous" : "이전"
				}
			},
			order:[[5,'desc']],
			lengthChange: false,
			responsive:false
		});
		
	</script>

</body>
</html>