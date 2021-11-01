const fs = require('fs');
const path = require('path');
const srcFile = './04-copy-directory/files';
const srcFileCppy = './04-copy-directory/files-copy';

fs.mkdir(srcFileCppy, () => {});

fs.readdir('./04-copy-directory/files', (err, data) => {
  err ? console.log(err) : null;
  data.forEach((file) => {
    let fileName = path.parse(file).base;
    fs.copyFile(
      `${srcFile}/${fileName}`,
      `${srcFileCppy}/${fileName}`,
      (err) => {
        err ? console.log(err) : null;
      }
    );
  });
  console.log('Finish copy!');
});
