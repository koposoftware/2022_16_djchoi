// 시그널링 서버에 연결하기 위한 WebSocket연결 생성
let conn = new WebSocket('wss://192.168.217.241:9600/chat');
// let conn = new WebSocket('wss://localhost:9600/chat');
// let conn = new WebSocket('wss://192.168.217.252:9600/chat');
var peerConnection;

conn.onmessage = function(msg) {
    console.log("Got message", msg.data);
    let content = JSON.parse(msg.data);
    let data = content.data;
    
    if(content.type == "video"){	
	    switch (content.event) {
	    // when somebody wants to call us
	    case "offer":
	        handleOffer(data);
	        break;
	    case "answer":
	        handleAnswer(data);
	        break;
	    // when a remote peer sends an ice candidate to us
	    case "candidate":
	        handleCandidate(data);
	        break;
	    default:
	        break;
	    }
	}if(content.type == "entrance"){
		document.getElementById("customer").style.display = "block";
		document.getElementById("waitingIcon").style.display = "none";
		document.getElementById("startIcon").style.display = "block";
	}
};



// 비디오 관련 메세지를 전달하는데 사용할 send 메서드
function vsend(message){
	conn.send(JSON.stringify(message));
};


// 연결 완료
conn.onopen = function(){
	console.log("Connected to the signaling server");
	// screenShareButton.disabled = false;
	initialize();
	getMyStream();
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





