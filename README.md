<div align="center">
  <h1>Bucky.db-local</h1>
  <p>An npm that creates a local database in your json project</p>
  <p>
    <a href="https://www.npmjs.com/package/bucky.db-local"><img src="https://img.shields.io/npm/v/bucky.db-local?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/bucky.db-local"><img src="https://img.shields.io/npm/dt/bucky.db-local?maxAge=3600" alt="NPM downloads" /></a>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/bucky.db-local"><img src="https://nodei.co/npm/bucky.db-local.png?downloads=true&stars=true" alt="NPM Banner"></a>
  </p>
</div>

# Installation:
```sh
npm install bucky.db-local --save

yarn add bucky.db-local
```

# Important informations:
- This npm uses node v16.6.0 or higher, another version below this may result in unexpected errors.
- To better understand how to use the functions, take a good look at the examples below the list of available functions!
- All npm functions have the option for you to use a callback return, it is not mandatory.
- The set, update, delete and push functions have a function called “save”, if you do not use this function, the data will only be in the database cache, to save, just run the function.

# Setting up database:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database(null, { // Default path: database.json
    split: '.',
    space: 0
  });
```

- **Path:** Defines a path where your local database will be.
- **Split:** Defines an object notation to split at query time. Default: /
- **Space:** Use to define how much space you want from one data value to another. Default: 2

# Functions:
| Name | Params |
| ------ | -------- |
| `set` | `path` `values` `callback` |
| `get` | `path` `callback` |
| `update` | `path` `values` `callback` |
| `delete` | `path` `callback` |
| `push` | `path` `values` `callback` |
| `has` | `path` `callback` |
| `all` | `path` `callback` |
| `keys` | `path` `callback` |
| `values` | `path` `callback` |
| `entries` | `path` `callback` |
| `toJSON` | `path` `callback` |

# Examples:
## Set:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  
let data = db.set('db', 'local');

// It will show the data information along with a function called "save".
// If you don't use the save function, the data will be saved in the cache.
console.log(data);

console.log(data.save()); // Output: true. Value: Boolean
```

## Get:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  
db.set('db', 'local').save();
let data = db.get('db');
console.log(data); // Output: local
```

## Update:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  
db.set('db', { type: 'local' }).save();
let data = db.update('db', { name: 'bucky.db-local' });
console.log(data.dataValues); // { db: { type: 'local', name: 'bucky.db-local' } }
console.log(data.save()); // Output: true
```

## Delete:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  
db.set('db', { name: 'bucky.db-local', type: 'local' }).save();
let data = db.delete('db/name');
console.log(data.save());
```

## Push:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  
let data = db.push('db', [{ type: 'local' }, { name: 'bucky.db-local' }]);
console.log(data.dataValues); // { db: [ { type: 'local' }, { name: 'bucky.db-local' } ] }
console.log(data.save()); // Output: true
```

## Has:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  
let data1 = db.has('db');

db.set('db', 'local').save();
let date2 = db.has('db');

console.log(data1); // Output: false
console.log(data2); // Output: true
```

## All:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  

```

## Keys:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  

```

## Values:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  

```

## Entries:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  

```

## ToJSON:
```js
const
  { Database } = require('bucky.db-local'),
  db = new Database();
  

```