import subprocess
import random
import os
import signal
import sys
import time
from models import Team, Player
import json
import itertools



class LeagueScheduler:
    def __init__(self, teams, rounds=2):
        self.teams = teams
        self.rounds = rounds
        self.schedule = self.generate_schedule()
        self.processes = []

    def generate_schedule(self):
        team_combinations = list(itertools.permutations(self.teams, 2))
        
        random.shuffle(team_combinations)
        
        schedule = []
        used_teams = set()

        for round in range(self.rounds):
            round_matches = []
            used_teams_in_round = set()

            for home_team, away_team in team_combinations:
                if home_team in used_teams_in_round or away_team in used_teams_in_round:
                    continue
                
                if round % 2 == 1:
                    home_team, away_team = away_team, home_team
                
                round_matches.append((home_team, away_team))
                used_teams_in_round.update([home_team, away_team])

                if len(round_matches) == 2:
                    schedule.extend(round_matches)
                    used_teams.update(used_teams_in_round)
                    break

        return schedule

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
                env['HOME_TEAM'] = json.dumps(home_team.to_dict())
                env['AWAY_TEAM'] = json.dumps(away_team.to_dict())

                return subprocess.Popen(['python', 'game_producer.py'], env=env)
            except Exception as e:
                print(f"Error running producer for {home_team.name} vs {away_team.name}: {e}")
                return None

        # Reset processes
        self.processes = []

        # Schedule matches in pairs
        for i in range(0, len(self.schedule), 2):
            match1 = self.schedule[i]
            match2 = self.schedule[i + 1]

            home_team1, away_team1 = match1
            home_team2, away_team2 = match2

            print(f"Round {i//2 + 1}: "
                  f"{home_team1.name} vs {away_team1.name}, "
                  f"{home_team2.name} vs {away_team2.name}")

            # Start producers for both matches
            process1 = run_producer(home_team1, away_team1)
            process2 = run_producer(home_team2, away_team2)

            if process1:
                self.processes.append(process1)
            if process2:
                self.processes.append(process2)

            time.sleep(1.5*60)

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
        Player(f"{team_name} Midfielder 2", 11, 6),
        Player(f"{team_name} Midfielder 3", 6, 7),
        Player(f"{team_name} Winger", 7, 8),
        Player(f"{team_name} Striker", 9, 9),
        Player(f"{team_name} Forward", 11, 10),
        Player(f"{team_name} Defender 4", [4, 5], 11),
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


def main():
    # Create teams with proper Team objects
    teams = [
        Team(
            id='1',
            name='Sporting CP',
            bias=3,
            form=5,
            starting_squad=create_team_players('Sporting CP', '1')[0],
            subs_squad=create_team_players('Sporting CP', '1')[1],
            squad_quality=9,
            attack_strength=8,
            defense_strength=8,
            image='https://upload.wikimedia.org/wikipedia/pt/3/3e/Sporting_Clube_de_Portugal.png'
        ),
        Team(
            id='2',
            name='Benfica',
            bias=3,
            form=4,
            starting_squad=create_team_players('Benfica', '2')[0],
            subs_squad=create_team_players('Benfica', '2')[1],
            squad_quality=8,
            attack_strength=8,
            defense_strength=8,
            image='https://upload.wikimedia.org/wikipedia/pt/thumb/d/de/Sport_Lisboa_e_Benfica.svg/320px-Sport_Lisboa_e_Benfica.svg.png'
        ),
        Team(
            id='3',
            name='Porto',
            bias=3,
            form=5,
            starting_squad=create_team_players('Porto', '3')[0],
            subs_squad=create_team_players('Porto', '3')[1],
            squad_quality=7,
            attack_strength=8,
            defense_strength=7,
            image='https://upload.wikimedia.org/wikipedia/pt/thumb/c/c5/F.C._Porto_logo.png/240px-F.C._Porto_logo.png'
        ),
        Team(
            id='4',
            name='Braga',
            bias=3,
            form=4,
            starting_squad=create_team_players('Braga', '4')[0],
            subs_squad=create_team_players('Braga', '4')[1],
            squad_quality=7,
            attack_strength=6,
            defense_strength=6,
            image='https://upload.wikimedia.org/wikipedia/pt/thumb/f/f9/150px-Sporting_Clube_Braga.png/270px-150px-Sporting_Clube_Braga.png'
        ),
        Team(
            id='5',
            name='Vitoria SC',
            bias=3,
            form=4,
            starting_squad=create_team_players('Vitoria SC', '5')[0],
            subs_squad=create_team_players('Vitoria SC', '5')[1],
            squad_quality=6,
            attack_strength=6,
            defense_strength=6,
            image='https://upload.wikimedia.org/wikipedia/pt/thumb/b/b3/VitoriaGuimaraes.png/270px-VitoriaGuimaraes.png'
        ),
        Team(
            id='6',
            name='Man United',
            bias=3,
            form=4,
            starting_squad=create_team_players('Man United', '6')[0],
            subs_squad=create_team_players('Man United', '6')[1],
            squad_quality=9,
            attack_strength=8,
            defense_strength=7,
            image='https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/400px-Manchester_United_FC_crest.svg.png'
            )
    ]

    # Create league scheduler
    scheduler = LeagueScheduler(teams, rounds=3)

    # Handle keyboard interrupt gracefully
    def signal_handler(sig, frame):
        print("\nTerminating game producers...")
        scheduler.terminate_producers()
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    try:
        # Start game producers
        scheduler.start_game_producers()

        # Wait for all producers to complete
        scheduler.wait_for_producers()

    except Exception as e:
        print(f"Error in league scheduling: {e}")
        scheduler.terminate_producers()


if __name__ == '__main__':
    main()
