let input = "2[axy[]z2[ba]c]4[a2[b]]c10[a]";

console.log(`start -- ${Date.now()}`);
console.log({input, decompressed: decompress(input)});
console.log(`end -- ${Date.now()}`);

function decompress(input: string) {
  let output = "";
  const indexOfOpeningBracket = input.indexOf("[");
  if (indexOfOpeningBracket < 0) {
    output = input;
    return output;
  }


  let stringBeforeMultiplier = "";
  let multiplier = input.slice(0, indexOfOpeningBracket);

  while (!Number(multiplier) && multiplier.length > 0) {
    stringBeforeMultiplier += multiplier.slice(0, 1);
    multiplier = multiplier.slice(1);
  }
  multiplier = multiplier || '1';
  output += stringBeforeMultiplier;
  input = input.slice(indexOfOpeningBracket + 1);

  const closingBracketIndex = findClosingBracketIndex(input);

  let inBracketString = input.slice(0, closingBracketIndex);

  if (inBracketString.indexOf("[") > 0) {
    inBracketString = decompress(inBracketString);
  }

  for (let i = 0; i < Number(multiplier); i++) {
    output += inBracketString;
  }

  input = input.slice(closingBracketIndex + 1);
  if (input.length > 0) {
    output += decompress(input);
  }

  return output;
}

function findClosingBracketIndex(input: string) {
  let openingBracketCount = 0;
  let closingBracketIndex = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "[") {
      openingBracketCount++;
    }

    if (input[i] === "]") {
      if (openingBracketCount === 0) {
        closingBracketIndex = i;
        break;
      } else if (openingBracketCount > 0) {
        openingBracketCount--;
      }
    }
  }
  return closingBracketIndex;
}
