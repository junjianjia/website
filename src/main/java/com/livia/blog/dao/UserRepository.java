package com.livia.blog.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.livia.blog.model.User;


public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);
    User findByEmailAndPassword(String email, String password);
    User findByTruename(String truename);
    List<User> findByRole(int role);
    User findByIdAndRole(Long id, int role);
    User findById(Long id);
}
