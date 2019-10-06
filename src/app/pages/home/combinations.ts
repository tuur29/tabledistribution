
// prettier-ignore
const getCase2 = (arr: string[]) => [
  [
    [arr[0], arr[1]],
    [arr[2], arr[3]]
  ],
  [
    [arr[0], arr[3]],
    [arr[2], arr[1]]
  ]
];

// prettier-ignore
const getCase3 = (arr) => [
  [
    [arr[0], arr[1], arr[2]],
    [arr[3], arr[4], arr[5]],
    [arr[6], arr[7], arr[8]]
  ],
  [
    [arr[0], arr[4], arr[8]],
    [arr[1], arr[5], arr[6]],
    [arr[2], arr[3], arr[7]]
  ],
  [
    [arr[0], arr[5], arr[7]],
    [arr[1], arr[3], arr[8]],
    [arr[2], arr[4], arr[6]]
  ]
];

const getCase4 = (arr) => [
  [
    [arr[0], arr[1], arr[2], arr[3]],
    [arr[4], arr[5], arr[6], arr[7]],
    [arr[8], arr[9], arr[10], arr[11]],
    [arr[12], arr[13], arr[14], arr[15]],
  ],
  [
    [arr[0], arr[5], arr[10], arr[15]],
    [arr[1], arr[4], arr[11], arr[14]],
    [arr[2], arr[7], arr[8], arr[13]],
    [arr[3], arr[9], arr[6], arr[12]],
  ],
  [
    [arr[0], arr[7], arr[9], arr[14]],
    [arr[1], arr[6], arr[8], arr[15]],
    [arr[2], arr[5], arr[12], arr[11]],
    [arr[3], arr[4], arr[10], arr[13]],
  ],
  [
    [arr[0], arr[6], arr[11], arr[13]],
    [arr[1], arr[7], arr[10], arr[12]],
    [arr[2], arr[4], arr[9], arr[15]],
    [arr[3], arr[5], arr[8], arr[14]],
  ],
];

const getCase5 = (arr) => [
  [
    [arr[0], arr[1], arr[2], arr[3], arr[4]],
    [arr[5], arr[6], arr[7], arr[8], arr[9]],
    [arr[10], arr[11], arr[12], arr[13], arr[14]],
    [arr[15], arr[16], arr[17], arr[18], arr[19]],
    [arr[20], arr[21], arr[22], arr[23], arr[24]],
  ],
  [
    [arr[0], arr[6], arr[12], arr[18], arr[24]],
    [arr[1], arr[7], arr[13], arr[19], arr[20]],
    [arr[2], arr[8], arr[14], arr[15], arr[21]],
    [arr[3], arr[9], arr[10], arr[16], arr[22]],
    [arr[4], arr[5], arr[11], arr[17], arr[23]],
  ],
  [
    [arr[0], arr[11], arr[22], arr[8], arr[19]],
    [arr[5], arr[16], arr[2], arr[13], arr[24]],
    [arr[10], arr[21], arr[7], arr[18], arr[4]],
    [arr[15], arr[1], arr[12], arr[23], arr[9]],
    [arr[20], arr[6], arr[17], arr[3], arr[14]],
  ],
  [
    [arr[0], arr[16], arr[7], arr[23], arr[14]],
    [arr[5], arr[21], arr[12], arr[3], arr[19]],
    [arr[10], arr[1], arr[17], arr[8], arr[24]],
    [arr[15], arr[6], arr[22], arr[13], arr[4]],
    [arr[20], arr[11], arr[2], arr[18], arr[9]],
  ],
  [
    [arr[0], arr[21], arr[17], arr[13], arr[9]],
    [arr[5], arr[1], arr[22], arr[18], arr[14]],
    [arr[10], arr[6], arr[2], arr[23], arr[19]],
    [arr[15], arr[11], arr[7], arr[3], arr[24]],
    [arr[20], arr[16], arr[12], arr[8], arr[4]],
  ],
];


export function getCombinations(arr: any[]): any[] {
  const count = Math.sqrt(arr.length);

  if (count === 4) {
    return getCase4(arr);
  }

  const permuteOnce = (matrix, colIndex) => {
    const newmatrix = JSON.parse(JSON.stringify(matrix));
    for (let rowIndex = 0; rowIndex < matrix.length - 1; rowIndex++) {
      newmatrix[rowIndex][colIndex] = matrix[rowIndex + 1][colIndex];
    }
    newmatrix[newmatrix.length - 1][colIndex] = matrix[0][colIndex];
    return newmatrix;
  };

  const permuteAll = matrix => {
    let newmatrix = matrix;
    for (let i = 1; i < matrix.length; i++) {
      // column every except first
      for (let j = 0; j < i; j++) {
        // permute column, column index times
        newmatrix = permuteOnce(newmatrix, i);
      }
    }
    return newmatrix;
  };

  const generateRound = () => {
    return new Array(count).fill([]).map((_, tableIndex) => {
      const seats = new Array(count).fill([]);
      const indexes = seats.map((_, seatIndex) => {
        return (seatIndex + tableIndex * count) % arr.length;
      });
      return indexes;
    });
  };

  const indexes = new Array(count).fill(null).map((_, roundIndex) => {
    let round = generateRound();
    for (let j = 0; j < roundIndex; j++) {
      round = permuteAll(round);
    }
    return round;
  });

  // TODO: or solve this based on 8 queens problem (https://www.tutorialspoint.com/N-Queen-Problem)
  const all = indexes.map(round => round.map(table => table.sort().map(seat => arr[seat])));

  const primes = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23];
  // if prime -> only first, second and last permutation
  return primes.includes(count) ? all : [all[0], all[1], all[all.length - 1]];
}
