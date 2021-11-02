const fs = require('fs');
const path = require('path');
const srcFile = './04-copy-directory/files';
const srcFileCppy = './04-copy-directory/files-copy';

fs.stat('./04-copy-directory/files-copy', function (err) {
  if (!err) {
    fs.readdir('./04-copy-directory/files-copy', (err, data) => {
      err ? console.log(err) : null;
      data.forEach((file) => {
        let fileName = path.parse(file).base;
        fs.unlink(`${srcFileCppy}/${fileName}`, (err) => {
          err ? console.log(err) : null;
        });
      });
    });

    copyFiles();
  } else if (err.code === 'ENOENT') {
    fs.mkdir(srcFileCppy, () => {});

    copyFiles();
  }
});

function copyFiles() {
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
    console.log('Finished copying!');
  });
}
