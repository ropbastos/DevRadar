module.exports = function stringToArray(arrayAsString) {
    return arrayAsString.split(',').map(item => item.trim())
}