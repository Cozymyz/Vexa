package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.Vuexmodule3;
import org.Vexa.model.Vuexmodule3Example;
import org.apache.ibatis.annotations.Param;

public interface Vuexmodule3Mapper {

    List<Vuexmodule3> allUser();

    long countByExample(Vuexmodule3Example example);

    int deleteByExample(Vuexmodule3Example example);

    int deleteByPrimaryKey(Integer userId);

    int insert(Vuexmodule3 record);

    int insertSelective(Vuexmodule3 record);

    List<Vuexmodule3> selectByExample(Vuexmodule3Example example);

    Vuexmodule3 selectByPrimaryKey(Integer userId);

    int updateByExampleSelective(@Param("record") Vuexmodule3 record, @Param("example") Vuexmodule3Example example);

    int updateByExample(@Param("record") Vuexmodule3 record, @Param("example") Vuexmodule3Example example);

    int updateByPrimaryKeySelective(Vuexmodule3 record);

    int updateByPrimaryKey(Vuexmodule3 record);
}