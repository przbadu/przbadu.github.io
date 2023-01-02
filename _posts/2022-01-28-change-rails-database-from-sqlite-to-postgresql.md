---
layout: post
title: change rails database from sqlite to postgresql
date: 2022-01-28 10:43 +0545
categories: [Tips, RubyOnRails]
tags: [ruby on rails, database]
---

When you generate your rails applicaton, it by default uses sqlite3 as database adapter and generate configuration files `config/database.yml` based on sqlite adapter. But when you want to deploy your app to production like heroku, you need to convert your database configuration to use `postgresql` database adapter.

In this post, we will see how to easily convert database.yml configuration from Sqlite to PostgreSQL.

## Generating default rails app with postgresql

Also note that you can generate rails default app to use `postgres` as default adapter using:

```shell
rails new <project_name> -d <db-adapter>
```

**Example**

```shell
rails new demo_app -d postgresql
```

## Convert sqlite to postgresql before deployment

**create new rails app with sqlite**

```shell
rails new demo_app
```

**convert sqlite to postgresql adapter**

```shell
> rails db:system:change --to=postgresql
    conflict  config/database.yml
Overwrite demo/config/database.yml? (enter "h" for help) [Ynaqdhm] Y
       force  config/database.yml
        gsub  Gemfile
        gsub  Gemfile
```

This command will remove `sqlite3` and add `pg` gem into Gemfile:

```ruby
-# Use sqlite3 as the database for Active Record
-gem "sqlite3", "~> 1.4"
+# Use pg as the database for Active Record
+gem "pg", "~> 1.1"
```

And also update `config/database.yml` file to use `pg` configuration. Here is the full configuration file:

```yaml
# PostgreSQL. Versions 9.3 and up are supported.
#
# Install the pg driver:
#   gem install pg
# On macOS with Homebrew:
#   gem install pg -- --with-pg-config=/usr/local/bin/pg_config
# On macOS with MacPorts:
#   gem install pg -- --with-pg-config=/opt/local/lib/postgresql84/bin/pg_config
# On Windows:
#   gem install pg
#       Choose the win32 build.
#       Install PostgreSQL and put its /bin directory on your path.
#
# Configure Using Gemfile
# gem "pg"
#
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see Rails configuration guide
  # https://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: demo_development

  # The specified database role being used to connect to postgres.
  # To create additional roles in postgres see `$ createuser --help`.
  # When left blank, postgres will use the default role. This is
  # the same name as the operating system user running Rails.
  #username: demo

  # The password associated with the postgres role (username).
  #password:

  # Connect on a TCP socket. Omitted by default since the client uses a
  # domain socket that doesn't need configuration. Windows does not have
  # domain sockets, so uncomment these lines.
  #host: localhost

  # The TCP port the server listens on. Defaults to 5432.
  # If your server runs on a different port number, change accordingly.
  #port: 5432

  # Schema search path. The server defaults to $user,public
  #schema_search_path: myapp,sharedapp,public

  # Minimum log levels, in increasing order:
  #   debug5, debug4, debug3, debug2, debug1,
  #   log, notice, warning, error, fatal, and panic
  # Defaults to warning.
  #min_messages: notice

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: demo_test

# As with config/credentials.yml, you never want to store sensitive information,
# like your database password, in your source code. If your source code is
# ever seen by anyone, they now have access to your database.
#
# Instead, provide the password or a full connection URL as an environment
# variable when you boot the app. For example:
#
#   DATABASE_URL="postgres://myuser:mypass@localhost/somedatabase"
#
# If the connection URL is provided in the special DATABASE_URL environment
# variable, Rails will automatically merge its configuration values on top of
# the values provided in this file. Alternatively, you can specify a connection
# URL environment variable explicitly:
#
#   production:
#     url: <%= ENV["MY_APP_DATABASE_URL"] %>
#
# Read https://guides.rubyonrails.org/configuring.html#configuring-a-database
# for a full overview on how database connection configuration can be specified.
#
production:
  <<: *default
  database: demo_production
  username: demo
  password: <%= ENV["DEMO_DATABASE_PASSWORD"] %>
```

Happy Coding!!!