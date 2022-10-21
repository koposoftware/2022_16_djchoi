// <button class="btn p-1 ms-2 border-2" style="border-color:#249782;">내용보기</button>


function myConsultingList(){
	let userName = document.getElementById("userName").value;

	$.ajax({
		url:"/consulting/list",
		method:"get",
		data:{
			userName: userName,
		},
		success: (consultingList)=>{
			let item = `<button id="ConBtn" type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#modalCon" style="display:none;"></button>
						
						<div class="modal fade" id="modalCon" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						  <div class="modal-dialog modal-dialog-scrollable">
						    <div class="modal-content">
						      <div class="modal-header text-center">
						        <h5 class="modal-title" id="exampleModalLabel">${userName}님의 상담 일정 입니다.</h5>
						      </div>
						      <div class="modal-body">
						      
								<div class="container">
						            <div class="row">
						                <div class="col-lg-12">
						                    <nav class="pro-detail-area">
						                        <div class="nav nav-tabs border-bottom detail-title" id="nav-tab" role="tablist">
						                            <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home"
						                                role="tab" aria-controls="nav-home" aria-selected="true">지난 상담</a>
						                            <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile"
						                                role="tab" aria-controls="nav-profile" aria-selected="false">예약 일정</a>
						                        </div>
						                    </nav>
						                    <div class="tab-content py-4" id="nav-tabContent">
						                    
						                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
						                            <ul class="list-unstyled my-1">`
			
			for(let i=0; i<consultingList.length; i++){
				if(consultingList[i].reserveType == "N"){
					item += `<li class="list-inline d-flex py-3">
                                <div class="ps-4">`;
                                
					if(consultingList[i].title == "예/적금"){
						item += `<span><img src="/assets/img/saving.png" style="width:20px; height:20px"></span>`;
					}else if(consultingList[i].title == "펀드"){
						item += `<span><img src="/assets/img/fund.png" style="width:20px; height:20px"></span>`;
					}else if(consultingList[i].title == "카드"){
						item += `<span><img src="/assets/img/credit.png" style="width:20px; height:20px"></span>`;
					}else if(consultingList[i].title == "대출"){
						item += `<span><img src="/assets/img/loan.png" style="width:20px; height:20px"></span>`;
					}else if(consultingList[i].title == "보험"){
						item += `<span><img src="/assets/img/insurance.png" style="width:20px; height:20px"></span>`;
					}
					
					item += `   <span>[${consultingList[i].title}]</span>
								<span>상담</span>
                                    <span>(${consultingList[i].regDate})</span>
                                    
                                </div>
                            </li>`;
					
				}
			}
						                            
						                            
						                            
			item +=		                            `</ul>
						                        </div>
						
						                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
						                            
						                            <ul class="list-unstyled my-1">`
			
			for(let i=0; i<consultingList.length; i++){
				if(consultingList[i].reserveType == "Y"){
					item += `<li class="list-inline d-flex py-3">
                                <div class="ps-4">`;
                                
					if(consultingList[i].title == "예/적금"){
						item += `<span><img src="/assets/img/saving.png" style="width:20px; height:20px"></span>`;
					}else if(consultingList[i].title == "펀드"){
						item += `<span><img src="/assets/img/fund.png" style="width:20px; height:20px"></span>`;
					}else if(consultingList[i].title == "카드"){
						item += `<span><img src="/assets/img/credit.png" style="width:20px; height:20px"></span>`;
					}else if(consultingList[i].title == "대출"){
						item += `<span><img src="/assets/img/loan.png" style="width:20px; height:20px"></span>`;
					}else if(consultingList[i].title == "보험"){
						item += `<span><img src="/assets/img/insurance.png" style="width:20px; height:20px"></span>`;
					}
					
					item += `   <span>[${consultingList[i].title}]</span>
								<span>상담</span>
                                    <span>(${consultingList[i].regDate})</span>
                                </div>
                            </li>`;
					
				}
			}			                            
			    
			item +=		                            `</ul>
						                        </div>
						                    </div>
						                    
						                </div>
						            </div>
						            <!-- end row -->
						        </div>
						      	
						      	
						      </div>
						      <div class="modal-footer">
						        <button type="submit" class="btn border-2" style="border-color:#249782" data-bs-dismiss="modal">확인</button>
						      </div>
						      
						    </div>
						  </div>
						</div>`;
						
			document.getElementById("contact").innerHTML += item;
			document.getElementById("ConBtn").click();
		},error:(e)=>{
			alert(e);
		}
	})
	
	
}