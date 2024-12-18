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
            match1, match2, match3, match4 = self.schedule[i:i+4]

            home_team1, away_team1 = match1
            home_team2, away_team2 = match2
            home_team3, away_team3 = match3
            home_team4, away_team4 = match4

            process1 = run_producer(home_team1, away_team1)
            process2 = run_producer(home_team2, away_team2)
            process3 = run_producer(home_team3, away_team3)
            process4 = run_producer(home_team4, away_team4)

            # Add processes to the list
            if process1: self.processes.append(process1)
            if process2: self.processes.append(process2)
            if process3: self.processes.append(process3)
            if process4: self.processes.append(process4)

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


def get_club_data():
    # Fetch the list of clubs
    response = requests.get("http://nginx/api/v1/club/")
    print(f"Get club data: {response.status_code}")

    if response.status_code != 200:
        print(f"Error: Received non-200 status code: {response.status_code}")
        print(f"Response content: {response.text}")
        return []  # Return an empty list or handle accordingly

    try:
        return response.json()  # Attempt to parse as JSON
    except ValueError:
        print(f"Error decoding JSON: {response.text}")
        return []  # Return an empty list if JSON decoding fails


def fetch_players_for_club(club_id):
    response = requests.get(f"http://nginx/api/v1/player/club/{club_id}")
    try:
        print(f"Get players for club {club_id}\n: {response.text}")
        return response.json()
    except ValueError:
        print(f"Error decoding JSON from the response: {response.text}")
        return []  # Return an empty list if JSON decoding fails


def create_team_from_api(club_data):
    club_id = club_data['id']
    players_data = fetch_players_for_club(club_id)

    # Separate players by their position type
    gks = [player for player in players_data if player['position'] == 1]  # Goalkeepers
    rbs = [player for player in players_data if player['position'] == 2]  # Right Backs
    lbs = [player for player in players_data if player['position'] == 3]  # Left Backs
    cbs = [player for player in players_data if player['position'] in [4, 5]]  # Center Backs
    mfs = [player for player in players_data if player['position'] in [6, 8, 10]]  # Midfielders
    fws = [player for player in players_data if player['position'] in [7, 9, 11]]  # Forwards

    # Initialize the starting squad
    starting_squad = []

    # Assign players to the starting squad based on their positions
    if len(gks) >= 1:
        starting_squad.append(Player(gks[0]['name'], [gks[0]['position']], 100, gks[0]['id']))  # Pick the first GK
    else:
        # If no GK is available, randomly pick any player to fill the position (as a fallback)
        starting_squad.append(Player(players_data[0]['name'], [1], 100, players_data[0]['id']))

    if len(rbs) >= 1:
        starting_squad.append(Player(rbs[0]['name'], [rbs[0]['position']], 100 , rbs[0]['id']))  # Pick the first RB
    else:
        starting_squad.append(Player(players_data[0]['name'], [2], 100 , players_data[0]['id']))

    if len(lbs) >= 1:
        starting_squad.append(Player(lbs[0]['name'], [lbs[0]['position']], 100 , lbs[0]['id']))  # Pick the first LB
    else:
        starting_squad.append(Player(players_data[0]['name'], [3], 100 , players_data[0]['id']))

    # Assign two center backs, if possible
    if len(cbs) >= 2:
        starting_squad.append(Player(cbs[0]['name'], [cbs[0]['position']], 100 , cbs[0]['id']))  # Pick first CB
        starting_squad.append(Player(cbs[1]['name'], [cbs[1]['position']], 100   , cbs[1]['id']))  # Pick second CB
    else:
        # If not enough CBs, fill with random players
        starting_squad.append(Player(players_data[0]['name'], [4], 100 , players_data[0]['id']))  # Fallback to position 4 or 5
        starting_squad.append(Player(players_data[1]['name'], [5], 100 , players_data[1]['id']))  # Fallback to position 4 or 5

    # Assign three midfielders
    if len(mfs) >= 3:
        starting_squad.append(Player(mfs[0]['name'], [mfs[0]['position']], 100 , mfs[0]['id']))
        starting_squad.append(Player(mfs[1]['name'], [mfs[1]['position']], 100 , mfs[1]['id']))
        starting_squad.append(Player(mfs[2]['name'], [mfs[2]['position']], 100 , mfs[2]['id']))
    else:
        # If not enough midfielders, fill with random players
        while len(starting_squad) < 8:  # Ensure there are at least 8 players in the squad before forward allocation
            random_player = random.choice(players_data)
            starting_squad.append(Player(random_player['name'], [random_player['position']], 100 , random_player['id']))

    # Assign three forwards
    if len(fws) >= 3:
        starting_squad.append(Player(fws[0]['name'], [fws[0]['position']], 100 , fws[0]['id']))
        starting_squad.append(Player(fws[1]['name'], [fws[1]['position']], 100 , fws[1]['id']))
        starting_squad.append(Player(fws[2]['name'], [fws[2]['position']], 100 , fws[2]['id']))
    else:
        # If not enough forwards, fill with random players
        while len(starting_squad) < 11:  # Ensure there are exactly 11 players in the starting squad
            random_player = random.choice(players_data)
            starting_squad.append(Player(random_player['name'], [random_player['position']], 100 , random_player['id']))

    # Assign the remaining players to the substitute squad
    subs_squad = [Player(player['name'], [player['position']], 100 , player['id']) for player in players_data if player not in starting_squad]

    # Hardcoded logic for team attributes based on the team name
    team_name = club_data['name']
    if team_name == "Manchester United" or team_name == "Man United":
        bias = 3
        form = 4
        squad_quality = 9
        attack_strength = 8
        defense_strength = 7
    elif team_name == "Liverpool":
        bias = 3
        form = 5
        squad_quality = 9
        attack_strength = 8
        defense_strength = 8
    elif team_name == "Chelsea":
        bias = 3
        form = 4
        squad_quality = 8
        attack_strength = 7
        defense_strength = 7
    elif team_name == "Aston Villa":
        bias = 2
        form = 3
        squad_quality = 7
        attack_strength = 6
        defense_strength = 6
    elif team_name == "FC Lixa":
        bias = 7
        form = 5
        squad_quality = 10
        attack_strength = 10
        defense_strength = 6
    elif team_name == "Real Madrid":
        bias = 4
        form = 5
        squad_quality = 10
        attack_strength = 9
        defense_strength = 9
    elif team_name == "Barcelona":
        bias = 4
        form = 5
        squad_quality = 10
        attack_strength = 9
        defense_strength = 9
    else:
        # Default values for unknown or lower-tier teams
        bias = 1
        form = 2
        squad_quality = 5
        attack_strength = 5
        defense_strength = 5

    # Create and return the Team object
    return Team(
        id=club_data['id'],
        name=club_data['name'],
        bias=bias,
        form=form,
        starting_squad=starting_squad,
        subs_squad=subs_squad,
        squad_quality=squad_quality,
        attack_strength=attack_strength,
        defense_strength=defense_strength,
        image=club_data['logo']
    )


def main():
    # Create teams with proper Team objects
    clubs = get_club_data()
    teams = [create_team_from_api(club) for club in clubs]

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
