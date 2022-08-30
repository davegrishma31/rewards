import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((e) => console.log(e));
  }, []);

  const calculateRewards = () => {
    if (data.length > 0) {
      return data.map((v) => {
        let reward = 0;
        if (v.price > 50 && v.price <= 100) {
          reward = (v.price - 50) * 1;
        }

        if (v.price > 100) {
          reward = (v.price - 50) * 1 + (v.price - 100) * 2;
        }

        return {
          ...v,
          rewardVal: reward,
        };
      });
    }
    return [];
  };

  return (
    <div className="App">
      <h3>Rewards</h3>
      <table>
        <tr>
          <th>CustomerId</th>
          <th>Price</th>
          <th>Reward Points</th>
        </tr>
        {data.length > 0 ? (
          calculateRewards(data).map((v) => {
            return (
              <tr>
                <td>{v.customerId}</td>
                <td>{v.price}</td>
                <td>{v.rewardVal}</td>
              </tr>
            );
          })
        ) : (
          <tr>{"No Data"}</tr>
        )}
      </table>
    </div>
  );
}

export default App;
