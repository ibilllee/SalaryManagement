package com.xy.salarymanage.handler;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xy.salarymanage.entity.SalarySummary;
import com.xy.salarymanage.utils.DESUtil;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class SalarySummaryTypeHandler extends BaseTypeHandler<SalarySummary> {
    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, SalarySummary salarySummary, JdbcType jdbcType) throws SQLException {
        preparedStatement.setString(i, DESUtil.encrypt(JSON.toJSONString(salarySummary)));
    }

    @Override
    public SalarySummary getNullableResult(ResultSet resultSet, String s) throws SQLException {
        return JSON.parseObject(DESUtil.decrypt(resultSet.getString(s)), SalarySummary.class);
    }

    @Override
    public SalarySummary getNullableResult(ResultSet resultSet, int i) throws SQLException {
        return null;
    }

    @Override
    public SalarySummary getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        return null;
    }
}
