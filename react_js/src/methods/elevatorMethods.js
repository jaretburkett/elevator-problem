
const noRouteString = 'NO SUCCESSFUL ROUTE';

export function splitState(elevatorStates, time){
    // remove whitespace then split on new line
    return elevatorStates[time].split(' ').join('').split('\n')
}

export function getElevatorArr(elevatorStates){
    // remove whitespace then split on new line
    const floors = splitState(elevatorStates, 0);
    let elevatorsString = '';
    for(let i = 0; i < floors.length; i++){
        elevatorsString += floors[i].split('x').join('').split('.').join('')
    }
    let rawElevatorArr = elevatorsString.split('');
    rawElevatorArr.sort();
    return rawElevatorArr;
}


function parseFloor(floorState){
    // # clean string to remove everything except elevator names (A, B, C, etc)
    return floorState.split('x').join('').split('.').join('').split(' ').join('').split('');
}

function parseStates(elevatorStates){
    let elevators_list = [];
    for(let i = 0; i < elevatorStates.length; i++){
        let elevatorState = elevatorStates[i];
        // split the string by line for each floor
        let elevator_floors = elevatorState.split('\n');
        // # reverse the order of the floors fo first floor is in the 0 index
        let elevator_floors_flipped = elevator_floors.splice(0);
        elevator_floors_flipped.reverse();
        let timeState = {
            floors:[],
            elevators:{}
        };
        for(let floor = 0; floor < elevator_floors_flipped.length; floor++){
            // # clean string to remove everything except elevator names (A, B, C, etc)
            const elevators_on_floor = parseFloor(elevator_floors_flipped[floor]);
            timeState.floors.push(elevators_on_floor);
            // for elevator in elevators_on_floor:
            for(let e = 0; e < elevators_on_floor.length; e++) {
                const elevator = elevators_on_floor[e];
                // # add each elevator to the floor it is on, 1 indexed
                timeState.elevators[elevator] = floor;
            }
        }
        elevators_list.push(timeState)
    }
    return elevators_list;
}

export function findElevatorPath(elevatorStates, startingElevator, finalDestination){
    // # parse destination string as integers
    const finalDestinationSplit = finalDestination.split('-');
    let floor = parseInt(finalDestinationSplit[0]);
    let time = parseInt(finalDestinationSplit[1]);

    // # subtract 1 from time to make it 0 indexed
    time -= 1;
    floor -= 1;

    // # parse the states as a pandas data frame so we can work with it easily
    const states = parseStates(elevatorStates);

    // # automatically "illegal" if no elevators end on destination floor
    if(states[time].floors[floor].length === 0){
        return noRouteString;
    } else {

        // # using "brute force" method, we evaluate all possible scenarios for each time frame
        const start_floor = states[0].elevators[startingElevator];
        // # keep track of out possible paths in a list
        // # pre-populate the paths list with all elevators on the same floor as out starting elevator at t=1
        let paths = [states[0].floors[start_floor]];
        for(let t = 1; t < time + 1; t++){
            const pathSnapshot = paths.slice(0);
            for(let p = 0; p < pathSnapshot.length; p++){
                let current_elevator = paths[p][paths[p].length - 1];
                let current_floor = states[t].elevators[current_elevator];
                let elevators_on_floor = states[t].floors[current_floor];
                if(elevators_on_floor.length > 1) {
                    for (let new_path_idx = 1; new_path_idx < elevators_on_floor.length; new_path_idx++) {
                        let new_path = paths[p].slice(0);
                        new_path.push(elevators_on_floor[new_path_idx]);
                        paths.push(new_path)
                    }
                }
                paths[p].push(elevators_on_floor[0]);
            }
        }
        for(let p = 0; p < paths.length; p++){
            const currentPath = paths[p];
            const final_floor = states[time].elevators[currentPath[currentPath.length - 1]];
            if(final_floor === floor) {
                return currentPath.join('');
            }
        }
        // if we made it this far, there is no possible path
        return noRouteString;
    }
}