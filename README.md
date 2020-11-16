### Game Overview

Multiplayer game with at least 2 players.
Game modes determine the specific rules and conditions of play.
Teams take turns to move entities on a grid based map.

#### Game Modes

##### Rule of the Commander

Each player starts with 1 'Commander' unit.
Each player can place their Commander unit anywhere in the marked 'Starting Area' of their team.
A team is eliminated when all the Commanders of the team is killed.

#### Units

###### Commander
Logistic unit, acts as 'King' in 'Rule of the Commander' game mode.

###### Light Infantry
Basic Tier 1 unit, can move a short distance per turn but is not affected much by terrain.
Can not cross 'Deep Water'.
Has generally low attack and defense stats and low hit points.

###### Heavy Infantry
Unit which often appears in Tier 2 and has high attack and higher defense stats.
Can not cross 'Deep Water'.

###### Assault Infantry
Unit which often appears in Tier 2 or 3, can move longer distances and over almost any terrain.
Has high attack but generally lower defense stats and low hit points.

###### Scout Infantry
Unit which often appears in Tier 2.
Moves longer distances.
Low defense and low hit points.
High range and attack stats.

###### Light Vehicle
Unit which often appears in Tier 1 or 2.
Moves fairly long distances.
Low hit points and attack.
Low armor and defense stats.
Can in some cases transport Infantry.

#### Turn

Each team gets a turn, in which each player of the team can place 'Actions' for the entities to take during that turn. Each entity has 'Action Points', which are used to perform actions. All the team's actions will then be executed when the whole team is done setting actions. The actions will be taken and the turn will move to the next team in the turn cycle.

#### Application Lifecycle

 - Connect to Server
 - Pull list of Games
 - Connect to Game
 - Pull world and player info
 - Send Ready Signal
 - (When Server Starts Game) Show game Phase 1