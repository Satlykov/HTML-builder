const fs = require('fs');
const path = require('path');

fs.stat('./05-merge-styles/project-dist/bundle.css', function(err) {  
  if (!err) {
    fs.unlink('./05-merge-styles/project-dist/bundle.css', (err) => {
      err ? console.log(err) : null;
    });
    fs.writeFile('./05-merge-styles/project-dist/bundle.css', '', (err) => {
      err ? console.log(err) : null;
    });
    console.log('Refreshed bundle.css')
  } else {
    fs.writeFile('./05-merge-styles/project-dist/bundle.css', '', (err) => {
      err ? console.log(err) : null;
    });
      console.log('Created new bundle.css')
  }
});

fs.readdir('./05-merge-styles/styles', (err, data) => {
  err ? console.log(err) : null;

  const writeStream = fs.createWriteStream(
    './05-merge-styles/project-dist/bundle.css'
  );

  data.forEach((file) => {
    let fileName = path.parse(file).base;

    const readStream = fs.createReadStream(
      `./05-merge-styles/styles/${fileName}`
    );

    if (path.extname(file).toLowerCase() === '.css') {
      readStream.pipe(writeStream);
    }
  });
  console.log('Bundle ready!');
});
