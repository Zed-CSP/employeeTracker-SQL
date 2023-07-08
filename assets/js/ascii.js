const figlet = require('figlet');
const { forEach } = require('lodash');

const line = '__________________________________________________________________________________________________________________________________________';
const line2 = '******************************************************************************************************************************************';
const space = '\n';
const tag = 'SQL Employee Database Management System CLI. Christopher Peret (c) 2023.';

const title = figlet.textSync('Employee Tracker.', { font: 'Larry 3D' });

const art = [
  space.repeat(8),
  line,
  line2,
  title,
  line2,
  line,
  tag,
  space.repeat(2),
];

function titleArt() {
  forEach(art, (art) => {
    console.log(art);
  });
};

module.exports = titleArt;