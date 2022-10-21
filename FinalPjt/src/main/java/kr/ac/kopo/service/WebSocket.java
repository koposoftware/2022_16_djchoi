package kr.ac.kopo.service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Service;

/*
 * 백그라운드로 돌아가는 빈을 등록하기 위해 @Service 어노테이션과,
 * WebSocket의 연결점을 알려주는 @ServerEndoint 어노테이션을 지정한 클래스를 생성합니다.
 *  @ServerEndpoint는 WebSocket을 활성화시키는 매핑 정보를 지정합니다.
 */

@Service
@ServerEndpoint(value="/chat")
public class WebSocket {
	private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
	
	@OnOpen		// 클라이언트가 접속할 때 발생
	public void onOpen(Session s) {
		System.out.println("open session : " + s.toString());
		if(!clients.contains(s)) {
			clients.add(s);
			System.out.println("session open : " + s);
		}else {
			System.out.println("이미 연결된 session 입니다.");
		}
	}
	
	@OnMessage	// 메세지가 수신 되었을 때
	public void onMessage(String msg, Session session) throws Exception{
		System.out.println("receive message : " + msg);
		for(Session s : clients) {
			System.out.println("send data : " + msg);
			s.getBasicRemote().sendText(msg);
		}	
	}
	
	@OnClose	// 클라이언트가 브라우저를 끄거나 다른 경로로 이동 할 때
	public void onClose(Session s) {
		System.out.println("session close : " + s);
		clients.remove(s);
	}
	
}
