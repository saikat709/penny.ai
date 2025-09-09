
package com.penny.controllers;

import com.penny.dto.ReportCreateUpdateDTO;
import com.penny.dto.ReportDTO;
import com.penny.services.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public Page<ReportDTO> getReports(Pageable pageable) {
        return reportService.getReports(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportDTO> getReportById(@PathVariable Long id) {
        return reportService.getReportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ReportDTO createReport(@RequestBody ReportCreateUpdateDTO report) {
        return reportService.createReport(report);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ReportDTO> updateReport(@PathVariable Long id, @RequestBody ReportCreateUpdateDTO reportDetails) {
        return reportService.updateReport(id, reportDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
