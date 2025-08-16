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
        return geminiService.askGemini(message);
    }

    @CrossOrigin(origins = {"http://127.0.0.1:5173", "http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:3000"})
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamChat(@RequestParam String prompt) {

        return Flux.create( sink -> {
            geminiService.streamResponse(
                    prompt,
                    token -> {
                        sink.next(token);
                        System.out.println(token);
                    },
                    sink::complete,
                    sink::error
            );
        });
    }
}