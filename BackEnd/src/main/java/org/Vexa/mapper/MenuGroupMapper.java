package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.MenuGroup;
import org.Vexa.model.MenuGroupExample;
import org.apache.ibatis.annotations.Param;

public interface MenuGroupMapper {

    List<MenuGroup> allMenuGroup();

    long countByExample(MenuGroupExample example);

    int deleteByExample(MenuGroupExample example);

    int deleteByPrimaryKey(Integer groupId);

    int insert(MenuGroup record);

    int insertSelective(MenuGroup record);

    List<MenuGroup> selectByExample(MenuGroupExample example);

    MenuGroup selectByPrimaryKey(Integer groupId);

    int updateByExampleSelective(@Param("record") MenuGroup record, @Param("example") MenuGroupExample example);

    int updateByExample(@Param("record") MenuGroup record, @Param("example") MenuGroupExample example);

    int updateByPrimaryKeySelective(MenuGroup record);

    int updateByPrimaryKey(MenuGroup record);
}