
package com.penny.controllers;

import com.penny.dto.ProfileCreateUpdateDTO;
import com.penny.dto.ProfileDTO;
import com.penny.services.ProfileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public Page<ProfileDTO> getProfiles(Pageable pageable) {
        return profileService.getProfiles(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDTO> getProfileById(@PathVariable Long id) {
        return profileService.getProfileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProfileDTO createProfile(@RequestBody ProfileCreateUpdateDTO profile) {
        return profileService.createProfile(profile);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProfileDTO> updateProfile(@PathVariable Long id, @RequestBody ProfileCreateUpdateDTO profileDetails) {
        return profileService.updateProfile(id, profileDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
