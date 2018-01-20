const path = require('path');

// prettier-ignore
const Mocks = ({
  rootFolder = path.join(__dirname, '..'),
} = {}) => ({
  rootFolder,
  get root() {
    return path.join(this.rootFolder, '__mocks__');
  },
  get happy() {
    return path.join(this.root, 'happy');
  },
  get ignoredFiles() {
    return path.join(this.root, 'ignored-files');
  },
});

module.exports = Mocks;
