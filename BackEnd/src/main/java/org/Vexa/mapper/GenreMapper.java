package org.Vexa.mapper;

import java.util.List;
import org.Vexa.model.Genre;
import org.Vexa.model.GenreExample;
import org.apache.ibatis.annotations.Param;

public interface GenreMapper {

    List<Genre> allGenres();

    long countByExample(GenreExample example);

    int deleteByExample(GenreExample example);

    int deleteByPrimaryKey(Integer genreId);

    int insert(Genre record);

    int insertSelective(Genre record);

    List<Genre> selectByExample(GenreExample example);

    Genre selectByPrimaryKey(Integer genreId);

    int updateByExampleSelective(@Param("record") Genre record, @Param("example") GenreExample example);

    int updateByExample(@Param("record") Genre record, @Param("example") GenreExample example);

    int updateByPrimaryKeySelective(Genre record);

    int updateByPrimaryKey(Genre record);
}