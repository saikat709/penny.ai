package com.penny.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
public class ExampleController {

    @GetMapping("/")
    public String index() {
        return "<div>"
                    + "<h2>Index page, not currently implemented. <h2> <br>"
                    + "<h3>Visit for api documentation: <a href=\"http://localhost:9090/swagger-ui.html\"> http://localhost:9090/swagger-ui.html </a> <h3>"
                + "</div>";
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