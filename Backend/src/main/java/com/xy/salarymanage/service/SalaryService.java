package com.xy.salarymanage.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xy.salarymanage.config.Constant;
import com.xy.salarymanage.dto.Filter;
import com.xy.salarymanage.entity.Salary;
import com.xy.salarymanage.entity.User;
import com.xy.salarymanage.mapper.RedisRepository;
import com.xy.salarymanage.mapper.SalaryMapper;
import com.xy.salarymanage.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import static com.xy.salarymanage.config.Constant.USER_TYPE;

@Service
public class SalaryService {
    @Autowired
    private SalaryMapper salaryMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RedisRepository redisRepository;

    public int addSalaryList(List<Salary> salaryList) {
        int count = 0;
        for (Salary salary : salaryList) {
            count += salaryMapper.insert(salary);
        }
        return count;
    }

    public HashMap<String, Object> getSalaryListByCurrentPageAndPageSize(int currentPage, int pageSize, Filter filter, HttpSession session) {
        String sessionId = (String) session.getAttribute(Constant.HTTP_SESSION_ID);
        String username = "";
        String userType = redisRepository.get(Constant.REDIS_SESSION_TYPE, sessionId);
        if (userType == null) {
            return new HashMap<String, Object>() {{
                put("total", 0);
                put("salaryList", null);
            }};
        }

        int currentIndex = (currentPage - 1) * pageSize;
        QueryWrapper<Salary> wrapper = new QueryWrapper<>();
        if (USER_TYPE.equals(userType)) {
            username = redisRepository.get(Constant.REDIS_SESSION_ID, sessionId);
            wrapper.eq("username", username);
        }

        wrapper.like("name", filter.getName())
                .like("date", filter.getDate())
                .like("username", filter.getUsername())
                .orderByDesc("id");

        return new HashMap<String, Object>() {{
            put("total", salaryMapper.selectCount(wrapper));
            put("salaryList", salaryMapper.selectList(
                    wrapper.last(" LIMIT " + currentIndex + " , " + pageSize + " ")
            ));
        }};
    }

    public HashMap<String, Object> checkSalaryList(List<Salary> salaryList) {
        int count = 0;
        List<String> msgList = new ArrayList<>();
        for (int i = 0, lim = salaryList.size(); i < lim; i++) {
            Salary salary = salaryList.get(i);
            User user = userMapper.selectByUsername(salary.getUsername());
            if (user == null) {
                msgList.add("第" + (i + 1) + "条记录:未在系统中找到身份证为" + salary.getUsername() + "的账号");
                count++;
            } else if (!Objects.equals(user.getName(), salary.getName())) {
                msgList.add("第" + (i + 1) + "条记录:工资信息中身份证(" + salary.getUsername() + ")对应的姓名(" + salary.getName() + ")，与系统存储信息(" + user.getName() + ")不同");
                count++;
            }
        }
        if (count == 0) {
            return new HashMap<String, Object>() {{
                put("result", 0);
            }};
        } else return new HashMap<String, Object>() {{
            put("result", 1);
            put("msg", msgList);
        }};
    }

    public int deleteSalaryList(List<Salary> salaryList) {
        int count = 0;
        for (Salary salary : salaryList) {
            count += salaryMapper.deleteById(salary.getId());
        }
        if(count==salaryList.size())    return -1;
        return count;

    }
}
