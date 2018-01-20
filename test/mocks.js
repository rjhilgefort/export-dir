const path = require('path');

// prettier-ignore
const Mocks = ({
  rootFolder = path.join(__dirname, '..'),
} = {}) => ({
  rootFolder,
  get root() {
    return path.join(this.rootFolder, '__mocks__');
  },
  get files() {
    return path.join(this.root, 'files');
  },
  get ignoredFiles() {
    return path.join(this.root, 'ignored-files');
  },
  get exportsClasses() {
    return path.join(this.root, 'exports-classes');
  },
  get exportsObjects() {
    return path.join(this.root, 'exports-objects');
  },
  get exportsFunctions() {
    return path.join(this.root, 'exports-functions');
  },
  get exportsDefaults() {
    return path.join(this.root, 'exports-defaults');
  },
});

module.exports = Mocks;
