package com.livia.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class IndexController {
    
    @RequestMapping(value = {"", "index", "home"})
    public ModelAndView index(ModelAndView model) {
        model.setViewName("main");
        return model;
    }
    
}
