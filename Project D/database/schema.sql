CREATE TABLE characters (
  id UUID PRIMARY KEY,
  name VARCHAR,
  level INT,
  xp INT,
  gold INT
);

CREATE TABLE quests (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  difficulty INT
);

CREATE TABLE player_progress (
  id UUID PRIMARY KEY,
  character_id UUID,
  quest_id INT,
  status VARCHAR
);
