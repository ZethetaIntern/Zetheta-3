import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [characters, setCharacters] = useState([]);

  const createCharacter = async () => {
    await axios.post("http://localhost:5000/character", { name });
    fetchCharacters();
  };

  const fetchCharacters = async () => {
    const res = await axios.get("http://localhost:5000/characters");
    setCharacters(res.data);
  };

  const completeQuest = async (id) => {
    await axios.post("http://localhost:5000/quest/complete", {
      characterId: id,
      difficulty: 2
    });
    fetchCharacters();
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Financial RPG Quest</h1>

      <input
        placeholder="Character Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createCharacter}>Create</button>

      <h2>Characters</h2>
      {characters.map((c) => (
        <div key={c.id} style={{ border: "1px solid", margin: 10, padding: 10 }}>
          <p>Name: {c.name}</p>
          <p>Level: {c.level}</p>
          <p>XP: {c.xp}</p>
          <p>Gold: {c.gold}</p>

          <button onClick={() => completeQuest(c.id)}>
            Complete Quest
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
