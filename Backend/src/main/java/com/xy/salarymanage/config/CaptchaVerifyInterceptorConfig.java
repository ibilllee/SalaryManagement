package com.xy.salarymanage.config;

import com.xy.salarymanage.annotation.CaptchaVerify;
import com.xy.salarymanage.interceptor.CaptchaVerifyInterceptor;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.aop.support.annotation.AnnotationMatchingPointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CaptchaVerifyInterceptorConfig
{
	@Autowired
	private CaptchaVerifyInterceptor advice;

	@Bean
	public DefaultPointcutAdvisor getDefaultPointcutAdvisor2() {
		DefaultPointcutAdvisor pointcutAdvisor = new DefaultPointcutAdvisor();
		pointcutAdvisor.setOrder(2);

		//基于方法注解进行拦截
		AnnotationMatchingPointcut pointcut = new AnnotationMatchingPointcut(null, CaptchaVerify.class);
		pointcutAdvisor.setPointcut(pointcut);
		pointcutAdvisor.setAdvice(advice);

		return pointcutAdvisor;
	}
}
