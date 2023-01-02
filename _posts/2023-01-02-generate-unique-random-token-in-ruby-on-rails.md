---
layout: post
title: Generate unique random token in ruby on rails
date: 2023-01-02 13:10 +0545
categories: [Ruby on Rails, ruby]
tags: [ruby on rails, ruby]
---

## Introduction

Generating unique random token for ruby on rails application is a common problem. People use different
ways to solve this problem and the most common way to solve this problem that we can find in the internet
is to generate a `SecureRandom.hex` like this:

```ruby
def generate_token
  loop do
    token = SecureRandom.hex(32)

    break token unless Record.where(token: token).exists?
  end
end
```

Here we are telling this method to generate a random token using `SecureRandom.hex()`, and than do a ActiveRecord query on a `Record` model
to see if that token already exists in the database. If it does, then generate another token, until the unique none existing token is found.
you can read more about this method from [SecureRandom](https://ruby-doc.org/stdlib-1.9.3/libdoc/securerandom/rdoc/SecureRandom.html#method-c-hex).

I think we can improve this method to generate more unique token by adding [Unix Timestamp](https://www.unixtimestamp.com/) in combination
with `SecureRandom.hex()` token like this:

```ruby
def generate_token
  loop do
    token = SecureRandom.hex(20)
    unix_timestamp = Time.current.to_time.to_i # e.g output => 1672645137
    token += unix_timestamp.to_s

    break token unless Record.where(token: token).exists?
  end
end
```

I think combining unix timestamp with SecureRandom hex can give more unique token, hence less repetition to match the unique token in database.
