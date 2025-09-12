package com.penny.gemini;

import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.service.AiServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeminiService {

    private final PennyAiAssistant pennyAiAssistant;

    public GeminiService(
            @Value("${gemini.api.key:${GEMINI_API_KEY:}}") String apiKey,
            TransactionTools transactionTools,
            DateTimeTools dateTimeTools
    ) {

        if (apiKey == null || apiKey.isBlank()) {
            System.out.println("ERROR: Api key is blank.");
            throw new IllegalStateException("Gemini API key is not provided.");
        }

        GoogleAiGeminiChatModel model = GoogleAiGeminiChatModel.builder()
                .apiKey(apiKey)
                .modelName("gemini-2.5-flash")
                .temperature(1.0)
                .build();

        pennyAiAssistant = AiServices.builder(PennyAiAssistant.class)
                .chatLanguageModel(model)
                .tools(transactionTools, dateTimeTools)
                .build();
    }

    public String askPennyAssistant(List<ChatMessage> messages) {
        String result = pennyAiAssistant.financeTalk(messages);
        return result;
    }
}
