package com.penny.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.StringJoiner;

@Component
public class LoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper(response);

        long start = System.currentTimeMillis();
        try {
            filterChain.doFilter(wrappedRequest, wrappedResponse);
        } finally {
            long durationMs = System.currentTimeMillis() - start;

            StringBuilder fullUrl = new StringBuilder(wrappedRequest.getRequestURL());

            if ( !(fullUrl.indexOf("favicon.ico") != -1 || fullUrl.indexOf("default-ui.css") != -1) ) {

                String query = wrappedRequest.getQueryString();
                if (query != null && !query.isEmpty()) {
                    fullUrl.append('?').append(query);
                }

                String paramsStr = buildParamsString(wrappedRequest.getParameterMap());

                String requestBody = getBodyString(wrappedRequest.getContentAsByteArray(), getCharset(wrappedRequest.getCharacterEncoding()));
                if (requestBody.isBlank()) requestBody = "<empty>";

                int status = wrappedResponse.getStatus();
                byte[] responseBodyBytes = wrappedResponse.getContentAsByteArray();
                String responseBodyPreview = getBodyPreview(responseBodyBytes, getCharset(wrappedResponse.getCharacterEncoding()));

                String sep = "====================";
                System.out.println(sep + " HTTP DEBUG " + sep);
                System.out.println("Request:  " + wrappedRequest.getMethod() + " " + fullUrl);
                // System.out.println("Remote:   " + wrappedRequest.getRemoteAddr());
                System.out.println("Params:   " + (paramsStr.isEmpty() ? "<none>" : paramsStr));
                System.out.println("ReqBody:  " + requestBody);
                System.out.println("Response: status=" + status + ", duration=" + durationMs + "ms");
                // System.out.println("ResBody:  " + responseBodyPreview);
                System.out.println(sep + sep + sep);
            }
            wrappedResponse.copyBodyToResponse();
        }
    }

    private String buildParamsString(Map<String, String[]> parameterMap) {
        if (parameterMap == null || parameterMap.isEmpty()) return "";
        StringJoiner sj = new StringJoiner("&");
        for (Map.Entry<String, String[]> e : parameterMap.entrySet()) {
            String name = e.getKey();
            String[] values = e.getValue();
            if (values == null || values.length == 0) {
                sj.add(name + "=");
            } else {
                for (String v : values) {
                    sj.add(name + "=" + v);
                }
            }
        }
        return sj.toString();
    }

    private Charset getCharset(String enc) {
        try {
            return (enc != null && !enc.isBlank()) ? Charset.forName(enc) : StandardCharsets.UTF_8;
        } catch (Exception ignored) {
            return StandardCharsets.UTF_8;
        }
    }

    private String getBodyString(byte[] body, Charset charset) {
        if (body == null || body.length == 0) return "";
        return new String(body, charset);
    }

    private String getBodyPreview(byte[] body, Charset charset) {
        if (body == null || body.length == 0) return "<empty>";
        int max = Math.min(body.length, 1024); // limit preview to 1KB
        String text = new String(body, 0, max, charset);
        if (body.length > max) {
            return text + "... [" + body.length + " bytes]";
        }
        return text;
    }
}
