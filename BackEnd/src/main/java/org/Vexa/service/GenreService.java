package org.Vexa.service;

import org.Vexa.mapper.GenreMapper;
import org.Vexa.model.Genre;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class GenreService {

    @Resource
    private GenreMapper genreMapper;

    public List<Genre> genreList(){
        List<Genre> genreList = genreMapper.allGenres();
        return genreList;
    }
}
