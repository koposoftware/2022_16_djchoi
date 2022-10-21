// 시그널링 서버에 연결하기 위한 WebSocket연결 생성
let conn = new WebSocket('wss://192.168.217.241:9600/chat');
// let conn = new WebSocket('wss://localhost:9600/chat');
// let conn = new WebSocket('wss://192.168.217.252:9600/chat');


const tellerName = document.getElementById("tellerName").value;
const tellerDept = document.getElementById("tellerDept").value;
const roomId = document.getElementById("roomId").value;

const Call = document.getElementById("call");
const myFace = document.getElementById("myFace");
const peerFace = document.getElementById("peerFace");

const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const fundTable = document.getElementById("fundTable");

// 영상 녹화
let myMediaRecorder;
let myRecordedBlobs;
let peerMediaRecorder;
let peerRecordedBlobs;


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
	        handleOffer(data);
	        break;
	    case "answer":
	    	sessionStorage.setItem("userName", content.userName);
	        document.getElementById("userName").value = content.userName;
	        document.getElementById("userId").value = content.userId;
	        document.getElementById("userTel").value = content.userTel;
	        document.getElementById("userMail").value = content.userMail;
	        document.getElementById("userIdNum").value = content.userIdNum.slice(0,7) + "1******" ;
	        handleAnswer(data);
	        break;
	    // when a remote peer sends an ice candidate to us
	    case "candidate":
	        handleCandidate(data);
	        break;
	    default:
	        break;
	    }
	}else if(content.type == "chat"){
		
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
		talk.scrollTop=talk.scrollHeight;//스크롤바 하단으로 이동
	}else if(content.type == "tel"){
		Swal.fire({
		  title: "문자 인증이 완료되었습니다.",
		  icon: "success",
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:
		    '확인',
		})
		document.getElementById('sendTel').className = 'btn-primary';
		document.getElementById('sendTel').innerText = "인증 완료";
	}else if(content.type == "email"){
		Swal.fire({
		  title: "이메일 인증이 완료되었습니다.",
		  icon: "success",
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:
		    '확인',
		})
		document.getElementById('sendEmail').className = 'btn-primary';
		document.getElementById('sendEmail').innerText = "인증 완료";
	}else if(content.type == "agree"){
		Swal.fire({
		  title: "약관 동의가 완료되었습니다.",
		  icon: "success",
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:
		    '확인',
		})
	}else if(content.type == "fundJoin"){
		Swal.fire({
		  title: "상품 가입이 완료되었습니다.",
		  icon: "success",
		  showCloseButton: true,
		  focusConfirm: false,
		  confirmButtonText:
		    '확인',
		})
	}else if(content.type == "investResult"){
				
		$.ajax({
			url:"/fundInfo",
			method:"get",
			success:(recommendFundList)=>{
				// let nowTime = document.getElementById("stopwatch").innerText;
				// sessionStorage.setItem("nowTime", nowTime);
				
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
							      			<th style="width:20%">${content.total}</th>
							      			<th class="fw-bolder" style="width:30%; background-color:#F2F6F7">고객 투자성향등급</th>
							      			<th style="width:20%">${content.ivtype}</th>
							      		</tr>
							      	</table>
							      	<button id="showInv" class="ivBtn" onclick="showInvestSimul()">나의 투자성향 상세내역</button>
							      	<div class="mt-3" id="investSimul" style="display:none;">
							      		<div class="border border-1">`;
				if( `${content.ivtype}` == '공격투자형'){
					item += `<img src="/assets/img/공격투자형.png" style="width:100%">`
				}else if(`${content.ivtype}` == '적극투자형'){
					item += `<img src="/assets/img/적극투자형.png" style="width:100%">`
				}else if(`${content.ivtype}` == '위험중립형'){
					item += `<img src="/assets/img/위험중립형.png" style="width:100%">`
				}else if(`${content.ivtype}` == '안전추구형'){
					item += `<img src="/assets/img/안전추구형.png" style="width:100%">`
				}
				
				item += `</div>
									</div>
									<div class="mt-5">
										<h5 class="fw-bolder"><i class="fa-sharp fa-solid fa-circle-dot" style="color:#249782;"></i> 같은 성향의 사람들이 가입한 펀드</h5>
										<button id="popularBtn" class="ivBtn" onclick="showPopular()">최근 인기있는</button>
										<button id="volatilityBtn" class="ivBtn" onclick="showVolatility()">가격 움직임이 큰</button>
										
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
							item += `<button class="ivBtn" style="border-radius:0 !important; font-size:14px; background-color: #FF2D00; color:white">${recommendFundList[i].risk}</button>`;
						}else if(recommendFundList[i].risk == '높은위험'){
							item += `<button class="ivBtn" style="border-radius:0 !important; font-size:14px; background-color: #F26100; color:white">${recommendFundList[i].risk}</button>`;
						}else if(recommendFundList[i].risk == '다소높은위험'){
							item += `<button class="ivBtn" style="border-radius:0 !important; font-size:14px; background-color: #D58001; color:white">${recommendFundList[i].risk}</button>`;
						}else if(recommendFundList[i].risk == '보통위험'){
							item += `<button class="ivBtn" style="border-radius:0 !important; font-size:14px; background-color: #BC9922; color:white">${recommendFundList[i].risk}</button>`;
						}else if(recommendFundList[i].risk == '낮은위험'){
							item += `<button class="ivBtn" style="border-radius:0 !important; font-size:14px; background-color: #73A200; color:white">${recommendFundList[i].risk}</button>`;
						}else if(recommendFundList[i].risk == '매우낮은위험'){
							item += `<button class="ivBtn" style="border-radius:0 !important; font-size:14px; background-color: #21862A; color:white">${recommendFundList[i].risk}</button>`;
						}
						
						item += `			<button class="ms-2 ivBtn" style="border-radius:0 !important; border-color: #2e5293; font-size:14px">${recommendFundList[i].type}</button>
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
							        <button type="button" class="btn btn-primary" onclick="closeModal();" data-bs-dismiss="modal">확인</button>
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

// 비디오 관련 메세지를 전달하는데 사용할 send 메서드
function vsend(message){
	conn.send(JSON.stringify(message));
};


// 연결 완료
conn.onopen = function(){
	console.log("Connected to the signaling server");
	// screenShareButton.disabled = false;
	// startClock();
	initialize();
	getMyStream();
	// startRecording();
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
        
        // 손님 영상 저장
        getSupportedMimeTypes();
		startPeerRecording(e.streams[0])
    }
};


// 오퍼를 생성하고 LocalDescription으로 설정(1)
function createOffer(){
	peerConnection.createOffer(function(offer) {
	    vsend({
			type : "video",
	        event : "offer",
	        tellerName : tellerName,
            tellerDept : tellerDept, 
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
	
	getSupportedMimeTypes();
	
	startMyRecording(stream);
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
    muteBtn.innerText = "Unmute";
    muted = true;
  } else{
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

// 카메라 켜고 끄기
function handleCameraClick(){
  myStream
    .getVideoTracks()
    .forEach( (track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else{
    cameraBtn.innerText = "Turn Camera On"
    cameraOff = true;
  }
}

//muteBtn.addEventListener("click", handleMuteClick);
//cameraBtn.addEventListener("click", handleCameraClick);




// 화면 공유
const shareScreen = () => {
  navigator.mediaDevices
    .getDisplayMedia({
      video: { cursor: 'always' },
      audio: { echoCancellation: true, noiseSuppression: true },
    })
    .then((stream) => {
      myFace.srcObject = stream; // 내 비디오 공유 화면으로 변경
      const videoTrack = stream.getVideoTracks()[0];
      peerConnection
        .getSenders()
        .find((sender) => sender.track.kind === videoTrack.kind)
        .replaceTrack(videoTrack);	// 공유화면으로 대체
      videoTrack.onended = function () {			// 공유 중지하면
        const screenTrack = myStream.getVideoTracks()[0];
        peerConnection
          .getSenders()
          .find((sender) => sender.track.kind === screenTrack.kind)
          .replaceTrack(screenTrack);
        stream.getTracks().forEach((track) => track.stop());
        myFace.srcObject = myStream; // 원래 내 비디오로 변경
      };
    });
};



// 화면 캡쳐
const canvas = document.getElementById("canvas");
function capture(){
	const context = canvas.getContext('2d');
	canvas.width = 400;
	canvas.height = 300;
	context.drawImage(peerFace, 0, 0, canvas.width, canvas.height);
	insertImage(canvas.toDataURL('image/png'));
}
document.querySelector('#captureBtn').addEventListener('click', capture);

// 화면 캡쳐 - 캡쳐한 이미지 다운로드
async function insertImage(imageData){
	const userName = sessionStorage.getItem("userName");
	
	const images = document.getElementById("images");
	//const checkIdBtn = document.getElementById("checkIdNum");
	
	const img = document.createElement('img');
	const a = document.createElement('a');
	const fileName = `WebRTC_${userName}`;
	
	img.src = imageData;
	a.href = imageData;			// 이미지 경로
	a.download = fileName;		// 다운로드 파일 명 설정
	a.appendChild(img);
	
	images.insertBefore(a, images.childNodes[0]);
	
	// await new Promise((resolve, reject) => setTimeout(resolve, 3000));
	
	// 신분증 인증으로 넘기기
	// checkIdBtn.onclick = checkId(fileName);
	//checkIdBtn.addEventListener('click', checkId(fileName));
}

// 신분증 인증
function checkId(){
	const userName = sessionStorage.getItem("userName");
	$.ajax({
		url : "/teller/checkId",
		method : "post",
		data : {
			fileName : `WebRTC_${userName}`,
		}, success : (result) => {
			const idData = JSON.parse(result);
			console.log(idData);
			const licenseNumber = idData.images[0].fields[2].inferText + "  " + idData.images[0].fields[3].inferText;
			const name = idData.images[0].fields[4].inferText;
			const id =  idData.images[0].fields[5].inferText.substr(0,8)+"******";
			
			
			console.log(licenseNumber);	// 면허 번호
			console.log(name);		// 이름
			console.log(id);		// 주민번호
			
			const mal = `본인인증이 완료되었습니다 \n\n(면허번호 : ${licenseNumber}, 이름 : ${name},\n 주민번호 : ${id})`;
			
			alert(mal);
		}, error : () => {
			alert("신분증 정보가 일치하지 않습니다.");
		}
	})
}


// 문자 인증 보내기
$('#sendTel').click(()=>{
	let tel = document.getElementById('userTel').value;
	$.ajax({
		url : "/check/tel",
		method : "post",
		data : {
			tel : tel,
			title : "문자 본인 인증입니다.",
		}, success : (num) => {
			Swal.fire({
			  title: "인증번호를 발송 했습니다.",
			  showCloseButton: true,
			  focusConfirm: false,
			  confirmButtonText:
			    '확인',
			})
			tsend(num);
		}, error : () => {
			alert('실패')
		}
	})
});

function tsend(num){
	let tdata = {
		type: "tel",
		num: num
	};
	conn.send(JSON.stringify(tdata));
};

// 이메일 인증번호 보내기
$('#sendEmail').click(()=>{
	let email = document.getElementById('userMail').value;
	$.ajax({
		url : "/mail",
		method : "post",
		data : {
			address : email,
			title : "이메일 본인 인증입니다.",
		}, success : (code) => {
			Swal.fire({
			  title: "인증번호를 발송 했습니다.",
			  showCloseButton: true,
			  focusConfirm: false,
			  confirmButtonText:
			    '확인',
			})
			esend(code);
		}, error : () => {
			alert('실패')
		}
	})
});

function esend(code){
	let edata = {
		type: "email",
		code: code
	};
	conn.send(JSON.stringify(edata));
};


// 투자 성향 분석 설문 보내기
$('#sendInvest').click(()=>{
	isend();
});

function isend(){
	let idata = {
		type: "invest"
	};
	conn.send(JSON.stringify(idata));
};



// 펀드 보유 현황
$('#showUserFund').click(()=>{
	const userName = document.getElementById("userName").value;
	$.ajax({
		url : "/getFund",
		method : "get",
		data: {
			userName : userName
		},
		success : (fundList) => {
			getMyFund();
			for(i = 0; i < fundList.length; i++){
				getFundInfo(fundList[i]);				
			}
		}, error : () => {
			alert('실패')
		}
	})
});

function getMyFund(){
	$('#fundTable').empty();
	
	let item = `<table id="myFund" class="table my-3 pe-5 text-center">
					<thead style="background-color: #F0F2F6">
						<tr>
							<th scope="col">계좌번호</th>
							<th scope="col">상품명</th>
							<th scope="col">평가금액</th>
							<th scope="col">누적수익률</th>
							<th scope="col">신규일</th>
							<th scope="col">저축유형</th>
							<th scope="col">자동환매</th>
							<th scope="col">만기일</th>
							<th scope="col">연동 계좌</th>
						</tr>
					</thead>
					<tbody id="getfundTbody">
					</tbody>
				</table>`
	fundTable.innerHTML += item;	
}

function getFundInfo(fund){
	const tbody = document.getElementById("getfundTbody");
	let items = `<tr style="font-family: tellerfont">
					<td>${fund.accountNo}</td>
					<td>${fund.name}</td>
					<td>${fund.valuationAmount}</td>
					<td>${fund.cumulativeReturn}</td>
					<td>${fund.startDate}(${fund.term}개월)</td>
					<td>${fund.saveType}</td>
					<td>${fund.autoRedemption}</td>
					<td>${fund.endDate}</td>
					<td>${fund.linkAccount}</td>
				</tr>`
	tbody.innerHTML += items;
}



// 펀드 상품 가져오기
$('#showFunds').click(()=>{
	$.ajax({
		url : "/fund",
		method : "get",
		success : (fundList) => {
			setTableInfo(fundList);
		}, error : () => {
			alert('실패')
		}
	})
});

function setTableInfo(fundList){
	$('#fundTable').empty();
	
	let item = `<table id="showfundGoods" class="table my-3 pe-5 text-center">
					<thead style="background-color: #F0F2F6">
						<tr>
							<th scope="col">상품명</th>
							<th scope="col">유형</th>
							<th scope="col">설정액</th>
							<th scope="col">위험등급</th>
							<th scope="col">투자지역</th>
							<th scope="col">수익률</th>
							<th scope="col">투자설명서</th>
						</tr>
					</thead>
					<tbody id="showfundTbody">
					</tbody>
				</table>`
	fundTable.innerHTML += item;
	
	for(i = 0; i < fundList.length; i++){
		setFundInfo(fundList[i]);				
	}
}


function setFundInfo(fund){
	const tbody = document.getElementById("showfundTbody");
	let items = `<tr style="font-family: tellerfont">
					<td>${fund.name}</td>
					<td>${fund.type}</td>
					<td>${fund.scale}</td>
					<td class="text-danger">${fund.risk}</td>
					<td>${fund.region}</td>
					<td>${fund.yield}</td>
					<td> <button class="btn-sm border-0" onclick='showManual("${fund.name}");' >열기</button> </td>
				</tr>`
	tbody.innerHTML += items;
}

function showManual(fundName){
	window.open("https://"+location.host + "/assets/pdf/" + fundName + ".pdf");
};



// 펀드 가입 진행
$('#setJoinFund').click(()=>{
	$.ajax({
		url : "/fund",
		method : "get",
		success : (fundList) => {
			setTableJoin(fundList);
		}, error : () => {
			alert('실패')
		}
	})
});

function setTableJoin(fundList){
	$('#fundTable').empty();
	
	let item = `<table id="joinfundGoods" class="table my-3 pe-5 text-center">
					<thead style="background-color: #F0F2F6">
						<tr>
							<th scope="col">상품명</th>
							<th scope="col">유형</th>
							<th scope="col">설정액</th>
							<th scope="col">위험등급</th>
							<th scope="col">투자지역</th>
							<th scope="col">수익률</th>
							<th scope="col">가입서비스</th>
						</tr>
					</thead>
					<tbody id="joinfundTbody">
					</tbody>
				</table>`
	fundTable.innerHTML += item;
	
	for(i = 0; i < fundList.length; i++){
		setFundJoin(fundList[i]);				
	}
}


function setFundJoin(fund){
	const tbody = document.getElementById("joinfundTbody");
	let items = `<tr style="font-family: tellerfont">
					<td>${fund.name}</td>
					<td>${fund.type}</td>
					<td>${fund.scale}</td>
					<td class="text-danger">${fund.risk}</td>
					<td>${fund.region}</td>
					<td>${fund.yield}</td>
					<td> <button class="btn-sm border-0" onclick='joinFund("${fund.name}");' >가입하기</button> </td>
				</tr>`
	tbody.innerHTML += items;
}


function joinFund(fundName){
	document.getElementById("joinfundGoods").style.display = "none";
	const userId = document.getElementById("userId").value;
	$.ajax({
		url : "/getMyAccount",
		method : "post",
		data : {
			userId : userId,
		}, success : (accountList) => {
			
			let item = `<div style="font-family: tellerfont;">
					<div id="fundNamejoin" class="mt-3 fs-6">상품명 : <span>${fundName}</span></div>
					<div class="row justify-content-end">
						<div class="col-8 mt-3 fs-5">연동계좌 : 
							<select id="linkaccount" name="linkaccount" >
								<option value="none">선택</option>`;
							
			for(i=0; i<accountList.length; i++){
				item += `<option value="${accountList[i]}">${accountList[i]} (입/출금)</option>`
			}
							
			item +=	`	</select>
						</div>
						<div class="col-4 mt-3 fs-5 d-flex justify-content-end p-0"> 가입금액 : 
							<input class="ms-2" id="money" type="text" size="15" required>
						</div>
						<div class="col-8 mt-3 fs-5"> 저축방법 : 
							<select id="savetype" name="savetype">
								<option value="none">선택</option>
								<option value="거치식">거치식</option>
								<option value="적립식">적립식</option>
							</select>
						</div>
						<div class="col-4 mt-3 fs-5 d-flex justify-content-end p-0"> 기간 : 
							<input class="ms-2" id="term" type="text" size="15" required>
						</div>
						<div class="col-10"></div>
						<div class="col-2 mt-3 form-check pe-0">
						  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
						  <label class="form-check-label" for="flexCheckDefault">
						    자동환매 서비스 신청
						  </label>
						</div>
						<div class="col-8"></div>
						<button class="col-2 my-3 border-0 btn-lg fs-6 p-2" onclick="joinAgree();">동의서 전송하기</button>
						<button class="col-1 my-3 ms-3 border-0 btn-lg fs-6 p-2" onclick="joinProcess();">가입하기</button>
					</div>
				</div>`;
				
			fundTable.innerHTML += item;
		}, error : () => {
			alert('실패')
		}
	})
};

// 펀드 가입 동의서 전송
function joinAgree(){
	agsend();
	
	Swal.fire({
	  title: "동의서 전송 완료",
	  icon: "success",
	  showCloseButton: true,
	  focusConfirm: false,
	  confirmButtonText: '확인'
	})
}

function agsend(){
	let agdata = {
		type: "joinAgree"
	};
	conn.send(JSON.stringify(agdata));
};


// 펀드 상품 가입 진행
function joinProcess(){
	const fundName = $('#fundNamejoin span').text();
	const linkaccount = document.getElementById("linkaccount").value;
	const savetype = document.getElementById("savetype").value;
	const money = document.getElementById("money").value;
	const term = document.getElementById("term").value;
	const userName = sessionStorage.getItem("userName");
	$.ajax({
		url : "/joinProcess",
		method : "post",
		data : {
			name : fundName,
			linkAccount : linkaccount,
			userName : userName,
			saveType : savetype,
			investMoney : money,
			term : term,
		},success : (fundList) =>{
			getMyFund();
			for(i = 0; i < fundList.length; i++){
				getFundInfo(fundList[i]);

				// 이번에 추가한 펀드
				if(fundList[i].name == fundName){
					fsend(fundList[i]);
				}
			}
		},error : (e) => {
			alert("실패" + e);
		}
	})
};


function fsend(fund){
	let fdata = {
		type: "fundJoin",
		fundAccount: fund.accountNo,
		fundName: fund.name,
		valuationAmount : fund.valuationAmount,
		saveType : fund.saveType,
		term : fund.term,
		linkAccount : fund.linkAccount,
		autoRedemption : fund.autoRedemption
	};
	conn.send(JSON.stringify(fdata));
};


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


function closeModal(){
	location.reload();
	
}


$(function(){
	console.log(roomId);
	console.log(sessionStorage.getItem("userName"));
	console.log(tellerName);
	$.ajax({
		url:"/getConsulting/content/teller",
		method:"get",
		data: {
			roomId : roomId,
			userName: sessionStorage.getItem("userName"),
			tellerName: tellerName
		},success:(contentList)=>{
			console.log("wowoww");
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





// 영상 녹화
/*
function startRecording() {
  recordedBlobs = [];
  const mimeType = 'video/webm;codecs=vp9,opus';
  const options = {mimeType};

  try {
    mediaRecorder = new MediaRecorder(myStream.getVideoTracks()[0], options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
}
*/

function getSupportedMimeTypes() {
  const possibleTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/mp4;codecs=h264,aac',
  ];
  return possibleTypes.filter(mimeType => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
}


// 내 상담 영상 녹화
function startMyRecording(stream){
	myRecordedBlobs = [];
	
	const mimeType = 'video/webm;codecs=vp9,opus';
	const options = {mimeType};
	
	try {
	  myMediaRecorder = new MediaRecorder(stream, options);
	} catch (e) {
	  console.error('Exception while creating MediaRecorder:', e);
	  errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
	  return;
	}
	
	console.log('Created MediaRecorder', myMediaRecorder, 'with options', options);
	myMediaRecorder.onstop = (event) => {
	  console.log('Recorder stopped: ', event);
	  console.log('Recorded Blobs: ', myRecordedBlobs);
	};
	myMediaRecorder.ondataavailable = handleMyDataAvailable;
	myMediaRecorder.start(1000);
}


// 손님 상담 영상 녹화
function startPeerRecording(stream){
	peerRecordedBlobs = [];
	
	const mimeType = 'video/webm;codecs=vp9,opus';
	const options = {mimeType};
	
	try {
	  peerMediaRecorder = new MediaRecorder(stream, options);
	} catch (e) {
	  console.error('Exception while creating MediaRecorder:', e);
	  errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
	  return;
	}
	
	console.log('Created MediaRecorder', peerMediaRecorder, 'with options', options);
	peerMediaRecorder.onstop = (event) => {
	  console.log('Recorder stopped: ', event);
	  console.log('Recorded Blobs: ', peerRecordedBlobs);
	};
	peerMediaRecorder.ondataavailable = handlePeerDataAvailable;
	peerMediaRecorder.start(1000);
}


function handleMyDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    myRecordedBlobs.push(event.data);
  }
}


function handlePeerDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    peerRecordedBlobs.push(event.data);
  }
}


function stopMyRecording() {
  myMediaRecorder.stop();
}
function stopPeerRecording() {
  peerMediaRecorder.stop();
}

function downloadMyRecord(roomId){
	const blob = new Blob(myRecordedBlobs, {type: 'video/webm'});
	const url = window.URL.createObjectURL(blob);
	console.log(url);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = roomId + '_'+ tellerName + '_상담.webm';
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
	  document.body.removeChild(a);
	  window.URL.revokeObjectURL(url);
	}, 100);
}
function downloadPeerRecord(roomId){
	const blob = new Blob(peerRecordedBlobs, {type: 'video/webm'});
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	console.log(url);
	a.style.display = 'none';
	a.href = url;
	a.download = roomId + '_'+ sessionStorage.getItem("userName") + '_상담.webm';
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
	  document.body.removeChild(a);
	  window.URL.revokeObjectURL(url);
	}, 100);
}


const swalWithBootstrapButtons = Swal.mixin({
	customClass: {
	  confirmButton: 'btn btn-success',
	  cancelButton: 'btn btn-danger'
	},
	buttonsStyling: false
});

function moveRecord() {
	stopMyRecording();
	stopPeerRecording();
	downloadMyRecord(roomId);
	downloadPeerRecord(roomId);
	
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
		  location.href = "/teller/record";
	  }
	})
};
