package com.xy.salarymanage.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class UserWx {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String wxId;
    private String username;
}
