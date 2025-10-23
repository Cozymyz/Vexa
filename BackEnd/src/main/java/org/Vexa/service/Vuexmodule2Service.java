package org.Vexa.service;

import org.Vexa.mapper.Vuexmodule2Mapper;
import org.Vexa.model.Vuexmodule2;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class Vuexmodule2Service {

    @Resource
    private Vuexmodule2Mapper vuexmodule2Mapper;

    public List<Vuexmodule2> vuexmodule2List(){
        List<Vuexmodule2> userList = vuexmodule2Mapper.allUser();
        return userList;
    }

}
