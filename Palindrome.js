const HashMap = require('./Hash');

function anyPermutationPalindrome(str) {
  const hashMap = new HashMap()
  for (let i = 0; i < str.length; i++) {
      let curVal = 0
      try {
          curVal = hashMap.get(str.charAt(i))
      }
      catch (e) { }
      hashMap.set(str.charAt(i), curVal + 1)
  }

  let oddCount = 0

  console.log(hashMap)

  for (let i = 0; i < hashMap._hashTable.length; i++) {
      if (hashMap._hashTable[i] && hashMap._hashTable[i].value % 2 === 1) {
          oddCount++
      }
  }

  console.log("oddCount: " + oddCount)

  return oddCount <= 1
}

console.log(anyPermutationPalindrome("racecar"))
console.log(anyPermutationPalindrome("north"))