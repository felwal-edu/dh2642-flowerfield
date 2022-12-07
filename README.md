# Flowerfield

https://dh2642-flowerfield.web.app

The course moment PRO1 in DH2642 Interaction Programming and the Dynamic Web.

Group 42: Elliot Darth, Felix Wallin, Linus Wallin, Matias Eriksson

**NOTE: please only call the API once or twice, since we have limited quota.**

## Project description

Flowerfield is an application where the user is able to collect _flowers_ by taking pictures of them.

When a picture is taken, it can then be uploaded to the app, where the picture is processed and identified by an external image-identification API – [plant.id](https://web.plant.id/plant-identification-api/).

If the picture is successfully identified, it will add the flower to the user's collection.

The collection of flowers is divided into subcategories based on the families/species, which makes the user able to collect sets of types of vegetation.

XP is gained for collecting flowers as well as completing entire sets, leveling up in the process and getting a cosmetic rank.

The app targets towards users intressted in botany, outside exploration or general gardenkeeping – encouraging slowing down, and appreciating one's own surroundings.

## What we have done

We created the project using Vue CLI.

We have set up a Pinia store and a Firebase database, and sync data between these.

We fetch data (a plant) from an image using Plant.id's API, and have also created a way to "mock" the result in order to not waste quota.

We load images by letting the user upload these, either via drag-and-drop or by browsing.

We have created the different presenters and views which make up the website.

Let the user wait while Firebase is loading data – and block pages only available to logged in users.

Standaradise use of colours and fonts.

## What we still plan to do

Make the website look even better.

A better way of blocking and redirecting the user if not logged in.

Clearly show 'loading' status.

Probably implement a `detailPresenter` and -`View`, allowing the user to click on a plant and view more detailed info.

_Visability of system status_. Make the navbar clearly display which page the user is on.

Adapt to mobile.

Experience points (XP) for collecting flowers, added to one's profile. Ranks for leveling up.

Maybe use a second API for fetching more detailed plant info, and fetching all plants within a species – to let the user 'fill out' their collection and see what they are missing.

## Project file structure

Framework used: Vue

- `main.js`. Creates the app and sets up router, Pinia, Vuetify, and loads fonts.

- _router_

  - `index.js`. Routes different paths to different pages.

- _store_

  - `flowerStore.js`. A Pinia store holding the user data: user id, email, and collected plans. Initialises data by calling the appropriate functions in fiebaseModel.

- _utils_

  - `plantUtils.js`. Some utility functions for transforming plant arrays.

  - `uploadUtils.js`. Handles backend of uploading image, enabling saving to collection (the database) if the upload was successful. Will maybe be moved to another file in the future, hence the 'temp' name.

  - `resolvePromise.js`. A function for resolving a promise; extracting data and errors and notifying listeners.

- _plugins_

  - `veutify.js`. Creates a Veutify instance.

  - `webfontloader.js`. Defines a function for loading web fonts.

- _views_

  - `app.js`. Defines the base HTML to be injected into `index.html`. It uses router links to show the right page.

  - `homeView.js`. Welcomes and onboards the user.

  - `loginView.js`. Let's the user log in or sign up.

  - `profileView.js`. Displays the user's information, including email. Also let's the user log out.

  - `collectionView.js`. Displays the user's collected plants, sorted by name and grouped by genus.

  - `uploadView.js`. Allows for uploading of an image to be classified as a specific plant via Plant.id's API. You can then add it to your collection.

- _presenters_

  - `homePresenter.js`. Presents homeView.

  - `loginPresenter.js`. Presents loginView.

  - `profilePresenter.js`. Presents profileView.

  - `collectionPresenter.js`. Presents collectionView.

  - `uploadPresenter.js`. Presents uploadView.

- _network_

  - `plantIdService.js`. Interface for calling the Plant.id API. It takes an image encoded as base64 as parameter, and produces a response which includes a list of suggested plants which match the image.

  - `plantIdExample.js`. Cached API-results, used to not have to make excessive API calls while developing.

  - `plantIdSecrets.js`. Config for Plant.id, includes API key.

- _persistence_

  - `firebaseAuth.js`. Authenticates the user. Contains functions for signing up, in and out; and observing changes to "user login" state.

  - `firebaseModel.js`. Syncs and desyncs data between Firebase and Pinia.

  - `firebaseSecrets.js`. Config for Firebase, includes API key.
