package org.Vexa.service;

import org.Vexa.mapper.ShopMapper;
import org.Vexa.model.Shop;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ShopService {

    @Resource
    private ShopMapper shopMapper;

    public List<Shop> shopList(){
        List<Shop> shopList = shopMapper.allShops();
        return shopList;
    }
}
