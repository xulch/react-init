import React, { useState, useEffect } from "react";
import style from "./styles/counter.less";
/**
 * counter
 * @description counter
 */
const Counter = function(props) {
  const { state, onIncrement, onDecrement, fetchData, match } = props;
  console.log(props);
  const [count, setCount] = useState(0);
  useEffect(() => {
    match.url == "/2" && fetchData();
  }, []);
  return (
    <div className={style.counter}>
      <p>
        Clicked: {state} times
        <br />
        <br />
        <button onClick={onIncrement} style={{ marginRight: 20 }}>
          {" "}
          +{" "}
        </button>
        <button onClick={onDecrement}> - </button>
      </p>
      {match.url == "/2" ? (
        <button onClick={() => setCount(count + 1)}> {count} </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Counter;
