package ies.gamsense.club_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/club")
public class ClubController {

    @Autowired
    private ClubService clubService;

    
}
