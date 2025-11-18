package org.Vexa.service;

import org.Vexa.mapper.GeneralsettingMapper;
import org.Vexa.model.Generalsetting;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class GeneralSettingService {

    @Resource
    private GeneralsettingMapper generalsettingMapper;

    public List<Generalsetting> generalSettings(){
        List<Generalsetting> generalSettings = generalsettingMapper.allGeneralSettings();
        return generalSettings;
    }
}
