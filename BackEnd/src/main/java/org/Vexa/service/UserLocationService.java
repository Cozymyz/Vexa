package org.Vexa.service;

import org.Vexa.mapper.UserlocationMapper;
import org.Vexa.model.Userlocation;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserLocationService {

    @Resource
    private UserlocationMapper userlocationMapper;

    public List<Userlocation> userlocations(){
        List<Userlocation> userlocations = userlocationMapper.allUserLocations();
        return userlocations;
    }
}
