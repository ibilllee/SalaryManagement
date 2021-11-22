package com.xy.salarymanage.mapper;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xy.salarymanage.entity.Salary;
import com.xy.salarymanage.entity.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface UserMapper extends BaseMapper<User> {
    @Select(" SELECT * FROM user WHERE username = #{username} AND password = #{password} ")
    User selectUserByUsernameAndPassword(String username, String password);

    @Delete(" DELETE FROM user WHERE username = #{username} ")
    Integer deleteByUsername(String username);

    @Select(" SELECT COUNT(*) FROM user WHERE username=#{username} ")
    Integer selectCountByUsername(String username);

    @Select(" SELECT * FROM user WHERE username=#{username} ")
    User selectByUsername(String username);

    @Update(" UPDATE user SET password=#{password} WHERE username=#{username} ")
    Integer updateUserByUsername(String username, String password);

    @Select(" SELECT id,name,username FROM user ")
    List<User> selectAllWithoutPassword();
}
