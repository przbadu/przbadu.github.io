---
layout: post
title: ruby safe navigation operator (&.)
date: 2022-01-09 16:30 +0545
categories: [Ruby on Rails, Ruby]
tags: [ruby on rails, ruby]
---

This post you will learn about the most interesting addition to Ruby 2.3.0, the Safe Navigation Operator(&.).

## Scenario

Lets say we have a `cart` object, which belongs to an `owner` and we want to know the `email` of the owner.

Most common solution we find Devs doing in this situation is:

```ruby
cart && cart.owner && cart.owner.email
```

which is checking if `cart` is present, than check `cart.owner` and if it present than return `cart.owner.email` as a result, which is tidious to write and doesn't looks good, also imagine, if there are multi level associations to work on.

Now another solution is:

```ruby
cart.try(:owner).try(:email)
```

bit shorter and cleaner than above solution but we can improve this by using `&.` operator:

```ruby
cart&.owner&.email
```

It will return the email address of owner, if `cart` and `owner` present, otherwise, return `nil`.
