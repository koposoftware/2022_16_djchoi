
// 시그널링 서버에 연결하기 위한 WebSocket연결 생성
let conn = new WebSocket('wss://192.168.217.241:9600/chat');
// let conn = new WebSocket('wss://localhost:9600/chat');
// let conn = new WebSocket('wss://192.168.217.252:9600/chat');


const userName = document.getElementById("userName").value;
const userId = document.getElementById("userId").value;
const userTel = document.getElementById("userTel").value;
const userMail = document.getElementById("userMail").value;
const userIdNum = document.getElementById("userIdNum").value;
const roomId = document.getElementById("roomId").value;

const Call = document.getElementById("call");
const myFace = document.getElementById("myFace");
const peerFace = document.getElementById("peerFace");

const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const accountBtn = document.getElementById("account");
const fundTable = document.getElementById("fundTable");


let mdata = {};//전송 데이터(JSON)

let mid = document.getElementById('mid');
let talk = document.getElementById('talk');
let mesg = document.getElementById('msg');
const btnSend = document.getElementById('btnSend');


let myStream;
let peerStream;
let stream;

let muted = false;
let cameraOff = false;
var peerConnection;

conn.onmessage = function(msg) {
    console.log("Got message", msg.data);
    let content = JSON.parse(msg.data);
    let css;
    let data = content.data;
    
    if(content.type == "video"){	
	    switch (content.event) {
	    // when somebody wants to call us
	    case "offer":
	    	sessionStorage.setItem("tellerName", content.tellerName);
	    	sessionStorage.setItem("tellerDept", content.tellerDept);
	        handleOffer(data);
	        break;
	    case "answer":
	        handleAnswer(data);
	        gosend();
	        break;
	    // when a remote peer sends an ice candidate to us
	    case "candidate":
	        handleCandidate(data);
	        break;
	    default:
	        break;
	    }
	}else if(content.type == "chat"){
		console.log(content.mid);
    	console.log(mid.value);
    	if(content.mid == mid.value){
			css = 'class=me';
		}else{
			css = 'class=other';
		}
		
		let item = `<div ${css} >
		                <span><b>${content.mid}</b></span> [ ${content.date} ]<br/>
                      <span>${content.msg}</span>
						</div>`;
					
		talk.innerHTML += item;
		talk.scrollTop=talk.scrollHeight;	//스크롤바 하단으로 이동
		
		// 상담 내용 DB에 입력
		$.ajax({
			url:"/consulting/content",
			method:"post",
			data:{
				roomId : roomId,
				userName: userName,
				tellerName: sessionStorage.getItem("tellerName"),
				msg : content.msg,
				regDate : content.date,
				speaker: content.mid
			}
		})
		
	}else if(content.type == "tel"){
		let item = `<button id="telBtn" type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#modalTel" style="display:none;"></button>
					<div class="modal fade" id="modalTel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="exampleModalLabel">문자 본인인증 화면입니다.</h5>
					      </div>
					      <div class="modal-body">
					      	<span>인증번호 : <input type="text" id="ranNum"></span>
					      	<input type="hidden" value="${content.num}" id="num">
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
					        <button type="button" id="codeConfirm" onclick="sendTelCode()" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
					      </div>
					    </div>
					  </div>
					</div>`;
		Call.innerHTML += item;
		
		document.getElementById("telBtn").click();
	}else if(content.type == "email"){ 
		let item = `<button id="emailBtn" type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#modalEmail" style="display:none;"></button>
					<div class="modal fade" id="modalEmail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="exampleModalLabel">이메일 본인인증 화면입니다.</h5>
					      </div>
					      <div class="modal-body">
					      	<span>인증번호 : <input type="text" id="randomCode"></span>
					      	<input type="hidden" value="${content.code}" id="code">
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
					        <button type="button" id="codeConfirm" onclick="sendEmailCode()" class="btn btn-primary" data-bs-toggle="modal" data-bs-dismiss="modal">확인</button>
					      </div>
					    </div>
					  </div>
					</div>`;
		
		Call.innerHTML += item;
		
		document.getElementById("emailBtn").click();
	}else if(content.type == "invest"){
		// 투자 성향 설문 모달창 띄우기
		let item = `<button id="investBtn" type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#modalInvest" style="display:none;"></button>
					<div class="modal fade" id="modalInvest" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog modal-lg modal-dialog-scrollable">
					    <div class="modal-content">
					      <div class="modal-header text-center">
					        <h5 class="modal-title" id="exampleModalLabel">나의 투자성향 알아보기</h5>
					      </div>
					      <div class="modal-body">
					      	<table class="table table-hover">
					      		<thead class="table-secondary fs-7">
					      			<tr>
					      				<th scope="col">투자성향분석(총 8문항, 전 항목 필수 응답)</th>
					      			</tr>
					      		</thead>
					      		<tbody>
					      			<tr>
					      				<td class="fs-6">다음 질문사항은 고객님의 투자성향을 분석하기 위한 자료로 활용될 예정이며, 투자성향분석은 고객님의 투자성향에 적합한 상품선택에 도움을 드리기 위해 활용됩니다.</td>
					      			</tr>
					      		</tbody>
					      	</table>
					      	<div class="text-danger mb-4">성향 분석한 결과에 적합한 상품만 가입가능합니다</div>
					      	<div class="mb-2 fw-bolder">◎ 아래 3문항은 자본시장법에 따라 투자할 때마다 확인합니다.</div>
					      	<div class="my-1 fw-bolder">1. 금융투자상품의 취득 및 처분목적은 무엇입니까?</div>
						      	<label class="mx-1 ms-3"><input type="radio" name="one" value="12"> 생활자금</label>
						      	<label class="mx-1"><input type="radio" name="one" value="15"> 주택자금</label>
						      	<label class="mx-1"><input type="radio" name="one" value="3"> 노후자금</label>
						      	<label class="mx-1"><input type="radio" name="one" value="11"> 여유자금</label>
					      	<div class="my-1 fw-bolder">2. 현재 투자하는 자금에 대하여 기대수익 및 손실위험에 대한 태도는 무엇입니까?</div>
						      	<label class="ms-3"><input type="radio" name="two" value="14"> 기대수익이 높다면 위험이 높아도 상관없음</label><br>
						      	<label class="ms-3"><input type="radio" name="two" value="12"> 투자원금에서 20% ~ 100% 손실을 감내할 수 있음</label>
						      	<label class="ms-3"><input type="radio" name="two" value="8"> 투자원금에서 20%미만까지는 손실을 감내할 수 있음</label>
						      	<label class="ms-3"><input type="radio" name="two" value="4"> 투자원금에서 10%미만까지는 손실을 감내할 수 있음</label>
						      	<label class="ms-3"><input type="radio" name="two" value="1"> 무슨 일이 있어도 투자 원금은 보전되어야 함</label>
							<div class="my-1 fw-bolder">3. 현재 투자하는 자금의 투자 예정기간은 얼마나 되십니까?</div>
						      	<label class="ms-3"><input type="radio" name="three" value="10"> 3년 이상</label>
						      	<label class="ms-3"><input type="radio" name="three" value="8"> 2년 이상 ~ 3년 미만</label>
						      	<label class="ms-3"><input type="radio" name="three" value="9"> 1년 이상 ~ 2년 미만</label>
						      	<label class="ms-3"><input type="radio" name="three" value="8"> 6개월 이상 ~ 1년 미만</label>
						      	<label class="ms-3"><input type="radio" name="three" value="8"> 6개월 미만</label>
						      	<label class="ms-3"><input type="radio" name="three" value="14"> 투자상품 만기일까지 보유</label>
					      	<div class="mb-2 mt-4 fw-bolder">◎ 다음 5문항은 일반적인 투자성향 확인을 위한 설문입니다.</div>
					      	<div class="my-1 fw-bolder">4. 총자산대비 투자상품의 비중은 얼마나 되십니까?</div>
						      	<label class="mx-1 ms-3"><input type="radio" name="four" value="3"> 5% 이하</label>
						      	<label class="mx-1"><input type="radio" name="four" value="8"> 10% 이하</label>
						      	<label class="mx-1"><input type="radio" name="four" value="10"> 15% 이하</label>
						      	<label class="mx-1"><input type="radio" name="four" value="12"> 20% 이하</label>
						      	<label class="mx-1 ms-3"><input type="radio" name="four" value="15"> 20% 초과</label>
						  	<div class="my-1 fw-bolder">5. 고객님의 수입원을 가장 잘 나타내는 것은 어느 것입니까?</div>
						      	<label class="ms-3"><input type="radio" name="five" value="14"> 현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상</label>
						      	<label class="ms-3"><input type="radio" name="five" value="7"> 현재 일정한 수입이 발생하고 있으며, 향후 감소하거나 불안정할 것으로 예상</label>
						      	<label class="ms-3"><input type="radio" name="five" value="9"> 현재 일정한 수입이 없거나, 연금 등이 주 수입원임</label>
						  	<div class="my-1 fw-bolder">6. 고객님의 투자경험과 가장 가까운 것은 어느 것입니까?</div>
						  		<label class="ms-3"><input type="radio" name="six" value="5"> 은행 예적금, 국채, 지방채, 보증채, MMF, CMA 등</label>
						      	<label class="ms-3"><input type="radio" name="six" value="8"> 채권형펀드, 원금보장형 ELS, 금융채, 신용도가 높은 회사채</label>
						      	<label class="ms-3"><input type="radio" name="six" value="10"> 혼합형펀드, 원금의 일부만 보장되는 ELS, 신용도 중간 등급의 회사채 등</label>
						      	<label class="ms-3"><input type="radio" name="six" value="13"> 시장수익률 수준의 주식형펀드, 원금이 보장되지 않는 ELS, 신용도가 낮은 회사채, 주식 등</label>
						      	<label class="ms-3"><input type="radio" name="six" value="15"> 시장수익률 이상의 주식형펀드, 파생상품펀드, ELW, 선물옵션, 신용거래 등</label>
					      	<div class="my-1 fw-bolder">7. 금융상품 투자에 대한 본인의 지식 수준은 어느 정도 입니까?</div>
						  		<label class="ms-3"><input type="radio" name="seven" value="14"> 파생상품을 포함한 대부분의 금융투자상품의 구조 및 위험을 이해하고 있음</label>
						      	<label class="ms-3"><input type="radio" name="seven" value="11"> 널리 알려진 금융투자상품의 구조 및 위험을 깊게 이해하고 있음</label>
						      	<label class="ms-3"><input type="radio" name="seven" value="8"> 널리 알려진 금융투자상품의 구조 및 위험을 일정 부분 이해하고 있음</label>
						      	<label class="ms-3"><input type="radio" name="seven" value="5"> 금융상품 중 예적금에 대해서만 이해하고 있음</label>
						    <div class="my-1 fw-bolder">8. 파생상품, 파생결합증권 또는 파생투자상품에 투자한 경험이 있습니까?</div>
						      	<label class="mx-1"><input type="radio" name="eight" value="10"> 투자경험 있음</label>
						      	<label class="mx-1"><input type="radio" name="eight" value="3"> 투자경험 없음</label>
					      </div>
					      <div class="modal-footer">
					        <button type="submit" class="btn btn-primary" onclick="investScore()" data-bs-dismiss="modal">확인</button>
					      </div>
					      
					    </div>
					  </div>
					</div>`;
		Call.innerHTML += item;
		
		document.getElementById("investBtn").click();
		
	}else if(content.type == "fundJoin"){
		let item = `<button id="fundJoin" type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#modalFund" style="display:none;"></button>
					<div class="modal fade" id="modalFund" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="exampleModalLabel">펀드 가입 확인</h5>
					      </div>
					      <div class="modal-body">
					      	<table>
					      		<tr class="border-top">
					      			<th>계좌번호 </th>
					      			<th> : ${content.fundAccount}</th>
					      		</tr>
					      		<tr class="border-top">
					      			<th>상품명 </th>
					      			<th> : ${content.fundName}</th>
					      		</tr>
					      		<tr class="border-top">
					      			<th>가입금액 </th>
					      			<th> : ${content.valuationAmount}</th>
					      		</tr>
					      		<tr class="border-top">
					      			<th>저축유형 </th>
					      			<th> : ${content.saveType}</th>
					      		</tr>
					      		<tr class="border-top">
					      			<th>가입기간 </th>
					      			<th> : ${content.term}</th>
					      		</tr>
					      		<tr class="border-top">
					      			<th>자동환매 </th>
					      			<th> : ${content.autoRedemption}</th>
					      		</tr>
					      		<tr class="border-top">
					      			<th>연동계좌 </th>
					      			<th> : ${content.linkAccount}</th>
					      		</tr>
					      
					      	</table>
					      	<div class="mt-3 border-top border-botton">상품정보를 확인하신 후 확인 버튼을 눌러 주세요</div>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
					        <button type="button" id="codeConfirm" onclick="checkPassword()" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
					      </div>
					    </div>
					  </div>
					</div>`;
		Call.innerHTML += item;
		
		document.getElementById("fundJoin").click();
	}else if(content.type == "joinAgree"){
		let item = `<button id="agree" type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#modalAgree" style="display:none;"></button>
					<div class="modal fade" id="modalAgree" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="exampleModalLabel">상품가입 약관</h5>
					      </div>
					      <div class="modal-body">
					      	<form action="" id="joinForm">
					            <ul class="join_box">
					                <li class="checkBox check02">
					                    <ul class="clearfix">
					                        <li>○ 이용약관 동의(필수)</li>
					                        <li class="checkBtn">
					                            <input type="checkbox" name="chk"> 
					                        </li>
					                    </ul>
					                    <textarea name="" id="">여러분을 환영합니다.
하나은행 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 하나은행 서비스의 이용과 관련하여 하나은행 서비스를 제공하는 네이버 주식회사(이하 ‘하나은행’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
하나은행 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 하나은행 서비스의 이용과 관련하여 하나은행 서비스를 제공하는 네이버 주식회사(이하 ‘하나은행’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
하나은행 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 하나은행 서비스의 이용과 관련하여 하나은행 서비스를 제공하는 네이버 주식회사(이하 ‘하나은행’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
								       </textarea>
					                </li>
					                <li class="checkBox check03">
					                    <ul class="clearfix">
					                        <li>○ 개인정보 수집 및 이용에 대한 안내(필수)</li>
					                        <li class="checkBtn">
					                            <input type="checkbox" name="chk">
					                        </li>
					                    </ul>
					 
					                    <textarea name="" id="">고객님의 상담업무를 처리하기 위해서는 개인정보보호법 제15조 1항 및 제24조 1항에 따라 아래의 내용에 대하여 고객님의 동의가 필요합니다.

- 1. 개인정보의 수집,이용목적**서비스 이용에 따른 상담업무 처리를 위한 본인식별, 본인의사확인 및 상담결과 통보
- 2. 수집하는 개인정보의 항목**성명, 생년월일, 채팅내용
- 3. 개인정보의 보유 및 이용 기간**위 개인정보는 수집·이용에 관한 동의 이후 처리 종료일로부터 5년간 위 이용목적을 위하여 보유·이용됩니다.단,(금융)거래 종료일 후에는 금융사고 조사, 분쟁 해결, 민원처리, 법령상 의무이행 및 당행의 리스크 관리업무만을 위하여 보유·이용됩니다.
- 4. 고객님은 개인정보 수집 및 이용을 거부할 권리가 있으며 권리행사 시 상담이 거부될 수 있습니다.**
- 은행은 [채팅] 상담시 손님의 개인정보(주민등록번호, 계좌번호, 비밀번호 등)를 요구하지 않으며, 개인정보 입력으로 인한 어떠한 사고도 책임지지 않으니 개인정보 관리에 유의하시기 바랍니다.
- 본인확인이 필요한 상담과 법인손님은 일부 상담이 제한될 수 있으니, 신속한 상담을 원하실 때는 전화상담(1599-1111)을 이용해 주시기 바랍니다.
					       </textarea>
					                </li>
					                <li class="checkBox check03">
					                    <ul class="clearfix">
					                        <li>○ 위치정보 이용약관 동의(선택)</li>
					                        <li class="checkBtn">
					                            <input type="checkbox" name="chk">
					                        </li>
					                    </ul>
					 
					                    <textarea name="" id="">여러분을 환영합니다.
하나은행 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 하나은행 서비스의 이용과 관련하여 하나은행 서비스를 제공하는 네이버 주식회사(이하 ‘하나은행’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
하나은행 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 하나은행 서비스의 이용과 관련하여 하나은행 서비스를 제공하는 네이버 주식회사(이하 ‘하나은행’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
하나은행 서비스 및 제품(이하 ‘하나은행’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 하나은행 서비스의 이용과 관련하여 하나은행 서비스를 제공하는 네이버 주식회사(이하 ‘하나은행’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 하나은행 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
					       </textarea>
					                </li>
					                <li class="checkBox check04">
					                    <ul class="clearfix">
					                        <li>○ 이벤트 등 프로모션 알림 메일 수신(선택)</li>
					                        <li class="checkBtn">
					                            <input type="checkbox" name="chk">
					                        </li>
					                    </ul>
					 
					                </li>
					            </ul>
					            
					        </form>

					      </div>
					      <div class="modal-footer">
					        <button type="button" id="agreeConfirm" onclick="agreeFunction();" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
					      </div>
					    </div>
					  </div>
					</div>`;
		Call.innerHTML += item;
		
		document.getElementById("agree").click();
	}
};


