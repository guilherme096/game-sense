package ies.gamesense.live_game_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ies.gamesense.live_game_service.entities.Live;
import ies.gamesense.live_game_service.repository.LiveRepository;

@Service
public class LiveServiceImpl implements LiveService {

    @Autowired
    private LiveRepository liveRepository;

    @Override
    public Live getLiveById(Long id) {
        // mock data
        Live live = new Live();
        this.liveRepository.save(live);

        return liveRepository.findById(id).orElse(null);
    }

}
