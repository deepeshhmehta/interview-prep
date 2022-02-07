var input = ['AREA', 'BALL', 'DEAR', 'LADY', 'LEAD', 'YARD', 'REEL', 'REAL', 'DALT',
    'TOMMY'];
console.log(wordSquare(input));
function wordSquare(input) {
    var possibleSquares = [];
    var _loop_1 = function (i) {
        console.log('---');
        var word = input[i];
        console.log({ word: word });
        // get same length options
        var comparables = input.filter(function (a) {
            // not itself
            // const notSame = a !== word;
            var sameLength = a.length === word.length;
            // return sameLength;
            return sameLength;
        });
        console.log({ comparables: comparables });
        if (comparables.length === 0) {
            return "continue";
        }
        // let squareStartingWithWord = [word];
        var possibleSquaresStartingWithWord = [[word]];
        console.log({ possibleSquaresStartingWithWord: possibleSquaresStartingWithWord });
        var _loop_2 = function (j) {
            var possibleSquareStartingWithWordAdditions = [];
            var _loop_3 = function (psI) {
                var possibleSquare = possibleSquaresStartingWithWord[psI];
                var activeScreenWord = "";
                possibleSquare.forEach(function (squareWord) {
                    activeScreenWord += squareWord[j];
                });
                console.log({ activeScreenWord: activeScreenWord });
                var possibleWordsForThisPositionInThisSquare = comparables.filter(function (w) { return w.indexOf(activeScreenWord) === 0; });
                console.log({ possibleWordsForThisPositionInThisSquare: possibleWordsForThisPositionInThisSquare });
                if (possibleWordsForThisPositionInThisSquare.length === 0) {
                    possibleSquaresStartingWithWord[psI] = [];
                }
                else if (possibleWordsForThisPositionInThisSquare.length > 1) {
                    possibleWordsForThisPositionInThisSquare.forEach(function (possibleWord) {
                        var copyOfcurrentSquareObject = JSON.parse(JSON.stringify(possibleSquaresStartingWithWord[psI]));
                        copyOfcurrentSquareObject.push(possibleWord);
                        possibleSquareStartingWithWordAdditions.push(copyOfcurrentSquareObject);
                        // possibleSquaresStartingWithWord.push(copyOfcurrentSquareObject);
                    });
                    possibleSquaresStartingWithWord[psI] = [];
                }
                else {
                    possibleSquaresStartingWithWord[psI].push(possibleWordsForThisPositionInThisSquare[0]);
                }
            };
            for (var psI = 0; psI < possibleSquaresStartingWithWord.length; psI++) {
                _loop_3(psI);
            }
            ;
            possibleSquaresStartingWithWord.push.apply(possibleSquaresStartingWithWord, possibleSquareStartingWithWordAdditions);
            possibleSquaresStartingWithWord = possibleSquaresStartingWithWord.filter(function (sq) { return sq.length > 0; });
            // let activeScreenWord = "";
            // squareStartingWithWord.forEach(squareWord => {
            // activeScreenWord += squareWord[j];
            // });
            // const possibleWordsForThisPosition = comparables.filter(w => w.indexOf(activeScreenWord) === 0);
            // console.log(possibleWordsForThisPosition);
            // if (possibleWordsForThisPosition.length === 0) {
            // squareStartingWithWord = [];
            // break;
            // } else {
            // squareStartingWithWord.push(possibleWordsForThisPosition[0]);
            // }
            console.log({ possibleSquaresStartingWithWord: possibleSquaresStartingWithWord });
            console.log('j loop end, may repeat');
        };
        for (var j = 1; j < word.length; j++) {
            _loop_2(j);
        }
        if (possibleSquaresStartingWithWord.length > 0) {
            possibleSquares.push.apply(possibleSquares, possibleSquaresStartingWithWord);
        }
    };
    for (var i = 0; i < input.length; i++) {
        _loop_1(i);
    }
    ;
    return possibleSquares;
}
