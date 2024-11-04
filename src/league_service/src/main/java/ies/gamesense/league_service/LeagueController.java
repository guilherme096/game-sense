package ies.gamesense.league_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/league")
public class LeagueController {

    @Autowired
    private LeagueService leagueService;

}
