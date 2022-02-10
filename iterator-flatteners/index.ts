const arr1 = [1, 2, 3];
const arr2 = [4, 5];
const arr3 = [6, 7, 8, 9];

class MyIterator {
    private value: any[] = [];
    private current = 0;
    
    constructor(value: any []) {
        this.value = value;
    }

    public hasNext() {
        return (!!this.value[this.current]);
    }

    public next() {
        return (this.value[this.current++]);
    }

    public reset() {
        this.current = 0;
    }
}


class MyIteratorOfIterators {
    private value: MyIterator[];
    private current = 0;
    
    constructor(...values) {
        const iteratorArray = [];
        values.forEach(value => {
            iteratorArray.push(value);
        });
        this.value = iteratorArray;
    }

    public hasNext() {
        return (this.value[this.current])?.hasNext();
    }

    public next() {
        const nextValue = this.value[this.current].next();
        if (nextValue && !this.value[this.current].hasNext()) {
            this.current++;
        }
        return nextValue;
    }

    public flatten() {
        let flattened = "";
        while(iteratorList.hasNext()) {
            flattened += iteratorList.next();
        }
        return flattened;
    }

    public reset() {
        this.current = 0;
        this.value.forEach(v => v.reset());
    }
}

const iterator1 = new MyIterator(arr1);
const iterator2 = new MyIterator(arr2);
const iterator3 = new MyIterator(arr3);
const iteratorList = new MyIteratorOfIterators(iterator1, iterator2, iterator3);


console.log(iteratorList.flatten());
