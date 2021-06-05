import { calculateDistance } from './index';

it('it returns the right values v1', async () => {
  const expectedResult = 25;
  const instructions = ['F10', 'N3', 'F7', 'R90', 'F11'];
  let result = await calculateDistance(instructions);
  return expect(result).toEqual(expectedResult);
});

it('it returns the right values v2', async () => {
  const expectedResult = 94;
  const instructions = [
    'L180', // Direction = West
    'F48', // West = 48
    'R90', // Direction = North
    'F37', // North = 37
    'W2', // West = 50
    'R90', // Direction = East
    'W4', // West = 54
    'L90', // Direction = North
    'W3', // West - 57
    // north/ south = 37 - 0 = 37
    // east / west = 57 - 0 = 57
    // result = 57 + 37 = 94
  ];
  let result = await calculateDistance(instructions);
  return expect(result).toEqual(expectedResult);
});

it('it returns the right values v3', async () => {
  const expectedResult = 187;
  const instructions = [
    'F81', // East = 81
    'W5', // West = 5
    'R90', // Direction = South
    'E5', // East = 86
    'L90', // Direction = East
    'F73', // East = 159
    'S5', // South = 5
    'E3', // East = 162
    'N1', // North = 1
    'F27', // East = 189
    'E2', // East = 191
    'N3', // North = 4
    'L180', // Direction = North
    // east / west = 191 - 5 = 186
    // north / south = 5 - 4 = 1
    // Result = 186 + 1 = 187
  ];
  let result = await calculateDistance(instructions);
  return expect(result).toEqual(expectedResult);
});
