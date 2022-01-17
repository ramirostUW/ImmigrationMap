# React Parcel Template

This repo is a private template for websites made with React, bundled with Parcel, and hosted on Github Pages. 

## How to get started with this template

First, clone the repo to your computer and run `npm install`.

Next, create a blank repo on Github, and then open the local folder you cloned the repo to. Follow the steps that appear on the blank repo page in Github under "push an existing repository from the command line". 

Next, on Github, go to the Settings page and click on the Pages menu. Under the 'source' heading, choose the main branch and then the docs folder to turn on Github Pages for the repo. Click Save.

Copy the url that Github Pages provides, then open your `package.json` file. Replace "https://replace-this-url.com" with the Github Pages url for your repo. 

Them simply use git to save your changes to your new repo and commit & push. Your new website is now ready!

## Testing and deploying the site

To test the website, simply run `npm start` on your local machine and open your browser. The website can be found under `http://localhost:1234/`. 

To deploy the website, first make sure that the URL in `package.json` matches the URL that you are trying to publish to. Then, run`npm start` after making all your changes, then run `npm run build`. Afterwards, simply save your changes and then commit & push. 
