import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  let average = 0;
  let positive = 0;
  if (all) {
    average = (good * 1 + neutral * 0 + bad * -1) / all;
    positive = (good / all) * 100;
  } else {
    return <p>No feedback given</p>;
  }

  const formatToTwoDecimalString = (num) => num.toFixed(2);

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine
            text="average"
            value={formatToTwoDecimalString(average)}
          />
          <StatisticLine
            text="positve"
            value={formatToTwoDecimalString(positive) + " %"}
            percent
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = (setter, value) => {
    return () => setter(value + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleFeedback(setGood, good)} />
      <Button text="neutral" onClick={handleFeedback(setNeutral, neutral)} />
      <Button text="bad" onClick={handleFeedback(setBad, bad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
