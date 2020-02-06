const HashMap = require('./Hash');

function checkHashMapsEqual(a, b) {
  if (a.length !== b.length)
      return false

  for (let i = 0; i < a._hashTable.length; i++) {
      let slot = a._hashTable[i]
      if (!slot)
          continue
      try {
          b.get(slot.key)
      }
      catch (e) {
          return false
      }
  }

  return true
}

function anagramGrouping(anagrams) {
  let hashMaps = anagrams.map(str => {
      const hashMap = new HashMap()
      for (let i = 0; i < str.length; i++) {
          let curVal = 0
          try {
              curVal = hashMap.get(str.charAt(i))
          }
          catch (e) {}
          hashMap.set(str.charAt(i), curVal + 1)
      }
      return hashMap
  })

  // sort hashMaps & strings
  let numUnique = 0
  let sortBuckets = [] // [0,1,1,2] sort in buckets by number
  for(let i=0; i<hashMaps.length; i++) {
      let foundMatch = false
      let j = i-1
      for(; j>=0; j--) {
          if(checkHashMapsEqual(hashMaps[i], hashMaps[j])) {
              foundMatch = true
              break
          }
      }

      if(j<0) {
          // didn't find any matches, create a new bucket
          numUnique++
          // put it in new bucket
          sortBuckets.push(numUnique-1)
      }
      else {
          // put it in already existing bucket
          sortBuckets.push(sortBuckets[j])
      }
  }

  // put all strings into buckets
  let buckets = []
  for(let i=0; i<anagrams.length; i++) {
      if(buckets[sortBuckets[i]]) {
          if(Array.isArray(buckets[sortBuckets[i]]))
              buckets[sortBuckets[i]].push(anagrams[i])
          else
              buckets[sortBuckets[i]] = [buckets[sortBuckets[i]], anagrams[i]]
      }
      else {
          buckets[sortBuckets[i]] = anagrams[i]
      }
  }

  return buckets
}

console.log(anagramGrouping(['east', 'cars', 'arce', 'arcs', 'teas', 'eats', 'race']));