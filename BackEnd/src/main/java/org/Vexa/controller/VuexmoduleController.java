package org.Vexa.controller;

import org.Vexa.model.Vuexmodule1;
import org.Vexa.model.Vuexmodule2;
import org.Vexa.model.Vuexmodule3;
import org.Vexa.model.Vuexmodule4;
import org.Vexa.service.Vuexmodule1Service;
import org.Vexa.service.Vuexmodule2Service;
import org.Vexa.service.Vuexmodule3Service;
import org.Vexa.service.Vuexmodule4Service;
import org.Vexa.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/vuexmodule")

public class VuexmoduleController {

    @Autowired
    private Vuexmodule1Service vuexmodule1Service;
    @Autowired
    private Vuexmodule2Service vuexmodule2Service;
    @Autowired
    private Vuexmodule3Service vuexmodule3Service;
    @Autowired
    private Vuexmodule4Service vuexmodule4Service;

    @PostMapping("/1")
    public Msg vuexmodule1List() {
        List<Vuexmodule1> vuexmodule1List = vuexmodule1Service.vuexmodule1List();
        return Msg.success().add("vuexmodule1List", vuexmodule1List);
    }

    @PostMapping("/2")
    public Msg vuexmodule2List() {
        List<Vuexmodule2> vuexmodule2List = vuexmodule2Service.vuexmodule2List();
        return Msg.success().add("vuexmodule2List", vuexmodule2List);
    }

    @PostMapping("/3")
    public Msg vuexmodule3List() {
        List<Vuexmodule3> vuexmodule3List = vuexmodule3Service.vuexmodule3List();
        return Msg.success().add("vuexmodule3List", vuexmodule3List);
    }

    @PostMapping("/4")
    public Msg vuexmodule4List() {
        List<Vuexmodule4> vuexmodule4List = vuexmodule4Service.vuexmodule4List();
        return Msg.success().add("vuexmodule4List", vuexmodule4List);
    }

}
