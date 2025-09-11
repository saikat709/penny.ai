package com.penny.gemini;

import dev.langchain4j.agent.tool.Tool;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class DateTimeTools {

    @Tool("Get the current date and time in ISO 8601 format (e.g., '2023-01-01T12:30:00Z').")
    public String getCurrentDateTime() {
        return OffsetDateTime.now().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }
}
