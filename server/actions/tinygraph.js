const shapes = [
    'squares',
    'isogrids',
    'spaceinvaders',
    'labs/isogrids/hexa',
    'labs/isogrids/hexa16'
];

const themes = [
    'seascape',
    'frogideas',
    'sugarsweets',
    'heatwave',
    'daisygarden',
    'summerwarmth',
    'bythepool',
    'duskfalling',
    'berrypie',
    'base'
];

const numColors = ['2', '3', '4'];

const getRandomOption = array => {
    return array[Math.floor(Math.random() * array.length)];
};
module.exports = {
    createAvatar: username => {
        return `http://tinygraphs.com/${getRandomOption(
            shapes
        )}/${username}?theme=${getRandomOption(themes)}&numcolors=${getRandomOption(numColors)}`;
    }
};
