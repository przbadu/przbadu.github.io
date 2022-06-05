---
layout: post
title: my neovim configuration
date: 2022-06-05 09:37 +0545
categories: [vim]
tags: [vim, ide]
---

## Why vim and neovim?

[Vim](vim.org) is a highly configurable text editor built to make creating and changing any kind of text very efficient. It is included as "vi" with most UNIX systems and with Apple OS X.

[vim](vim.org) is highly customizable and it is the default fallback editor in most of the linux systems. If you are server admin, then vim can be a great tool for you. If you are a programmer, it already supports 100s of programming languages.

> Recently I have switched  from [vim](vim.org) to [neovim](neovim.io) and neovim is fully compatible with Vim's editing model and Vimscript.

## How to install neovim?

If you want to use [vim](vim.org), it is already available in most of the linux OS. you can follow https://vim.org to download and install it.

We are going to use [Lunarvim](https://www.lunarvim.org/#opinionated) for our nvim IDE. It has lots of great feature which you can find in the official website. 

You can follow [Installation](https://www.lunarvim.org/01-installing.html#prerequisites) section to install [Lunarvim](https://www.lunarvim.org) and also all the prerequisites.

__Install latest neovim__

```sh
# linux
sudo snap install neovim --classic

# Mac
brew install neovim
```

In this post, we are going to setup Lunar vim for [Ruby on Rails](https://rubyonrails.org) development, but feel free to check [Lunarvim Plugins](https://www.lunarvim.org/plugins/#plugins) section to install plugins as your need.

## Configuration file

Open `~/.config/lvim/config.lua` file and keep default configuration and replace following sections in the file

__change the treesitter list of your choice__

```lua
-- if you don't want all the parsers change this to a table of the ones you want
lvim.builtin.treesitter.ensure_installed = {
  "bash",
  "javascript",
  "json",
  "lua",
  "python",
  "typescript",
  "css",
  "ruby",
  "yaml",
  "vue",
}
```

__Additional plugins in `lvim.plugins` section__

```lua
lvim.plugins = {
  {"vim-test/vim-test"},
  {"tpope/vim-rails"},
  {"alvan/vim-closetag"},
  {"kdheepak/lazygit.nvim"},
  {"APZelos/blamer.nvim"}, -- git blame
  -- {"github/copilot.vim"}, -- github copilot
  {"feline-nvim/feline.nvim"},
  {"jceb/vim-orgmode"}, -- vim org mode, similar to emacs orgmode
  {"tpope/vim-surround"}, -- surround vim
  {"dhruvasagar/vim-table-mode"}, --format markdown tables
}
```

__Add below configurations at the end of the file__

```lua
-- VIM configurations (my custom configurations)
-- relative line number
vim.o.relativenumber = true
-- vim-test keybindings
local map = vim.api.nvim_set_keymap
map('n', '<Leader>tf', ':TestFile<CR>', {silent = true})
map('n', '<Leader>tt', ':TestNearest<CR>', {silent = true})
map('n', '<Leader>ts', ':TestSuite<CR>', {silent = true})
map('n', '<Leader>tl', ':TestLast<CR>', {silent = true})
map('n', '<Leader>tg', ':TestVisit<CR>', {silent = true})

-- vim-test strategy
vim.g['test#strategy'] = 'neovim'
-- using neovim strategy, so that pressing anykey will not close test result window
vim.g['test#neovim#start_normal'] = 1

-- autoclose tag
-- enable plugin for file extensions
vim.g['closetag_filenames'] = '*.html,*.erb'
```

## Some of the plugins worth mentioning

- [vim-test](https://github.com/vim-test/vim-test): Quickly test your rails project within neovim
- [vim-rails](https://github.com/tpope/vim-rails): This is a feature rich plugin for rails
  - Easily navigate between pages `:help rails-navigation`
  - Easily generate missing file by appending `!`
  - Interface to the `rails` command, e.g: `:Rails console`, `:Rails db:migrate`, `:Rails g controller example`, etc
  - Partial extraction `:help rails-:Extract`
  - Integrate with other plugins `:help rails-integration`
- [vim-closetag](https://github.com/alvan/vim-closetag): auto close html and erb tags
- [lazygit](https://github.com/jesseduffield/lazygit): One of my favorite terminal UI for git commands. This is so powerful, just try it.
