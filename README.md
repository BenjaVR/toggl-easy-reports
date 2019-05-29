# Toggl Easy Reports

This is a web application to view and format a Toggl report in an easy to copy way, using the official Toggl API.

The main reason why I made this, is to be able to easily copy-paste the work that I have done in the internal time tracking tool of my company.

## Development

The application is made with Typescript and React, using Create-React-App. Development uses their react-scripts, so use `npm start` to start the development server in watch mode.

To be able to consume the Toggl API (without CORS issues), there is a [proxy server](./proxy) included, which can be started using `npm start` in the `./proxy` directory.
