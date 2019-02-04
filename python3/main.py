import pandas as pd
import numpy as np
from copy import copy


def _parse_states(elevator_states):
    elevators_list = []
    for elevator_state in elevator_states:
        # split the string by line for each floor
        elevator_floors = elevator_state.split('\n')
        # reverse the order of the floors fo first floor is in the 0 index
        elevator_floors_flipped = elevator_floors[::-1]
        elevators = {}
        for floor in range(0, len(elevator_floors_flipped)):
            # clean string to remove everything except elevator names (A, B, C, etc)
            elevators_on_floor = list(elevator_floors_flipped[floor].replace('x', '').replace('.', '').replace(' ', ''))
            for elevator in elevators_on_floor:
                # add each elevator to the floor it is on, 1 indexed
                elevators[elevator] = floor + 1
        elevators_list.append(elevators)
    # return pandas dataframe
    return pd.DataFrame(elevators_list, dtype=np.uint16)


def find_elevator_path(elevator_states, starting_elevator, final_destination):
    fail_string = 'NO SUCCESSFUL ROUTE'
    # parse destination string as integers
    floor, time = [int(x) for x in final_destination.split('-')]
    # subtract 1 from time to make it 0 indexed
    time -= 1
    # parse the states as a pandas data frame so we can work with it easily
    states = _parse_states(elevator_states)

    # automatically "illegal" if no elevators end on destination floor
    if floor not in states.iloc[time].values:
        return fail_string
    else:
        # using "brute force" method, we evaluate all possible scenarios for each time frame
        start_floor = states[starting_elevator][0]
        # keep track of out possible paths in a list
        # pre-populate the paths list with all elevators on the same floor as out starting elevator at t=1
        paths = [[c] for c in states.columns if states[c][0] == start_floor]
        for t in range(1, time + 1):
            for p in range(0, len(paths)):
                current_elevator = paths[p][-1]
                current_floor = states[current_elevator][t]
                elevators_on_floor = [c for c in states.columns if states[c][t] == current_floor]
                # if there are other possible steps,
                # create a new possible path by cloning current path and adding new step
                for new_path_idx in range(1, len(elevators_on_floor)):
                    new_path = copy(paths[p]) + [elevators_on_floor[new_path_idx]]
                    paths.append(new_path)
                paths[p] += [elevators_on_floor[0]]
        # return first path that arrives at our destination, if there is one.
        for path in paths:
            final_floor = int(states[path[-1]][time])
            if final_floor == floor:
                return ''.join(path)
        # if we made it this far, there is not a solution
        return fail_string


if __name__ == "__main__":

    import unittest


    class TestElevatorPaths(unittest.TestCase):
        def __init__(self, *args, **kwargs):
            super(TestElevatorPaths, self).__init__(*args, **kwargs)
            self.example_state = [
                # // State @ t=1
                """xx.x.x.xDxx
                 xx.x.x.x.xx
                 xx.x.x.x.xx
                 xx.xBx.x.xx
                 xx.x.xCx.xx
                 xxAx.x.x.xx""",
                # // State @ t=2
                """xx.x.x.x.xx
                 xx.x.x.x.xx
                 xxAx.x.x.xx
                 xx.xBx.x.xx
                 xx.x.xCx.xx
                 xx.x.x.xDxx""",
                # // State @ t=3
                """xx.x.xCx.xx
                 xx.x.x.x.xx
                 xx.x.x.x.xx
                 xxAxBx.x.xx
                 xx.x.x.x.xx
                 xx.x.x.xDxx""",
                # // State @ t=4
                """xx.x.xCx.xx
                 xx.x.x.x.xx
                 xx.xBx.xDxx
                 xx.x.x.x.xx
                 xxAx.x.x.xx
                 xx.x.x.x.xx""",
                # // State @ t=5
                """xx.x.xCx.xx
                 xx.x.x.xDxx
                 xx.x.x.x.xx
                 xx.x.x.x.xx
                 xxAxBx.x.xx
                 xx.x.x.x.xx""",
            ]
            self.fail_string = 'NO SUCCESSFUL ROUTE'

        def test_route1(self):
            path = find_elevator_path(self.example_state, 'A', '5-5')
            self.assertEqual(path, 'AABDD')

        def test_route2(self):
            path = find_elevator_path(self.example_state, 'A', '4-4')
            self.assertEqual(path, 'AABB')

        def test_no_route_1(self):
            path = find_elevator_path(self.example_state, 'A', '3-5')
            self.assertEqual(path, self.fail_string)

        def test_no_route_2(self):
            path = find_elevator_path(self.example_state, 'C', '2-5')
            self.assertEqual(path, self.fail_string)


    unittest.main()
