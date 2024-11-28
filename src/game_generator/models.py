from enum import Enum


class Winner(Enum):
    HOME = 1
    AWAY = 2
    TIE = 3
    NONE = 4


class Stats:
    def __init__(
        self,
        possession,
        shots,
        passes_acc,
        tackles,
        fouls,
        corners,
        offsides,
        interceptions,
    ):
        self.possession = possession
        self.shots = shots
        self.passes_acc = passes_acc
        self.tackles = tackles
        self.fouls = fouls
        self.corners = corners
        self.offsides = offsides
        self.interceptions = interceptions

    def __str__(self):
        return f"Stats:\n Possession: {self.possession}\n Shots: {self.shots}\n Passes Acc: {self.passes_acc}\n Tackles: {self.tackles}\n Fouls: {self.fouls}\n Corners: {self.corners}\n Offsides: {self.offsides}\n Interceptions: {self.interceptions}"


class Team:
    def __init__(
        self,
        id,
        name,
        bias: float,
        form: int,
        squad: list,
        squad_quality: float,
        attack_strength: int,
        defense_strength: int,
    ):
        self.id = id
        self.name = name
        self.bias = bias
        self.form = form
        self.squad = squad
        self.squad_quality = squad_quality
        self.attack_strength = attack_strength
        self.defense_strength = defense_strength

    def set_stats(self, stats: Stats):
        self.stats = stats

    def __str__(self):
        return f"Team: {self.name}\n Bias: {self.bias}\n Form: {self.form}\n Squad: {self.squad}\n Squad Quality: {self.squad_quality}\n Attack Strength: {self.attack_strength}\n Defense Strength: {self.defense_strength}\n Stats: {self.stats}"


class Game:
    def __init__(self, seed: int, home_team: Team, away_team: Team):
        self.seed: int = seed
        self.home_team = home_team
        self.away_team = away_team

        self.winner: Winner = Winner.NONE
        self.home_score: int = 0
        self.away_score: int = 0

    def __str__(self):
        return f"Game:\n Seed: {self.seed}\n Home Team: {self.home_team}\n Away Team: {self.away_team}\n Winner: {self.winner}\n Home Score: {self.home_score}\n Away Score: {self.away_score}\n Home Stats: {self.home_stats}\n Away Stats: {self.away_stats}"
