package com.todo.repository;

import com.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TodoRepository extends JpaRepository<Todo, UUID> {

    List<Todo> findByCompleted(Boolean completed);

    @Query("SELECT t FROM Todo t WHERE " +
           "(:keyword IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:completed IS NULL OR t.completed = :completed)")
    List<Todo> search(@Param("keyword") String keyword, @Param("completed") Boolean completed);
}
