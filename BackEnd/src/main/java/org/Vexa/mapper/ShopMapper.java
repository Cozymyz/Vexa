package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.Shop;
import org.Vexa.model.ShopExample;
import org.apache.ibatis.annotations.Param;

public interface ShopMapper {

    List<Shop> allShops();

    long countByExample(ShopExample example);

    int deleteByExample(ShopExample example);

    int deleteByPrimaryKey(Integer shopId);

    int insert(Shop record);

    int insertSelective(Shop record);

    List<Shop> selectByExample(ShopExample example);

    Shop selectByPrimaryKey(Integer shopId);

    int updateByExampleSelective(@Param("record") Shop record, @Param("example") ShopExample example);

    int updateByExample(@Param("record") Shop record, @Param("example") ShopExample example);

    int updateByPrimaryKeySelective(Shop record);

    int updateByPrimaryKey(Shop record);
}