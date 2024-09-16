# udacity-image-processing-api

This repository contains the source code of my Image Processing API project, which is part of Course 2: Backend Development API.
Here are the key libraries used in this application:

1. Typescript - Default programming language for the application.
2. Node.js - Runtime environment.
3. Jasmine - Unit testing.
4. Express - HTTP server.
5. Sharp - Image processing library.
6. Prettier - Code formatting (options set to use --use-tabs for tab indentation, I prefer it).

## Setup

This project requires nvm or the latest LTS Node.js version. Follow the [nvm installation instructions](https://github.com/nvm-sh/nvm) to install nvm.

### Configure Node.js Env

1. If you're using nvm run the following command in the route directory:

```shell
~ nvm use
```

This will look at the `.nvmrc` file in the route directory and will use the Node.js version specified in the file.

> Note Windows User: If you're on Windows using nvm-windows, nvm use without a verion number does not work. Please install the version specified in the .nvmrc file

### Clone & Install Dependencies

1. Clone this repository.

2. Install npm dependencies

```shell
~ npm install
```

### Building

1. To compile and build from source run the following command.

```shell
~ npm run build
```

## Run the server

To start the server simply run the start command.

```shell
~ npm run start
```

This start the server on port 3000. Open a new browser window and navigate to [http://localhost:3000](http:localhost:3000).
This launches the application front-end, where you can see a list of directories and all the files contained within, along
with a small bit of UI that allows you to upload new files to the server.

> The Server class has a setting named: `createDirs: true | false`. By default this is set to true. If it's `true` it will
> create the required directories (`assets/full` & `assets/thumb`) in the route directory of the project, if they do not
> exist and create a sample .png file in the `assets/full` directory.
> The two directories are excluded from the git repo.

### API Usage

1. To resize an existing image use the following:

```
GET /api/images?filename=sample&width=200&height=200
```

If the file with the name as specified by the `filename` query parameter is not on disk, the API will return 404.

2. To view a list of availible images use:

```
GET /api/images/list/full
```

This fetches a list of files in a directory in the `assets` directory. It will return 404 if the directory is not in the
file system.

3. To upload a new image use:

```
POST /api/images
Body { fileName: "test.png", data: "iVBORw0KGgoAAAANSU..." }
```

This uploads the image to the `assets/full` directory.

> Make sure that the 'data' property expects the string to be a base64 encoded string of the image.

## Development

1. Whilst editing code and making changes you can use nodemon to refresh after changes are saved to disk. This runs the TS files using ts-node, it's not the compiled code.

```shell
~ npm run dev
```

### Testing

1. To run the tests use the following command:

```shell
~ npm run test
```

This command will build the code from source and then run Jasmine to execute the tests.

This will compile the TS files into the `./dist` folder in the route directory

