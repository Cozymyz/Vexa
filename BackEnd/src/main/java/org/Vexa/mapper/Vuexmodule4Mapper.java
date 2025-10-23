package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.Vuexmodule4;
import org.Vexa.model.Vuexmodule4Example;
import org.apache.ibatis.annotations.Param;

public interface Vuexmodule4Mapper {

    List<Vuexmodule4> allUser();

    long countByExample(Vuexmodule4Example example);

    int deleteByExample(Vuexmodule4Example example);

    int deleteByPrimaryKey(Integer userId);

    int insert(Vuexmodule4 record);

    int insertSelective(Vuexmodule4 record);

    List<Vuexmodule4> selectByExample(Vuexmodule4Example example);

    Vuexmodule4 selectByPrimaryKey(Integer userId);

    int updateByExampleSelective(@Param("record") Vuexmodule4 record, @Param("example") Vuexmodule4Example example);

    int updateByExample(@Param("record") Vuexmodule4 record, @Param("example") Vuexmodule4Example example);

    int updateByPrimaryKeySelective(Vuexmodule4 record);

    int updateByPrimaryKey(Vuexmodule4 record);
}