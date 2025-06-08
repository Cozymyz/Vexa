package org.Vexa.service;

import org.Vexa.mapper.MenuItemMapper;
import org.Vexa.model.MenuItem;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class MenuItemService {

    @Resource
    private MenuItemMapper menuItemMapper;

    public List<MenuItem> selectByGroupId(int groupId) {
        List<MenuItem> menuItemList = menuItemMapper.selectByGroupId(groupId);
        return menuItemList;
    }
}