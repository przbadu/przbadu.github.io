---
layout: post
title: My tmux configuration and workflow
date: 2022-06-05 07:49 +0545
categories: [cli, tips]
tags: [cli]
---

Follow [tmux wiki](https://github.com/tmux/tmux/wiki) for more information

## Install tmux

```sh
# ubuntu
sudo apt install tmux

# mac
brew install tmux
```

## Tmux configuration file

After tmux is successfully installed, we can customize tmux shortcut keys and other configurations
by creating a `~/.tmux.conf` file and adding configuration options in this file.

Here is my `~/.tmux.conf` file, feel free to copy it

```sh
###########################
#  Configuration
###########################

# use 256 term for pretty colors
# set -g default-terminal "screen-256color" # making tmux slow
set -g default-terminal "xterm-256color"
# Needs this line also to overrides the default color
set-option -ga terminal-overrides ",xterm-256color:Tc"


# Enable mouse support
set -g mouse on

# increase scroll-back history
set -g history-limit 5000

# use vim key bindings
setw -g mode-keys vi

# decrease command delay (increases vim responsiveness)
set -sg escape-time 1

# increase repeat time for repeatable commands
set -g repeat-time 1000

# start window index at 1
set -g base-index 1

# start pane index at 1
setw -g pane-base-index 1

# highlight window when it has new activity
setw -g monitor-activity on
set -g visual-activity on

# re-number windows when one is closed
set -g renumber-windows on

# Fix nightfly color scheme to display correctly inside tmux
set -ga terminal-overrides ',xterm-256color:Tc'

# enable pbcopy and pbpaste
# https://github.com/ChrisJohnsen/tmux-MacOSX-pasteboard/blob/master/README.md
# set-option -g default-command "reattach-to-user-namespace -l zsh"

###########################
#  Key Bindings
###########################

# tmux prefix
set -g prefix C-b

# paste
unbind C-p
bind C-p paste-buffer

# window splitting
unbind %
bind | split-window -h
unbind '"'
bind - split-window -v -p 20

# quickly switch panes
unbind ^B
bind ^B select-pane -t :.+

# switch panes using Alt-arrow without prefix
bind -n M-h select-pane -L
bind -n M-l select-pane -R
bind -n M-k select-pane -U
bind -n M-j select-pane -D

# swap windows
bind-key -n C-S-Left swap-window -t -1
bind-key -n C-S-Right swap-window -t +1

# Quickly view system & process info in htop
bind-key h split-window -h "htop"
# Quickly edit todo list
bind-key w split-window -h "vim ~/vimwiki/index.md"

# rails specific
bind-key -n M-s split-window -h "bundle exec sidekiq"
bind-key -n M-r split-window -v -p 20 "redis-server"

# force a reload of the config file
unbind r
bind r source-file ~/.tmux.conf \; display "Reloaded!"

###########################
# Status Bar
###########################

# set refresh interval for status bar
set -g status-interval 30

# center the status bar
set -g status-justify left

# show session, window, pane in left status bar
set -g status-left-length 40
set -g status-left '#[fg=green]#S#[fg=blue] #I:#P #[default]'

# show hostname, date, time, and battery in right status bar
set-option -g status-right '#[fg=green]#H#[default] %m/%d/%y %I:%M #[fg=red]#(battery discharging)#[default]#(battery charging)#{net_speed}'

###########################
# Colors
###########################

# color status bar
set -g status-style bg=colour235
set -g status-style fg=white

# highlight current window
set-window-option -g window-status-current-style bg=black
set-window-option -g window-status-current-style fg=green

# set color of active pane
# set -g pane-border-style bg=colour235
# set -g pane-border-style fg=black
# set -g pane-active-border-style bg=green
# set -g pane-active-border-style fg=black
# border colours
set -g pane-border-style fg=blue
set -g pane-active-border-style bg=default,fg=blue


# Resize pane
bind-key J resize-pane -D 5
bind-key K resize-pane -U 5
bind-key H resize-pane -L 5
bind-key L resize-pane -R 5

###########################
# Plugins
###########################
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sidebar'
set -g @plugin 'tmux-plugins/tmux-net-speed'

# Display internet download and upload speed

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run -b '~/.tmux/plugins/tpm/tpm'
```

## Install tmux plugin manager (TPM)

Learn more about [TPM](https://github.com/tmux-plugins/tpm).
And here are the list of [plugins](https://github.com/tmux-plugins/list)

__Installation__

Installing [TPM](https://github.com/tmux-plugins/tpm) is easy, just need to clone repo inside
`~/.tmux/plugins/tpm/` directory and we are done

```sh
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

With that you are all done with setting up tmux in your machine.

Here are the shortcut keys as per my configurations:

| Key           | Description                       |
| ----          | ------                            |
| C + b         | Prefix key                        |
| C + p         | paste buffer                      |
| prefix + \|   | split window horizontally         |
| prefix + \-   | split window vertically           |
| prefix + b    | toggle switch pane                |
| alt + h       | select left pane                  |
| alt + l       | select right pane                 |
| alt + j       | select down pane                  |
| alt + k       | select up pane                    |
| C + Shift + ← | Swipe window to left              |
| C + Shift + → | Swipe window to right             |
| prefix + h    | Quickly view `htop` info          |
| prefix + r    | Reload tmux configuration changes |



