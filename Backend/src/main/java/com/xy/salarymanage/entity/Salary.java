package com.xy.salarymanage.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class Salary {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String name;
    private String username;
    private String date;
    private String modalTableType;
    private SalarySummary salarySummary;
    private List<SalaryDetail> salaryDetail;
}

