
export default {
  login: data => {
    var result = {}
    const groups = data['group']
    for (var i in groups) {
      result[groups[i]] = true
    }
    return {
      username: data['username'],
      power: result
    }
  }
}
