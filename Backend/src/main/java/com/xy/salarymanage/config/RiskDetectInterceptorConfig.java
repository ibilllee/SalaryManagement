package com.xy.salarymanage.config;

import com.xy.salarymanage.annotation.RiskDetect;
import com.xy.salarymanage.interceptor.RiskDetectInterceptor;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.aop.support.annotation.AnnotationMatchingPointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RiskDetectInterceptorConfig
{
	@Autowired
	private RiskDetectInterceptor advice;

	@Bean
	public DefaultPointcutAdvisor getDefaultPointcutAdvisor() {
		DefaultPointcutAdvisor pointcutAdvisor = new DefaultPointcutAdvisor();
		pointcutAdvisor.setOrder(1);

		//基于方法注解进行拦截
		AnnotationMatchingPointcut pointcut = new AnnotationMatchingPointcut(null, RiskDetect.class);
//		RiskDetectInterceptor advice = new RiskDetectInterceptor();
		pointcutAdvisor.setPointcut(pointcut);
		pointcutAdvisor.setAdvice(advice);

		return pointcutAdvisor;
	}
}
