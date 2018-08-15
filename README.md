# Todo API
> Manage todos (add, edit, save) everywhere, live [here](https://p.dcdev.pt/todo/api)
> This repo has 2 branches:
  * Master: plain JS (ES6)
  * Typescript: Typescript (v3)

> Postman file included for testing

<p align="center">
<img src="http://via.placeholder.com/500x300">
</p>

## Getting Started

### Pre-requisites

* Node
* NPM
* MongoDB

### Installing

* Install packages

```
npm install
```

* Build assets

```
npm run build
```

* Edit .env.sample and rename to .env

```
MONGODB_URI= MongoDB url (for prod/dev)
MONGODB_URI_TEST= MongoDB url (for testing)
PORT= Express prot
JWT_SECRET= long/random string
NODE_ENV= Environment (development, production, test)
```

### Developing

* Run in development mode

```
npm run watch
```

### Production

* Run in production mode

```
npm start
```

### Testing

* Run in test mode

```
npm run test
```

* Run in test mode (+ watching)

```
npm run test-watch
```

## Built With

* Node (ES6)
* Express (Web Framework)

## Future improvements

* Add rate limiting
* Increase test coverage

## API Documentation

TODO - check routes files for now

## Contributing

Feel free to submit PR's.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details