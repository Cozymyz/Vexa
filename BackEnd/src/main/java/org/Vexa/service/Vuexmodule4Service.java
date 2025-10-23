package org.Vexa.service;

import org.Vexa.mapper.Vuexmodule4Mapper;
import org.Vexa.model.Vuexmodule4;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class Vuexmodule4Service {

    @Resource
    private Vuexmodule4Mapper vuexmodule4Mapper;

    public List<Vuexmodule4> vuexmodule4List(){
        List<Vuexmodule4> userList = vuexmodule4Mapper.allUser();
        return userList;
    }

}
