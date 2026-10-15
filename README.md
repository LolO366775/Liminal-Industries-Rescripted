Here be the instructions for how to use this effectively:

If you are confused about anything you can ask me in the Liminal Industries Rescripted discord, My username in discord is LolO

This readme is being written from the perspective of LolO, all instances of I, me, my, etc. refer to LolO

**SECTIONS:**

**1: Getting set up**

**2: Basic rules and practices**

--------------------------------------------------------------------

**1: Getting set up**

***Rules***

1. This tutorial will assume you are using a windows command line to use git. \
   If you don't know how to use it, don't worry, every command you will need will be included.
2. This tutorial is designed for Curseforge \
   Other mod loaders have different file structures sometimes, so discretion is advised.
3. When some thing is encased in greater/less-than symbols \<example\> it is a placeholder \
   Replace all of it with what it calls for, do not include the greater/less-than symbols
4. Things in quotation marks "example" are to be copied and pasted somewhere
5. Things in square brackets \[example\] refer to specific names that you should look for
6. Things in parentheses (example) are footnotes to give extra context

***Instructions***
1. Download github desktop(optional) and git to your system if you don't already have them.
2. Make a fork of the repository and select the option that says you want to contribute
3. Open Curseforge and find the liminal industries rescripted pack you want to strap git to \
   (I recommend that you have 2 packs in curseforge, 1 to modify develop in and 1 is just the normal modpack)
5. Open the menu for the modpack on hit "open folder"
6. Make sure you are in the folder that is the same name as the modpack profile, you should see folders like \[saves\] and \[kubejs\]
7. Click on the file path bar at the top of the file explorer like if you wanted to type a file path in
8. Type "cmd" and hit enter, this will open command prompt in the folder you are currently in
9. Go to your browser and copy the url of your forked repo
10. Run "git init"
11. Run "git remote --add origin \<fork url\>"
12. Copy "https:/<i></i>/github.com/LolO366775/Liminal-Industries-Rescripted" (this is the main repository's url)
13. Run "git remote --add upstream \<main url\>"
14. To test if everything has worked so far, run "git remote -v". The output should look like this:\
origin  https:/<i></i>/github.com/LolO366775/Liminal-Industries-Rescripted (fetch)\
origin  https:/<i></i>/github.com/LolO366775/Liminal-Industries-Rescripted (pull)\
upstream  \<fork url\> (fetch)\
upstream  \<fork url\> (pull)
15. If that looks correct then run "git fetch" and then run "git pull"
16. Go back to file explorer and check to see if there is a \[.gitignore\] file
17. If there is, open it in a text editor. If it isn't empty than you should be good.

You should not be done with setting everything up, if there are any problems, ask me in the discord.

-------------

**2: Basic rules and practices**

*The rules will be changed as situations arise, so check often.*

These rules are mostly here as a code of conduct\
These will help to keep everything organized so that everyone knows how they should go about doing things\
If a pull request violates any of these rules, the pull request will be politely declined along with the reason\
Please do make an effort to follow them, it will make it easier for everyone

**1. Keep merge history linear**\
You can do whatever you want with your history in your own fork, but the main repo should only fast forward merge.\
This means that before you start a pull request, you should rebase your changes to the top of main

**2. Always fetch and pull to your local repo before doing anything that interacts with version history**\
This includes things like rebasing, merging, and should also be done before you start working on a new change.

**3. If you are confused ask for help**\
It is always better to be safe than sorry. \
The Github is set up to be protected from mistakes, but it will still waste your time and energy trying to solve issues that you don't understand\
I may not always be available, but I am always happy to help.
