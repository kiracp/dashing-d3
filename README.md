# Dashing Data Viz + D3.js book club

Goals for 2018? Become absolute authorities on the implementation of UX for analytics. If no one else is going to prioritize development of beautiful data visualizations, it might as well be us. Let’s get this going with a lesson on D3.js, and see where we go from there. Here's a running agenda. 


## Week 1 (1/12/2018)
### What we did
* Goals and priorities 
* Get base familiarity with D3
* Build things with D3
* Learn something new
* No one is investigating technical feasibility 
* Get prepared to talk about scoping 

### How we’re working – 
If you have time - do homework before. If not, we’ll be reviewing and having a working session every week

### Fun future Ideas 
* Rachel Sheketoff as a guest speaker
* D3.js meetup????
* Government datasets/public good data/datasets we’re interested in 

Course: https://www.udacity.com/course/data-visualization-and-d3js--ud507\

Hello World work:
http://www.jeromecukier.net/blog/2012/09/04/getting-to-hello-world-with-d3/

### Homework for Week 2
Gather and share reading materials in slack channel
Finish up Hello World exercise 
Start Udacity course - Week 1 lesson https://www.udacity.com/course/data-visualization-and-d3js--ud507\
Start Scrimba class
https://scrimba.com/playlist/pEKMsN

## Week 2 (1/19/2018)

Get together reading materials:
https://d3js.org/#introduction

### What we did
Continue with lesson - http://www.jeromecukier.net/blog/2012/09/04/getting-to-hello-world-with-d3/

Learn about the difference between .class and #id
* Every element on the DOM has an ID and a class
* Classes can be applied to multiple elements and IDs are unique identifiers
* You can use both to select the element

Set up our development tools
* Download XCode from App Store
* Add Janaki to the Github project
* Open up Terminal app

Setting up our repository
* `ls` to list out the files and `cd directory_name` to change into the directory you want to repository
* Enter `git clone https://github.com/kiracp/dashing-d3.git` which will copy the remote code onto your local machine
* Drag over all d3 project files into the dashing-d3 repository
* `git add .` to add all the directory files 
* `git commit -m “first commit”` to stage them for commit 
* `git pull` gets the most recent version of the directory
* `git stash` gets rid of what is in your commit so you don’t have to merge

Installing everything: npm and Node.js
* Download node package manager (npm) from here https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm
* In terminal run `node -v` to see if it installed.
* Now install npm. Run `npm install npm@latest -g`. Use `sudo [command]` if you get an permissions error
  * -g makes the command run globally (so you will be able to user http server everywhere)
* Now we’re ready to install our package! Run `npm install http-server -g`
* Run the command `http-server` to spin up your server and copy the `http://` address into the browser to open it up!

Using vi to edit files in the terminal and resolve a merge conflict!
* You’ve “git add” and “git commit”-ed your files, and you want to “git pull” to make sure you’re not missing any files before you push! When you run “git pull” you see that you have a merge conflict in a file. Navigate to the folder with the offending file in it.
* Type `vi name-of-file.ext` which will open up the vi text editor 
* Use `i` to insert text, ESC to exit insert mode
* Resolve the conflict in the file by inserting and deleting text
* To delete an entire row, use `dd`
* To save and quit, use `:x` command
* To just quit, use `:q` command
* Now, you can use `git add/commit/push` to put up the new files with no conflict

### Homework for Week 3
Tweak a visualization of your choice! Examples: https://github.com/d3/d3/wiki/Gallery
Start going through d3 tutorial list: https://github.com/d3/d3/wiki/Tutorials

## Week 3 (2/2/2018)
### What we did
* Learned some tips and tricks
* To view visualizations in the browser, use the `http-server -c-1 -a localhost -p 8000` command to generate a server, and open the URL in the browser
* Ctrl+C will close the server 
* Keep the server running and refresh it to see changes to your code

### Homework presentations
Janaki modified a line chart that compared BRICS/MIST countries

#### Things Janaki did
* Changed the colors of the lines to differentiate the MIST/BRIC countries
* Declared the colors through the names
* This visualization kept consistency so every country’s color would be represented the same way no matter the graph
#### Things Janaki wanted to do
* Add a legend
* Adding in tooltips 
* Changes what’s in the dropdown when you move down? Got to debug 

#### Things Kira did (Viz [HERE](http://bl.ocks.org/kiracp/1655fe04a5b38075900852c14bb0f996))
* Kira modified a heatmap - The original is here: http://bl.ocks.org/tjdecke/raw/5558084/
* Flip x/y axis
* Change the colors
* Make the legend vertical and align it to the side, not the bottom

#### Things Kira wanted to do
* Make a gradient of the legend
* Add a new, meaningful dataset
* Include a title
* Figure out documentation style a la bl.ocks.org to display annotated viz work

