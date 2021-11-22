package com.xy.salarymanage.controller;

import com.alibaba.fastjson.JSON;
import com.xy.salarymanage.dto.Filter;
import com.xy.salarymanage.dto.RespBean;
import com.xy.salarymanage.entity.Salary;
import com.xy.salarymanage.service.SalaryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/salary")
public class SalaryController {
    @Autowired
    private SalaryService salaryService;

    @PostMapping("/add")
    public RespBean addSalaryList(@RequestBody List<Salary> salaryList) {
        int result;
        try {
            result = salaryService.addSalaryList(salaryList);
        } catch (Exception e) {
            log.error(e.getMessage());
            return RespBean.unprocessable("添加失败:" + e.getMessage());
        }
        return RespBean.ok("添加成功", new HashMap<String, Object>() {{
            put("msg", "成功添加" + result + "条工资记录");
        }});
    }

    @GetMapping("/get")
    public RespBean getSalaryList(@RequestParam int currentPage,
                                  @RequestParam int pageSize,
                                  @RequestParam("filter") String filterStr,
                                  HttpSession session) {
        Filter filter = JSON.parseObject(filterStr, Filter.class);
        System.out.println(filter);
        System.out.println(filterStr);
        HashMap<String, Object> result;
        try {
            result = salaryService.getSalaryListByCurrentPageAndPageSize(currentPage, pageSize, filter, session);
        } catch (Exception e) {
            log.error(e.getMessage());
            return RespBean.unprocessable("获取失败:" + e.getMessage());
        }
        return result == null ?
                RespBean.unprocessable("获取失败") :
                RespBean.ok("获取成功", result);
    }

    @PostMapping("/check")
    public RespBean checkSalaryList(@RequestBody List<Salary> salaryList) {
        HashMap<String, Object> result;
        try {
            result = salaryService.checkSalaryList(salaryList);
        } catch (Exception e) {
            log.error(e.getMessage());
            return RespBean.unprocessable("获取失败:" + e.getMessage());
        }
        return RespBean.ok("获取成功", result);
    }

    @DeleteMapping("/delete")
    public RespBean deleteSalaryList(@RequestBody List<Salary> salaryList) {
        int result;
        try {
            result = salaryService.deleteSalaryList(salaryList);
        } catch (Exception e) {
            log.error(e.getMessage());
            return RespBean.unprocessable("删除失败:" + e.getMessage());
        }
        if (result == -1)
            return RespBean.ok("成功删除" + salaryList.size() + "条记录");
        return RespBean.unprocessable("删除异常，删除了" + salaryList.size() + "条记录");
    }
}