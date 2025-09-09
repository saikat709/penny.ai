
package com.penny.services;

import com.penny.dto.FinancialInfoCreateUpdateDTO;
import com.penny.dto.FinancialInfoDTO;
import com.penny.models.FinancialInfo;
import com.penny.models.UserEntity;
import com.penny.repositories.FinancialInfoRepository;
import com.penny.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FinancialInfoService {
    private final FinancialInfoRepository financialInfoRepository;
    private final UserRepository userRepository;

    public FinancialInfoService(FinancialInfoRepository financialInfoRepository, UserRepository userRepository) {
        this.financialInfoRepository = financialInfoRepository;
        this.userRepository = userRepository;
    }

    public Page<FinancialInfoDTO> getFinancialInfos(Pageable pageable) {
        return financialInfoRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<FinancialInfoDTO> getFinancialInfoById(Long id) {
        return financialInfoRepository.findById(id).map(this::convertToDTO);
    }

    public FinancialInfoDTO createFinancialInfo(FinancialInfoCreateUpdateDTO financialInfoDTO) {
        UserEntity user = userRepository.findById(financialInfoDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        FinancialInfo financialInfo = new FinancialInfo();
        financialInfo.setUser(user);
        financialInfo.setFreq(financialInfoDTO.getFreq());
        financialInfo.setCurrency(financialInfoDTO.getCurrency());
        financialInfo.setItem(financialInfoDTO.getItem());
        financialInfo.setDescription(financialInfoDTO.getDescription());

        return convertToDTO(financialInfoRepository.save(financialInfo));
    }

    public Optional<FinancialInfoDTO> updateFinancialInfo(Long id, FinancialInfoCreateUpdateDTO financialInfoDetails) {
        return financialInfoRepository.findById(id)
                .map(financialInfo -> {
                    if (financialInfoDetails.getFreq() != null) {
                        financialInfo.setFreq(financialInfoDetails.getFreq());
                    }
                    if (financialInfoDetails.getCurrency() != null) {
                        financialInfo.setCurrency(financialInfoDetails.getCurrency());
                    }
                    if (financialInfoDetails.getItem() != null) {
                        financialInfo.setItem(financialInfoDetails.getItem());
                    }
                    if (financialInfoDetails.getDescription() != null) {
                        financialInfo.setDescription(financialInfoDetails.getDescription());
                    }
                    return convertToDTO(financialInfoRepository.save(financialInfo));
                });
    }

    private FinancialInfoDTO convertToDTO(FinancialInfo financialInfo) {
        FinancialInfoDTO dto = new FinancialInfoDTO();
        dto.setId(financialInfo.getId());
        dto.setUserId(financialInfo.getUser().getId());
        dto.setFreq(financialInfo.getFreq());
        dto.setCurrency(financialInfo.getCurrency());
        dto.setItem(financialInfo.getItem());
        dto.setDescription(financialInfo.getDescription());
        return dto;
    }
}
