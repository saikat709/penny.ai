
package com.penny.controllers;

import com.penny.dto.SubscriptionCreateUpdateDTO;
import com.penny.dto.SubscriptionDTO;
import com.penny.services.SubscriptionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping
    public Page<SubscriptionDTO> getSubscriptions(Pageable pageable) {
        return subscriptionService.getSubscriptions(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> getSubscriptionById(@PathVariable Long id) {
        return subscriptionService.getSubscriptionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public SubscriptionDTO createSubscription(@RequestBody SubscriptionCreateUpdateDTO subscription) {
        return subscriptionService.createSubscription(subscription);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> updateSubscription(@PathVariable Long id, @RequestBody SubscriptionCreateUpdateDTO subscriptionDetails) {
        return subscriptionService.updateSubscription(id, subscriptionDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
