package org.Vexa.controller;


import org.Vexa.model.MenuGroup;
import org.Vexa.service.MenuGroupService;
import org.Vexa.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/menu")
public class MenuGroupController {

    @Autowired
    private MenuGroupService menuGroupService;

    @PostMapping("/allMenuGroup")
    public Msg allMenuGroup(){
        List<MenuGroup> allMenuGroupList = menuGroupService.allMenuGroup();
        return Msg.success().add("allMenuGroupList", allMenuGroupList);
    }
}