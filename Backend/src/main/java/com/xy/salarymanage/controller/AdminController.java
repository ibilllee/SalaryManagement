package com.xy.salarymanage.controller;

import com.xy.salarymanage.annotation.CaptchaVerify;
import com.xy.salarymanage.annotation.RiskDetect;
import com.xy.salarymanage.dto.Environment;
import com.xy.salarymanage.dto.RespBean;
import com.xy.salarymanage.dto.Verify;
import com.xy.salarymanage.exception.PasswordInvalidException;
import com.xy.salarymanage.service.AdminService;
import com.xy.salarymanage.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @CaptchaVerify
    @RiskDetect
    @PostMapping("/login")
    public RespBean login(Environment environment, Verify verify,
                          @RequestParam String username,
                          @RequestParam String password,
                          HttpSession session) {
        Map<String, Object> result;
        try {
            result = adminService.loginAdmin(username, password, session, environment);
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
            adminService.logoutAdmin(session);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return RespBean.ok("登出成功");
    }

    @PutMapping("/update")
    public RespBean update(HttpSession session, @RequestParam String password) {
        boolean result = false;
        try {
            result = adminService.updateAdmin(session, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result ? RespBean.ok("修改成功") : RespBean.unprocessable("修改失败");
    }

    //创建账号
    @PostMapping("/registerUser")
    public RespBean registerUser( String username, String name) {
        boolean result;
        try {
            result = adminService.registerUser(username,name);
        } catch (Exception e) {
            e.printStackTrace();
            return RespBean.unprocessable("注册失败：" + e.getMessage());
        }
        if (result) return RespBean.ok("注册成功");
        return RespBean.unprocessable("注册失败");
    }

    //恢复密码
    @PostMapping("/restoreUser/{username}")
    public RespBean restoreUser(@PathVariable String username) {
        boolean result;
        try {
            result = adminService.restoreUser(username);
        } catch (Exception e) {
            log.error(e.getMessage());
            return RespBean.unprocessable("修改失败：" + e.getMessage());
        }
        return result ? RespBean.ok("修改成功") : RespBean.unprocessable("修改失败");
    }

    //删除账号
    @DeleteMapping("/deleteUser/{username}")
    public RespBean deleteUser(@PathVariable String username) {
        boolean result;
        try {
            result = adminService.deleteUser(username);
        } catch (Exception e) {
            log.error(e.getMessage());
            return RespBean.unprocessable("删除失败：登录失败" + e.getMessage());
        }
        return result ? RespBean.ok("删除成功") : RespBean.unprocessable("删除失败");
    }

    @GetMapping("/getAllUser")
    public RespBean getAllUser(){
        try {
            HashMap<String, Object> result = adminService.getAllUser();
            return RespBean.ok("获取成功",result);
        }catch (Exception e){
            log.error(e.getMessage());
            return RespBean.unprocessable("获取失败："+e.getMessage());
        }
    }
}
