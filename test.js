var maxWeight = function (s, k) {
  let n = s.length;
  let cnt = new Array(26).fill(0);
  let kind = 0;
  for (let i = 0; i < k; i++) {
    cnt[s[i].charCodeAt() - 'a'.charCodeAt()]++;
    if (cnt[s[i].charCodeAt() - 'a'.charCodeAt()] === 1) kind++;
  }
  let ans = kind * k;
  for (let i = k; i < n; i++) {
    cnt[s[i - k].charCodeAt() - 'a'.charCodeAt()]--;
    if (cnt[s[i - k].charCodeAt() - 'a'.charCodeAt()] === 0) kind--;
    cnt[s[i].charCodeAt() - 'a'.charCodeAt()]++;
    if (cnt[s[i].charCodeAt() - 'a'.charCodeAt()] === 1) kind++;
    ans = Math.min(ans, kind * k);
  }
  return ans;
};
console.log(maxWeight("ababbbb", 2));


function countEqualAdjacent (str) {
  let count = 0;
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i].toLowerCase() === str[i + 1].toLowerCase()) {
      count++;
    }
  }
  return count;
}
// console.log(countEqualAdjacent("aABbbC"));