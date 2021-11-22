package com.xy.salarymanage.handler;

import com.alibaba.fastjson.JSON;
import com.xy.salarymanage.entity.SalaryDetail;
import com.xy.salarymanage.utils.DESUtil;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

//@MappedJdbcTypes({JdbcType.VARCHAR})
//@MappedTypes(value = {SalaryDetail.class})
public class SalaryDetailTypeHandler extends BaseTypeHandler<List<SalaryDetail>> {
    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, List<SalaryDetail> salaryDetails, JdbcType jdbcType) throws SQLException {
        preparedStatement.setString(i, DESUtil.encrypt(JSON.toJSONString(salaryDetails)));
    }

    @Override
    public List<SalaryDetail> getNullableResult(ResultSet resultSet, String s) throws SQLException {
        return JSON.parseArray(DESUtil.decrypt(resultSet.getString(s)),SalaryDetail.class);
    }

    @Override
    public List<SalaryDetail> getNullableResult(ResultSet resultSet, int i) throws SQLException {
        return null;
    }

    @Override
    public List<SalaryDetail> getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        return null;
    }
}

