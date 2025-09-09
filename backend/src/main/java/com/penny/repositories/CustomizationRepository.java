
package com.penny.repositories;

import com.penny.models.Customization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomizationRepository extends JpaRepository<Customization, Long> {
    Page<Customization> findAll(Pageable pageable);
}
