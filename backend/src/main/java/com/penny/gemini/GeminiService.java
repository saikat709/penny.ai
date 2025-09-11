package com.penny.gemini;

import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.service.AiServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    public String askPennyAssistant(String prompt, Long userId) {
        try {
            String result = pennyAiAssistant.financeTalk(prompt, userId);
            if ( result == null || result.isBlank() ) {
                return "I'm sorry, I couldn't generate a response right now. Please try again.";
            }
            return result;
        } catch (NullPointerException npe) {
            System.err.println("[GeminiService] Caught NullPointerException while processing AI response: " + npe.getMessage());
            return "I'm sorry, I couldn't generate a response right now. Please try again.";
        } catch (Exception ex) {
            System.err.println("[GeminiService] Error while calling PennyAiAssistant: " + ex.getMessage());
            return "Something went wrong while processing your request. Please try again.";
        }
    }
}
