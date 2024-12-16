import subprocess
import random
import os
import signal
import sys
import time
from models import Team, Player
import json
import itertools
import requests
from time import sleep


class LeagueScheduler:
    def __init__(self, teams):
        self.teams = teams
        self.num_teams = len(teams)
        self.schedule = self.generate_schedule(3)
        self.processes = []

    def generate_schedule(self, num_rounds):
        if self.num_teams % 2 != 0:
            raise ValueError("Number of teams must be even")

        base_schedule = self._create_base_schedule()

        random.shuffle(base_schedule)

        full_schedule = []
        matches_played = set()

        for i in range(len(self.teams)):
            teams_in_journey = set()

            for match in base_schedule:
                home_team, away_team = match

                if (
                    tuple(sorted([home_team, away_team], key=lambda x: x.name))
                    in matches_played
                ):
                    continue

                if home_team in teams_in_journey or away_team in teams_in_journey:
                    continue

                teams_in_journey.add(home_team)
                teams_in_journey.add(away_team)
                match_key = tuple(sorted([home_team, away_team], key=lambda x: x.name))
                matches_played.add(match_key)

                full_schedule.append((home_team, away_team))

        # repeat schedule but switch home and away teams
        full_schedule += [
            (away_team, home_team) for home_team, away_team in full_schedule
        ]

        print("Full schedule:")
        for match in full_schedule:
            print(f"Match: {match[0].name} vs {match[1].name}")

        return full_schedule

    def _create_base_schedule(self):
        # Create all possible matches
        all_matches = list(itertools.permutations(self.teams, 2))
        print("All matches:")
        for match in all_matches:
            print(f"Match: {match[0].name} vs {match[1].name}")

        # Group matches to ensure variety
        match_groups = {}
        for match in all_matches:
            # Sort the match to create a unique key
            key = tuple(sorted(match, key=lambda x: x.name))
            if match[0] not in match_groups and match[1] not in match_groups:
                match_groups[(key, match[0], match[1])] = match

        print("Match groups:")
        for match in match_groups.values():
            print(f"Match: {match[0].name} vs {match[1].name}")

        # Convert back to list of matches
        return list(match_groups.values())

    def start_game_producers(self):
        """
        Start game producers for each match in pairs
        """

        def run_producer(home_team, away_team):
            """
            Run a game producer subprocess
            """
            try:
                env = os.environ.copy()
                env["HOME_TEAM"] = json.dumps(home_team.to_dict())
                env["AWAY_TEAM"] = json.dumps(away_team.to_dict())

                return subprocess.Popen(["python", "game_producer.py"], env=env)
            except Exception as e:
                print(f"Error : {e}")
                return None

        # Reset processes
        self.processes = []
        print("Starting game producers...")
        print(self.schedule)

        # Schedule matches in pairs
        for i in range(0, len(self.schedule), 4):
            match1 = self.schedule[i]
            match2 = self.schedule[i + 1]
            match3 = self.schedule[i + 2]
            match4 = self.schedule[i + 3]


            home_team1, away_team1 = match1
            home_team2, away_team2 = match2
            home_team3, away_team3 = match3
            home_team4, away_team4 = match4

            print(
                f"Round {i//2 + 1}: "
                f"{home_team1.name} vs {away_team1.name}, "
                f"{home_team2.name} vs {away_team2.name}"
            )

            # Start producers for both matches
            process1 = run_producer(home_team1, away_team1)
            process2 = run_producer(home_team2, away_team2)
            process3 = run_producer(home_team3, away_team3)
            process4 = run_producer(home_team4, away_team4)

            if process1:
                self.processes.append(process1)
            if process2:
                self.processes.append(process2)
            if process3:
                self.processes.append(process3)
            if process4:
                self.processes.append(process4)

            time.sleep(1.5 * 60)

    def wait_for_producers(self):
        """
        Wait for all game producers to complete
        """
        for process in self.processes:
            process.wait()

    def terminate_producers(self):
        """
        Terminate all running producers
        """
        for process in self.processes:
            try:
                process.terminate()
            except Exception as e:
                print(f"Error terminating process: {e}")


