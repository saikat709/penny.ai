package com.penny.services;

import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Consumer;

@Service
public class GeminiService {

    private GoogleAiGeminiChatModel model;

    public GeminiService(@Value("${gemini.api.key:${GEMINI_API_KEY:}}") String apiKey) {
        if (apiKey != null && !apiKey.isBlank()) {
            this.model = GoogleAiGeminiChatModel.builder()
                    .apiKey(apiKey)
                    .modelName("gemini-2.0-flash")
                    .temperature(0.7)
                    .build();
        }
    }

    public String askGemini(String prompt) {
        if (model == null) {
            throw new IllegalStateException("GeminiService is not configured. Provide GEMINI_API_KEY env var or 'gemini.api.key' property.");
        }
        return model.generate(List.of(new UserMessage(prompt))).content().text();
    }

    public void streamResponse(String prompt, Consumer<String> tokenConsumer) {
        model.generate(
                new UserMessage(prompt),
                partialResponse -> {
                    if (partialResponse.content() != null) {
                        tokenConsumer.accept(partialResponse.content());
                    }
                }
        );
    }
}
