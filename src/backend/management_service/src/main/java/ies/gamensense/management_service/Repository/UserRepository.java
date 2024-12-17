package ies.gamensense.management_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ies.gamensense.management_service.Models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}

