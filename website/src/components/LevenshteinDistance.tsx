const LevenshteinDistance = (first_string: string, second_string: string) => {
    if (!first_string.length) return second_string.length;
    if (!second_string.length) return first_string.length;
    const arr = [];
    for (let i = 0; i <= second_string.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= first_string.length; j++) {
        arr[i][j] =
          i === 0
            ? j
            : Math.min(
                arr[i - 1][j] + 1,
                arr[i][j - 1] + 1,
                arr[i - 1][j - 1] + (first_string[j - 1] === second_string[i - 1] ? 0 : 1)
              );
      }
    }
    return arr[second_string.length][first_string.length];
  };
export default LevenshteinDistance;