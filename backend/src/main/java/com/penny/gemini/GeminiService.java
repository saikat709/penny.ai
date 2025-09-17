package com.penny.gemini;

import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.model.chat.ChatLanguageModel;
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
            DateTimeTools dateTimeTools,
            ReportTools reportTools
    ) {

        if (apiKey == null || apiKey.isBlank()) {
            System.out.println("ERROR: Api key is blank.");
            throw new IllegalStateException("Gemini API key is not provided.");
        }

        ChatLanguageModel model = GoogleAiGeminiChatModel.builder()
                .apiKey(apiKey)
                .modelName("gemini-2.5-flash")
                .temperature(0.7)
                .build();

        pennyAiAssistant = AiServices.builder(PennyAiAssistant.class)
                .chatLanguageModel(model)
                .tools(transactionTools, dateTimeTools, reportTools)
                .build();
    }

    public String askPennyAssistant(List<ChatMessage> mgs) {
        return pennyAiAssistant.financeTalk(mgs);
    }
}
