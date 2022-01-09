---
layout: post
title: convert deeply nested JSON into OpenStruct object
date: 2022-01-09 16:11 +0545
categories: [Tips, RubyOnRails]
tags: [ruby on rails, json, hash]
---

This post will help you convert `JSON` objects into an [OpenStruct](https://ruby-doc.org/stdlib-2.5.1/libdoc/ostruct/rdoc/OpenStruct.html) object, which will allow us to extract value directly using `.` dot notation e.g: `json_result.key`

If you are using with any JSON API services, than you might have come across a situation where you have to extract certain value, check if it exists in JSON response or not and doing that in traditional way is too much pain

```json
{
  "name": "John doe",
  "email": "john@example.com",
  "address": {
    "primary": {
      "city": "Pokhara"
    }
  }
}
```

Now obviously, we want to extract a value of `city` but for that, we need to go with the pain of verifying each parent keys to have a child result like so:

```ruby
def city(json)
  return if json['address'].blank?
  return if json['address']['primary'].blank?

  json['address']['primary']['city']
end

city(json)
=> "Pokhara"
```

## JSON to OpenStruct object

we can simplyfy this by using **[Safe navigation operator](/posts/ruby-safe-navigation-operator/)** and OpenStruct class.

```ruby
res = JSON.parse(json, object_class: OpenStruct)
res.address&.primary&.city
=> "Pokhara"
```

## Hash to OpenStruct object

we can also convert `hash` to openstruct object by converting hash into JSON using `.to_json` method:

```ruby
res = JSON.parse(hsh.to_json, object_class: OpenStruct)
res.address&.primary&.city
=> "Pokhara"
```

## More info

- [https://ruby-doc.org/stdlib-2.5.1/libdoc/ostruct/rdoc/OpenStruct.html](https://ruby-doc.org/stdlib-2.5.1/libdoc/ostruct/rdoc/OpenStruct.html)
