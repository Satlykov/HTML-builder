const fs = require('fs');
const path = require('path');
const src = './03-files-in-folder/secret-folder';

fs.readdir(src, (err, data) => {
  err ? console.log(err) : null;
  data.forEach( file => {
    let size = (fs.statSync(`${src}/${file}`).size) / 1000;
    let strFile = `${path.parse(file).name} - ${path.extname(file).slice(1)} - ${size}kb`;
    fs.statSync(`${src}/${file}`).size === 0 ? null : console.log(strFile);
  });
});