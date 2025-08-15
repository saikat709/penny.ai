package com.penny.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Random;

@RestController
public class ExampleController {

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String index() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/index.html");
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    // Accept optional body on GET and echo it back if present; otherwise return default text
    @GetMapping(value = "/test")
    public String testGet(@RequestBody(required = false) String body) {
        if (body == null || body.isBlank()) {
            return "test auto reload....";
        }
        return body;
    }

    // Proper semantics: POST /test to send JSON; it will echo the body back.
    @PostMapping(value = "/test", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String testPost(@RequestBody String body) {
        return body;
    }

    @GetMapping("/number")
    public Integer auto(){
        return new Random().nextInt(10);
    }

    @GetMapping("/secured")
    public String secured(){
        return "secured page, meaning you are logged in. <a href=\"logout\"> logout </a>";
    }

}