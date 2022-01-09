---
layout: post
title: Rails Notes Explained
date: 2022-01-09 15:40 +0545
categories: [Tips, RubyOnRails]
tags: [ruby on rails, rake task]
---

In this post you will learn how to  list down all of your todos, fixme, optimize tags from the rails project.

In your rails project if you run `rake notes` (you can also use `rails notes` in rails 5+ projects) in your terminal, it will search for comments beginning with a specific keyword and it will print you the filename and line number for your:

```shell
> rails notes
app/controllers/posts_controller.rb:
  * [ 5] [TODO] Write a testcase for index action
  * [11] [OPTIMIZE] show action is taking too much memory, optimize it
  * [15] [FIXME] new action have bad code, refactor it!
```

