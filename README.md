# MO Accountants demo backend.

### Getting started

#### Configuration
This Project is set up to use a Postgres Database.

Configure connection string found in:
`src/database/connection.ts`

```ts
  const db = new Sequelize('postgres://<pg_user>:<pg_password>@localhost:5432/<pg_db>');
```

#### Create admin user:
```
$ npm run createadminuser <email> <password>
```
Initialize system with an admin user.


#### Start backend service

#### In dev watch mode:
```
$ npm run start:dev
```