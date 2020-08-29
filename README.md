# webpack_typescript_express

This is a very basic repository that sets up a webpack + typescript + express server and app client.

## Getting Started

### Simple Watch + Recompile

`npm install`
`npm run dev`

### Production

`npm build` (output will be put into `/dist`)
`npm run start` (will start the server w/o live reload)

## Notes

### Dependencies

There are a lot of dependencies that are used here (ugh, tried to keep it light), here is a little on each:

Runtime:

- axios: wrapper for simple XHR requests [Optional]
- body-parser: parse json from body requests in express [Optional? Probably best to keep]
- cors: handle cors for us on the server
- express: the actual node server
- typestyle: allow for type-safe css styling (injected w/ js) [Optional]

Dev/Build:

- @types/express: typescript typedefs for express (and also seems to include some other basic types for things like node, etc)
- concurrently: run multiple processes and restart them if they crash [Optional - makes dev flow nice]
- copy-webpack-plugin: copy static assets to our final destination (for the client app)
- nodemon: live reload of server [Optional - makes dev flow nice]
- prettier: opionated code formatter that has formatted this repo [Optional]
- ts-loader: a webpack loader for typescript that works with the typescript compiler
- typescript: compiles .ts files into .js files, gives us type safety
- webpack: bundles our server + app, does minification, etc
- webpack-cli: handles running webpack in our scripts
