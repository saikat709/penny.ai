
package com.penny.services;

import com.penny.dto.ProfileCreateUpdateDTO;
import com.penny.dto.ProfileDTO;
import com.penny.models.Profile;
import com.penny.models.UserEntity;
import com.penny.repositories.ProfileRepository;
import com.penny.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public Page<ProfileDTO> getProfiles(Pageable pageable) {
        return profileRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<ProfileDTO> getProfileById(Long id) {
        return profileRepository.findById(id).map(this::convertToDTO);
    }

    public ProfileDTO createProfile(ProfileCreateUpdateDTO profileDTO) {
        UserEntity user = userRepository.findById(profileDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = new Profile();
        profile.setUser(user);
        profile.setName(profileDTO.getName());
        profile.setAvatar(profileDTO.getAvatar());
        profile.setBirthday(profileDTO.getBirthday());
        profile.setAddress(profileDTO.getAddress());
        profile.setBio(profileDTO.getBio());

        return convertToDTO(profileRepository.save(profile));
    }

    public Optional<ProfileDTO> updateProfile(Long id, ProfileCreateUpdateDTO profileDetails) {
        return profileRepository.findById(id)
                .map(profile -> {
                    if (profileDetails.getName() != null) {
                        profile.setName(profileDetails.getName());
                    }
                    if (profileDetails.getAvatar() != null) {
                        profile.setAvatar(profileDetails.getAvatar());
                    }
                    if (profileDetails.getBirthday() != null) {
                        profile.setBirthday(profileDetails.getBirthday());
                    }
                    if (profileDetails.getAddress() != null) {
                        profile.setAddress(profileDetails.getAddress());
                    }
                    if (profileDetails.getBio() != null) {
                        profile.setBio(profileDetails.getBio());
                    }
                    return convertToDTO(profileRepository.save(profile));
                });
    }

    private ProfileDTO convertToDTO(Profile profile) {
        ProfileDTO dto = new ProfileDTO();
        dto.setId(profile.getId());
        dto.setUserId(profile.getUser().getId());
        dto.setName(profile.getName());
        dto.setAvatar(profile.getAvatar());
        dto.setBirthday(profile.getBirthday());
        dto.setAddress(profile.getAddress());
        dto.setBio(profile.getBio());
        return dto;
    }
}
