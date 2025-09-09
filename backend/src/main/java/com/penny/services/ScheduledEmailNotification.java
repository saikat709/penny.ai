package com.penny.services;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledEmailNotification {

    @Scheduled(fixedRate = 60000)
    public void checkReportSchedule(){
        // TODO: Check database pref entity if it is time to send report.

    }

    @Scheduled(fixedRate = 60000)
    public void dailyNotification(){
        // TODO: For those who checked

    }

}
