const { populateData } = require('./seed/seedFunctions');

module.exports = async function () {
    await populateData();
}