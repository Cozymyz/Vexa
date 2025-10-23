package org.Vexa.service;

import org.Vexa.mapper.Vuexmodule1Mapper;
import org.Vexa.model.Vuexmodule1;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class Vuexmodule1Service {

    @Resource
    private Vuexmodule1Mapper vuexmodule1Mapper;

    public List<Vuexmodule1> vuexmodule1List(){
        List<Vuexmodule1> userList = vuexmodule1Mapper.allUser();
        return userList;
    }

}
