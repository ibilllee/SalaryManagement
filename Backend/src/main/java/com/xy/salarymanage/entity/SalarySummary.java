package com.xy.salarymanage.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SalarySummary {
    @JsonProperty("sPaid")
    private String sPaid;
    @JsonProperty("sDeduct")
    private String sDeduct;
    @JsonProperty("rPaid")
    private String rPaid;
}
