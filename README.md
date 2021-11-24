# 🥼 YunoJuno Candidate Test

Hi!

Welcome to the YunoJuno candidate test.

First of all, thank you for applying and we appreciate you taking the time to do this test. It's not designed to be a long challenge so please don't spend more than at most four hours on it. If you feel there are bits left unfinished - that's fine, discuss them in the pull request and we can talk through them later.

You'll have the best head start if you read this file in its entirety, but please do get in touch if you have outstanding queries that are not answered - this test is meant to resemble everyday development as much as it can given the constraints.

This repo is in no way connected to our current workings at YunoJuno, and exists solely for the team to assess your technical understanding of front-end technologies, and how to use them. 

## 👋 Introduction

The app was prepared using `react-create-app`. You can run the app using `npm start` or `yarn start`, which will compile the JS and start a local server. 

`yarn watch-css` will compile and watch `App.module.scss`, although if you prefer you can ignore the SASS file and directly edit `App.module.css`. Be aware that running any of the CSS build tasks will overwrite `App.module.css` though, so you may wish to delete the SASS file if you don't intend to use it. 

If you require more info, please refer to the `react-create-app` docs @ https://github.com/facebook/create-react-app.

`react-create-app` supports ES6 syntax. 

You are free to use whatever third party libraries or plugins you want, if you feel it is necessary.

## 📈 Goals

The goal is to build on this barebones react project into an functioning application.

You are free to implement this however you like but at minimum you will need to fulfill the following [user stories](https://en.wikipedia.org/wiki/User_story):

* As a user I can see a list of Lord of the Rings characters
* As a user I can filter this list by selecting a category, and see only relevant results
* As a user I can order the list alphabetically by `name` or by the arbitrary `significanceIndex` value

In service of these user stories, there are some additional requirements:

* Your solution must have some test coverage
* Your solution must asynchronously load the character list
* Your solution should be styled appropriately (based on design provided)
* The layout at mobile sizes is at your discretion
* Your solution must be compatible with the latest versions of the following browsers:
  - Chrome
  - Safari
  - Firefox
  - Edge

All the assets necessary (including a JSON file with all the required data) are included in the repository.

NB: We will never use your submission in any way other than for this interview process. See more about what we do with the code below.


### 👩‍💻 What is this test designed to showcase?

* your ability to work on an existing React project.
* your capacity to take existing code and build on top of it.
* how you would approach an everyday feature request.
* how you work as part of a normal code review process.
* how your pull request explains the change to the team.

### 📥 Submission procedure

1. Fork the repository<sup>☨</sup>.
1. Clone it locally & setup the environment.
1. Make your code changes.
1. Push to your fork.
1. Open a PR against this repo, as if this was an everyday feature addition.
1. Confirm with us that you have done so, stating your GitHub username.

<sup>☨</sup> There are privacy concerns with submitting to a project that is openly
accessible to the web so please take that into account, and if you require
the extra anonymity - please register a throwaway GitHub account instead of
using your actual GitHub account.
