import {observable, decorate} from "mobx";

class Store {
    solution = null;
    startingElevator = 'A';
    destination = '1-1';
}

decorate(Store, {
    solution: observable,
    startingElevator: observable,
    destination: observable
});

let store;
if (window.elevatorStore) {
    store = window.elevatorStore;
} else {
    store = window.elevatorStore = new Store()
}

export default store;