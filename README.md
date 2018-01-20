# @rjhilgefort/export-dir

Declarative `index.js` builder for exporting files in the same directory.

This tiny package removes the maintenance of updating `index.js` files that simply `require` and export all of the files in the same directory to allow for a deconstuctable interface of the folder.

[![npm version](https://badge.fury.io/js/%40rjhilgefort%2Fexport-dir.svg)](https://badge.fury.io/js/%40rjhilgefort%2Fexport-dir)
[![Build Status](https://travis-ci.org/rjhilgefort/export-dir.svg?branch=master)](https://travis-ci.org/rjhilgefort/export-dir)
[![dependencies](https://david-dm.org/rjhilgefort/export-dir.svg)](https://david-dm.org/rjhilgefort/export-dir)
[![devDependencies Status](https://david-dm.org/rjhilgefort/export-dir/dev-status.svg)](https://david-dm.org/rjhilgefort/export-dir?type=dev)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)



## Installation

```
yarn add @rjhilgefort/export-dir
```
```
npm install --save @rjhilgefort/export-dir
```



## Docs

Two functions/modes of operation and both are autocurried, so you can call them however you would like (with a caveat being that you must call it will all parameters).

### `fromFiles`

Allows you to apply a transformation on the file name as the exported key.

```
fromFiles :: (String -> String) => String<Dir> -> Object
fromFiles :: (transformation, path) => ({ })
```

### `fromExports`

Allows you to apply a transformation on the exports of the file as the exported key.

```
fromExports :: (* -> String) => String<Dir> -> Object
fromExports :: (transformation, path) => ({ })
```

### Behavior

Something more formal will come, but for now, here's some notes about the behavior. This applies to all methods/modes of operation.

- All `.js` and `.json` files will be exported.
- `*.test.js` files will be ignored.
- `index.js` will be ignored.
- `lodash.camelcase` is the default transformation.



## Usage

**Basic Usage**

```js
module.exports = require('@rjhilgefort/export-dir')(null, __dirname)
```

**With Default `transform`**

```js
const camelCase = require('lodash.camelcase')
module.exports = require('@rjhilgefort/export-dir')(camelcase, __dirname)
```

**With Custom `transform`**

```js
const { compose } = require('ramda')
const camelCase = require('lodash.camelcase')
const upperFirst = require('lodash.upperfirst')
module.exports =
  require('@rjhilgefort/export-dir')(
    compose(upperFirst, camelCase),
    __dirname,
  )
```



## Problem / Solution

Imagine we have the following project.

```
/
  app.js
  lib/
    foo.js
    foo.test.js
    bar.js
    bar.test.js
    baz.js
    baz.test.js
    index.js
```

We want to make sure we're keeping our functions isolated, testable, and generic, so we created a `lib` folder to keep them. This also has the advantage of keeping our `app.js` clean of helper methods and just focusing on what it, specifically, wants to do.

We want to avoid doing this:

```js
// app.js
const foo = require('./lib/foo')
const bar = require('./lib/bar')
const baz = require('./lib/baz')
// ...
```

So we create `lib/index.js` that rexports everything...

```js
// lib/index.js
module.exports = {
  foo: require('./foo'),
  bar: require('./bar'),
  baz: require('./baz'),
}
```

Great. New we can change our `app.js` file to deconstruct the methods from the folder require.

```js
// app.js
const { foo, bar, baz } = require('./lib');
// ...
```

We're done, except that this is a pain to maintain. Every time we add a new method, we have to go update our index file. If we forget, we'll have a runtime error when trying to deconstruct our new method in app. This package aims to solve the problem by allowing you to setup rules for how the index file should be built, and then not having to worry about it anymore.

Here's what our `lib/index.js` and `app.js` looks like when using `@rjhilgefort/export-dir`:

```js
// lib/index.js
const exportDir = require('@rjhilgefort/export-dir')
module.exports = exportDir(null, __dirname)

// app.js
const { foo, bar, baz } = require('./lib');
```



## Q & A

**Who cares about CommonJS modules anymore?**
> Though ES modules in Node.js is right around the corner, this is still a pattern that will likely be around in legacy code for some time.

**Why does this need to exist when there's others that have implemented the same thing, and with more features?**
> I didn't find one that had everything I wanted and I didn't want to work in their respective code bases. I just made this for me. I'm surprised you're even reading this.
