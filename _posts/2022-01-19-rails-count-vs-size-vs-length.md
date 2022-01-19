---
layout: post
title: Rails count vs size vs length
date: 2022-01-19 10:24 +0545
categories: [Tips, RubyOnRails]
tags: [ruby on rails, performance, count]
---

There are lots of ways to impact performance of your application. Initially when there is less data, everythings looks good, and eventually, when your traffic and active number of users using your application grows, you will start seeing some serious performance problem in your application.

And in this post we are going to look at why we need to understand difference between `.count`, `length` and `.size` methods to avoid performance problem.

Befor starting the comparision, lets make sure we have a basic rails application to work with

```shell
rails new demo
rails g model Post title
rails g model Comment body:text post:belongs_to
```

Open your `Post` model and add:

```ruby
# models/post.rb
has_many :comments
```

Now lets create some records in our database by using `seeds.rb` file

```ruby
# db/seeds.rb

2.times do |i|
  post = Post.create(title: "post #{i}")
  2.times do |j|
    post.comments.create(body: "Comment: #{j}")
  end
end
```

```shell
rails db:seed
```

## Count

If you want to know how many entries are there in `Post` model, than use `count`, which will perform `select count(*) ...` query and return `integer` value as result.

```ruby
Post.count
  Post Count (0.5ms)  SELECT COUNT(*) FROM "posts"
=> 2
```

But if you already have list of ActiveRecord objects stored in a variable, then using `count` is not a good idea, because it will still fires additional ActiveRecord query, because [count](https://apidock.com/rails/ActiveRecord/Calculations/ClassMethods/count) is a ActiveRecord method.

```ruby
posts = Posts.all
posts.count
  Post Count (0.3ms)  SELECT COUNT(*) FROM "posts"
=> 2
```

And if we are dealing with associated child records inside loop/iteration then using `count` in active record association object can cause `N+1` query problem. So always avoid doing this.

```ruby
# posts with eger loaded comments
posts = Post.includes(:comments).first(2)
  Post Load (0.1ms)  SELECT "posts".* FROM "posts" ORDER BY "posts"."id" ASC LIMIT ?  [["LIMIT", 2]]
   Comment Load (0.2ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" IN (?, ?)  [["post_id", 1], ["post_id", 2]]

# first iteration
posts.map { |p| p.comments.count }
  Comment Count (0.1ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 1]]
  Comment Count (0.1ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 2]]
=> [2, 2]

# second iteration
posts.map { |p| p.comments.count }
  Comment Count (0.1ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 1]]
  Comment Count (0.1ms)  SELECT COUNT(*) FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 2]]
=> [2, 2]
```

Here we can see, if we use `count` in `post.comments` association, than it will always fire a `select count(*) ...` SQL query for each post in an iteration. This will always give correct result but with the cost of `N+1` query problem. Which can impact performance of you app vastly, depending on how many records you are iterating through.

## length

On the other hand, you can't use `length` on ActiveRecord Model directly

```ruby
Post.length
> undefined method `length' for Post:Class (NoMethodError)
```

but lets say you already have a variable which holds your list of post objects, then using `length` will avoid additional ActiveRecord query

```ruby
posts = Post.all
posts.length
=> 2
```

as you can see, there is no additional ActiveRecord query called, because [length](https://apidock.com/ruby/Array/length) is a ruby method.

Now lets check our above active record association example and use `.length` instead of `.count`

```ruby
posts = Post.includes(:comments).first(2)
  Post Load (0.1ms)  SELECT "posts".* FROM "posts" ORDER BY "posts"."id" ASC LIMIT ?  [["LIMIT", 2]]
   Comment Load (0.2ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" IN (?, ?)  [["post_id", 1], ["post_id", 2]]

# first iteration
posts.map { |p| p.comments.length }
=> [2, 2]
```

Because we are already eger loading `includes(:comments)`, there is no further AR query made. Another thing to note is, if you are not using eger loading, than for the first iteration, it will fire ActiveRecord query, and cache the result, and second attempt to call `.length` will return cached result.

## Size

[size](https://apidock.com/rails/ActiveRecord/Associations/AssociationCollection/size) is an ActiveRecord method which is equivalent to `length` if the collection has been already loaded. Size will pick `length` or `count` based on your ActiveRecord object. so if you don't want to manage `length` or `count` then using `size` is more efficient.

That being said, you still can't use `.size` on model class directly with `Post.size`, it will throw `NoMethodError`.

```ruby
posts = Post.all
posts.size
=> 2
```

No additional ActiveRecord query fired.

And with association:

```ruby
posts = Post.includes(:comments).first(2)
  Post Load (0.1ms)  SELECT "posts".* FROM "posts" ORDER BY "posts"."id" ASC LIMIT ?  [["LIMIT", 2]]
   Comment Load (0.2ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" IN (?, ?)  [["post_id", 1], ["post_id", 2]]

# first iteration
posts.map { |p| p.comments.size }
=> [2, 2]
```

No additional ActiveRecord query fired. Size also have benifit if you are using `counter cache`
