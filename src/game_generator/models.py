from enum import Enum


class Winner(Enum):
    HOME = 1
    AWAY = 2
    TIE = 3
    NONE = 4


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


class Game:
    def __init__(self, seed: int, home_team: Team, away_team: Team):
        self.seed: int = seed
        self.home_team = home_team
        self.away_team = away_team

        self.winner: Winner = Winner.NONE
        self.home_score: int = 0
        self.away_score: int = 0

        self.home_stats = {}
        self.away_stats = {}

    def __str__(self):
        return f"{self.home_team} vs {self.away_team}"
