const path = require('path')

// prettier-ignore
const Mocks = ({
  rootFolder = path.join(__dirname, '..'),
} = {}) => ({
  rootFolder,
  get root() {
    return path.join(this.rootFolder, '__mocks__')
  },
  get happy() {
    return path.join(this.root, 'happy')
  },
})

module.exports = Mocks
