const HashMap = require('./Hash');

function removeDuplicates(string) {
  const hashMap = new HashMap()
    let newStr = ""
    for (let i = 0; i < string.length; i++) {
        try {
            hashMap.get(string.charAt(i))
        }
        catch (e) {
            hashMap.set(string.charAt(i), true)
            newStr = newStr + string.charAt(i)
        }
    }
    return newStr
};

console.log(removeDuplicates('google'));
console.log(removeDuplicates('google all that you think can think of'));