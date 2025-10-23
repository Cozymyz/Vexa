package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.Vuexmodule2;
import org.Vexa.model.Vuexmodule2Example;
import org.apache.ibatis.annotations.Param;

public interface Vuexmodule2Mapper {

    List<Vuexmodule2> allUser();

    long countByExample(Vuexmodule2Example example);

    int deleteByExample(Vuexmodule2Example example);

    int deleteByPrimaryKey(Integer userId);

    int insert(Vuexmodule2 record);

    int insertSelective(Vuexmodule2 record);

    List<Vuexmodule2> selectByExample(Vuexmodule2Example example);

    Vuexmodule2 selectByPrimaryKey(Integer userId);

    int updateByExampleSelective(@Param("record") Vuexmodule2 record, @Param("example") Vuexmodule2Example example);

    int updateByExample(@Param("record") Vuexmodule2 record, @Param("example") Vuexmodule2Example example);

    int updateByPrimaryKeySelective(Vuexmodule2 record);

    int updateByPrimaryKey(Vuexmodule2 record);
}