mesg.onkeyup = function(ev){
	if(ev.keyCode == 13){
		msend();
	}
}

btnSend.onclick = function(){
	msend();
}
// 채팅 관련 메세지 보내기
function msend(){
	if(mesg.value.trim() != ''){
		mdata.type = "chat";
		mdata.mid = document.getElementById('mid').value;
		mdata.msg = mesg.value;
		mdata.date = new Date().toLocaleString();
		let temp = JSON.stringify(mdata);
		conn.send(temp);
	}
	mesg.value ='';
}


// 연결 완료
conn.onopen = function(){
	console.log("Connected to the signaling server");
	initialize();
	getMyStream();
};

// 비디오 관련 메세지를 전달하는데 사용할 send 메서드
function vsend(message){
	conn.send(JSON.stringify(message));
};



function initialize(){
	// stun 서버를 통해 자신의 ip 주소 반환
	let configuration = {
	    "iceServers" : [ {
	        "url" : "stun:stun1.1.google.com:19302"
	    } ]
	};
	
	// RTCPeerConnection객체 생성
	peerConnection = new RTCPeerConnection(configuration, {optional: [{RtpDataChannels: true}]});
	
	peerConnection.onnegotiationneeded = async () => {
        console.log('onnegotiationneeded');
        createOffer();
       
    };
	
	// Setup ice handling (2)
    peerConnection.onicecandidate = function(event) {
        if (event.candidate) {
            vsend({
				type : "video",
                event : "candidate",
                data : event.candidate
            });
        }
    };
    
    // 상대 영상 추가
    peerConnection.addEventListener('track', displayPeerStream);
	
};

