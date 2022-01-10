---
layout: post
title: Run Sidekiq as systemd process
date: 2022-01-10 18:13 +0545
categories: [Blog, RubyOnRails]
tags: [ruby on rails, javascript, hash]
---

The simplest way to run Sidekiq in your production server is to use `capistrano-sidekiq` gem, but it is not recommended because Capistrano uses demonization by default so if the Sidekiq process crashes, it will not restart automatically.

Whereas setting up Sidekiq as a systemd process will ensure the process is restarted if Sidekiq crashes.

Here is a sample file that you can refer to for simple Sidekiq configuration, but it is strongly recommended to read the systemd documentation on the [.service file](http://0pointer.de/public/systemd-man/systemd.service.html) and [executing processes](http://0pointer.de/public/systemd-man/systemd.exec.html). Every developer who uses Linux should read these pages many times.

> More Information: [https://github.com/mperham/sidekiq/wiki/Deployment#running-your-own-process](https://github.com/mperham/sidekiq/wiki/Deployment#running-your-own-process)

create a file inside `/usr/lib/systemd/system` for CentOS or `/lib/systemd/system` for Ubuntu and copy below content.

```shell
sudo vim /lib/systemd/system/sidekiq.service
```

```shell
#
# This file tells systemd how to run Sidekiq as a 24/7 long-running daemon.
#
# Customize this file based on your bundler location, app directory, etc.
# Customize and copy this into /usr/lib/systemd/system (CentOS) or /lib/systemd/system (Ubuntu).
# Then run:
#   - systemctl enable sidekiq
#   - systemctl {start,stop,restart} sidekiq
#
# This file corresponds to a single Sidekiq process.  Add multiple copies
# to run multiple processes (sidekiq-1, sidekiq-2, etc).
#
# Use `journalctl -u sidekiq -rn 100` to view the last 100 lines of log output.
#
[Unit]
Description=sidekiq
# start us only once the network and logging subsystems are available,
# consider adding redis-server.service if Redis is local and systemd-managed.
After=syslog.target network.target
# See these pages for lots of options:
#
#   https://www.freedesktop.org/software/systemd/man/systemd.service.html
#   https://www.freedesktop.org/software/systemd/man/systemd.exec.html
#
# THOSE PAGES ARE CRITICAL FOR ANY LINUX DEVOPS WORK; read them multiple
# times! systemd is a critical tool for all developers to know and understand.
#
[Service]
#
#      !!!!  !!!!  !!!!
#
# As of v6.0.6, Sidekiq automatically supports systemd's `Type=notify` and watchdog service
# monitoring. If you are using an earlier version of Sidekiq, change this to `Type=simple`
# and remove the `WatchdogSec` line.
#
#      !!!!  !!!!  !!!!
#
Type=notify
# If your Sidekiq process locks up, systemd's watchdog will restart it within seconds.
WatchdogSec=10
WorkingDirectory=/home/deploy/myapp/current
# If you use rbenv:
ExecStart=/bin/bash -lc 'exec /home/deploy/.rbenv/shims/bundle exec sidekiq -e production'
# If you use the system's ruby:
# ExecStart=/usr/local/bin/bundle exec sidekiq -e production
# If you use rvm in production without gemset and your ruby version is 2.6.5
# ExecStart=/home/deploy/.rvm/gems/ruby-2.6.5/wrappers/bundle exec sidekiq -e production
# If you use rvm in production wit gemset and your ruby version is 2.6.5
# ExecStart=/home/deploy/.rvm/gems/ruby-2.6.5@gemset-name/wrappers/bundle exec sidekiq -e production
# Use `systemctl kill -s TSTP sidekiq` to quiet the Sidekiq process
# !!! Change this to your deploy user account !!!
User=deploy
Group=deploy
UMask=0002
# Greatly reduce Ruby memory fragmentation and heap usage
# https://www.mikeperham.com/2018/04/25/taming-rails-memory-bloat/
Environment=MALLOC_ARENA_MAX=2
# if we crash, restart
RestartSec=1
Restart=on-failure
# output goes to /var/log/syslog (Ubuntu) or /var/log/messages (CentOS)
StandardOutput=syslog
StandardError=syslog
# This will default to "bundler" if we don't specify it
SyslogIdentifier=sidekiq
[Install]
WantedBy=multi-user.target
```

> NOTE: make sure to update myapp to your app in this file. And also make sure you uncomment ExecStart section for your ruby path, e.g rbenv, rvm or system ruby path. You will get example script for each of these ruby paths in the file.

Now enable the sidekiq service, and `start/stop/restart` them as needed

Now you can `enable, start, stop, restart` sidekiq with:

```shell
# enable sidekiq service
sudo systemctl enable sidekiq
# start/stop/restart service
sudo systemctl start sidekiq
sudo systemctl stop sidekiq
sudo systemctl restart sidekiq
# Check status with
sudo systemctl status sidekiq
```

## Logs

If you want to check logs, then you can use `journalctl`

```shell
sudo journalctl -u sidekiq -rn 100
```

to view last 100 lines of log output.

_Happy Hacking!!!_
