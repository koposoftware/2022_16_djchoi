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
							<h3>π μλ΄μ μ΄λ μ¨λμ? π</h3>
							<p>κ³ κ°λμ νλ§λ νλ§λκ° μ ν¬ κΈμ΅μ λμμ΄ λ©λλ€. μ΄λ ν μκ²¬μ΄λ λ§μνΈν, μμ§νκ² μκΈ°ν΄μ£ΌμΈμ.</p>
							<div class="info-item d-flex text-center">
								<div>
									<h4>μ£Όμ </h4>
									<input type="text" class="form-control text-center" name="title" size="64" id="title" readonly>
								</div>
							</div>
							<!-- End Info Item -->

							<div class="info-item d-flex text-center">
								<div class="info-item d-flex text-center col-6">
									<div>
										<h4>κ³ κ°λͺ</h4>
										<input type="text" class="form-control text-center" name="userName" size="40" value="${ User.name }" readonly>
									</div>
								</div>
								<div class="info-item d-flex text-center col-6 m-0 p-0 border-0">
									<div>
										<h4>μλ΄μ¬λͺ</h4>
										<input type="text" class="form-control text-center" name="teller" id="teller" size="40" readonly>
									</div>
								</div>
							</div>
							<div class="info-item d-flex text-center">
								<div>
									<h4>μλ΄νκΈ°</h4>
									<textarea name="content" rows="8" cols="68" placeholder="μλ΄νκΈ°λ₯Ό μμ±ν΄ μ£ΌμΈμ."></textarea>
								</div>
							</div>
							<!-- End Info Item -->
							
							<div class="info-item d-flex j justify-content-end align-items-center m-0 p-0">
								<p>μλ΄μ¬λ λ§μ‘±μ€λ¬μ λμ? &nbsp;</p>
								<!-- <label><input type="checkbox" name="like" value="yes"> λ§μ‘±</label> -->
								<i class="bi-heart" style="font-size:1.5rem; color: red; cursor: pointer;"></i>
							</div>
							
						</div>
						<div class="text-center">
							<input type="submit" class="btn btn-outline-success" value="μμ±μλ£">
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