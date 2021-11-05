const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);


fs.writeFile(filePath, '', (err) => {
  if (err) {
    throw err;
  }
});

const rl = readline.createInterface({ input, output });

function questions() {
  rl.question('Enter text: ', (answer) => {
    if (answer === 'exit') {
      rl.close();
    } else {
      writeStream.write(`\n${answer}\n`);
  
      console.log(`Thank you for entering text: (${answer})`);
      questions();
    }
  });
}

rl.on('close', () => {
  console.log('\nGood buy!');
});

questions();