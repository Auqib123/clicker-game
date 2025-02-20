import { useState, useEffect } from "react";
import axios from "axios";

// Generate or fetch from local storage/auth system
const userId = "user1234"; 
const base_url=process.env.URL||"http://localhost:5000"
function App() {
  const [counter, setCounter] = useState(0);
  const [points, setPoints] = useState(0);
  const [prizes, setPrizes] = useState(0);

  useEffect(() => {
    axios.get(`${base_url}/user?userId=${userId}`)
      .then(res => {
        setCounter(res.data.totalClicks);
        setPoints(res.data.totalPoints);
        setPrizes(res.data.prizesWon);
      })
      .catch(err => console.error(err));
  }, []);

  const handleClick = () => {
    axios.post(`${base_url}/click`, { userId })
      .then(res => {
        setCounter(res.data.totalClicks);
        setPoints(res.data.totalPoints);
        setPrizes(res.data.prizesWon);
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Clicker Game</h1>
      <button onClick={handleClick} style={{ fontSize: "20px", padding: "10px 20px" }}>
        Click Me
      </button>
      <p>Clicks: {counter}</p>
      <p>Points: {points}</p>
      <p>Prizes Won: {prizes}</p>
    </div>
  );
}

export default App;
