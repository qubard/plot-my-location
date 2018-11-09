# plot-my-location

![License](https://img.shields.io/github/license/mashape/apistatus.svg)
[![GitHub](https://img.shields.io/badge/plotloc-deployed-brightgreen.svg)](https://plotloc.io)

[plotloc](https://plotloc.io) is a web app that allows users to plot their location with everyone else. 

uses [mapbox](https://www.mapbox.com) and [google geolocation](https://developers.google.com/maps/documentation/geolocation/intro)

See it live at [plotloc.io](https://plotloc.io).

# Usage

Run the following commands

```
npm install
node server.js
```

to install all the necessary dependencies into the `node_modules` directory and launch the server.

Then navigate to `https://localhost` in your browser.

# TODOs

- react/angular for frontend
- es6!!

# Notes

The app won't run without SSL enabled, so generate your `privkey.pem` and `fullchain.pem` using this [guide](https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625).

# Screenshot

![Screenshot](screenshot.png?raw=true "An agent connected in Miami")