package com.livia.blog.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UriComponentsBuilder;
import com.livia.blog.model.User;

public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession();
        if (session.getAttribute("user") instanceof User) {
            return true;
        }

        response.sendRedirect(UriComponentsBuilder
                .fromPath(request.getContextPath()).path("/login")
                .queryParam("from", getUrl(request)).build().toUriString());
        return false;
    }

    private String getUrl(HttpServletRequest request) {
        
        String url = request.getRequestURI();
        int index = url.indexOf("?");
        if (index>0) {
            url = url.substring(0, index);
        }
        System.out.println("request url:" + url.substring(request.getContextPath().length()));

        StringBuilder sb = new StringBuilder(url.substring(request.getContextPath().length()));
        String queryString = request.getQueryString();
        if (queryString != null) {
            sb.append("?").append(queryString);
        }
        return sb.toString();
    }

}
