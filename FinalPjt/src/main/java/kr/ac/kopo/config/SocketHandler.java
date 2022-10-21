package kr.ac.kopo.config;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@Component
public class SocketHandler extends TextWebSocketHandler {
 
	private static List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) {
		System.out.println("open session : " + session.toString());
		sessions.add(session);
		System.out.println("세션이 열렷다");
		
		
		System.out.println(session.getId());
		// System.out.println(session.getPrincipal().getName());
	}
 
	
 
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
		String payload = message.getPayload();
		System.out.println("payload : " + payload);
		if(payload.contains("chat")) {
			// 채팅 관련 => 본인과 상대에게 전달
			for (WebSocketSession webSocketSession : sessions) {
				try {
					webSocketSession.sendMessage(new TextMessage(payload));
				} catch(Exception e) {
					e.printStackTrace();
				}
			}
		}else {
			// 카메라 관련 => 상대방에게 메시지 전달
			for (WebSocketSession webSocketSession : sessions) {
				if ( webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
					webSocketSession.sendMessage(new TextMessage(payload));
				}
			}
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		sessions.remove(session);
	}
}