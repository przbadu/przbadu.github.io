---
layout: post
title: filter empty element from an array
date: 2022-01-10 11:07 +0545
categories: [Tips, Javascript]
tags: [ruby on rails, javascript, hash]
---

In this post we will see how we can filter array of element without empty element which can be `null` or `''`

# Using javascript

Javascript [.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method creates a new array with all elements that pass the test implemented by the provided function.

```javascript
arr = ['apple', 'banana', '', 'mango', null, undefined]
```

From the given array of elements we can easily get non empty elements by using `.filter()` method:

```javascript
arr.filter(fruit => fruit)
> (3) ['apple', 'banana', 'mango']
```

This works because only non-empty elements will return `true` from the callback function

# Using Ruby

In Ruby [.reject()](https://apidock.com/ruby/Array/reject) method returns a new array containing the items in self for which the given block is not true. The ordering of non-rejected elements is maintained.

```ruby
arr = ['apple', 'banana', '', 'mango', nil]
```

> NOTE:

> `blank?` method will return true for both `''` and `nil` values

> `empty?` method will return true for `''` but throw `undefined method empty? for nil class` for `nil` values

> `nil?` method will return true for `nil` and false for `''` values


```ruby
# using blank?
arr.reject &:blank?
=> ["apple", "banana", "mango"]

# using empty?
arr.reject &:empty?
=> undefined method 'empty?' for nil:NilClass

# using nil?
arr.reject &:nil?
=> ["apple", "banana", "", "mango"]
```
