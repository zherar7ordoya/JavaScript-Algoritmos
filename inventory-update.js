const updateInventory = (arr1, arr2) => {
    const validateArray = (arr, param) => {
        if (arr.some(x => !Array.isArray(x))) {
            throw new Error(`${param} is not a 2D array.`);
        }

        if (arr.some(x => x.length !== 2)) {
            throw new Error(`${param} is formated incorrectly. All items in 2D array must contain exactly 2 items.`);
        }

        const msg = 'is formated incorrectly. Expecting every %num% item in each 2D array to be a';

        if (arr.some(x => typeof x[0] !== 'number')) {
            throw new Error(`${param} ${msg.slice().replace('%num%', '1st')} number.`);
        }

        if (arr.some(x => typeof x[1] !== 'string')) {
            throw new Error(`${param} ${msg.slice().replace('%num%', '2nd')} string.`);
        }
    }

    validateArray(arr1, 'Parameter 1');
    validateArray(arr2, 'Parameter 2');

    const getEntry = (name) => {
        for (const item of arr1) { if (item[1] === name) return item; }
    }

    arr2.forEach(x => {
        const match = getEntry(x[1]);
        if (match) {
            match[0] = match[0] + x[0];
        } else {
            arr1.push(x);
        }
    });

    arr1.sort((a, b) => {
        const x = a[1].toLowerCase();
        const y = b[1].toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    });

    return arr1;
}

/**
 * @returns [
 *              [1, "Bowling Ball"],
 *              [0, "Dirty Sock"],
 *              [1, "Hair Pin"],
 *              [1, "Half-Eaten Apple"],
 *              [0, "Microphone"],
 *              [1, "Toothpaste"]
 *          ]
 */

console.log(updateInventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]))