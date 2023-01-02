---
layout: post
title: Use dig method to get value from deeply nested key
date: 2022-01-09 15:58 +0545
categories: [Ruby on Rails, Ruby]
tags: [ruby on rails, ruby, hash]
---

Learn how to extracts the nested value specified by the sequence of `key` objects by calling `dig` at each step, returning nil if any intermediate step is nil.

**Example data**

Lets say we have following Hash to work on, this can be a rails `params` object or any other `Hash` object

```ruby
params = { name: "John", address: { primary: { city: 'Pokhara' } } }
```

And we want to get the value of `city` from the given object, and one way to do is:

```ruby
params[:address] && params[:address][:primary] && params[:address][:primary][:city]
=> "Pokhara"
```

we need to do that, because if lets say `address` or `primary` key is empty than we will get

```ruby
undefined method `[]' for nil:NilClass (NoMethodError)
```

And ruby has a clean and easy way to extract such values by using `.dig` method

```ruby
params.dig(:address, :primary, :city)
=> "Pokhara"
```

In this case, if `address` or `primary` key do not exists, or have `nil` as a value, than it will return `nil` as result without throwing error.

## More Info

- [https://apidock.com/ruby/Hash/dig](https://apidock.com/ruby/Hash/dig)
