-- PSQL

CREATE ROLE mo_accountants_admin WITH PASSWORD 'Pass1234' LOGIN;
CREATE DATABASE mo_accountants_db OWNER mo_accountants_admin;