async function addLocalStreamToPeerConnection(myStream) {
    console.log('Starting addLocalStreamToPeerConnection');
    await myStream.getTracks().forEach(track => peerConnection.addTrack(track, myStream));
    console.log('localStream tracks added');
};


function displayPeerStream(e) {
    console.log('displayRemoteStream');
    if (peerFace.srcObject !== e.streams[0]) {
        peerFace.srcObject = e.streams[0];
        console.log('pc2 received remote stream');
        // startClock();  // 스톱워치 시작
    }
};


// 오퍼를 생성하고 LocalDescription으로 설정(1)
function createOffer(){
	peerConnection.createOffer(function(offer) {
	    vsend({
			type : "video",
	        event : "offer",
	        data : offer
	    });
	    peerConnection.setLocalDescription(offer);
	}, function(error) {
	    alert("Error creating an offer");
	});
};


// 다른 피어가 오퍼를 수신 후 RemoteDescription으로 설정, 그리고 응답을 생성해서 시작 피어로 전송(4)
async function handleOffer(offer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // create and send an answer to an offer
    peerConnection.createAnswer(function(answer) {
        peerConnection.setLocalDescription(answer);
        vsend({
			type : "video",
            event : "answer",
            roomId : roomId,
            userName : userName,
            userId : userId,
            userTel : userTel,
            userMail : userMail,
            userIdNum : userIdNum,
            data : answer
        });
    }, function(error) {
        alert("Error creating an answer");
    });

};

