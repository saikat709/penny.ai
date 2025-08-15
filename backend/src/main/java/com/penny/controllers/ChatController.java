package com.penny.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Arrays;

@RestController
public class ChatController {

    @GetMapping(value = "/chat/stream-test", produces = MediaType.TEXT_HTML_VALUE)
    public String chatStreamTestPage() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/chat-stream-test.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

}
