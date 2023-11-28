const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  }
}

const stateControl = storeState();

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    })
  }
}

const plantFactory2 = () => {
  let plantCounter = 0;
  return () => {
    console.log(plantCounter);
    plantCounter ++;
    return (prop) => {
      return (value) => {

      }
    } 
  }
}

// const hydrate = changeState("water")(1);

// const plantFactory2 = () => {
//   let plantCounter = 0;
//   return () => {
//     console.log(plantCounter);
//     plantCounter ++;
//     return {
//       plantID: plantCounter
//     }; 
//   }
// }

const newPlant = plantFactory2();

const plantFactory = () => {
  let plantState = {};

  return {
    ...plantState
  }
};

const plant1 = plantFactory();
const plant2 = plantFactory2();

const growingPlant = (plant) => {
  let height = 0;

  return {
    ...plant,
    getHeight: () => height,
    grow: (amount = 1) => {
        height += amount;
        return plant;
        }
    }
}

const flyEatingPlant = (plant) => {
    let mouth = "open";

    return {
        ...plant,
        OpenOrShut: () => mouth,
        openUp: () => {
            mouth = "open"
            return plant
        },
        shut: () => {
            mouth = "shut"
            return plant
        }
    }
}

const flyTrap = flyEatingPlant(plantFactory());

flyTrap.shut();


const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

window.onload = function () {


  document.getElementById('feed').onclick = function () {
    const newState = stateControl(blueFood);
    document.getElementById('soil-value').innerText = `Soil: ${newState.soil}`;
  };

  // This function doesn't actually do anything useful in this application 
  // — it just demonstrates how we can "look" at the current state 
  // (which the DOM is holding anyway). 
  // However, students often do need the ability to see the current state 
  // without changing it so it's included here for reference.
  document.getElementById('show-state').onclick = function () {
    // We just need to call stateControl() without arguments 
    // to see our current state.
    const currentState = stateControl();
    document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
  };
};



// const createState = () => {
//   let newState = {};
//   return (name) => {
//     return (value) => {
//       return (state) => ({
//         ...state,
//         [prop]: (state[prop] || 0) + value
//       })
//     }
//   }
// }