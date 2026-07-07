import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const reset = () => {
        setCount(0);
    };


    return (
        <div className="counter-card">

            <h2>Counter</h2>

            <h1>{count}</h1>


            <div className="counter-actions">

                <button onClick={decrement}>
                    -
                </button>


                <button onClick={increment}>
                    Increment
                </button>


                <button onClick={reset}>
                    Reset
                </button>

            </div>

        </div>
    );
}

export default Counter;