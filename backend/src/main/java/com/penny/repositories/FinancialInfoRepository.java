
package com.penny.repositories;

import com.penny.models.FinancialInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialInfoRepository extends JpaRepository<FinancialInfo, Long> {
    Page<FinancialInfo> findAll(Pageable pageable);
}
