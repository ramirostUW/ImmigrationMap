# Immigration Map

This is the repo for the iGlobetrotters team's 2022 UW Informatics Capstone Project.

# Purpose
The project is an online application that presents users with data and information on potential countries to move to. 

# Miro Board
Our Miro board can be found here: https://miro.com/app/board/uXjVOWHgta4=/
A google drive backup can be found here: https://drive.google.com/file/d/1L421i52ewnLtZ1HO838G6SKh5-_ptEcG/view?usp=sharing
Figma with prototypes: https://www.figma.com/file/gqIfMkqXYTxuVU2acdV8Hh/Immigration-Inc.?node-id=0%3A1
Final Presentation: https://docs.google.com/presentation/d/1LwOhL3_5OqVH3AsSeHeYVSVEZRusyrt0xwDDH9le0hs/edit?usp=sharing
Usability Testing Findings: https://docs.google.com/document/d/166B2M2dtTZYJcF4eV0nPD5iJqbdE0aEbH-GglGXRMtg/edit?usp=sharing



# Project Idea and User Research
Immigrants need as much information as possible when adapting to a new
country to combat differences in culture and transition smoothly. Without appropriate research, they can face barriers in accessing basic needs and are often subject to exploitation. Immigration Inc. is an interactive website providing knowledge and resources for those interested in moving out of their home countries. Through data visualizations powered by government statistics covering topics such as education, employment, and population, Immigration Inc. enables users to make informed decisions regarding immigration.

Our project idea was originally centered on fighting disinformation concerning immigration. As we did stakeholder research, however, we found that potential users were less interested in finding out about immigration itself than in learning what options they had if they wanted to immigrate. We then switched to our current idea: an interactive map that presents users with the chance to learn more about countries they are interested in immigrating to, and the economic and legal circumstances for immigrants in those countries. 
Our user research indicated that while some users were happy with our product and found it intuitive, others found it clunky and confusing. Some of the data didn't appear to be clearly represented or were misleading (ex: visa application times). Thus, we focused the remainder of our time on making the visuals less confusing and easier to understand by more clearly defining our labels and controls. We took out data that would only confuse the users and focused on creating stories with the data using problem statements in each category. We also decide to rebrand the website with new visual colors and modernize the look based on user feedback.

# Cloning the project 
The project does not have a formal backend structure or a need for a hosting service other than github pages. It is designed to have a compact setup and be easy to relocate and duplicate. 

To create your own copy of the project, please follow the following steps:

1. Fork or clone the repository to another URL on github. 
2. Set up github pages on that new repo. Set up pages so that it deploys from the `docs` folder of whatever branch you will use for development (usually the `main` branch). You can use a custom URL or the one that GitHub provides, but either way you should take note of what URL the site will be deployed to. 
3. Open the package.json file and scroll down to the `build` entry in the `scripts` object. Replace both instances of `immigrationinc.info` with the URL you will deploy to.
4. Open the `src` folder, and open AccessDatabase.js , then replace all of the URLs for each CSV with the raw github links from your new repo. Since your repo has to be public to allow the usage of GitHub Pages anyway, this step can be completed very quickly by using the replace all function in a text editor, to replace all instances of `ramirostUW/ImmigrationMap` with the github user of the new repo's owner, as well as the name of the new repo. 
5. That should be it!

## Testing and deploying the site
First, if you haven't already done so, please install npm to your command line or terminal.
Upon first cloning the repo to your local machine, run `npm install` to get all of the necessary dependencies. Please note that this will take above a gigabyte of free space on your machine.
To test the website, simply run `npm start` on your local machine and open your browser. The website can be found under `http://localhost:1234/`. 

To deploy the website, first make sure that the URL in `package.json` matches the URL that you are trying to publish to. Then, run`npm start` after making all your changes, then run `npm run build`. Afterwards, simply save your changes and then commit & push. 

# If you have any questions, please contact:
- Ramiro Steinmann Petrasso, ramirost@live.com
- Faiza Hussain, fhussa@uw.edu
- Amara Perry, amarapy@uw.edu
- Shourya Srivastava, shours@uw.edu
- Talin Hans, talinhans2018@gmail.com
