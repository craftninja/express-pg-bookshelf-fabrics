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

#### Create migration and migrate

1. `$ knex init`
  * If knex is not installed, run `$ npm install knex -g` to install CLI
  * This will create a `knexfile.js` in root of app. Require `.env` and alter export contents to only use PostgreSQL:

  ```
  require('./.env')

  module.exports = {

    development: {
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING
    }

  };
  ```

1. Create a migration template from the command line (this will use the file we just created with `$ knex init`):
  * `$ knex migrate:make createFabric`
  * Add the following to the `exports.up` code block to create the table:

    ```
    return knex.schema.createTable('fabrics', function (table) {
      table.increments();
      table.string('name');
      table.string('content');
      table.integer('width_in_inches');
      table.float('yardage_available');
      table.boolean('domestic');
      table.timestamps();
    })
    ```

  * And add this to the `exports.down` to drop the table in rollbacks:

    ```
    return knex.schema.dropTable('fabrics');
    ```

1. Migrate any existing migrations (just the one created above in this case):
  * `$ knex migrate:latest`
  * Verify that the table has been created in PostgreSQL CLI:
    * `=# \c fabric_app`
    * `=# SELECT * FROM fabrics;`
    * You should see an empty table
  * IF you ever need to rollback, `$ knex migrate:rollback`
1. Commit

#### User can visit `/fabrics`

1. Add '/fabric' link to root page `views/index.jade`
  * `a(href='/fabrics') Check out my awesome fabric inventory`
1. Stop and restart the server, and refresh browser. Click link. Note what your error message looks like when you do not have a route. Look at the server logs, and note the 404 for `GET /fabrics`
1. In `app.js`:
  * Change `var users = require('./routes/users');` to `var fabrics = require('./routes/fabrics');`
  * Change `app.use('/users', users);` to `app.use('/fabrics', fabrics);`
1. In `routes` folder, change filename `users.js` to `fabrics.js`
1. In `fabrics.js`, only route should be changed to:

  ```
  router.get('/', function(req, res, next) {
    res.render('fabrics/index');
  });
  ```

1. Stop and restart your server, and visit [http://localhost:3000/](http://localhost:3000/). Click link. Note what your error message looks like when you do not have a view. Look at the server logs, and note the 500 for `GET /fabrics`.
1. Add view for fabric index:
  * Create file `views/fabrics/index.jade`

    ```
    extends ../layout

    block content

      h1(class='page-header') Fabric inventory

      table(class='table')
        thead
          th Name
          th Fiber Content
          th Width (inches)
          th Yardage Avail
          th Domestic?
        tbody
          tr
            td
            td
            td
            td
            td

    ```

1. Stop and restart your server, and visit [http://localhost:3000/](http://localhost:3000/). Click link. Page is loading! Check server logs to see what that looks like as well.
1. Commit

#### User can see fabrics in database listed on fabric index

1. Add one fabric to database through PostgreSQL CLI:
  * `INSERT INTO fabrics(name, content, width_in_inches, yardage_available, domestic) VALUES ('Kona Cotton Cerise', 'cotton', 44, 15, true);`
1. Change fabric index to loop through fabrics:

  ```
  tbody
    each fabric in fabrics
      tr
        td= fabric.name
        td= fabric.content
        td= fabric.width_in_inches
        td= fabric.yardage_available
        td= fabric.domestic ? "Domestic" : "Imported"
  ```

1. Pass fabrics from `routes/fabrics.js` file to view (`fabrics` does not yet reference anything...)

  ```
  res.render('fabrics/index', {fabrics: fabrics});
  ```

1. Add model 'app/models/fabric.js' with the following content:

  ```
  var bookshelf = require('../../db/bookshelf');

  var Fabric = bookshelf.Model.extend({
      tableName: 'fabrics'
  });

  module.exports = Fabric;
  ```

1. Require model in the `routes/fabric.js` file:
  * `var Fabric = require('../app/models/fabric');`
1. Add Fabric query to route, saving result to `fabrics`:

  ```
  router.get('/', function(req, res, next) {
    Fabric.collection().fetch().then(function(collection) {
      var fabrics = collection.toJSON();
      res.render('fabrics/index', {fabrics: fabrics});
    });
  });
  ```

1. Stop and restart your server, and visit [http://localhost:3000/fabrics](http://localhost:3000/fabrics).
1. Commit
