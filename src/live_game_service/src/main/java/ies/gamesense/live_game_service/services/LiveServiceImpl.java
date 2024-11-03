package ies.gamesense.live_game_service.services;

import org.springframework.stereotype.Service;

import ies.gamesense.live_game_service.entities.GameStatistics;
import ies.gamesense.live_game_service.entities.GameTeam;
import ies.gamesense.live_game_service.entities.Live;

@Service
public class LiveServiceImpl implements LiveService {

    @Override
    public Live getLiveById(Long id) {
        // mock data
        Live live = new Live();
        live.setId(id);
        live.setGameStatistics(new GameStatistics());
        live.setHomeTeam(new GameTeam());
        live.setAwayTeam(new GameTeam());
        live.getHomeTeam().setName("Home Team");
        live.getAwayTeam().setName("Away Team");
        live.getHomeTeam().setScore(0);
        live.getAwayTeam().setScore(0);

        return live;

    }

    @Override
    public void createLive(Live live) {
        return;
    }

    @Override
    public GameStatistics getGameStatistics(Long id) {
        return this.getLiveById(id).getGameStatistics();
    }

}
