package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.Vuexmodule1;
import org.Vexa.model.Vuexmodule1Example;
import org.apache.ibatis.annotations.Param;

public interface Vuexmodule1Mapper {

    List<Vuexmodule1> allUser();

    long countByExample(Vuexmodule1Example example);

    int deleteByExample(Vuexmodule1Example example);

    int deleteByPrimaryKey(Integer userId);

    int insert(Vuexmodule1 record);

    int insertSelective(Vuexmodule1 record);

    List<Vuexmodule1> selectByExample(Vuexmodule1Example example);

    Vuexmodule1 selectByPrimaryKey(Integer userId);

    int updateByExampleSelective(@Param("record") Vuexmodule1 record, @Param("example") Vuexmodule1Example example);

    int updateByExample(@Param("record") Vuexmodule1 record, @Param("example") Vuexmodule1Example example);

    int updateByPrimaryKeySelective(Vuexmodule1 record);

    int updateByPrimaryKey(Vuexmodule1 record);
}