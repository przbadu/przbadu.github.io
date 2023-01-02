---
layout: post
title: Devise sign out issue with rails 7
date: 2022-02-10 08:35 +0545
categories: [Ruby on Rails, ruby]
tags: [ruby on rails, devise]
---

After creating my first rails 7 project, I added [devise](https://github.com/heartcombo/devise) gem
for authentication solution, and there were couple of issues I faced because of rails 7 changes mainly with turbo streams.

One of those issue is, your regular link for delete action do not work any more, one of the example is devise `sign out` link:

```erb
<%= link_to "Sign out", destroy_user_session_path, method: :delete %>
```

Or any other link where you are using `method: :delete`. Now that with rails 7 ships turbo streams by default, you need to make these links compatible with turbo streams by following changes:

```erb
<%= link_to "Sign out", destroy_user_session_path, data: { turbo_method: :delete } %>
```

with this subtle change sign out link should work again!


Happy Coding!!
