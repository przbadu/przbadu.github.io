---
layout: post
title: Change old git commit message with rebase
date: 2023-01-03 13:27 +0545
categories: [Git]
tags: [git, rebase]
---

In this post we will see step by step how to change older git commit message with the help of `rebase -i` git command.

## Quick and Important Notes

1. If you want to change the last commit, then you can easily change your commit message using `--ammend` option like this:
2. Another thing to note is, if you have already pushed your commit to remote repository and making these changes, then you have to force push `git push -f` to replace remote commit, which can also remove other commits from the remote repo, if you are working on team, so be careful before executing these commands.

```
git commit --amend -m "your new commit message goes here"
```

This command will change your recent last commit. But if your commit message is an old commit message than read further.

## check the position of your commit

First find the position of your commit message that you want to change.

```sh
git log --oneline
```

Lets say commits looks like this:

```sh
704a4d0 (HEAD -> master) third commit
f67ecc5 second commit
7d85495 wrong commit message
e6dd453 Add readme
```

And from above git commits we want to change the `7d85495 wrong commit message` commit message.

## Intereactive Rebase

`git rebase -i HEAD~n` command will Open your default editor, in my case [neovim](https://neovim.io/) and also displayes a list of last `n` commits.

```sh
git rebase -i HEAD~4
```

will generate output similar to:

```sh
pick 7d85495 wrong commit message
pick f67ecc5 second commit
pick 704a4d0 third commit

# Rebase e6dd453..704a4d0 onto e6dd453 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

As you can see `rebase` command provided pretty good comments with what different actions you can take. In our case we want to correct `wrong commit message` so we need to replace word `pick` with `reword` and than also change the message as we like.

```sh
reword 7d85495 wrong commit message
pick f67ecc5 second commit
pick 704a4d0 third commit

# Rebase e6dd453..704a4d0 onto e6dd453 (3 commands)
...
```

And finally save the changes and exit out of editor, for vim edit we can do `:wq`.

Now rebase will ask you to edit your commit message, here you can put the correct message, I will write `Correct commit message` in my example:

```sh
Correct commit message

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Tue Jan 3 13:10:35 2023 +0545
#
# interactive rebase in progress; onto e6dd453
# Last command done (1 command done):
#    reword 7d85495 Correct commit message
# Next commands to do (2 remaining commands):
#    pick f67ecc5 second commit
#    pick 704a4d0 third commit
# You are currently editing a commit while rebasing branch 'master' on 'e6dd453'.
#
# Changes to be committed:
#	modified:   readme.md
#
```

save and exit your editor again

## Confirm your changes

```sh
git log --oneline
```

should output similar to:

```sh
10d13bb (HEAD -> master) third commit
7b200bb second commit
92073a4 Correct commit message
e6dd453 Add readme
```

And you should see correct commit message 

## Force push 

If you changed the commit message after it was already pushed to your remote git repository, then you have to force push your changes because your commit hash is already changed.

In our case old commit hash was `7d85495` and new commit has is `92073a4`

```sh
git push origin <branch-name> -f
```
