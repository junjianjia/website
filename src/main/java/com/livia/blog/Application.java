package com.livia.blog;

import javax.servlet.Filter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.velocity.VelocityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.velocity.VelocityLayoutViewResolver;

import com.livia.blog.interceptor.LoginInterceptor;


@ComponentScan
@EnableAutoConfiguration
public class Application extends WebMvcConfigurerAdapter {
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    @Bean
    public Filter characterEncodingFilter() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        return characterEncodingFilter;
    }
    
    //set velocity default layout
    @Bean(name = "velocityViewResolver")
    public VelocityLayoutViewResolver velocityViewResolver(VelocityProperties properties) {
        VelocityLayoutViewResolver resolver = new VelocityLayoutViewResolver();
        properties.applyToViewResolver(resolver);
        resolver.setLayoutUrl("layout.html");
        return resolver; 
    }
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/login")
                .excludePathPatterns("/permission");
    }
    
}