We reviewed the Leanpub D3 Tips and Tricks for ideas: https://leanpub.com/D3-Tips-and-Tricks/read#leanpub-auto-what-is-d3js
* Building a line graph from scratch 
* Explanations for putting documented code on bl.ocks site

### Homework for Week 4
* Make a meaningful visualization (using your own data)
* Modify https://leanpub.com/D3-Tips-and-Tricks/read#leanpub-auto-what-is-d3js or an existing visualization
* Refer to the d3 tutorial list: https://github.com/d3/d3/wiki/Tutorials
* Investigate putting our work on bl.ocks 
* Ideas for the future: Playing with Victory 
  * Feels applicable to modify the styling directly and see how close we can get to “athena style”


## Week 4 (2/9/2018)
### Homework presentations

#### Janaki’s Viz [HERE](http://bl.ocks.org/thejanaki/b06a246820031c6a35bf6d0c48601f17)
* Dataset: google sheet of sleep data
* Sleep data from college: hours of sleep per week (y axis) over dates (x axis)
* Learned to parse the date in a different format

#### Kira’s Viz [HERE](http://bl.ocks.org/kiracp/98e424526283101e9d0f42909a7e086d)
* Pace over time

### How to publish to bl.ocks
Create directory with index.html, data and README files. When you run http-server, this should display what you want in the browser.

Now it’s time to publish! Bl.ocks is based on Gists. What’s a gist? From, Github: “Gists are a great way to share your work. You can share single files, parts of files, or full applications. You can access gists at https://gist.github.com. Every gist is a Git repository, which means that it can be forked and cloned.” Cool!

First, install gistup globally: `npm install -g gistup`
* Then, run gistup with command `gistup`
* If it’s your first time creating a gist, you will be prompted to open up Github in the browser. Log in, check boxes allowing permissions (including “gist”) and generate the token. This token will give you permission to publish gists. Copy what is generated and paste it into your terminal.

Now use our regular old git commands to push up.
* `git add .` to add the files
* `git commit -m “first blocks push”` to commit them and then 
* `git push -f --set-upstream origin master`
  * You’ll only need the `-f` (force) flag and `--set-upstream` flags on the first commit

If you’re at athena (or going through some network), you may see the following error: 
```
Error: Command failed: git push -fu 'origin' master
ssh: connect to host gist.github.com port 22: 
Connection refused fatal: Could not read from remote repository.
```

We’re going through the network, which is blocking the port! So we’ll have to switch from ssh and use http to push to the repo. Here’s how.
* Use `vi .git/config` to edit the git config file. You should see some config statements. Using arrows, navigate down to the “url = “  and change the url to this form:
```
url = https://gist.github.com/kiracp/98e424526283101e9d0f42909a7e086d
```

* Note: we’re replacing the `git@` with `https://`
* Note: we’re also adding in your github username instead of the “:”
* To save and close, use ESC to exit Insert Mode and then type the `:x` command to save and quit

To see your blocks, navigate to `http://bl.ocks.org/[your_username]`

To add a thumbnail: 
* Pick an image that’s 230x120px. Name it “thumbnail.png” and drag it into your repository. After committing, it should show up on the blocks page!

### Homework for Week 5
* Finish (ish) our vizzes from this week
* Try making a new type of chart with a new type of data!

## Week 5 (2/16/2018)

### Homework presentations

#### Janaki’s Viz [HERE](http://bl.ocks.org/thejanaki/b06a246820031c6a35bf6d0c48601f17)
* Dataset: habits by date
* Showing: A data map within each value for dates and habit values for each habit
* Used boolean values for habit success
* Parse dates needs to be fixed
* Key for each habit based on headers
* Reads in data, looks at how many habits you have and creates columns
* 

#### Things Janaki Wanted to do
* Dataset wasn't real data, did a random generation of values 
* How do you get to variables within the map?
* How do you get it to show that class of items 

#### Kira’s Viz [HERE](https://bl.ocks.org/kiracp/89ccc9d3d9ddf369624ba7bf81cde150)
* Pace data pulled from garmin but formatting was off
* used python to reformat data into csv
* visualized data by date instead of by entry number (yay!)
* working on regression now that data is by date

#### How do we decide what to visualize?
* Starting with existing new york times visualization
* Take the same topic and do it somewhere else

#### Homework for Week 6 

(skipping a week—March 2nd)
Something more interesting or complex!
Inspiration: https://informationisbeautiful.net/2017/the-best-infographics-and-data-visualizations-2017/


## Week 6 (3/2/2018)

* D3 Plug-ins
* Topo JSON - Library 
* Observable (from Mike Bostock) - https://medium.com/@mbostock/a-better-way-to-code-2b1d2876a3a0


### Homework for Week 7
* Continue trying a new type of visualization
* Use an existing d3 library - https://github.com/wbkd/awesome-d3

