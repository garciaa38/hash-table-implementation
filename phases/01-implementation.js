class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    this.count++;
    const newPair = new KeyValuePair(key, value);
    let idx = this.hashMod(key);

    if (!this.data[idx]) {
      this.data[idx] = newPair;
    }

    if (this.data[idx]) {
      let curr = this.data[idx];
      while (curr) {
        if (curr.key === key) {
          curr.value = value;
          return;
        }
        curr = curr.next;
      }
      let prevPair = this.data[idx];
      this.data[idx] = newPair;
      this.data[idx].next = prevPair;
    }
  }


  read(key) {
    // Your code here

    let idx = this.hashMod(key);
    let answer;
    if (this.data[idx]) {
      answer = this.data[idx].value;

      if (this.data[idx].key === key) {
        return answer;
      } else if (this.data[idx]) {
        let curr = this.data[idx];
        while (curr) {
          if (curr.key === key) {
            answer = curr.value;
            return answer;
          }
          curr = curr.next;
        }
      }
    }
    return undefined;
  }


  // // Your code here
  // //this.capacity = this.capacity * 2;
  // let dataFiller = this.data;
  // //console.log(dataFiller);
  // //console.log('OLD DATA', this.data);
  // this.data = new Array(this.capacity * 2).fill(null);
  // console.log('NEW DATA', this.data[0]);
  // for (let i = 0; i < dataFiller.length; i++) {
  //   console.log(this.data[i]);
  //   this.data[i] = dataFiller[i];
  //   console.log(this.data[i]);
  // }
  // console.log(this.data);
  // //this.capacity *= 2;
  resize() {
    // this.capacity *= 2;
    // this.data.length *= 2;
    // console.log(this);
    let doubleArr = new Array(this.capacity).fill(null);
    this.capacity *= 2;
    this.data = this.data.concat(doubleArr);
  }


  delete(key) {
    // Your code here
  }
}

// let hashTab1 = new HashTable();
// console.log(hashTab1.insert(70,71));
// console.log(hashTab1.insert(70, 73));
// console.log(hashTab1.data)

module.exports = HashTable;
