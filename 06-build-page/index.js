const fs = require('fs');
const path = require('path');

fs.mkdir('./06-build-page/project-dist', () => {});

function addIndexHtml() {
  fs.writeFile('./06-build-page/project-dist/index.html', '', (err) => {
    err ? console.log(err) : null;
  });

  const writeStreamTemplate = fs.createWriteStream(
    './06-build-page/project-dist/index.html'
  );

  const readStreamTemplate = fs.createReadStream(
    './06-build-page/template.html'
  );

  readStreamTemplate.pipe(writeStreamTemplate);
}

function changeIndexHtml() {
  fs.readFile(
    './06-build-page/project-dist/index.html',
    'utf8',
    (err, index) => {
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
              index = index.replace(`{{${fileName}}}`, content);
              fs.writeFile(
                './06-build-page/project-dist/index.html',
                index,
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
}

function addCssStyle() {
  fs.writeFile('./06-build-page/project-dist/style.css', '', (err) => {
    err ? console.log(err) : null;
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
}

function addAssets() {
  fs.mkdir('./06-build-page/project-dist/assets', () => {});

  fs.readdir('./06-build-page/assets', (err, data) => {
    err ? console.log(err) : null;
    data.forEach((dist) => {
      copyAssets(dist);
    });
  });
}

function copyAssets(dist) {
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

function deleteAssets() {
  fs.readdir('./06-build-page/project-dist/assets', (err, data) => {
    err ? console.log(err) : null;
    data.forEach((dist) => {
      fs.readdir(
        `./06-build-page/project-dist/assets/${dist}`,
        (err, files) => {
          err ? console.log(err) : null;
          files.forEach((file) => {
            let fileName = path.parse(file).base;
            fs.unlink(
              `./06-build-page/project-dist/assets/${dist}/${fileName}`,
              (err) => {
                err ? console.log(err) : null;
              }
            );
          });
        }
      );
    });
  });
}

function checkAssets() {
  fs.readdir('./06-build-page/project-dist/assets', (err, dir) => {
    err ? console.log(err) : null;
    dir.forEach((dist) => {
      fs.readdir(`./06-build-page/project-dist/assets/${dist}`, (err, arr) => {
        err ? console.log(err) : null;
        arr.length == 0 ? null : deleteAssets();
      });
    });
  });
}

function addDirAssets() {
  fs.readdir('./06-build-page/assets', (err, data) => {
    err ? console.log(err) : null;
    data.forEach((dist) => {
      fs.mkdir(`./06-build-page/project-dist/assets/${dist}`, (err) => {
        err ? console.log(err) : null;
      });
    });
  });
}

addDirAssets();

addIndexHtml();

setTimeout(() => {
  changeIndexHtml();
}, 0);

addCssStyle();
checkAssets();
addAssets();
