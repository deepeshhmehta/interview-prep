const input = ['AREA', 'BALL', 'DEAR', 'LADY', 'LEAD', 'YARD', 'REEL', 'REAL', 'DALT',
               'TOMMY'];

console.log(wordSquare(input));

function wordSquare(input: string[]) {
    const possibleSquares = [];
    for( let i=0; i< input.length; i++) {
        console.log('---');
        const word = input[i];
        console.log({word});

        // get same length options
        const comparables = input.filter(a => {
            // not itself
            // const notSame = a !== word;
            const sameLength = a.length === word.length;
            // return sameLength;
            return sameLength;
        });
        console.log({comparables});

        if (comparables.length === 0) {
            continue;
        }
        
        // let squareStartingWithWord = [word];
        let possibleSquaresStartingWithWord = [[word]];
        console.log({possibleSquaresStartingWithWord});

        for(let j=1; j<word.length; j++) {
            const possibleSquareStartingWithWordAdditions = [];
            for(let psI = 0; psI < possibleSquaresStartingWithWord.length; psI ++) {
                const possibleSquare = possibleSquaresStartingWithWord[psI];
                
                let activeScreenWord = "";
                possibleSquare.forEach(squareWord => {
                    activeScreenWord += squareWord[j];
                });
                console.log({activeScreenWord});
                
                const possibleWordsForThisPositionInThisSquare = comparables.filter(w => w.indexOf(activeScreenWord) === 0);
                console.log({possibleWordsForThisPositionInThisSquare});
                if (possibleWordsForThisPositionInThisSquare.length === 0) {
                    possibleSquaresStartingWithWord[psI] = [];
                } else if (possibleWordsForThisPositionInThisSquare.length > 1) {
                    possibleWordsForThisPositionInThisSquare.forEach(possibleWord => {
                        const copyOfcurrentSquareObject = JSON.parse(JSON.stringify(possibleSquaresStartingWithWord[psI]));
                        copyOfcurrentSquareObject.push(possibleWord)
                        possibleSquareStartingWithWordAdditions.push(copyOfcurrentSquareObject);
                        // possibleSquaresStartingWithWord.push(copyOfcurrentSquareObject);
                    });
                    possibleSquaresStartingWithWord[psI] = [];
                } else {
                    possibleSquaresStartingWithWord[psI].push(possibleWordsForThisPositionInThisSquare[0]);
                }
            };

            possibleSquaresStartingWithWord.push(...possibleSquareStartingWithWordAdditions);

            possibleSquaresStartingWithWord = possibleSquaresStartingWithWord.filter(sq => sq.length > 0);

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
            console.log({possibleSquaresStartingWithWord});
            console.log('j loop end, may repeat');
            
        }
        if (possibleSquaresStartingWithWord.length > 0) {
            possibleSquares.push(...possibleSquaresStartingWithWord);
        }
    };

    return possibleSquares;
}