package com.penny.services;

import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.StreamingResponseHandler;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.chat.StreamingChatLanguageModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiStreamingChatModel;
import dev.langchain4j.model.output.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import dev.langchain4j.data.message.AiMessage;

import java.util.List;
import java.util.function.Consumer;

@Service
public class GeminiService {

    private ChatLanguageModel model;
    private StreamingChatLanguageModel streamModel;

    private final String MODEL_NAME = "gemini-2.0-flash";

    public GeminiService(
            @Value("${gemini.api.key:${GEMINI_API_KEY:}}"
            ) String apiKey) {
        if (apiKey != null && !apiKey.isBlank()) {
            this.model = GoogleAiGeminiChatModel.builder()
                    .apiKey(apiKey)
                    .modelName(MODEL_NAME)
                    .temperature(0.7)
                    .build();

            this.streamModel = GoogleAiGeminiStreamingChatModel.builder()
                    .apiKey(apiKey)
                    .modelName(MODEL_NAME)
                    .temperature(0.7)
                    .build();
        } else {
            System.out.println("ERROR: Api key is blank.");
        }
    }

    public String askGemini(String prompt) {
        if (model == null) {
            throw new IllegalStateException("GeminiService is not configured. Provide GEMINI_API_KEY env var or 'gemini.api.key' property.");
        }
        return model.generate(List.of(new UserMessage(prompt))).content().text();
    }

    public void streamResponse(String prompt, Consumer<String> tokenConsumer, Runnable onComplete, Consumer<Throwable> onError) {
        if (streamModel == null) {
            throw new IllegalStateException("GeminiService is not configured. Provide GEMINI_API_KEY env var or 'gemini.api.key' property.");
        }
        if (tokenConsumer == null) {
            throw new IllegalArgumentException("tokenConsumer must not be null");
        }

        streamModel.generate(prompt, new StreamingResponseHandler<AiMessage>() {
            @Override
            public void onNext(String token) {
                tokenConsumer.accept(token);
            }

            @Override
            public void onComplete(Response<AiMessage> response) {
                if (onComplete != null) {
                    onComplete.run();
                }
            }

            @Override
            public void onError(Throwable error) {
                if (onError != null) {
                    onError.accept(error);
                }
            }
        });
    }

}
