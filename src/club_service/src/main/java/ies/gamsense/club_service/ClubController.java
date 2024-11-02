package ies.gamsense.club_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/v1/club")
public class ClubController {

    @Autowired
    private ClubService clubService;

    // GET endpoint para retornar todos os clubes
    @GetMapping("/clubs")
    public ResponseEntity<List<Club>> getAllClubs() {
        List<Club> clubs = clubService.getAllClubs();
        return ResponseEntity.ok(clubs);
    }

    // GET endpoint para retornar um clube específico por ID
    @GetMapping("/{id}")
    public ResponseEntity<Club> getClubById(@PathVariable Long id) {
        return clubService.getClubById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET endpoint para pesquisar clubes por nome
    @GetMapping("/search")
    public ResponseEntity<List<Club>> getClubsByName(@RequestParam String name) {
        List<Club> clubs = clubService.getClubsByName(name);
        return ResponseEntity.ok(clubs);
    }

    // POST endpoint para "estrelar" um clube
    @PostMapping("/star")
    public ResponseEntity<Club> starClub(@RequestBody Club club) {
        Club starredClub = clubService.starClub(club.getId());
        return ResponseEntity.ok(starredClub);
    }
}
