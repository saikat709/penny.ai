
package com.penny.controllers;

import com.penny.dto.FinancialInfoCreateUpdateDTO;
import com.penny.dto.FinancialInfoDTO;
import com.penny.services.FinancialInfoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/financial-infos")
public class FinancialInfoController {
    private final FinancialInfoService financialInfoService;

    public FinancialInfoController(FinancialInfoService financialInfoService) {
        this.financialInfoService = financialInfoService;
    }

    @GetMapping
    public Page<FinancialInfoDTO> getFinancialInfos(Pageable pageable) {
        return financialInfoService.getFinancialInfos(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinancialInfoDTO> getFinancialInfoById(@PathVariable Long id) {
        return financialInfoService.getFinancialInfoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public FinancialInfoDTO createFinancialInfo(@RequestBody FinancialInfoCreateUpdateDTO financialInfo) {
        return financialInfoService.createFinancialInfo(financialInfo);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<FinancialInfoDTO> updateFinancialInfo(@PathVariable Long id, @RequestBody FinancialInfoCreateUpdateDTO financialInfoDetails) {
        return financialInfoService.updateFinancialInfo(id, financialInfoDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
