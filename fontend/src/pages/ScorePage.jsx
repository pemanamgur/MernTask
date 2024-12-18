import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ScorePage.css"

const ScorePage = () => {
  const [score, setScore] = useState(0);
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId");

  //useEffect hooks so called first when page load
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const increaseScore = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/increase-score", {
        userId,
      });
      // console.log(res);
      setScore(res.data.user.score);
      fetchUsers();
    } catch (error) {
      console.error("Error increasing score", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  console.log(users)

  return (
    <div>
      <div className="top-score">
      <h2>Score Page</h2>
      <p>User ID: {userId}</p>
      <p>Your Score: {score}</p>
      <button onClick={increaseScore}>Increase Score</button>
      </div>

      <h3>All Users</h3>
      <table border="1">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.userId}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScorePage;
