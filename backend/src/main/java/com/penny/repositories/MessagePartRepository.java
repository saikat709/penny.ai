
package com.penny.repositories;

import com.penny.models.MessagePart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessagePartRepository extends JpaRepository<MessagePart, Long> {
    Page<MessagePart> findAll(Pageable pageable);
}
