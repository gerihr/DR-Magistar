package com.app.repository;

import com.app.model.entitites.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findById(int id);

    User findByEmail(String email);

    User findBySessionToken(String sessionToken);
}
