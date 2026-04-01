const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let characters = [];
let quests = [
  { id: 1, title: "Budget Basics", difficulty: 2 },
  { id: 2, title: "Emergency Fund", difficulty: 3 }
];

// Create Character
app.post("/character", (req, res) => {
  const char = {
    id: uuidv4(),
    name: req.body.name,
    level: 1,
    xp: 0,
    gold: 0
  };
  characters.push(char);
  res.json(char);
});

// Get Characters
app.get("/characters", (req, res) => {
  res.json(characters);
});

// Complete Quest
app.post("/quest/complete", (req, res) => {
  const { characterId, difficulty } = req.body;

  const char = characters.find(c => c.id === characterId);
  if (!char) return res.status(404).send("Character not found");

  const xp = 100 * difficulty;
  const gold = 50 * difficulty;

  char.xp += xp;
  char.gold += gold;

  if (char.xp >= 200) {
    char.level += 1;
    char.xp = 0;
  }

  res.json({ xp, gold, level: char.level });
});

app.listen(5000, () => console.log("Server running on port 5000"));
