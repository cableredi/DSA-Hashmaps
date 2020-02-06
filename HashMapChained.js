class _ChainedNode {
    constructor(value, next) {
        this.value = value
        this.next = next || null
    }
}

class HashMapChained {
    constructor(initialCapacity = 9) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
    }

    get(key) {
        const hash = this._hashString(key);
        const index = hash % this._capacity;
        let chainedNode = this._hashTable[index];

        while (chainedNode && chainedNode.value.key !== key) {
            chainedNode = chainedNode.next;
        };

        if (!chainedNode) {
            throw new Error("Key error");
        };

        return chainedNode.value.value;
    }
    set(key, value) {
        // check if need to grow array
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        };

        // find index for new key
        const hash = this._hashString(key);
        const index = hash % this._capacity;

        // set index to new value directly, or add on to the end of an existing _ChainedNode if hash collision
        if (!this._hashTable[index]) {
            this._hashTable[index] = new _ChainedNode({ key, value }, null);
        } else {
            let chainedNode = this._hashTable[index];
            while (true) {
                // if we found a match to the key, just overwrite the existing value
                if (chainedNode.value.key === key) {
                    chainedNode.value.value = value;
                    break;
                }
                // or add a new node if got to the end of list without finding a match
                else {
                    if (!chainedNode.next) {
                        chainedNode.next = new _ChainedNode({ key, value }, null);
                        this.length++;
                        break;
                    }
                    chainedNode = chainedNode.next;
                };
            };
        };
    };

    delete(key) {
        const hash = this._hashString(key);
        const index = hash % this._capacity;
        const slotNode = this._hashTable[index];

        // find the slotNode for given key
        let prevNode = null;
        while (slotNode && slotNode.key !== key) {
            slotNode = slotNode.next;
        };

        if (!slotNode) {
            throw new Error("Key error");
        };

        // once found, remove by setting null in the hashTable or removing from the linked list chain
        if (prevNode) {
            prevNode.next = slotNode.next;
        } else {
            this._hashTable[index] = null;
        };

        // set new length
        this.length--;
    }

    _resize(size) {
        // recreate the hashmap w/ larger capacity
        let oldSlotNodes = this._hashTable;
        this._capacity = size;
        this._hashTable = [];
        this._deleted = 0;
        this.length = 0;

        // loop thru old and set all keys in new array from old
        for (const slotNode of oldSlotNodes) {
            while (slotNode) {
                this.set(slotNode.value.key, slotNode.value.value);
                slotNode = slotNode.next;
            };
        };
    };

    _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
        }

        return hash >>> 0;// make sure unsigned/positive integer
    };
};

HashMapChained.MAX_LOAD_RATIO = 0.5
HashMapChained.SIZE_RATIO = 3

module.exports = HashMapChained;
