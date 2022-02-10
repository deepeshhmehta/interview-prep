const terrainArray = [1,3,2,4,1,3,1,4,5,2,2,1,4,2,4];
//                   [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4]

let leftPillar = terrainArray[0];
let volume = 0;

for(let i=1; i < terrainArray.length - 1; i++) {
    const {leftPillarIndex, rightPillarIndex} = findPillars(terrainArray, i);
    if (leftPillarIndex && rightPillarIndex) {
        const leftPillarValue = terrainArray[leftPillarIndex];
        const rightPillarValue = terrainArray[rightPillarIndex];
        const currentVolume = calculateForRange(terrainArray, leftPillarIndex, leftPillarValue, rightPillarIndex, rightPillarValue);
        
        console.log({
            currentIndex: i, currentValue: terrainArray[i],
            leftPillarIndex, leftPillarValue: terrainArray[leftPillarIndex],
            rightPillarIndex, rightPillarValue: terrainArray[rightPillarIndex],
            currentVolume,
        });

        volume += currentVolume;
        i = rightPillarIndex;
    }
}

function findPillars(terrainArray, currentIndex) {
    const current = terrainArray[currentIndex];
    let leftPillarIndex, rightPillarIndex = currentIndex;

    // find biggest pillar to the left
    for(let i = currentIndex - 1; i >= 0 ; i--) {
        if (terrainArray[i] > current) {
            leftPillarIndex = i;
            break;
        }
    }

    // find biggest pillar to the right
    for(let i = currentIndex + 1; i < terrainArray.length ; i++) {
        if (terrainArray[i] > current && terrainArray[i] > terrainArray[rightPillarIndex]) {
            rightPillarIndex = i;
        }
        if (terrainArray[i] >= terrainArray[leftPillarIndex]) {
            break;
        }
    }

    return {leftPillarIndex, rightPillarIndex};
}

function calculateForRange(terrainArray, leftPillarIndex, leftPillarValue, rightPillarIndex, rightPillarValue) {
    let volume = 0;
    const lowerPillerValue = leftPillarValue < rightPillarValue ? leftPillarValue : rightPillarValue;
    for (let i= leftPillarIndex + 1; i < rightPillarIndex; i++) {
        const currentValue = terrainArray[i];
        
        const volumeToBeAdded = lowerPillerValue - currentValue;
        if (volumeToBeAdded > 0) {
            volume += volumeToBeAdded;
        }
    }
    return volume;
}

console.log(terrainArray, volume);