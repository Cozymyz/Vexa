package org.Vexa.service;

import java.util.List;

import org.Vexa.mapper.MenuGroupMapper;
import org.Vexa.model.MenuGroup;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MenuGroupService {

    @Resource
    private MenuGroupMapper menuGroupMapper;

    public List<MenuGroup> allMenuGroup() {
        List<MenuGroup> menuGroupList = menuGroupMapper.allMenuGroup();
        return menuGroupList;
    }
}