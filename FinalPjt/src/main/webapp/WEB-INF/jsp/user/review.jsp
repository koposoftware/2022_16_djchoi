<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Review</title>
	<jsp:include page="../include/link.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="../include/topMenu.jsp"></jsp:include>
	
	<section id="contact" class="contact my-5">
		<div class="container">

			<div class="row gy-5 gx-lg-5">
				<div class="col-lg-3"></div>
				<div class="col-lg-6">

					<form action="/user/review" method="post" name="reviewVO">
						<div class="info mb-2 text-center">
							<h3>💚 상담은 어떠셨나요? 💚</h3>
							<p>고객님의 한마디 한마디가 저희 금융에 도움이 됩니다. 어떠한 의견이던 마음편히, 솔직하게 얘기해주세요.</p>
							<div class="info-item d-flex text-center">
								<div>
									<h4>주제</h4>
									<input type="text" class="form-control text-center" name="title" size="64" id="title" readonly>
								</div>
							</div>
							<!-- End Info Item -->

							<div class="info-item d-flex text-center">
								<div class="info-item d-flex text-center col-6">
									<div>
										<h4>고객명</h4>
										<input type="text" class="form-control text-center" name="userName" size="40" value="${ User.name }" readonly>
									</div>
								</div>
								<div class="info-item d-flex text-center col-6 m-0 p-0 border-0">
									<div>
										<h4>상담사명</h4>
										<input type="text" class="form-control text-center" name="teller" id="teller" size="40" readonly>
									</div>
								</div>
							</div>
							<div class="info-item d-flex text-center">
								<div>
									<h4>상담후기</h4>
									<textarea name="content" rows="8" cols="68" placeholder="상담후기를 작성해 주세요."></textarea>
								</div>
							</div>
							<!-- End Info Item -->
							
							<div class="info-item d-flex j justify-content-end align-items-center m-0 p-0">
								<p>상담사는 만족스러웠나요? &nbsp;</p>
								<!-- <label><input type="checkbox" name="like" value="yes"> 만족</label> -->
								<i class="bi-heart" style="font-size:1.5rem; color: red; cursor: pointer;"></i>
							</div>
							
						</div>
						<div class="text-center">
							<input type="submit" class="btn btn-outline-success" value="작성완료">
						</div>
					</form>
				</div>
				<div class="col-lg-3"></div>
			</div>

		</div>
	</section>
	

	<jsp:include page="../include/footer.jsp"></jsp:include>
	<jsp:include page="../include/script.jsp"></jsp:include>
	<script>
        let i = 0;
        $('i').on('click',function(){
            if(i==0){
                $(this).attr('class','bi-heart-fill');
                i++;
            }else if(i==1){
                $(this).attr('class','bi-heart');
                i--;
            }
        });
        
        const tellerName = sessionStorage.getItem("tellerName");
        const tellerDept = sessionStorage.getItem("tellerDept");
        
        document.addEventListener("DOMContentLoaded", ()=>{
        	document.getElementById("title").value = tellerDept;
        	document.getElementById("teller").value = tellerName;
        });
    </script>
</body>
</html>