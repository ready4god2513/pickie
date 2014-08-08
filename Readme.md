# Pickie

Want to keep, search through, and re-copy your clipboard history?  Then **Pickie** is the app for you.  Browse,
filter, and remove you clipboard history quickly. 

![List Clips](http://i.imgur.com/3aJOioU.png)

How it works- Start the app.  It will listen to your clipboard.  Each change will get logged to the app.  You can filter the history at any time with the search field.  If you want to re-copy an entry, just click on it.  To remove an entry click the "x" below the entry text.  History is persisted across app-launches.

Written on top of node-webkit and leveraging the two-way data binding of Angular JS.  **Note: This app has *only* been tested on OS X so far, but I have plans to use it on Windows and Linux as well.  If you come across an issue, please let me know.**

# Getting Started
You can either download the binary distribution [here](https://www.dropbox.com/s/q7ng6gd1cm6cdc2/Pickie.zip) or build from source-

1. Clone the repository
2. run `npm install`
4. run the app [according to the docs here](https://github.com/rogerwang/node-webkit/wiki/How-to-run-apps "Running Node-Webkit Apps")

If you make any changes to the source code (javascript/sass), you will need to run gulp to concatenate and minify.  Just run `gulp` from the root directory.

# How to Contribute

First, building, testing and reporting bug is highly appreciated. Please include console's output and reproduction step in your bug report.

1. Fork the repository
2. Write the feature (or fix the bug) that you want to see
3. Write a unit test(s)
4. Submit a pull-request
5. Profit? (Probably not)
