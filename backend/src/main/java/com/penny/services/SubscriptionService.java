
package com.penny.services;

import com.penny.dto.SubscriptionCreateUpdateDTO;
import com.penny.dto.SubscriptionDTO;
import com.penny.models.Subscription;
import com.penny.models.UserEntity;
import com.penny.repositories.SubscriptionRepository;
import com.penny.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    public Page<SubscriptionDTO> getSubscriptions(Pageable pageable) {
        return subscriptionRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<SubscriptionDTO> getSubscriptionById(Long id) {
        return subscriptionRepository.findById(id).map(this::convertToDTO);
    }

    public SubscriptionDTO createSubscription(SubscriptionCreateUpdateDTO subscriptionDTO) {
        UserEntity user = userRepository.findById(subscriptionDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setAmount(subscriptionDTO.getAmount());
        subscription.setDate(subscriptionDTO.getDate());
        subscription.setIsRecurring(subscriptionDTO.getIsRecurring());
        subscription.setAutoPay(subscriptionDTO.getAutoPay());

        return convertToDTO(subscriptionRepository.save(subscription));
    }

    public Optional<SubscriptionDTO> updateSubscription(Long id, SubscriptionCreateUpdateDTO subscriptionDetails) {
        return subscriptionRepository.findById(id)
                .map(subscription -> {
                    if (subscriptionDetails.getAmount() != null) {
                        subscription.setAmount(subscriptionDetails.getAmount());
                    }
                    if (subscriptionDetails.getDate() != null) {
                        subscription.setDate(subscriptionDetails.getDate());
                    }
                    if (subscriptionDetails.getIsRecurring() != null) {
                        subscription.setIsRecurring(subscriptionDetails.getIsRecurring());
                    }
                    if (subscriptionDetails.getAutoPay() != null) {
                        subscription.setAutoPay(subscriptionDetails.getAutoPay());
                    }
                    return convertToDTO(subscriptionRepository.save(subscription));
                });
    }

    private SubscriptionDTO convertToDTO(Subscription subscription) {
        SubscriptionDTO dto = new SubscriptionDTO();
        dto.setId(subscription.getId());
        dto.setUserId(subscription.getUser().getId());
        dto.setAmount(subscription.getAmount());
        dto.setDate(subscription.getDate());
        dto.setIsRecurring(subscription.getIsRecurring());
        dto.setAutoPay(subscription.getAutoPay());
        return dto;
    }
}
