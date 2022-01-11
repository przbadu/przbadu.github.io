---
layout: post
title: Use Timecop to time travel in testing
date: 2022-01-11 19:24 +0545
categories: [Blog, RubyOnRails]
tags: [ruby on rails, javascript, hash]
---

In this post we are going to use **timecop** rubygem to test our `trial_remaining_time` method which actual returns number of days remaining in user's trial plan.

> [timecop](https://github.com/travisjeffery/timecop) is a gem providing `time travel` and `time freezing` capabilities, making it dead simple to test time-dependent code. It provides a unified method to mock `Time.now`, `Date.today`, and `DateTime.now` in a single call.

```ruby
class User < ApplicationRecord
  # Method to return number of remaining trial days
  def trial_remaining_days
    days = (created_at.to_date - 15.days.ago.to_date).to_i
    return days if days.positive?

    0
  end
end
```

And we want to make sure our method is working fine, so how do we actually test it. Using [timecop](https://github.com/travisjeffery/timecop) makes it dead simple to travel time and freeze it so that we can check expected result in different future dates for our usecase.

> NOTE: I am using default `unit_test` from rails project, you can also use `rspec` without any issue.

```ruby
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'should return remaining days for user' do
    user = User.new(created_at: Time.current)

    (15..0).to_a.each_with_index do |day, index|
      Timecop.freeze(day.days.from_now) do
        assert_equal index, user.trial_remaining_days
      end
    end
  end

  test 'should return 0 trial remaining days for user created more than 15 days ago' do
    user = User.new(created_at: Time.current)

    Timecop.freeze(16.days.from_now) do
      assert_equal 0, user.trial_remaining_days
    end

    Timecop.freeze(20.days.from_now) do
      assert_equal 0, user.trial_remaining_days
    end
  end
end
```

```shell
Running 2 tests in a single process (parallelization threshold is 50)
Run options: --seed 62828

# Running:

..

Finished in 0.038093s, 52.5033 runs/s, 52.5033 assertions/s.
2 runs, 2 assertions, 0 failures, 0 errors, 0 skips
```

To understand it lets print values of `Timecop.freeze` method

```shell
# Today is 2022-01-11
Time.now
=> 2022-01-11 19:45:44.501290989 +0545

# lets freeze time in 0.days and see what will happens
irb(main):008:0> Timecop.freeze(0.days.from_now) { puts Time.current }
2022-01-11 14:01:00 UTC

# if we freeze time in 10.days from now
irb(main):010:0> Timecop.freeze(10.days.from_now) { puts Time.now }
2022-01-21 19:47:05 +0545
```

happy hacking!
