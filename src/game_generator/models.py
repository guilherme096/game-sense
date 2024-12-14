from enum import Enum


class Winner(Enum):
    HOME = 1
    AWAY = 2
    TIE = 3
    NONE = 4


class EventType(Enum):
    GOAL = 1
    YELLOW_CARD = 2
    RED_CARD = 3
    SUBSTITUTION = 4
    INJURY = 5


class Player:
    def __init__(self, name: str, positions: list | int, quality: int):
        self.name = name
        self.positions = positions if isinstance(
            positions, list) else [positions]
        self.quality = quality

    def __str__(self):
        return f"Player: {self.name}\n Position: {self.positions}\n Quality: {self.quality}"

    def to_dict(self):
        return {"name": self.name, "positions": self.positions, "quality": self.quality}

    @staticmethod
    def from_dict(data):
        return Player(
            name=data["name"],
            positions=data["positions"],
            quality=data["quality"],
        )


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

    def __dict__(self):
        return {
            "Possession": self.possession,
            "Shots": self.shots,
            "Passes Acc": self.passes_acc,
            "Tackles": self.tackles,
            "Fouls": self.fouls,
            "Corners": self.corners,
            "Offsides": self.offsides,
            "Interceptions": self.interceptions,
        }


class Team:
    def __init__(
        self,
        id,
        name,
        bias: float,
        form: int,
        starting_squad: list[Player],
        subs_squad: list[Player],
        squad_quality: float,
        attack_strength: int,
        defense_strength: int,
        image: str,
    ):
        self.id = id
        self.name = name
        self.bias = bias
        self.form = form
        self.squad = starting_squad + subs_squad
        self.starting_squad = starting_squad
        self.subs_squad = subs_squad
        self.squad_quality = squad_quality
        self.attack_strength = attack_strength
        self.defense_strength = defense_strength
        self.image = image

    def set_stats(self, stats: list[Stats]):
        self.stats = stats

    def __str__(self):
        stats_print = ""
        for stat in self.stats:
            stats_print += f"{stat}\n"
        return f"{self.name}\n Bias: {self.bias}\n Form: {self.form}\n Squad: {self.squad}\n Squad Quality: {self.squad_quality}\n Attack Strength: {self.attack_strength}\n Defense Strength: {self.defense_strength}\n Stats: {stats_print}"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "bias": self.bias,
            "form": self.form,
            "squad": [player.to_dict() for player in self.squad],
            "starting_squad": [player.to_dict() for player in self.starting_squad],
            "subs_squad": [player.to_dict() for player in self.subs_squad],
            "squad_quality": self.squad_quality,
            "attack_strength": self.attack_strength,
            "defense_strength": self.defense_strength,
            "image": self.image,
        }

    @staticmethod
    def from_dict(data):
        return Team(
            id=data["id"],
            name=data["name"],
            bias=data["bias"],
            form=data["form"],
            starting_squad=[
                Player.from_dict(player) for player in data["starting_squad"]
            ],
            subs_squad=[Player.from_dict(player)
                        for player in data["subs_squad"]],
            squad_quality=data["squad_quality"],
            attack_strength=data["attack_strength"],
            defense_strength=data["defense_strength"],
            image=data["image"],
        )


class Game:
    def __init__(self, seed: int, home_team: Team, away_team: Team):
        self.seed: int = seed
        self.home_team = home_team
        self.away_team = away_team

        self.winner: Winner = Winner.NONE
        self.home_score: int = 0
        self.away_score: int = 0

    def __str__(self):
        return f"Game:\n Seed: {self.seed}\n Home Team: {self.home_team}\n Away Team: {self.away_team}\n Winner: {self.winner}\n Home Score: {self.home_score}\n Away Score: {self.away_score}\n"


class Event:
    def __init__(self, event_type: EventType, minute: int, team: Team):
        self.event_type = event_type
        self.minute = minute
        self.team = team


class Goal(Event):
    def __init__(self, minute: int, team: Team, scorer: Player, assist: Player):
        super().__init__(EventType.GOAL, minute, team)
        self.scorer = scorer
        self.assist = assist

    def __str__(self):
        return f"Goal:\n Minute: {self.minute}\n Team: {self.team.name}\n Scorer: {self.scorer.name}\n Assist: {self.assist.name}"


class YellowCard(Event):
    def __init__(self, minute: int, team: Team, player: Player):
        super().__init__(EventType.YELLOW_CARD, minute, team)
        self.player = player

    def __str__(self):
        return f"Yellow Card:\n Minute: {self.minute}\n Team: {self.team.name}\n Player: {self.player.name}"


class RedCard(Event):
    def __init__(self, minute: int, team: Team, player: Player):
        super().__init__(EventType.RED_CARD, minute, team)
        self.player = player

    def __str__(self):
        return f"Red Card:\n Minute: {self.minute}\n Team: {self.team.name}\n Player: {self.player.name}"


class Substitution(Event):
    def __init__(self, minute: int, team: Team, player_out: Player, player_in: Player):
        super().__init__(EventType.SUBSTITUTION, minute, team)
        self.player_out = player_out
        self.player_in = player_in

    def __str__(self):
        return f"Substitution:\n Minute: {self.minute}\n Team: {self.team.name}\n Player Out: {self.player_out.name}\n Player In: {self.player_in.name}"


class Injury(Event):
    def __init__(self, minute: int, team: Team, player: Player):
        super().__init__(EventType.INJURY, minute, team)
        self.player = player

    def __str__(self):
        return f"Injury:\n Minute: {self.minute}\n Team: {self.team}\n Player: {self.player}"
