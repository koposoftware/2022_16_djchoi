package kr.ac.kopo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/*
 * 일반적으로 스프링에서 빈들은 싱글톤으로 관리되지만,
 *  @ServerEndpoint 어노테이션이 달린 클래스들은 WebSocket이 생성될 때마다 인스턴스가 생성된다.
 * 이때 이를 연결해 주고 초기화해 주는 클래스가 필요합니다.
 */

@Configuration
@EnableWebSocket
//@Component
public class WebSocketConfig implements WebSocketConfigurer{
	
	
//	@Bean ServerEndpointExporter serverEndpointExporter() { 
//		return new ServerEndpointExporter(); 
//	}
	 
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new SocketHandler(), "/chat").setAllowedOrigins("*");
	}
	
}
