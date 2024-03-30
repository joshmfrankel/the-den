# the-den

# Notes

## Express
* Add - `yarn add express`
* Configuration with EJS- `npx express-generator -v ejs`
* Start server with debug mode - `DEBUG=the-den:* npm start` -
* Add nodemon for automatic server restarts - `yarn add nodemon`
* Added to scripts - `"watch": "nodemon"
* Run server with `yarn run watch`

https://ejs.co/#install

## PostgreSQL

* Add pg-promise - `yarn add pg-promise`
* Add a database.json configuration file
* Connect to pgp with config sample

## Migrations

* Add db-migrate and pg driver - `yarn add db-migrate db-migrate-pg`
* Run migration commands - `yarn run db-migrate`
https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/

