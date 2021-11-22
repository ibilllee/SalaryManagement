package com.xy.salarymanage.config;

import com.xy.salarymanage.interceptor.CaptchaVerifyInterceptor;
import com.xy.salarymanage.interceptor.RiskDetectInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InterceptorBeanCreateConfig{
    @Bean
    public CaptchaVerifyInterceptor getCaptchaVerifyInterceptor(){
        return new CaptchaVerifyInterceptor();
    }

    @Bean
    public RiskDetectInterceptor getRiskDetectInterceptor(){
        return new RiskDetectInterceptor();
    }
}
