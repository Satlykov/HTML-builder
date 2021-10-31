const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);
/* const readStream = fs.createReadStream(filePath); */

fs.writeFile(filePath, '', (err) => {
  if (err) {
    throw err;
  }
});

const rl = readline.createInterface({ input, output });

rl.question('Enter text: ', (answer) => {
  if (answer === 'exit') {
    console.log('Good buy!');

    rl.close();
  } else {
    writeStream.write(`${answer}\n`);

    console.log(`Thank you for entering text: (${answer})`);
  }
});
