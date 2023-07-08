const figlet = require('figlet');
const { forEach } = require('lodash');

const line = '__________________________________________________________________________________________________________________________________________';
const line2 = '******************************************************************************************************************************************';
const space = '\n';

const title = figlet.textSync('Employee Tracker.', { font: 'Larry 3D' });

const art = [
  space,
  line,
  line2,
  title,
  line2,
  line,
  space.repeat(8),
];

function titleArt() {
  forEach(art, (art) => {
    console.log(art);
  });
};

module.exports = titleArt;