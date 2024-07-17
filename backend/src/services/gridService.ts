const GRID_SIZE = 10;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const BIAS_PROBABILITY = 0.2;

export function generateGrid(bias?: string): string[][] {
  const alphabetLength = ALPHABET.length;
  const totalCells = GRID_SIZE * GRID_SIZE;
  const flatGrid: string[] = new Array(totalCells);

  // Fill the entire grid with random letters
  for (let i = 0; i < totalCells; i++) {
    flatGrid[i] = ALPHABET[Math.floor(Math.random() * alphabetLength)];
  }

  if (bias) {
    const biasCount = Math.floor(totalCells * BIAS_PROBABILITY);

    // Replace a portion of the grid with bias characters
    for (let i = 0; i < biasCount; i++) {
      const j = Math.floor(Math.random() * totalCells);
      flatGrid[j] = bias;
    }
  }

  // Convert flat array to 2D grid
  return Array.from({ length: GRID_SIZE }, (_, i) =>
    flatGrid.slice(i * GRID_SIZE, (i + 1) * GRID_SIZE)
  );
}

export function generateCode(grid: string[][]): string {
  const seconds = new Date().getSeconds().toString().padStart(2, '0');
  const char1 = grid[3][6];
  const char2 = grid[6][3];

  const counts = new Map<string, number>();
  for (const row of grid) {
    for (const char of row) {
      counts.set(char, (counts.get(char) || 0) + 1);
    }
  }

  const reduceCount = (count: number): number => {
    while (count > 9) {
      count = Math.ceil(count / 2);
    }
    return count;
  };

  const count1 = reduceCount(counts.get(char1) || 0);
  const count2 = reduceCount(counts.get(char2) || 0);

  return `${seconds}${count1}${count2}`;
}

function countOccurrences(grid: string[][], char: string): number {
  return grid.flat().filter((c) => c === char).length;
}

export function refreshGrid(): { cells: string[][]; code: string } {
  const grid = generateGrid();
  const code = generateCode(grid);
  return { cells: grid, code };
}
