const input = "abpplee";

const S = ["able", "ale", "apple", "bale", "kangaroo"];

S.sort((a,b) => (a.length > b.length) ? -1 : 1);

let longestWordThatExists = "";

for(let j = 0; j< S.length; j++) {
    const s = S[j];
    let copy = String(input);
    let exists = true;
    for(let i=0; i<s.length; i++) {
        const c = s[i];
        const indexOfC = copy.indexOf(c);
        if (indexOfC < 0) {
            exists = false;
            break;
        } else {
            copy = copy.slice(indexOfC + 1);
        }
    };
    if (exists) {
        longestWordThatExists = s;
        break;
    }
};

console.log(longestWordThatExists);