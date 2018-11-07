# plot-my-location
web app that you can open and plot your location on a map with everyone else(s). 

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