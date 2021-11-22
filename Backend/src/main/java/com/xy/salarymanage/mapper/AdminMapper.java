package com.xy.salarymanage.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xy.salarymanage.entity.Admin;
import com.xy.salarymanage.entity.User;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

public interface AdminMapper extends BaseMapper<Admin> {
    @Select(" SELECT * FROM admin WHERE username = #{username} AND password = #{password} ")
    User selectAdminByUsernameAndPassword(String username, String password);

    @Update(" UPDATE admin SET password=#{password} WHERE username=#{username} ")
    int updateAdminByUsername(String username, String password);
}
