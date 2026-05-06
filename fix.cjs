const fs = require('fs');
const cp = require('child_process');

const oldJs = cp.execSync('git --no-pager show fbf7a14:src/gameState.js').toString('utf8');
const curJs = fs.readFileSync('src/gameState.js', 'utf8');

const oldLines = oldJs.split('\n');
const curLines = curJs.split('\n');

let outLines = [];
for (let i = 0; i < curLines.length; i++) {
  let cLine = curLines[i];
  let oLine = oldLines[i] || '';

  if (cLine.includes('desc:') && oLine.includes('desc:')) {
    const shortDescMatch = oLine.match(/desc:\s*'([^']+)'/);
    const longDescMatch = cLine.match(/desc:\s*'([^']+)'/);

    if (shortDescMatch && longDescMatch) {
      cLine = cLine.replace(longDescMatch[0], `desc: '${shortDescMatch[1]}', longDesc: '${longDescMatch[1]}'`);
    }
  }
  outLines.push(cLine);
}

fs.writeFileSync('src/gameState.js', outLines.join('\n'));
console.log('Successfully merged short and long descriptions.');
