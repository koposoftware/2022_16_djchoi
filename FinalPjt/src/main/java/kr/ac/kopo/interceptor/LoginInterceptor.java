package kr.ac.kopo.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import kr.ac.kopo.vo.UserVO;

@Component
public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		System.out.println("prehandle 동작");
		
		HttpSession session = request.getSession();

		String dest = request.getRequestURI();
		session.setAttribute("dest", dest);
		
		UserVO member = (UserVO)session.getAttribute("User");
		if(member == null) {
			response.sendRedirect("/user/login");
			return false;
		}
		
		return true;
	}
	
	
}
