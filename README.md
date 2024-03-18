# ImmoBee

<!-- TABLE OF CONTENTS -->
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <details open="open">
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
    </li>
    <li>
      <a href="#demo-and-screenshots">Demo and screenshots</a>
    </li>
    <li>
      <a href="#installation-and-setup-instructions">Installation and setup instructions</a>
    </li>
    <li>
      <a href="#technologies-used">Technologies used</a>
    </li>
    <li>
      <a href="#next-steps">Next steps</a>
    </li>
    <li>
      <a href="#current-issues">Current issues</a>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<br>

## About the project

[ImmoBee](https://immobee.app/) is an open-source project designed to streamline the process of searching for properties for sale by gathering real estate agent data from various sources. This repo contains the frontend code that queries various APIs that scrape estate agent data so that listings for all agents in a particular region can be viewed together in one place.

All of the backend code for this project including APIs and scrapers can be found [here](https://github.com/suspiciousleaf/immo_app).
<br><br>

## Demo and screenshots
A demo video and some screenshots to demonstrate ImmoBee's functionality: <br><br>
[coming soon]
<br>
<h1 style="border-bottom: none;">Live version <a href="https://immobee.app/">here</a>.</h1>
<br>

## Installation and setup instructions
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

After cloning the repository, in the project directory, you can run:

### `npm install`

To install the project dependencies.

### `npm start`

To run the app in the development mode.

Then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.
<br><br>

## Technologies used
### ImmoBee relies on the following dependencies:
* [React Router v6](https://reactrouter.com/en/main)
* [React Paginate](https://www.npmjs.com/package/react-paginate)
* [React Widgets](https://jquense.github.io/react-widgets/docs/)
* [React Hook Form](https://react-hook-form.com/)
* [Sass](https://sass-lang.com/)
<br><br>

## Next steps
* Create a 'featured listings' widget that rotates featured listings every few weeks
* When the listing detail page is opened in a new tab, a local storage item is set in order to retrieve the listing data. This doesn't delete - next step is to add an expiration date to each of these, and create a function that is called when the app initially loads to delete any items that have expired.
* Possibly adding authentication so that users can retrieve their saved listings on any device
* Add unit tests
<br><br>

## Current issues
[coming soon]
<br><br>

## Contributing
If you find a bug, or wish to request new features, please open an issue [here](https://github.com/AmyMaule/real-estate-immobee/issues/new), including as much information as you can.
<br><br>

## License
MIT © [Amy Maule](https://github.com/AmyMaule)
