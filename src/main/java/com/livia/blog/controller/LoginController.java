package com.livia.blog.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.livia.blog.dao.UserRepository;
import com.livia.blog.model.User;


@Controller
@SessionAttributes("user")
public class LoginController {
    
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/login")
    public String login(HttpServletRequest request, Model model
            , HttpServletResponse response) {
        
        if (request == null) {
            return "login";
        } else if (request.getMethod() != "POST") {
            return "login";
        } else {
            
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            
            if (username == null || password == null || "".equals(username) || "".equals("password")) {
                model.addAttribute("msg", "用户名密码不允许为空");
            }
            
            User user = userRepository.findByEmailAndPassword(username, DigestUtils.md5DigestAsHex(password.getBytes()));
            if (user == null) {
                user = userRepository.findByUsernameAndPassword(username, DigestUtils.md5DigestAsHex(password.getBytes()));
            }
            
            if (user != null) {
                model.addAttribute("user", user);
                return "redirect:/";
            } else {
                model.addAttribute("msg", "用户名密码错误");
                model.addAttribute("username", username);
                model.addAttribute("password", "password");
            }
            
        }
        
        return "login";
    }
    
}
