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
  addDirAssets();

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

function addDirAssets() {
  fs.readdir('./06-build-page/assets', (err, data) => {
    err ? console.log(err) : null;
    data.forEach((dist) => {
      fs.stat(`./06-build-page/project-dist/assets/${dist}`, function (err) {
        if (err) {
          fs.mkdir(`./06-build-page/project-dist/assets/${dist}`, (err) => {
            err ? console.log(err) : null;
          });
        }
      });
    });
  });
}

function deleteFile(dir, file) {
  return new Promise(function (resolve, reject) {
    let filePath = path.join(dir, file);
    fs.lstat(filePath, function (err, stats) {
      if (err) {
        return reject(err);
      }
      if (stats.isDirectory()) {
        resolve(deleteDirectory(filePath));
      } else {
        fs.unlink(filePath, function (err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      }
    });
  });
}

function deleteDirectory(dir) {
  return new Promise(function (resolve, reject) {
    fs.access(dir, function (err) {
      if (err) {
        return reject(err);
      }
      fs.readdir(dir, function (err, files) {
        if (err) {
          return reject(err);
        }
        Promise.all(
          files.map(function (file) {
            return deleteFile(dir, file);
          })
        )
          .then(function () {
            fs.rmdir(dir, function (err) {
              if (err) {
                return reject(err);
              }
              resolve();
            });
          })
          .catch(reject);
      });
    });
  });
}

const checkAssetsPromise = new Promise((resolve, reject) => {
  fs.stat('./06-build-page/project-dist/assets', function (err) {
    if (!err) {
      deleteDirectory('./06-build-page/project-dist/assets').then(() => {
        resolve();
      });
    } else if (err) {
      resolve();
    }
  });
});

addIndexHtml();

setTimeout(() => {
  changeIndexHtml();
  console.log('Bundle HTML ready!');
}, 0);

addCssStyle();

checkAssetsPromise.then(() => {
  addAssets();
});
