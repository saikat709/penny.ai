
package com.penny.repositories;

import com.penny.models.Conversation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Page<Conversation> findAll(Pageable pageable);
    Optional<Conversation> findById(Long id);
    List<Conversation> findAllByUserId(Long userId);
}
