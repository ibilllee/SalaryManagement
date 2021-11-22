package com.xy.salarymanage.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xy.salarymanage.dto.Filter;
import com.xy.salarymanage.entity.Salary;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface SalaryMapper extends BaseMapper<Salary> {
}