package com.livia.blog;

import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.util.DigestUtils;

public class Test {
    
    
    public static void main(String[] args) {
        System.out.println(DigestUtils.md5DigestAsHex("1212".getBytes()));
    }

}
