package org.Vexa.controller;

import org.Vexa.model.MenuGroup;
import org.Vexa.model.MenuItem;
import org.Vexa.service.MenuGroupService;
import org.Vexa.service.MenuItemService;
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
public class MenuController {

    @Autowired
    private MenuGroupService menuGroupService;

    @Autowired
    protected MenuItemService menuItemService;

    @PostMapping("/allMenuGroup")
    public Msg allMenuGroup(){
        List<MenuGroup> allMenuGroupList = menuGroupService.allMenuGroup();
        return Msg.success().add("allMenuGroupList", allMenuGroupList);
    }

    @PostMapping("/selectMenuItemByGroupId")
    public Msg selectMenuItemByGroupId(int groupId){
        List<MenuItem> menuItemListByGroupId = menuItemService.selectByGroupId(groupId);
        return Msg.success().add("menuItemListByGroupId", menuItemListByGroupId);
    }
}