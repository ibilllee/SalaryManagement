package com.xy.salarymanage.controller;

import com.xy.salarymanage.annotation.CaptchaVerify;
import com.xy.salarymanage.annotation.RiskDetect;
import com.xy.salarymanage.dto.Environment;
import com.xy.salarymanage.dto.RespBean;
import com.xy.salarymanage.dto.Verify;
import com.xy.salarymanage.exception.PasswordInvalidException;
import com.xy.salarymanage.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @CaptchaVerify
    @RiskDetect
    @PostMapping("/login")
    public RespBean login(Environment environment, Verify verify,
                          @RequestParam String username,
                          @RequestParam String password,
                          HttpSession session) {
        Map<String, Object> result;
        try {
            result = userService.loginUser(username, password, session, environment);
        } catch (PasswordInvalidException e) {
            HashMap<String, Object> data = new HashMap<String, Object>() {{
                put("decisionType", 1);
            }};
            return RespBean.unprocessable("登录失败：用户名或密码错误", data);
        } catch (Exception e) {
            return RespBean.unprocessable(e.getMessage());
        }
        if (result != null) {
            return RespBean.ok("登录成功", result);//返回结果对象
        }
        return RespBean.unprocessable("登录失败");
    }

    @PutMapping("/logout")
    public RespBean logout(HttpSession session) {
        try {
            userService.logoutUser(session);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return RespBean.ok("登出成功");

    }

    @PutMapping("/update")
    public RespBean update(HttpSession session, @RequestParam String password) {
        boolean result = false;
        try {
            result = userService.updateUser(session, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result ? RespBean.ok("修改成功") : RespBean.unprocessable("修改失败");
    }

//    @PutMapping("/cancelAccount")
//    public RespBean cancelAccount(HttpSession session) {
//        try {
//            userService.cancelAccount(session);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return RespBean.ok("注销成功");
//    }
}
