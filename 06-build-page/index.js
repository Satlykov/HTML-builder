const fs = require('fs');
const path = require('path');

fs.mkdir('./06-build-page/project-dist', () => {});
fs.mkdir('./06-build-page/project-dist/assets', () => {});

fs.writeFile('./06-build-page/project-dist/index.html', '', (err) => {
  err ? console.log(err) : null;
});

fs.writeFile('./06-build-page/project-dist/style.css', '', (err) => {
  err ? console.log(err) : null;
});

fs.readdir('./06-build-page/assets', (err, data) => {
  err ? console.log(err) : null;
  data.forEach((dist) => {
    fs.readdir(`./06-build-page/assets/${dist}`, (err, data) => {
      err ? console.log(err) : null;
      if (data.length !== 0) {
        deleteAssets(dist)
      }
    })
  });
  data.forEach((dist) => {
    copyAssets(dist);
  });
});

fs.readdir('./06-build-page/styles', (err, data) => {
  err ? console.log(err) : null;

  const writeStream = fs.createWriteStream(
    './06-build-page/project-dist/style.css'
  );

  data.forEach((file) => {
    let fileName = path.parse(file).base;

    const readStream = fs.createReadStream(
      `./06-build-page/styles/${fileName}`
    );

    readStream.pipe(writeStream);
  });
});

const writeStreamTemplate = fs.createWriteStream(
  './06-build-page/project-dist/index.html'
);

const readStreamTemplate = fs.createReadStream('./06-build-page/template.html');

readStreamTemplate.pipe(writeStreamTemplate);

setTimeout(() => {
  fs.readFile(
    './06-build-page/project-dist/index.html',
    'utf8',
    (err, cont) => {
      err ? console.log(err) : null;

      fs.readdir('./06-build-page/components', (err, data) => {
        err ? console.log(err) : null;

        data.forEach((file) => {
          let fileName = path.parse(file).name;
          fs.readFile(
            `./06-build-page/components/${fileName}.html`,
            'utf8',
            (err, content) => {
              err ? console.log(err) : null;
              cont = cont.replace(new RegExp(`{{${fileName}}}`), content);
              fs.writeFile(
                './06-build-page/project-dist/index.html',
                cont,
                (err) => {
                  err ? console.log(err) : null;
                }
              );
            }
          );
        });
      });
    }
  );
  console.log('Bundle ready!');
}, 2000);

function copyAssets(dist) {
  fs.mkdir(`./06-build-page/project-dist/assets/${dist}`, () => {});
  fs.readdir(`./06-build-page/assets/${dist}`, (err, data) => {
    err ? console.log(err) : null;
    data.forEach((file) => {
      let fileName = path.parse(file).base;
      fs.copyFile(
        `./06-build-page/assets/${dist}/${fileName}`,
        `./06-build-page/project-dist/assets/${dist}/${fileName}`,
        (err) => {
          err ? console.log(err) : null;
        }
      );
    });
  });
}

function deleteAssets(dist) {
  fs.readdir(`./06-build-page/project-dist/assets/${dist}`, (err, data) => {
    err ? console.log(err) : null;
    data.forEach((file) => {
      let fileName = path.parse(file).base;
      fs.stat(`./06-build-page/project-dist/assets/${dist}/${fileName}`, (err) => {
          if (!err) {
            fs.unlink(
              `./06-build-page/project-dist/assets/${dist}/${fileName}`,
              (err) => {
                err ? console.log(err) : null;
              }
            );
          } else {
            return null;
          }
      })
    });
  });
}
