package ies.gamesense.league_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeagueService {

    @Autowired
    private LeagueRepository leagueRepository;
}
