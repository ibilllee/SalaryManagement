package com.xy.salarymanage.entity;

import lombok.Data;

@Data
public class SalaryDetail {
    private int key;
    private String paid;
    private String paidPrice;
    private String deduct;
    private String deductPrice;
    private String title;
    private String content;
}
