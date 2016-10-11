Conifer Web Client
================

This repository houses the client app used by Conifer.

## Stack

- React + MobX
- Bulma CSS
- Hot reloading (Both component and store)

## Getting Started

1. Install Node (>5) via NVM
2. Install typings `npm install typings -g`
3. Install dependencies `npm install`

## Run/Build Example

To serve an example with hot reload, use `npm run dev:{example name}`.
To bundle it, use `npm run build:{example name}`.
The bundle will be located at `dist/{example name}`.

## Compile as Library

`npm run compile` will compile to ES6 and generate type declarations using
TypeScript compiler, then to ES5 using Babel.

## Project Structure

1. States are maintained by store classes under `store`.
2. One store per component/entity, one to manage layout, one to manage virtual files.
3. Inject base store `store/Store` with sub-stores on `store/index`.

## License
MIT

