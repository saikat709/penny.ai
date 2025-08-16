package com.penny.controllers;

import com.penny.gemini.GeminiService;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import java.util.UUID;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    private GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping("/")
    public String getGeminiReply(@RequestParam String message){
        return geminiService.askGemini(message);
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> streamChat(@RequestParam String prompt) {
        return Flux.create( sink -> {
            geminiService.streamResponse(
                    prompt,
                    token -> {
                        String randomString = UUID.randomUUID().toString();
                        sink.next(ServerSentEvent.<String>builder().event("new-token").data(token + "|" + randomString).build());
                        System.out.println(token);
                    },
                    sink::complete,
                    sink::error
            );
        });
    }
}