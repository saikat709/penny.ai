
package com.penny.services;

import com.penny.dto.CustomizationCreateUpdateDTO;
import com.penny.dto.CustomizationDTO;
import com.penny.models.Customization;
import com.penny.models.UserEntity;
import com.penny.repositories.CustomizationRepository;
import com.penny.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomizationService {
    private final CustomizationRepository customizationRepository;
    private final UserRepository userRepository;

    public CustomizationService(CustomizationRepository customizationRepository, UserRepository userRepository) {
        this.customizationRepository = customizationRepository;
        this.userRepository = userRepository;
    }

    public Page<CustomizationDTO> getCustomizations(Pageable pageable) {
        return customizationRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<CustomizationDTO> getCustomizationById(Long id) {
        return customizationRepository.findById(id).map(this::convertToDTO);
    }

    public CustomizationDTO createCustomization(CustomizationCreateUpdateDTO customizationDTO) {
        UserEntity user = userRepository.findById(customizationDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Customization customization = new Customization();
        customization.setUser(user);
        customization.setReportFreq(customizationDTO.getReportFreq());
        customization.setTheme(customizationDTO.getTheme());
        customization.setPersona(customizationDTO.getPersona());

        return convertToDTO(customizationRepository.save(customization));
    }

    public Optional<CustomizationDTO> updateCustomization(Long id, CustomizationCreateUpdateDTO customizationDetails) {
        return customizationRepository.findById(id)
                .map(customization -> {
                    if (customizationDetails.getReportFreq() != null) {
                        customization.setReportFreq(customizationDetails.getReportFreq());
                    }
                    if (customizationDetails.getTheme() != null) {
                        customization.setTheme(customizationDetails.getTheme());
                    }
                    if (customizationDetails.getPersona() != null) {
                        customization.setPersona(customizationDetails.getPersona());
                    }
                    return convertToDTO(customizationRepository.save(customization));
                });
    }

    private CustomizationDTO convertToDTO(Customization customization) {
        CustomizationDTO dto = new CustomizationDTO();
        dto.setId(customization.getId());
        dto.setUserId(customization.getUser().getId());
        dto.setReportFreq(customization.getReportFreq());
        dto.setTheme(customization.getTheme());
        dto.setPersona(customization.getPersona());
        return dto;
    }
}
