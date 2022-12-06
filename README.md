# Flowerfield

The course moment PRO1 in DH2642 Interaction Programming and the Dynamic Web.

Group 42: Elliot Darth, Felix Wallin, Linus Wallin, Matias Eriksson

## **NOTE**: please only call the API once or twice, since we have limited quota.

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

## What we still plan to do

Make the website look okay.

Make "Login" and "Profile" mutually exclusive.

Have some good way of waiting for Firebase to load data – and not let the user in while not logged in.

Probably implement a `detailPresenter` and -`View`, allowing the user to click on a plant and view more detailed info.

## Project file structure (short description/purpose of each file)

Framework used: Vue

- _assets_

- _css_

- **main.js**. Creates the app and sets up router, Pinia, Vuetify, and loads fonts.

- **utilities.js**. Some utility functions.

- _plugins_

  - **veutify.js**. Creates a Veutify instance.

  - **webfontloader.js**. Defines a function for loading web fonts.

- _router_

  - **index.js**. Routes different paths to different pages.

- _views_

  - **app.js**. Defines the base HTML. It uses router links to show the right page.

  - **loginView.js**. Let's the user log in or sign up.

  - **profileView.js**. Displays the user's information, including email. Also let's the user log out.

  - **collectionView.js**. Displays the user's collected plants, sorted by name and grouped by genus.

  - **uploadView.js**. Allows for uploading of an image to be classified as a specific plant via Plant.id's API. You can then add it to your collection.

- _presenters_

  - **loginPresenter.js**. Presents loginView.

  - **profilePresenter.js**. Presents profileView.

  - **collectionPresenter.js**. Presents collectionView.

  - **uploadPresenter.js**. Presents uploadView.

- _data_

  - _network_

    - **plantIdService.js**. Interface for calling the Plant.id API. It takes an image encoded as base64 as parameter, and produces a response which includes a list of suggested plants which match the image.

    - **plantIdServiceMock.js**. Cached API-results, used to not have to make excessive API calls while developing.

    - **plantIdSecrets.js**. Config for Plant.id, includes API key.

    - **resolvePromise.js**. A function for resolving a promise; extracting data and errors and notifying listeners.

  - _persistence_

    - **firebaseAuth.js**. Authenticates the user. Contains functions for signing up, in and out; and observing changes to "user login" state.

    - **firebaseModel.js**. Syncs and desyncs data between Firebase and Pinia.

    - **firebaseSecrets.js**. Config for Firebase, includes API key.

  - **flowerStore.js**. A Pinia store holding the user data: user id, email, and collected plans. Initialises data by calling the appropriate functions in fiebaseModel.

  - **uploadTemp.js**. TODO
