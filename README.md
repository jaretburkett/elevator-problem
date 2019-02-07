## Elevator Problem
### by Jaret Burkett

Included are two examples of solving the elevator problem:

#### Python 3
Located in the [python3](elevator-problem/tree/master/python3) folder. This solution is a cli only solution and
includes a unit test to validate the output. The only dependencies are pandas
and numpy.

Run tests:
```bash
python3 python3/main.py
```

#### React.js

The react version is deployed here: [https://jaretburkett.github.io/elevator-problem/](https://jaretburkett.github.io/elevator-problem/)

Located in the [react_js](elevator-problem/tree/master/react_js) folder. I had some time over the weekend, 
so I decided to throw together 
a quick React solution. For obvious reasons, it is a much larger
project which is mostly boiler plate and code for the GUI. 
The "meat" of the solution can be found in 
[react_js/methods/elevatorMethods.js](elevator-problem/blob/master/react_js/src/methods/elevatorMethods.js). 
Tests are currently not
included in this example, but I would be happy to add them if
desired. The solution is similar to the python version, but requires some extra
work since we do not have the benefit of numpy and pandas. 
The only requirement is node.js >v4 and yarn. NPM can
be used in replacement of yarn, if desired.

To run:
```bash
cd react_js
yarn install
yarn start
```

The web page should automatically open in the default browser 
once it is transpiled.

#### Questions or Comments
If you have any questions, or you are having trouble getting either solution to work,
feel free to contact me:

* jaretburkett@gmail.com
* 432-288-4867 (call/text)
* jaretburkett (skype)
* undefined#7196 (discord)