def create_team_players(team_name, team_id):
    """
    Create sample players for a team based on the game generator example
    """
    # Sample player generation logic similar to game_generator.py
    starting_squad = [
        Player(f"{team_name} Goalkeeper", 1, 1),
        Player(f"{team_name} Defender 1", [4, 5], 2),
        Player(f"{team_name} Defender 2", [4, 5], 3),
        Player(f"{team_name} Defender 3", 3, 4),
        Player(f"{team_name} Midfielder 1", 6, 5),
        Player(f"{team_name} Midfielder 2", 8, 6),
        Player(f"{team_name} Midfielder 3", 10, 7),
        Player(f"{team_name} Winger", 7, 8),
        Player(f"{team_name} Striker", 9, 9),
        Player(f"{team_name} Forward", 11, 10),
        Player(f"{team_name} Defender 4", 2, 11),
    ]

    subs_squad = [
        Player(f"{team_name} Sub Goalkeeper", 1, 12),
        Player(f"{team_name} Sub Defender", [4, 5], 13),
        Player(f"{team_name} Sub Midfielder", 6, 14),
        Player(f"{team_name} Sub Winger", 7, 15),
        Player(f"{team_name} Sub Striker", 9, 16),
        Player(f"{team_name} Sub Defender 2", 2, 17),
        Player(f"{team_name} Sub Fullback", 3, 18),
    ]

    return starting_squad, subs_squad


def get_league_clubs():
    league_clubs = requests.get(
        "http://league-service:8080/api/v1/league/1/standings"
    ).json()
    ids = [club["club_id"] for club in league_clubs]

    clubs = [
        requests.get(f"http://club-service:8080/api/v1/club/{id}").json() for id in ids
    ]

    return clubs

