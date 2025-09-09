
package com.penny.services;

import com.penny.dto.ReportCreateUpdateDTO;
import com.penny.dto.ReportDTO;
import com.penny.models.Report;
import com.penny.models.Transaction;
import com.penny.models.UserEntity;
import com.penny.repositories.ReportRepository;
import com.penny.repositories.TransactionRepository;
import com.penny.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public ReportService(ReportRepository reportRepository, UserRepository userRepository, TransactionRepository transactionRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    public Page<ReportDTO> getReports(Pageable pageable) {
        return reportRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<ReportDTO> getReportById(Long id) {
        return reportRepository.findById(id).map(this::convertToDTO);
    }

    public ReportDTO createReport(ReportCreateUpdateDTO reportDTO) {
        UserEntity user = userRepository.findById(reportDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> transactions = transactionRepository.findAllById(reportDTO.getTransactionIds());
        List<UserEntity> sharedWith = (List<UserEntity>) userRepository.findAllById(reportDTO.getSharedWithUserIds());

        Report report = new Report();
        report.setUser(user);
        report.setFreq(reportDTO.getFreq());
        report.setIncome(reportDTO.getIncome());
        report.setExpense(reportDTO.getExpense());
        report.setTransactions(transactions);
        report.setSharedWith(sharedWith);

        return convertToDTO(reportRepository.save(report));
    }

    public Optional<ReportDTO> updateReport(Long id, ReportCreateUpdateDTO reportDetails) {
        return reportRepository.findById(id)
                .map(report -> {
                    if (reportDetails.getFreq() != null) {
                        report.setFreq(reportDetails.getFreq());
                    }
                    if (reportDetails.getIncome() != null) {
                        report.setIncome(reportDetails.getIncome());
                    }
                    if (reportDetails.getExpense() != null) {
                        report.setExpense(reportDetails.getExpense());
                    }
                    if (reportDetails.getTransactionIds() != null) {
                        List<Transaction> transactions = transactionRepository.findAllById(reportDetails.getTransactionIds());
                        report.setTransactions(transactions);
                    }
                    if (reportDetails.getSharedWithUserIds() != null) {
                        List<UserEntity> sharedWith = (List<UserEntity>) userRepository.findAllById(reportDetails.getSharedWithUserIds());
                        report.setSharedWith(sharedWith);
                    }
                    return convertToDTO(reportRepository.save(report));
                });
    }

    private ReportDTO convertToDTO(Report report) {
        ReportDTO dto = new ReportDTO();
        dto.setId(report.getId());
        dto.setUserId(report.getUser().getId());
        dto.setFreq(report.getFreq());
        dto.setIncome(report.getIncome());
        dto.setExpense(report.getExpense());
        dto.setTransactionIds(report.getTransactions().stream().map(Transaction::getId).collect(Collectors.toList()));
        dto.setSharedWithUserIds(report.getSharedWith().stream().map(UserEntity::getId).collect(Collectors.toList()));
        return dto;
    }
}
