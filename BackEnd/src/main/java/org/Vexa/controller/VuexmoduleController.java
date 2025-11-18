package org.Vexa.controller;

import org.Vexa.model.*;
import org.Vexa.service.*;
import org.Vexa.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/vuexmodule")

public class VuexmoduleController {

    @Autowired
    private GeneralSettingService generalSettingService;
    @Autowired
    private ShopService shopService;
    @Autowired
    private GenreService genreService;
    @Autowired
    private UserLocationService userLocationService;

    @PostMapping("/1")
    public Msg generalSettings() {
        List<Generalsetting> generalSettings = generalSettingService.generalSettings();
        return Msg.success().add("generalSettings", generalSettings);
    }

    @PostMapping("/2")
    public Msg shopLists() {
        List<Shop> shopLists = shopService.shopList();
        return Msg.success().add("shopLists", shopLists);
    }

    @PostMapping("/3")
    public Msg genreLists() {
        List<Genre> genreLists = genreService.genreList();
        return Msg.success().add("genreLists", genreLists);
    }

    @PostMapping("/4")
    public Msg userLocations() {
        List<Userlocation> userLocations = userLocationService.userlocations();
        return Msg.success().add("userLocations", userLocations);
    }

}
