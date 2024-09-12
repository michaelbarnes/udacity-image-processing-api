# udacity-image-processing-api

This repository contains the source code of my Image Processing API project, which is part of Course 2: Backend Development API.
Here are the key libraries used in this application:

1. Typescript - Default programming language for the application.
2. Node.js - Runtime environment
3. Jasmine - Unit testing
4. Express - HTTP server
5. Sharp - Image processing library
6. Prettier - Code formatting (options set to use --use-tabs for tab indentation, I prefer it)

## Setup

This project requires nvm or the latest LTS Node.js version. Follow the [nvm installation instructions](https://github.com/nvm-sh/nvm) to install nvm.

### Configure Node.js Env

1. If you're using nvm run the following command in the route directory:

```shell
~ nvm use
```

This will look at the `.nvmrc` file in the route directory and will use the Node.js version specified in the file.

### Clone & Install Dependencies

1. Clone this repository.

2. Install npm dependencies

```shell
~ npm install
```

3. Whilst editing code and making changes you can use nodemon to refresh after changes are saved to disk. This runs the TS files using ts-node, it's not the compiled code.

```shell
~ npm run dev
```

### Building

1. To compile and build from source run the following command.

```shell
~ npm run build
```

This will compile the TS files into the `./dist` folder in the route directory

### Testing

1. To run the tests use the following command:

```shell
~ npm run test
```

This command will build the code from source and then run Jasmine to execute the tests.

## Run the server

To start the server simply run the start command.

```shell
~ npm run start
```
