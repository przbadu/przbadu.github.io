---
layout: post
title: Configure Neovim as Ruby on Rails IDE
date: 2022-06-05 09:37 +0545
categories: [vim]
tags: [neovim, vim, ide, ruby on rails, javascript]
categories: [Ruby on Rails, ruby]
---

## Why vim and neovim?

[Vim](https://vim.org) is a highly configurable text editor built to make creating and changing any kind of text very efficient. It is included as "vi" with most UNIX systems and with Apple OS X.

[vim](https://vim.org) is highly customizable and it is the default fallback editor in most of the linux systems. If you are server admin, then vim can be a great tool for you. If you are a programmer, it already supports 100s of programming languages.

> Recently I have switched  from [vim](https://vim.org) to [neovim](https://neovim.io) and neovim is fully compatible with Vim's editing model and Vimscript.

## How to install neovim?

If you want to use [vim](https://vim.org), it is already available in most of the linux OS. you can follow https://vim.org to download and install it.

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

## Theme

I really like `dracula` theme and I use it in almost all of my tools:
You can get [dracula](https://draculatheme.com/) for your choice of editor, terminal or even
HD wallpapers from [here](https://draculatheme.com/).

```lua
lvim.colorscheme = "dracula"
```

## Configuration file

Open `~/.config/lvim/config.lua` file and keep default configuration and replace following sections in the file

__change the treesitter list of your choice__

```lua
-- if you don't want all the parsers change this to a table of the ones you want
lvim.builtin.treesitter.ensure_installed = {
  "bash",
  "c",
  "javascript",
  "json",
  "lua",
  "python",
  "typescript",
  "tsx",
  "css",
  "rust",
  "ruby",
  "java",
  "yaml",
}
```

__Additional plugins in `lvim.plugins` section__

```lua
lvim.plugins = {
  {
    "folke/trouble.nvim",
    cmd = "TroubleToggle",
  },
  { 'Mofiqul/dracula.nvim' }, -- theme
  { 'tpope/vim-rails' }, -- ruby on rails
  { 'kdheepak/lazygit.nvim' }, -- lazy git
  {
    "max397574/better-escape.nvim",
    config = function()
      require("better_escape").setup {
        mapping = { "jj" }, -- a table with mappings to use
        timeout = 200, -- the time in which the keys must be hit in ms. clear_empty_lines = false, keys = '<ESC>', -- keys used for escaping
      }
    end
  },
  { "preservim/vimux" }, -- send test command in tmux pane
  { "vim-test/vim-test" }, -- run test
  { "tpope/vim-abolish" }, -- search and replace preserving state
}
```

- `Mofiqul/dracula.nvim`: for dracula theme
- `tpope/vim-rails`: Ruby on rails power tool (recommended)
- `kdheepak/lazygit.nvim`: If you are [lazygit](https://github.com/jesseduffield/lazygit) user than, you will love this integration within your neovim
- `max397574/better-escape.nvim`: it allows you to remap e.g: `jj` as ESC key
- `preservim/vimux`: If you love tmux, then vim + tmux is great. This allow you to send command in separate tmux pane from your vim
- `vim-test/vim-test`: powerful when combined with `vimux` or even `neovim`
- `tpope/vim-abolish`: I recently found this tool, it helps you find and replace(or substitute) multiple occurance of the word preserving their case.

__Add below configurations at the end of the file__

```lua
-- VIM configurations (my custom configurations)
-- relative line number
vim.o.relativenumber = true

-- using neovim strategy, so that pressing anykey will not close test result window
vim.g['test#neovim#start_normal'] = 1

-- autoclose tag
-- enable plugin for file extensions
vim.g['closetag_filenames'] = '*.html,*.erb'

-- vim-test strategy
vim.g['test#strategy'] = 'vimux'
-- vim-test keybindings
vim.cmd("let test#strategy = 'vimux'")
vim.keymap.set('n', '<space>tt', '<cmd>TestNearest<CR>', { desc = "Test nearest" })
vim.keymap.set('n', '<space>tl', '<cmd>TestLast<CR>', { desc = "Test last" })
vim.keymap.set('n', '<space>tf', '<cmd>TestFile<CR>', { desc = "Test file" })
vim.keymap.set('n', '<Leader>ts', '<cmd>TestSuite<CR>', {desc = "Test suite" })
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

