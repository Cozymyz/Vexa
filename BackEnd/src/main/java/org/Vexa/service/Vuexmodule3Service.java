package org.Vexa.service;

import org.Vexa.mapper.Vuexmodule3Mapper;
import org.Vexa.model.Vuexmodule3;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class Vuexmodule3Service {

    @Resource
    private Vuexmodule3Mapper vuexmodule3Mapper;

    public List<Vuexmodule3> vuexmodule3List(){
        List<Vuexmodule3> userList = vuexmodule3Mapper.allUser();
        return userList;
    }

}
