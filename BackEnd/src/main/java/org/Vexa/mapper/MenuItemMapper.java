package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.MenuItem;
import org.Vexa.model.MenuItemExample;
import org.apache.ibatis.annotations.Param;

public interface MenuItemMapper {
    long countByExample(MenuItemExample example);

    int deleteByExample(MenuItemExample example);

    int deleteByPrimaryKey(Integer itemId);

    int insert(MenuItem record);

    int insertSelective(MenuItem record);

    List<MenuItem> selectByExample(MenuItemExample example);

    MenuItem selectByPrimaryKey(Integer itemId);

    int updateByExampleSelective(@Param("record") MenuItem record, @Param("example") MenuItemExample example);

    int updateByExample(@Param("record") MenuItem record, @Param("example") MenuItemExample example);

    int updateByPrimaryKeySelective(MenuItem record);

    int updateByPrimaryKey(MenuItem record);
}