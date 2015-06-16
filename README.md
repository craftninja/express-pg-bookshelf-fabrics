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
