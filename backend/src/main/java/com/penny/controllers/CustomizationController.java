
package com.penny.controllers;

import com.penny.dto.CustomizationCreateUpdateDTO;
import com.penny.dto.CustomizationDTO;
import com.penny.services.CustomizationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customizations")
public class CustomizationController {
    private final CustomizationService customizationService;

    public CustomizationController(CustomizationService customizationService) {
        this.customizationService = customizationService;
    }

    @GetMapping
    public Page<CustomizationDTO> getCustomizations(Pageable pageable) {
        return customizationService.getCustomizations(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomizationDTO> getCustomizationById(@PathVariable Long id) {
        return customizationService.getCustomizationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CustomizationDTO createCustomization(@RequestBody CustomizationCreateUpdateDTO customization) {
        return customizationService.createCustomization(customization);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CustomizationDTO> updateCustomization(@PathVariable Long id, @RequestBody CustomizationCreateUpdateDTO customizationDetails) {
        return customizationService.updateCustomization(id, customizationDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
