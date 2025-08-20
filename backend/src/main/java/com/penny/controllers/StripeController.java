package com.penny.controllers;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.oauth.TokenResponse;
import com.stripe.net.OAuth;
import com.stripe.net.RequestOptions;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    @Value("${stripe.client.id:}")
    private String clientId;

    @GetMapping("/connect")
    public ResponseEntity<Map<String, String>> createConnectLink() {
        String redirectUri = "https://yourdomain.com/stripe/callback"; // frontend callback URL

        String url = "https://connect.stripe.com/oauth/authorize" +
                "?response_type=code" +
                "&client_id=" + clientId +
                "&scope=read_write" +
                "&redirect_uri=" + redirectUri;

        return ResponseEntity.ok(Map.of("url", url));
    }


    @PostMapping("/oauth/callback")
    public ResponseEntity<String> handleCallback(@RequestParam String code) throws Exception {

        Map<String, Object> params = new HashMap<>();
        params.put("client_secret", Stripe.apiKey);
        params.put("code", code);
        params.put("grant_type", "authorization_code");

        RequestOptions requestOptions = RequestOptions.builder().setApiKey(Stripe.apiKey).build();
        TokenResponse response = OAuth.token(params, requestOptions);
        String connectedAccountId = response.getStripeUserId();

        return ResponseEntity.ok("Connected account ID: " + connectedAccountId);
    }


    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload,
                                                    @RequestHeader("Stripe-Signature") String sigHeader) {
        String endpointSecret = "whsec_123..."; // from your Stripe dashboard

        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch ( SignatureVerificationException e ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }

        String accountId = event.getAccount();

        switch (event.getType()) {
            case "payment_intent.succeeded":
                // handle success for accountId
                break;
            case "charge.refunded":
                // handle refund for accountId
                break;
            case "payout.paid":
                // handle payout for accountId
                break;
            case "account.updated":
                // handle account update for accountId
                break;
            default:
                // ignore other events
        }
        return ResponseEntity.ok("Received");
    }
}