const h = function() {
  let res = {};
  let hash = '';
  for (let i = 0; i < 6; i += 1) {
    hash += '#';
    res[`H${i + 1}`] = hash;
  }
  return res;
}

module.exports.H = h();
