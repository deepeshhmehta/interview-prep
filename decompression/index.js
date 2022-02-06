var input = "2[axy[]z2[ba]c]4[a2[b]]c10[a]";
console.log("start -- ".concat(Date.now()));
console.log({ input: input, decompressed: decompress(input) });
console.log("end -- ".concat(Date.now()));
function decompress(input) {
    var output = "";
    var indexOfOpeningBracket = input.indexOf("[");
    if (indexOfOpeningBracket < 0) {
        output = input;
        return output;
    }
    var stringBeforeMultiplier = "";
    var multiplier = input.slice(0, indexOfOpeningBracket);
    while (!Number(multiplier) && multiplier.length > 0) {
        stringBeforeMultiplier += multiplier.slice(0, 1);
        multiplier = multiplier.slice(1);
    }
    multiplier = multiplier || '1';
    output += stringBeforeMultiplier;
    input = input.slice(indexOfOpeningBracket + 1);
    var closingBracketIndex = findClosingBracketIndex(input);
    var inBracketString = input.slice(0, closingBracketIndex);
    if (inBracketString.indexOf("[") > 0) {
        inBracketString = decompress(inBracketString);
    }
    for (var i = 0; i < Number(multiplier); i++) {
        output += inBracketString;
    }
    input = input.slice(closingBracketIndex + 1);
    if (input.length > 0) {
        output += decompress(input);
    }
    return output;
}
function findClosingBracketIndex(input) {
    var openingBracketCount = 0;
    var closingBracketIndex = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] === "[") {
            openingBracketCount++;
        }
        if (input[i] === "]") {
            if (openingBracketCount === 0) {
                closingBracketIndex = i;
                break;
            }
            else if (openingBracketCount > 0) {
                openingBracketCount--;
            }
        }
    }
    return closingBracketIndex;
}
