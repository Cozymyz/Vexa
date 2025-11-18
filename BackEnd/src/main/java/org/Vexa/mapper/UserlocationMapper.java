package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.Userlocation;
import org.Vexa.model.UserlocationExample;
import org.apache.ibatis.annotations.Param;

public interface UserlocationMapper {

    List<Userlocation> allUserLocations();

    long countByExample(UserlocationExample example);

    int deleteByExample(UserlocationExample example);

    int deleteByPrimaryKey(Integer userlocationId);

    int insert(Userlocation record);

    int insertSelective(Userlocation record);

    List<Userlocation> selectByExample(UserlocationExample example);

    Userlocation selectByPrimaryKey(Integer userlocationId);

    int updateByExampleSelective(@Param("record") Userlocation record, @Param("example") UserlocationExample example);

    int updateByExample(@Param("record") Userlocation record, @Param("example") UserlocationExample example);

    int updateByPrimaryKeySelective(Userlocation record);

    int updateByPrimaryKey(Userlocation record);
}