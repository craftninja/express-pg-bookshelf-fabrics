# README!

### How did you create such a lovely creature?

#### Generate express app
1. `$ express fabric-app`
1. `$ cd fabric-app`
1. Add README and take the most amazing notes on every step. Amazing.
1. `$ git init`, `$ git add -A`, and `$ git commit -m "Initial commit"`

#### Add ORM, database dependencies and npm install
1. Add PG, Bookshelf.js and Knex.js to our json package dependencies
  * `"bookshelf": "~0.8.1",`
  * `"knex": "~0.8.6",`
  * `"pg": "~4.4.0",`
1. `npm install`
1. Add a file `.gitignore` in the root directory with this content:
  * `node-modules`
  * `npm-debug.log`
1. `DEBUG=fabric-app:* npm start` and ensure the server successfully starts
  * If there is an error, check all previous code!
1. visit [http://localhost:3000/](http://localhost:3000/), ensure the page loads, and the server continues running
  * New habit - if there is an error, check all previous code written between last successful load and this one... or note the error message that comes with not-yet-implemented functionality.
1. `$ git add -N .gitignore`, `$ git add -p .gitignore`, `$ git commit -m "Ignore node_modules"`
1. Commit the rest of the diffs separately

#### Connect to the PostgreSQL database
1. Add `.env` file to root of app with the following content:
  * `process.env.PG_CONNECTION_STRING = 'postgres://localhost/fabric_app';`
  * This file should automatically be ignored by git. IF NOT, add it immediately to your `.gitignore file` and commit. OR BETTER YET, add `.env` to your global gitignore [LMGTFY](http://lmgtfy.com/?q=global+gitignore).
1. Add `.env.example` file with the following content:
  * process.env.PG_CONNECTION_STRING = 'your connection string here';
  * This file is for anyone who forks and clones your project... they will copy `.env.example` to `.env` and replace example environmental variables with their actual variables.
1. Load `.env` in your app
  * In the top of your `app.js`, add `require('./.env')`
1. Add Bookshelf module `bookshelf.js` in new folder `db` with the following content:

  ```
  var pg = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
  });

  var bookshelf = require('bookshelf')(pg)

  module.exports = bookshelf;
  ```

1. Require bookshelf in app `var bookshelf = require('./db/bookshelf');`
1. Restart server - should be an error:
  * `Knex:Error Pool2 - error: database "fabric_app" does not exist`
1. Open PostgreSQL CLI and create database
  * Open a new terminal tab... leave this terminal tab open for future sql queries
  * `$ psql -d postgres`
  * `=# CREATE DATABASE fabric_app;`
1. Restart server and refresh browser.
1. Commit all the things (making sure that your `.env` file is still not being tracked by Git)
