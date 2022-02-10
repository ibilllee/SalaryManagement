package com.xy.salarymanage.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xy.salarymanage.config.Constant;
import com.xy.salarymanage.dto.Environment;
import com.xy.salarymanage.entity.User;
import com.xy.salarymanage.entity.UserWx;
import com.xy.salarymanage.exception.PasswordInvalidException;
import com.xy.salarymanage.exception.RegisterException;
import com.xy.salarymanage.exception.WxAuthException;
import com.xy.salarymanage.mapper.RedisRepository;
import com.xy.salarymanage.mapper.UserMapper;
import com.xy.salarymanage.mapper.UserWxMapper;
import com.xy.salarymanage.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static com.xy.salarymanage.config.Constant.USER_TYPE;

@Service
public class UserService {
    @Autowired
    private RedisRepository redisRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserWxMapper userWxMapper;
    @Autowired
    private RiskService riskService;


    public Map<String, Object> loginUser(String username, String password, HttpSession session, Environment environment) throws UnsupportedEncodingException, NoSuchAlgorithmException, PasswordInvalidException {
        String encodedPassword = MD5Utils.encodeByMd5(password);
        User user=userMapper.selectUserByUsernameAndPassword(username, encodedPassword);
        if ( user== null) {
            riskService.saveNeedCaptcha(environment);
            throw new PasswordInvalidException();
        } else {
            String sessionId = UUID.randomUUID().toString();// generateSessionId();
            redisRepository.put(Constant.REDIS_SESSION_ID, sessionId, username, Constant.LOGIN_KEEP_TIME, TimeUnit.MINUTES);
            redisRepository.put(Constant.REDIS_SESSION_TYPE, sessionId, USER_TYPE, Constant.LOGIN_KEEP_TIME, TimeUnit.MINUTES);
            session.setAttribute(Constant.HTTP_SESSION_ID, sessionId);
            return new HashMap<String, Object>() {{
                put("expireTime", Constant.LOGIN_KEEP_TIME);
                put("decisionType", 0);
                put("name",user.getName());
            }};
        }
    }

    public Map<String,Object> loginUserByWx(String wxId) throws WxAuthException {
        QueryWrapper<UserWx> userWxQueryWrapper = new QueryWrapper<>();
        userWxQueryWrapper.eq("wx_id",wxId);
        UserWx userWx = userWxMapper.selectOne(userWxQueryWrapper);
        if(userWx==null) throw new WxAuthException("userWx Not Found(1)");
        User user = userMapper.selectByUsername(userWx.getUsername());
        if (user==null) throw new WxAuthException("user Not Found(2)");
        String sessionId = UUID.randomUUID().toString();// generateSessionId();
        redisRepository.put(Constant.REDIS_SESSION_ID, sessionId, userWx.getUsername(), Constant.LOGIN_KEEP_TIME, TimeUnit.MINUTES);
        redisRepository.put(Constant.REDIS_SESSION_TYPE, sessionId, USER_TYPE, Constant.LOGIN_KEEP_TIME, TimeUnit.MINUTES);
        return new HashMap<String, Object>() {{
            put("expireTime", Constant.LOGIN_KEEP_TIME);
            put("decisionType", 0);
            put("name",user.getName());
            put("sessionId",sessionId);
        }};
    }

    public HashMap<String,Object> checkUserLoginByWx(String wxId, String sessionId, HttpSession session) throws WxAuthException {
        QueryWrapper<UserWx> userWxQueryWrapper = new QueryWrapper<>();
        userWxQueryWrapper.eq("wx_id",wxId);
        UserWx userWx = userWxMapper.selectOne(userWxQueryWrapper);
        if(userWx==null) throw new WxAuthException("userWx Not Found(1)");
        User user = userMapper.selectByUsername(userWx.getUsername());
        if (user==null) throw new WxAuthException("user Not Found(2)");
        session.setAttribute(Constant.HTTP_SESSION_ID, sessionId);
        return new HashMap<String, Object>() {{
            put("expireTime", Constant.LOGIN_KEEP_TIME);
            put("decisionType", 0);
            put("name",user.getName());
            put("username",user.getUsername());
        }};
    }

    public boolean logoutUser(HttpSession session) {
        String sessionId = (String) session.getAttribute(Constant.HTTP_SESSION_ID);
        session.removeAttribute(Constant.HTTP_SESSION_ID);
        redisRepository.delete(Constant.REDIS_SESSION_TYPE,sessionId);
        return redisRepository.delete(Constant.REDIS_SESSION_ID, sessionId);
    }

    public boolean updateUser(HttpSession session, String password) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        String sessionId = (String) session.getAttribute(Constant.HTTP_SESSION_ID);
        String username = redisRepository.get(Constant.REDIS_SESSION_ID, sessionId);
        if (username == null) return false;
        String newPassword = MD5Utils.encodeByMd5(password);
        return userMapper.updateUserByUsername(username, newPassword) == 1;
    }

}
