package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.Generalsetting;
import org.Vexa.model.GeneralsettingExample;
import org.apache.ibatis.annotations.Param;

public interface GeneralsettingMapper {

    List<Generalsetting> allGeneralSettings();

    long countByExample(GeneralsettingExample example);

    int deleteByExample(GeneralsettingExample example);

    int deleteByPrimaryKey(Integer settingId);

    int insert(Generalsetting record);

    int insertSelective(Generalsetting record);

    List<Generalsetting> selectByExample(GeneralsettingExample example);

    Generalsetting selectByPrimaryKey(Integer settingId);

    int updateByExampleSelective(@Param("record") Generalsetting record, @Param("example") GeneralsettingExample example);

    int updateByExample(@Param("record") Generalsetting record, @Param("example") GeneralsettingExample example);

    int updateByPrimaryKeySelective(Generalsetting record);

    int updateByPrimaryKey(Generalsetting record);
}