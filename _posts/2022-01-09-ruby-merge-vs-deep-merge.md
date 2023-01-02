---
layout: post
title: Ruby merge Vs deep_merge
date: 2022-01-09 15:28 +0545
categories: [Ruby on Rails, Ruby]
tags: [ruby on rails, ruby, hash]
---

This post will help you understand the difference between Ruby's `merge` and Rails `deep_merge` method.

# Merge

Ruby's merge method merges one hash into another, as it's name suggest

```ruby
{ first_name: 'John' }.merge({ last_name: 'Doe' })
=> {:first_name=>"John", :last_name=>"Doe"}
```

Now lets say we have following 2 `Hash` objects

```ruby
user1 = { name: 'John', address: { city: 'City' } }
user2 = { name: 'John', address: { zip: '12345' } }
```

And if we use `.merge()` this time the result will be:

```ruby
user1.merge(user2)
=> {:name=>"John", :address=>{:zip=>"12345"}}
```

# Deep Merge

And if we want to merge both `city` and `zip` addresses for the user, then we need to use `.deep_merge()` method

```ruby
user1.deep_merge(user2)
=> {:name=>"John", :address=>{:city=>"City", :zip=>"12345"}}
```

> NOTE: `.deep_merge` is a rails method and `.merge` is a ruby's method

## References:

- [https://apidock.com/rails/Hash/deep_merge](https://apidock.com/rails/Hash/deep_merge)
- [https://apidock.com/ruby/Hash/merge](https://apidock.com/ruby/Hash/merge)

