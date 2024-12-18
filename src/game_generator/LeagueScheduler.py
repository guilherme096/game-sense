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
        self.schedule = []
        self.processes = []
        self.generate_full_schedule()

    def generate_full_schedule(self):
        if self.num_teams % 2 != 0:
            # If odd number of teams, add a dummy team for byes
            dummy_team = Team(id=-1, name="BYE", bias=0, form=0, starting_squad=[], subs_squad=[], squad_quality=0, attack_strength=0, defense_strength=0, image="")
            self.teams.append(dummy_team)
            self.num_teams += 1
            has_dummy = True
        else:
            has_dummy = False

        rounds = self.num_teams - 1
        matches_per_round = 4

        team_ids = list(range(self.num_teams))
        schedule = []

        for round_number in range(rounds):
            round_matches = []
            for i in range(matches_per_round):
                home = team_ids[i]
                away = team_ids[self.num_teams - 1 - i]
                if has_dummy and (self.teams[home].id == -1 or self.teams[away].id == -1):
                    continue  # Skip matches involving dummy team
                # Alternate home and away to ensure fairness
                if round_number % 2 == 0:
                    match = (self.teams[home], self.teams[away])
                else:
                    match = (self.teams[away], self.teams[home])
                round_matches.append(match)
            schedule.append(round_matches)
            # Rotate team positions for next round
            team_ids = [team_ids[0]] + [team_ids[-1]] + team_ids[1:-1]

        # Duplicate the schedule for reverse fixtures (home and away swapped)
        reverse_schedule = []
        for round_matches in schedule:
            reverse_round = [(away, home) for (home, away) in round_matches]
            reverse_schedule.append(reverse_round)

        self.schedule = schedule + reverse_schedule

    def validate_schedule(self):
        """
        Ensure that no team is scheduled to play more than one match in the same round.
        Since the round-robin algorithm inherently ensures this, this function can be a sanity check.
        """
        for round_index, round_matches in enumerate(self.schedule):
            scheduled_teams = set()
            for match in round_matches:
                home, away = match
                if home in scheduled_teams or away in scheduled_teams:
                    print(f"Conflict detected in round {round_index + 1}: {home.name} or {away.name} already scheduled.")
                    return False
                scheduled_teams.add(home)
                scheduled_teams.add(away)
        print("No conflicts detected in the schedule.")
        return True

    def start_game_producers(self):
        def run_producer(home_team, away_team):
            try:
                env = os.environ.copy()
                env["HOME_TEAM"] = json.dumps(home_team.to_dict())
                env["AWAY_TEAM"] = json.dumps(away_team.to_dict())
                return subprocess.Popen(["python", "game_producer.py"], env=env)
            except Exception as e:
                print(f"Error: {e}")
                return None

        self.processes = []
        print("Starting game producers...")

        for round_index, round_matches in enumerate(self.schedule):
            print(f"Starting Round {round_index + 1}")
            for match in round_matches:
                home_team, away_team = match
                process = run_producer(home_team, away_team)
                if process:
                    self.processes.append(process)
            # Wait for a specific time before starting the next round
            # Adjust the sleep duration as needed
            time.sleep(1.5 * 60)  # 1.5 minutes between rounds

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
    # print(f"Get club data: {response.status_code}")

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
        # print(f"Get players for club {club_id}\n: {response.text}")
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

    signal.signal(signal.SIGINT, signal_handler)

    while True:
        print(
            "--------------------------------------------------- New Round ---------------------------------------------------"
        )
        scheduler = LeagueScheduler(teams)
        if scheduler.validate_schedule():
            try:
                scheduler.start_game_producers()
                scheduler.wait_for_producers()
                scheduler.terminate_producers()
            except Exception as e:
                print(f"Error in league scheduling: {e}")
                scheduler.terminate_producers()
        else:
            print("Invalid schedule detected. Regenerating...")
            scheduler.terminate_producers()
            scheduler = LeagueScheduler(teams)  # Attempt to regenerate

if __name__ == "__main__":
    main()