def serialize_team(team):
    bias = 0
    form = 0
    squad_quality = 0
    attack_strength = 0
    defense_strength = 0
    image = ""

    if team["name"] == "Manchester United" or team["name"] == "Man United":
        bias = 3
        form = 4
        squad_quality = 9
        attack_strength = 8
        defense_strength = 7
        image = "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/400px-Manchester_United_FC_crest.svg.png"

    elif team["name"] == "Liverpool":
        bias = 3
        form = 5
        squad_quality = 9
        attack_strength = 8
        defense_strength = 8
        image = "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png"

    elif team["name"] == "Chelsea":
        bias = 3
        form = 4
        squad_quality = 8
        attack_strength = 8
        defense_strength = 7
        image = "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png"

    elif team["name"] == "Aston Villa":
        bias = 2
        form = 3
        squad_quality = 7
        attack_strength = 7
        defense_strength = 6
        image = "https://worldvectorlogo.com/pt/logo/aston-villa"

    elif team["name"] == "Lixa":
        bias = 1
        form = 2
        squad_quality = 3
        attack_strength = 3
        defense_strength = 3
        image = "https://static.wikia.nocookie.net/logopedia/images/b/b0/FC_Lixa_%282014-2020%29.png/revision/latest?cb=20220922040330"

    elif team["name"] == "Vitória de Santarém":
        bias = 1
        form = 2
        squad_quality = 3
        attack_strength = 3
        defense_strength = 3
        image = "https://www.zerozero.pt/equipa/vc-santarem/108742"

    elif team["name"] == "Vizela":
        bias = 1
        form = 2
        squad_quality = 3
        attack_strength = 3
        defense_strength = 3
        image = "http://escudosfutebolbotao.blogspot.com/2021/04/vizela.html"

    elif team["name"] == "Uniao de Leiria":
        bias = 1
        form = 2
        squad_quality = 3
        attack_strength = 3
        defense_strength = 3
        image = "https://pt.wikipedia.org/wiki/Ficheiro:Uni%C3%A3o_Leiria.png"

    elif team["name"] == "Real Madrid":
        bias = 4
        form = 5
        squad_quality = 10
        attack_strength = 9
        defense_strength = 9
        image = "https://logodownload.org/wp-content/uploads/2016/03/real-madrid-logo-1-1.png"

    elif team["name"] == "Al Nassr":
        bias = 2
        form = 3
        squad_quality = 7
        attack_strength = 7
        defense_strength = 6
        image = "https://upload.wikimedia.org/wikipedia/en/0/04/Al_Nassr_FC_Logo.png"  # Updated to direct image link

    elif team["name"] == "Barcelona":
        bias = 4
        form = 5
        squad_quality = 10
        attack_strength = 9
        defense_strength = 9
        image = "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"

    elif team["name"] == "Wolves":
        bias = 2
        form = 3
        squad_quality = 6
        attack_strength = 6
        defense_strength = 6
        image = "https://seeklogo.com/vector-logo/236301/wolves"

    elif team["name"] == "Manchester City" or team["name"] == "Man. City":
        bias = 4
        form = 5
        squad_quality = 10
        attack_strength = 10
        defense_strength = 9
        image = "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"

    elif team["name"] == "Porto":
        bias = 3
        form = 4
        squad_quality = 9
        attack_strength = 8
        defense_strength = 8
        image = "https://logos-world.net/porto-logo/"

    elif team["name"] == "Benfica":
        bias = 3
        form = 4
        squad_quality = 9
        attack_strength = 8
        defense_strength = 8
        image = "https://seeklogo.com/free-vector-logos/benfica"

    elif team["name"] == "Sporting":
        bias = 3
        form = 4
        squad_quality = 8
        attack_strength = 7
        defense_strength = 7
        image = "https://logodownload.org/wp-content/uploads/2019/03/sporting-clube-de-portugal-logo-escudo.png"

    elif team["name"] == "Juventus":
        bias = 4
        form = 5
        squad_quality = 9
        attack_strength = 8
        defense_strength = 8
        image = "https://seeklogo.com/images/F/fc-juventus-logo-A48B34A764-seeklogo.com.png"

    elif team["name"] == "Athletic Madrid" or team["name"] == "Ath. Madrid" or team["name"] == "Atletico Madrid":
        bias = 3
        form = 4
        squad_quality = 8
        attack_strength = 7
        defense_strength = 8
        image = "https://cdn.worldvectorlogo.com/logos/atletico-madrid-1.svg"

    else:
        # Default values for unknown teams
        bias = 1
        form = 2
        squad_quality = 3
        attack_strength = 3
        defense_strength = 3
        image = team.get("image_url", "")

    return Team(
        id=team["id"],
        name=team["name"],
        bias=bias,
        form=form,
        starting_squad=create_team_players(team["name"], team["id"])[0],
        subs_squad=create_team_players(team["name"], team["id"])[1],
        squad_quality=squad_quality,
        attack_strength=attack_strength,
        defense_strength=defense_strength,
        image=image,
    )


def main():
    # Create teams with proper Team objects
    sleep(40)
    clubs = get_league_clubs()
    teams = [serialize_team(club) for club in clubs]
    print("------------------------------------")

    def signal_handler(sig, frame):
        print("\nTerminating game producers...")
        scheduler.terminate_producers()
        sys.exit(0)

    while True:
        print(
            "--------------------------------------------------- New Round ---------------------------------------------------"
        )
        signal.signal(signal.SIGINT, signal_handler)

        scheduler = LeagueScheduler(teams)
        try:
            scheduler.start_game_producers()

            scheduler.wait_for_producers()

            scheduler.terminate_producers()

        except Exception as e:
            print(f"Error in league scheduling: {e}")
            scheduler.terminate_producers()


if __name__ == "__main__":
    main()
