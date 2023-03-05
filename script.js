const incrementElID = document.getElementById("increment-id-0");
const decrementElId = document.getElementById("decrement-id-0");
const resultID = document.getElementById("resultId-0");
const buttonEl = document.getElementsByClassName("lws-addMatch");

const allMatchesEl = document.getElementsByClassName("all-matches");
const resetEl = document.getElementsByClassName("lws-reset");

// Initial State 
const initialState = {
    counters: [
        {
            id: 0,
            value: 0,
        },
    ]
}

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADDCOUNTER = "addCounter";
const RESET = "restCounter";

// action creators
const increment = ({ id, value }) => {
    return {
        type: INCREMENT,
        payload: {
            id: id,
            value: value,
        },
    };
};

const decrement = ({ id, value }) => {
    return {
        type: DECREMENT,
        payload: {
            id: id,
            value: value,
        },
    };
};

const addCounterAction = () => {
    return {
        type: ADDCOUNTER,
        payload: {
            id: store.getState().counters.length,
            value: 0,
        }
    }
};

const restCounterAction = () => {
    return {
        type: RESET,
        // payload: {

        // }
    }
}

// Counter Reducer 
const CounterReducer = (state = initialState, action) => {
    if (action.type === INCREMENT) {
        return {
            ...state,
            counters: state.counters.map((p) => {
                if (p.id === action.payload.id) {
                    return {
                        ...p,
                        value: p.value + action.payload.value,
                    }
                } else {
                    return p;
                }
            })
        }
    }
    if (action.type === DECREMENT) {
        return {
            ...state,
            counters: state.counters.map((p) => {
                if (p.id === action.payload.id) {
                    if (p.value >= action.payload.value) {
                        return {
                            ...p,
                            value: p.value - action.payload.value,
                        }
                    } else {
                        return p;
                    }
                } else {
                    return p;
                }
            })
        }
    }
    if (action.type === ADDCOUNTER) {
        return {
            ...state,
            counters: [...state.counters, action.payload]
        }
    }
    if (action.type === RESET) {
        return {
            ...state,
            counters: state.counters.map((p) => {
                return {
                    ...p,
                    value: 0,
                }
            }),
        }
    }
    else {
        return state;
    }
}

// create store
const store = Redux.createStore(CounterReducer);

const render = () => {
    const state = store.getState();
    state.counters.map((p) => {
        document.getElementById(`resultId-${p.id}`).innerText = p.value.toString();
    })
};

// update UI initially
render();

store.subscribe(render);

// Add new counter UI
const newCounter = () => {
    const singleCounterDiv = document.createElement("div");
    store.getState().counters.map((p) => {
        singleCounterDiv.innerHTML = `
        <div class="match">
        <div class="wrapper">
        <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">Match ${p.id + 2}</h3>
        </div>
        <div class="inc-dec">
        <form class="incrementForm">
        <h4>Increment</h4>
        <input type="number" name="increment" class="lws-increment" id="increment-id-${p.id + 1}" onkeypress={incrementFun(event,${p.id + 1})} />
        
        </form>
        <form class="decrementForm">
        <h4>Decrement</h4>
        <input type="number" name="decrement" id="decrement-id-${p.id + 1}" class="lws-decrement" onkeypress={decrementFun(event,${p.id + 1})} />
        </form>
        </div>
        <div class="numbers">
        <h2 id="resultId-${p.id + 1}" class="lws-singleResult">120</h2>
        </div>
            </div>
            `;

    })
    allMatchesEl[0].appendChild(singleCounterDiv);
}

// Increment Function 
const incrementFun = (event, id) => {
    const IncrementField = document.getElementById(`increment-id-${id}`);
    if (event.key === "Enter") {
        event.preventDefault();
        const value = IncrementField.value;
        store.dispatch(increment({ id: id, value: Number(value) }));
        IncrementField.value = "";
    }
}

// Decrement Function 
const decrementFun = (event, id) => {
    const DecrementField = document.getElementById(`decrement-id-${id}`);
    if (event.key === "Enter") {
        event.preventDefault();
        const value = DecrementField.value;
        store.dispatch(decrement({ id: id, value: Number(value) }));
        DecrementField.value = "";
    }
}

// Add more Match
buttonEl[0].addEventListener("click", () => {
    newCounter();
    store.dispatch(addCounterAction())
})

// reset
resetEl[0].addEventListener("click", () => {
    // newCounter();
    store.dispatch(restCounterAction())
});