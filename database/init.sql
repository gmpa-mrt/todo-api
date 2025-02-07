-- Create user admin
CREATE USER admin_user WITH PASSWORD 'todo_password_super_admin';
ALTER USER admin_user WITH SUPERUSER;

-- Create user "app"
CREATE USER adonis_user WITH PASSWORD 'todo_password';
GRANT CONNECT ON DATABASE todo_db TO adonis_user;
GRANT USAGE, CREATE ON SCHEMA public TO adonis_user;
