package com.penny.controllers;

import com.penny.services.GeminiService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/chat")
public class GeminiController {

    private GeminiService  geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @GetMapping("/")
    public String getGeminiReply(@RequestParam String message){
        return  geminiService.askGemini(message);
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamChat(@RequestParam String prompt) {
        return Flux.create(emitter -> {
            geminiService.streamResponse(prompt, token -> {
                emitter.next(token);
            });
            emitter.complete();
        });
    }
}