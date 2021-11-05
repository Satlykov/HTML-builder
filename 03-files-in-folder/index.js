const fs = require('fs');
const path = require('path');
const src = './03-files-in-folder/secret-folder';

fs.readdir(src, (err, data) => {
  err ? console.log(err) : null;
  data.forEach((file) => {
    fs.stat(`${src}/${file}`, (err, stat) => {
      err ? console.log(err) : null;
      stat.isFile() ? console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${stat.size} Byte`) : null;
    })
  });
});