// 다른 피어가 보낸 ICE후보 처리(3) => 원격 피어는 후보를 추가
function handleCandidate(candidate) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
};


// 시작 피어는 응답을 받고 RemoteDescription으로 설정(5), 이제 시그널링 서버 없이 두 피어간 데이터 주고받을 수 있다.
async function handleAnswer(answer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log("connection established successfully!!");
};


async function getMyStream(deviceId){
	const initialConstrains = {
	  audio: true,
	  video: { facingMode: "user" }
	};
	const cameraConstraints = {
	  audio: true,
	  video: { deviceId: { exact: deviceId } },
	};
	try {
		await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstraints : initialConstrains)
		.then(gotStream)
		
		if(!deviceId){
	      await getCarmeras();
	    }    
	} catch (e) {
	  console.log(e);
	}
}

function gotStream(stream) {
	myFace.srcObject = stream;
	console.log('Adding local stream.');
	myStream = stream;
	addLocalStreamToPeerConnection(myStream);
}


async function getCarmeras(){
  try{
    const devices  = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter( (device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach( (camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if(currentCamera.label === camera.label) {
        option.selected = true;
      }
      // camerasSelect.appendChild(option);
    })
  } catch (e) {
    console.log(e);
  }
}



// 오디오 켜고 끄기
function handleMuteClick(){
  myStream
    .getAudioTracks()
    .forEach( (track) => (track.enabled = !track.enabled));
  if(!muted){
    muteBtn.innerHTML = '<i class="fa-solid fa-microphone-slash" style="color: #cecece;"></i>';
    muteBtn.style.backgroundColor = "white";
    muted = true;
  } else{
    muteBtn.innerHTML = '<i class="fa-solid fa-microphone" style="color: white;"></i>';
    muteBtn.style.backgroundColor = "#249782";
    muted = false;
  }
}

// 카메라 켜고 끄기
function handleCameraClick(){
  myStream
    .getVideoTracks()
    .forEach( (track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerHTML = '<i class="fa-solid fa-video" style="color: white;"></i>';
    cameraBtn.style.backgroundColor = "#249782";
    cameraOff = false;
  } else{
    cameraBtn.innerHTML = '<i class="fa-solid fa-video-slash" style="color: #cecece;"></i>';
    cameraBtn.style.backgroundColor = "white";
    cameraOff = true;
  }
}


function showMyAccount(){
	if(accountBtn.style.backgroundColor == 'white'){
		accountBtn.innerHTML = '<i class="fa-solid fa-wallet" style="color: white;"></i>';
    	accountBtn.style.backgroundColor = "#249782";
    	// fundTable.style.visibility = "visible ";
    	fundTable.style.display = "block ";
    	$.ajax({
			url:"/user/account",	
			method: "get",
			success: (accountList)=>{
				console.log(accountList);
				getMyAccount();
				for(i = 0; i < accountList.length; i++){
					getMyAccountInfo(accountList[i]);
				}
			},error:()=>{
				alert("fail");
			}
		});
		
	}else{
		accountBtn.innerHTML = '<i class="fa-solid fa-wallet" style="color: #cecece;"></i>';
    	accountBtn.style.backgroundColor = "white";
    	// fundTable.style.visibility = "hidden";
    	fundTable.style.display = "none";
	}
}


muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);


function getMyAccount(){
	$('#fundTable').empty();
	
	let item = `<h3 class="ms-2" style="font-family: tellerfont">나의 계좌</h3>
				<table id="myAccount" class="table my-3 pe-5 text-center" style="font-family: tellerfont">
					<thead style="background-color: #F0F2F6">
						<tr>
							<th scope="col">계좌번호</th>
							<th scope="col">계좌유형</th>
							<th scope="col">상품명</th>
							<th scope="col">잔액(투자액)</th>
							<th scope="col">가입일</th>
						</tr>
					</thead>
					<tbody id="getTbody">
					</tbody>
				</table>`
	fundTable.innerHTML += item;
}

function getMyAccountInfo(account){
	const tbody = document.getElementById("getTbody");
	let items = `<tr style="font-family: tellerfont">
					<td>${account.accountNo}</td>
					<td>${account.type}</td>
					<td>${account.name}</td>
					<td>${account.money}</td>
					<td>${account.regDate}</td>
				</tr>`
	tbody.innerHTML += items;
}

function checkPassword(){
	let item = `<button id="passBtn" type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#modalPass" style="display:none;"></button>
					<div class="modal fade" id="modalPass" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="exampleModalLabel">계좌 비밀번호를 입력해주세요</h5>
					      </div>
					      <div class="modal-body">
					      	<span>비밀번호 : <input type="password" id="password"></span>
					      </div>
					      <div class="modal-footer">
					        <button type="button" id="codeConfirm" onclick="fsend()" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
					      </div>
					    </div>
					  </div>
					</div>`;
	Call.innerHTML += item;
	
	document.getElementById("passBtn").click();
}

// 문자인증
function sendTelCode(){
	let inputNum = document.getElementById('ranNum').value;
	let num = document.getElementById('num').value;
	
	if(inputNum == num){
		Swal.fire({
		  title: "인증이 완료되었습니다.",
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:
		    '확인',
		}).then((result)=>{
			if (result.isConfirmed){
				tsend();
				location.reload();				
			}
		})
	}else{
		Swal.fire({
		  title: "인증번호가 일치하지 않습니다.",
		  html: '다시 입력해주세요',
		  icon: "error",
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:
		    '확인',
		})
	}
	
};


// 이메일 인증
function sendEmailCode(){
	let inputCode = document.getElementById('randomCode').value;
	let code = document.getElementById('code').value;
	
	if(inputCode == code){
		Swal.fire({
		  title: "인증이 완료되었습니다.",
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:
		    '확인',
		}).then((result)=>{
			if (result.isConfirmed){
				esend();
				location.reload();
			}
		})
	}else{
		Swal.fire({
		  title: "인증번호가 일치하지 않습니다.",
		  html: '다시 입력해주세요',
		  icon: "error",
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:
		    '확인',
		})
	}
};

function agreeFunction(){
	Swal.fire({
	  title: "약관 동의가 완료되었습니다.",
	  icon: "success",
	  showCloseButton: true,
	  focusConfirm: false,
	  confirmButtonText: '확인',
	}).then((result)=>{
		if (result.isConfirmed) {
			agsend();
			location.reload();		
	  	}
	})
}

function agsend(){
	let agdata = {
		type: "agree"
	};
	conn.send(JSON.stringify(agdata));
}

// 문자인증 관련
function tsend(){
	let tdata = {
		type: "tel",
		msg: "sendTel"
	};
	conn.send(JSON.stringify(tdata));
};


function gosend(){
	let godata = {
		type: "entrance",
		msg:"go"
	};
	conn.send(JSON.stringify(godata));
}

// 이메일 관련
function esend(){
	let edata = {
		type: "email",
		msg: "sendEmail"
	};
	conn.send(JSON.stringify(edata));
};

// 펀드 가입 확인
function fsend(){
	let fdata = {
		type : "fundJoin",
		msg: "sendFundJoin"
	}
	conn.send(JSON.stringify(fdata));

	Swal.fire({
	  title: "가입이 완료되었습니다.",
	  icon: "success",
	  showCloseButton: true,
	  focusConfirm: false,
	  confirmButtonText:
	    '확인',
	}).then((result)=>{
		if (result.isConfirmed){
			location.reload();			
		}
	})
	
}

// 투자성향 확인
function isend(total, ivtype){
	let idata = {
		type : "investResult",
		total : total,
		ivtype : ivtype
	}
	conn.send(JSON.stringify(idata));
}


// 투자성향 설문 결과
function investScore(){
	let one = $('input[name=one]:checked').val();
	let two = $('input[name=two]:checked').val();
	let three = $('input[name=three]:checked').val();
	let four = $('input[name=four]:checked').val();
	let five = $('input[name=five]:checked').val();
	let six = $('input[name=six]:checked').val();
	let seven = $('input[name=seven]:checked').val();
	let eight = $('input[name=eight]:checked').val();
	$.ajax({
		url: "/user/invest",
		method: "post",
		data:{
			one : one,
			two : two,
			three : three,
			four : four,
			five : five,
			six : six,
			seven : seven,
			eight: eight
		}, success: (result)=>{
			showInvestResult(result);
			isend(result.total, result.investType);
		}, error:(e)=>{
			alert("에러" + e);
		}
	})
	
}


function showInvestResult(result){
	//alert(result.total+ result.investType);
	
	$.ajax({
		url:"/fundInfo",
		method:"get",
		success:(recommendFundList)=>{
			let item = `<button id="investResultBtn" type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#investResult" style="display:none;"></button>
						<div class="modal fade" id="investResult" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
						  <div class="modal-dialog modal-lg modal-dialog-scrollable">
						    <div class="modal-content">
						      <div class="modal-header text-center">
						        <h4 class="modal-title" id="exampleModalLabel2">나의 투자성향 알아보기</h4>
						      </div>
						      <div class="modal-body">
						      	<h5 class="fw-bolder"><i class="fa-sharp fa-solid fa-circle-dot" style="color:#249782;"></i> 고객 투자성향분석 결과</h5>
						      	<table class="table table-bordered">
						      		<tr>
						      			<th class="fw-bolder" style="width:30%; background-color:#F2F6F7">투자성향분석 총점</th>
						      			<th style="width:20%">${result.total}</th>
						      			<th class="fw-bolder" style="width:30%; background-color:#F2F6F7">고객 투자성향등급</th>
						      			<th style="width:20%">${result.investType}</th>
						      		</tr>
						      	</table>
						      	<button id="showInv" onclick="showInvestSimul()">나의 투자성향 상세내역</button>
						      	<div class="mt-3" id="investSimul" style="display:none;">
						      		<div class="border border-1">`;
			if( `${result.investType}` == '공격투자형'){
				item += `<img src="/assets/img/공격투자형.png" style="width:100%">`
			}else if(`${result.investType}` == '적극투자형'){
				item += `<img src="/assets/img/적극투자형.png" style="width:100%">`
			}else if(`${result.investType}` == '위험중립형'){
				item += `<img src="/assets/img/위험중립형.png" style="width:100%">`
			}else if(`${result.investType}` == '안전추구형'){
				item += `<img src="/assets/img/안전추구형.png" style="width:100%">`
			}
			
			item += `</div>
								</div>
								<div class="mt-5">
									<h5 class="fw-bolder"><i class="fa-sharp fa-solid fa-circle-dot" style="color:#249782;"></i> 같은 성향의 사람들이 가입한 펀드</h5>
									<button id="popularBtn" onclick="showPopular()">최근 인기있는</button>
									<button id="volatilityBtn" onclick="showVolatility()">가격 움직임이 큰</button>
									
									<figure id="popularfi" class="highcharts-figure" style="display:none;">
									    <div id="popular"></div>
									</figure>
									
									<figure id="volatilityfi" class="highcharts-figure" style="display:none;">
									    <div id="volatility"></div>
									</figure>
									
								</div>
								<div class="mt-5">
									<h5 class="fw-bolder"><i class="fa-sharp fa-solid fa-circle-dot" style="color:#249782;"></i> 추천 펀드 List</h5>
									<table class="table border-top">
										<thead class="text-center" style="background-color:#F2F6F7"">								
								      		<tr>
								      			<th class="fw-bolder p-3 border-end" style="width:77%;">상품명</th>
								      			<th class="fw-bolder p-3" style="width:23%;">최근3개월 수익률</th>
								      		</tr>
										</thead>
										<tbody>`;
				for(let i = 0; i <recommendFundList.length; i++){
					item += `<tr>
								<td class="px-3 py-4 border-end">
									<div>`
					if(recommendFundList[i].risk == '매우높은위험'){
						item += `<button style="border-radius:0 !important; font-size:14px; background-color: #FF2D00; color:white">${recommendFundList[i].risk}</button>`;
					}else if(recommendFundList[i].risk == '높은위험'){
						item += `<button style="border-radius:0 !important; font-size:14px; background-color: #F26100; color:white">${recommendFundList[i].risk}</button>`;
					}else if(recommendFundList[i].risk == '다소높은위험'){
						item += `<button style="border-radius:0 !important; font-size:14px; background-color: #D58001; color:white">${recommendFundList[i].risk}</button>`;
					}else if(recommendFundList[i].risk == '보통위험'){
						item += `<button style="border-radius:0 !important; font-size:14px; background-color: #BC9922; color:white">${recommendFundList[i].risk}</button>`;
					}else if(recommendFundList[i].risk == '낮은위험'){
						item += `<button style="border-radius:0 !important; font-size:14px; background-color: #73A200; color:white">${recommendFundList[i].risk}</button>`;
					}else if(recommendFundList[i].risk == '매우낮은위험'){
						item += `<button style="border-radius:0 !important; font-size:14px; background-color: #21862A; color:white">${recommendFundList[i].risk}</button>`;
					}
					
					item += `			<button class="ms-2" style="border-radius:0 !important; border-color: #2e5293; font-size:14px">${recommendFundList[i].type}</button>
									</div>
									<div class="mt-3 fw-bolder">${recommendFundList[i].name}</div>
								</td>
								<td class="d-flex justify-content-center align-items-center fw-bolder" style="line-height:6; color: #ef5353;">${recommendFundList[i].yield}%</td>
							</tr>`;
				}  				
				
				item += `</tbody>
							      	</table>
									<img src="/assets/img/fundList1.png" style="width:100%; display:none;">
									<img src="/assets/img/fundList2.png" style="width:100%; display:none;">
								</div>
								<div>과거 수익률은 미래 수익률을 보장하지 않습니다.</div>
						      </div>
						      <div class="modal-footer">
						        <button type="submit" class="btn btn-primary" onclick="location.reload();" data-bs-dismiss="modal">확인</button>
						      </div>
						    </div>
						  </div>
						</div>`;
			Call.innerHTML += item;
			
			document.getElementById("investResultBtn").click();
			
			
			$.ajax({
				url : "/fund/highChart",
				method: "get",
				success:(data)=>{		
					highChart(data);
				}
			})
		},error:(e)=>{
			alert("fail");
		}
	})
	 
	
}


// 자신의 투자성향 보기
function showInvestSimul(){
	const iv = document.getElementById("investSimul");
	if(iv.style.display == "none"){
		iv.style.display = "block";		
	}else{
		iv.style.display = "none";
	}
}

// 최근 인기있는 펀드 그래프
function showPopular(){
	const pf = document.getElementById("popularfi");
	if(pf.style.display == "none"){
		pf.style.display = "block";		
	}else{
		pf.style.display = "none";
	}
}

// 변동성이 큰 펀드 그래프
function showVolatility(){
	const vf = document.getElementById("volatilityfi");
	if(vf.style.display == "none"){
		vf.style.display = "block";		
	}else{
		vf.style.display = "none";
	}
}


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

function moveReview() {

		swalWithBootstrapButtons.fire({
		  title: '상담을 종료하시겠습니까?',
		  // text: "You won't be able to revert this!",
		  icon: 'question',
		  showCancelButton: true,
		  confirmButtonText: '네, 나가기',
		  cancelButtonText: '아니오',
		  reverseButtons: true
		}).then((result) => {
		  if (result.isConfirmed) {
			  location.href = "/user/review/"+roomId;
		  }
		})
};



$(function(){
	console.log(roomId);
	$.ajax({
		url:"/getConsulting/content/user",
		method:"get",
		data: {
			roomId : roomId,
			userName: sessionStorage.getItem("userName"),
			tellerName: sessionStorage.getItem("tellerName")
		},success:(contentList)=>{
			console.log(contentList);
			// 채팅 내용 가져오기
			for(let i=0; i< contentList.length; i++){
				if(contentList[i].speaker == mid.value){
					css = 'class=me';
				}else{
					css = 'class=other';			
				}
				
				let item = `<div ${css} >
				                <span><b>${contentList[i].speaker}</b></span> [${contentList[i].regDate}]<br/>
		                      <span>${contentList[i].msg}</span>
								</div>`;
							
				talk.innerHTML += item;
				talk.scrollTop=talk.scrollHeight;
			}
			
			// 시간 가져오기
			// let nowTime = sessionStorage.getItem("nowTime");
			// document.getElementById("stopwatch").innerText = nowTime;
		}
	})
})
		
