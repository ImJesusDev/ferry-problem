import fs from 'fs';
import readline from 'readline';

const readInterface = readline.createInterface({
  input: fs.createReadStream('./data.txt'),
});

let instructions: any = [];

const start = async () => {
  // Store all instructions in array
  await readInterface.on('line', (instruction) => {
    instructions.push(instruction);
  });

  // After file is read, start the process
  await readInterface.on('close', async () => {
    const result = await calculateDistance(instructions);
    console.log('Result: ', result);
  });
};

export const calculateDistance = async (allInstructions: string[]) => {
  /**
   * Reference
   * https://electricbookworks.github.io/siyavula-open-textbooks-images/items/images/web/ebw-jss2-13-005.png
   */
  let directions: any = {
    0: 'north',
    90: 'east',
    135: 'se',
    180: 'south',
    225: 'sw',
    270: 'west',
    315: 'nw',
  };
  // Starting Direction (East)
  let currentDirection = 90;

  // Store traveled distance in each direction
  let traveledDistance: any = {
    north: 0,
    east: 0,
    se: 0,
    south: 0,
    sw: 0,
    west: 0,
    nw: 0,
  };
  // Iterate all instructions
  allInstructions.map((inst: string) => {
    // Split the action and the value of the instruction
    const result = inst.match(/^([LRNSEWF])(\d+)$/);
    const [input, direction, value] = result!;

    switch (direction) {
      /**
       * If the direction is front
       * increase the distance for the current direction
       */
      case 'F':
        // Access the traveledDistance object at the position of the current direction
        traveledDistance[`${directions[currentDirection]}`] =
          traveledDistance[`${directions[currentDirection]}`] + parseInt(value);
        break;
      case 'R':
        // Turn right
        // Use modular operator to keep in 0 - 360 range
        currentDirection = (currentDirection + parseInt(value)) % 360;

        break;
      case 'L':
        // Turn left
        // Use modular operator to keep in 0 - 360 range
        // Add 360 to handle negative values
        // use Math.abs to avoid negative value
        currentDirection = (currentDirection - parseInt(value) + 360) % 360;
        break;
      /**
       * Increase the value for each direction
       */
      case 'E':
        traveledDistance['east'] = traveledDistance['east'] + parseInt(value);
        break;
      case 'N':
        traveledDistance['north'] = traveledDistance['north'] + parseInt(value);
        break;
      case 'S':
        traveledDistance['south'] = traveledDistance['south'] + parseInt(value);
        break;
      case 'W':
        traveledDistance['west'] = traveledDistance['west'] + parseInt(value);
        break;
      default:
        break;
    }
  });
  console.log(
    'Traveled distance \n',
    JSON.stringify(traveledDistance, null, 2)
  );
  // result for south / north
  const nsResult = Math.abs(
    traveledDistance['north'] - traveledDistance['south']
  );
  // result for east / west
  const ewResult = Math.abs(
    traveledDistance['east'] - traveledDistance['west']
  );

  const result = nsResult + ewResult;
  return result;
};

if (process.env.NODE_ENV !== 'test') {
  start();
}
