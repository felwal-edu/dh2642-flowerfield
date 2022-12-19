# Flowerfield

https://dh2642-flowerfield.web.app

The course moment PRO1 in DH2642 Interaction Programming and the Dynamic Web.

Group 42: Elliot Darth, Felix Wallin, Linus Wallin, Matias Eriksson

## Project description

Flowerfield is an application where the user is able to collect flowers (and other plants) by taking pictures of them.

When a picture is taken, it can then be uploaded to the app, where the picture is processed and identified by an external image-identification API – [Plant.id](https://web.plant.id/plant-identification-api/). If the picture is successfully identified, it will add the flower to the user's collection.

The collection of flowers is divided into subcategories based on the families/species, which makes the user able to collect sets of types of vegetation.

The user can then view additional information about a plant in the user's collection. This information is sourced through the [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) & [Wikipedia RESTV1 API](https://en.wikipedia.org/api/rest_v1/).

XP is gained for collecting flowers, leveling up in the process and getting a cosmetic rank.

The app targets towards users intressted in botany, outside exploration or general gardenkeeping – encouraging slowing down, and appreciating one's own surroundings.

## Project file structure

Framework used: Vue

### public/

Contains some files used in build.

  - `index.html`. Base HTML file for the project, app is inserted there on runtime.

  - `favicon.ico`. Favicon used for website

### src/

Contains all the code as well as lots of assets used in the project.

- `main.js`. Creates the app and sets up router, Pinia, Vuetify, and loads fonts.

- router/

  - `index.js`. Routes different paths to different pages.

- store/

  - `flowerStore.js`. A Pinia store holding the user data: user id, email, and collected plans. Initialises data by calling the appropriate functions in fiebaseModel.

- utils/

  - `loadingUtils.js`. Some utility function for displaying loading images.

  - `logUtils.js`. Some utility functions for debugging through the console.

  - `plantUtils.js`. Some utility functions for transforming plant arrays.

  - `resolvePromise.js`. A function for resolving a promise; extracting data and errors and notifying listeners. Also contains a "mock" version for simulating the resolving of API promises.

  - `uploadUtils.js`. Handles backend of uploading image, enabling saving to collection (the database) if the upload was successful. Will maybe be moved to another file in the future.

  - `userUtils.js`. Some utility functions that display errors when user inputs wrong information.

- plugins/

  - `veutify.js`. Creates a Veutify instance.

  - `webfontloader.js`. Defines a function for loading web fonts.

- views/

  - `app.js`. Defines the base HTML to be injected into `index.html`. It uses router links to show the right page.

  - `homeView.js`. Welcomes and onboards the user.

  - `signupView.js`. Let's the user register an account on the website.

  - `loginView.js`. Let's the user log in to the website.

  - `uploadView.js`. Allows for uploading of an image to be classified as a specific plant via Plant.id's API. You can then add it to your collection.

  - `collectionView.js`. Displays the user's collected plants, sorted by name and grouped by genus.

  - `detailView.js`. Used in `collectionView.js`. Displays a selected plant in the collection as an overlay, showing some additional information about the plant via the Wikipedia API.

  - `profileView.js`. Displays the user's information, including email, XP, rank and username. Also let's the user log out.

  - `toolbarView.js`. Used in `collectionPresenter.js`. Displays a toolbar at the top of the collection page, allowing for some filtering actions.

  - `searchView.js`. Used in `toolbarView.js`. Displays a search bar in the toolbar - allowing users to search for plants in their collections.

  - `sortView.js`. Used in `toolBarView.js`. Displays a dropdown menu in the toolbar - allowing users to sort their plants in the collections.

  - `dialogView.js`. Displays a classic dialog, with title, message and buttons.

  - `loadingView.js`. Displays an ("optically") centered loading progress bar. Takes a prop for making it linear instead of circular.

  - `emptyPageView.js`. Used in `collectionPresenter.js`. Displays a empty page for users with nothing in their collections.

  - `errorView.js`. Displays a 404-page if trying to navigate to a route that does not exist. Contains a button that direct user back to home page.

  - `promiseNoData.js`. A function that notifies in a callback when it changes something in the promise state.


- presenters/

  - `homePresenter.js`. Presents homeView.

  - `signupPresenter.js`. Presents signupView.

  - `loginPresenter.js`. Presents loginView.

  - `uploadPresenter.js`. Presents uploadView.

  - `collectionPresenter.js`. Presents collectionView.

  - `detailPresenter.js`. Presents detailView.

  - `profilePresenter.js`. Presents profileView.

  - `errorPresenter.js`. Presents errorView.

- network/

  - `plantIdExample.js`. Cached API-results, used to not have to make excessive API calls while developing.

  - `plantIdSecrets.js`. Config for Plant.id, includes API key.

  - `plantIdService.js`. Interface for calling the Plant.id API. It takes an image encoded as base64 as parameter, and produces a response which includes a list of suggested plants which match the image.

  - `wikipediaService.js`. Interface for calling the Wikipedia API. Firstly, a latin name of a flower is sent as a param to OpenSearch and the first matching article result. From this, the true article name is extracted and then used to retrieve a summary of said article (with additional information such as HTML-styling, images etc. formated to JSON).

- persistence/

  - `firebaseApp.js`. Initialises firebase.

  - `firebaseAuth.js`. Authenticates the user. Contains functions for signing up, in and out; and observing changes to "user login" state.

  - `firebaseModel.js`. Syncs and desyncs data between Firebase and Pinia.

  - `firebaseSecrets.js`. Config for Firebase, includes API key.

- css/

  - `collection.css`. CSS-styling for the collectionView, mainly some extra styling for cards.

  - `details.css`. CSS-styling for the detailsView, mainly centering loading.

  - `error.css`. CSS-styling for the errorView, 404-page.

  - `home.css`. CSS-styling for the homeView, used for styling text elements, landing-page, the logo, images in the information part as well as containing a "scroll-down" animation.

  - `login.css`. CSS-styling for the loginView.

  - `main.css`. Project-wide CSS-styling, used for the navbar and defining the main color palette used.

  - `profile.css`. CSS-styling for the profileView, mainly screen-responsiveness and "moving" of elements to desired positions.

  - `signup.css`. CSS-styling for the signupView (colors mostly inverted from login.css).

  - `upload.css`. CSS-styling for the uploadView, adding feedback and clarification to the upload page.

- assets/

  Contains assets used in the project, including background images, icons, art, logo and loading icons.

## Getting Started

Prerequisite: npm or some other package manager.

Clone / download the project from the main branch, open the project folder using an IDE such as VSCode (recommended).

Before starting, create a `plantIdSecrets.js` under the _network_ folder and a `firebaseSecrets.js` under the _presistence_ folder, all under the _src_ directory. Add your API keys to the respective file.

To start development, run the following commands in order:

```
npm install
npm run serve
```

Now you can access the website using localhost.

## Deployment

To deploy the project to firebase, follow [Vue's guide](https://cli.vuejs.org/guide/deployment.html#firebase). In short:

```
firebase init
npm run build
firebase deploy
```
