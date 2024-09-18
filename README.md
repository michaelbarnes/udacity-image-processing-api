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

If you're using nvm run the following command in the route directory:

```shell
~ nvm use
```

This will look at the `.nvmrc` file in the route directory and will use the Node.js version specified in the file.

> NB! Windows Users; If you're on Windows using nvm-windows, nvm use without a verion number does not work. Please install the version specified in the .nvmrc file

### Clone & Install Dependencies

1. Clone this repository.

2. Install npm dependencies

```shell
~ npm install
```

### Building

To compile and build from source run the following command.

```shell
~ npm run build
```

This will compile the TS files into the `./dist` directory in the route directory. The `./dist` directory is excluded from the git repo.

## Run the server

To start the server simply run the start command.

```shell
~ npm run start
```

This starts the server on port 3000. Open a new browser window and navigate to [http://localhost:3000](http:localhost:3000).
This launches the application front-end, where you can see a list of directories and all the files contained within, along
with a small bit of UI that allows you to upload new files to the server.

> The Server class has a setting named: `createDirs: true | false`. By default this is set to true. If it's `true` it will
> create the required directories `assets/thumb`) in the route directory of the project, if it does not
> exist.
> The thumb directory is excluded from the repo.

### API Usage

#### Fetch an image

```
GET /api/images?filename=fjord&width=200&height=200
```

This fetches a thumbnail version of the image specified by the `filename` query parameter and resizes it based on the
`width` and `height` query parameters. The server serves up a cached version if the file already exists.

> If the file with the name as specified by the `filename` query parameter does not exist in the `assets/full` directory,
> the API will return 404. Upload a new image to the `assets/full` directory by visiting http://localhost:3000 when the
> server in running.

##### Handling different images types

To retrieve a different format of the image, specify the file extension in the `filename` query parameter. This allows the server
handle multiple image formats e.g.

```
GET /api/images?filename=fjord.png&width=200&height=200
```

> Supported file types includes: heic, heif, avif, jpeg, jpg, jpe, tile, dz, png, raw, tiff, tif, webp, gif, jp2, jpx, j2k, j2c,
> jxl. The endpoint will return HTTP 400 if the file type is not supported.

##### Adjust image fit

By default the server will use the `contain` fit property to fit the image in the dimensions provided (width and height).
If you want to override this, set the `fit` query parameter to one of the CSS [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) property options.

```
GET /api/images?filename=sample&width=200&height=200&fit=inside
```

> The `fit` query parameter is optional.

#### List available images

```
GET /api/images/list/full
```

This fetches a list of files in a directory in the `assets` directory. It will return 404 if the directory is not in the
file system.

#### Upload Image

```
POST /api/images
Body { fileName: "test.png", data: "iVBORw0KGgoAAAANSU..." }
```

This uploads the image to the `assets/full` directory.

> Make sure that the `data` property expects the string to be a base64 encoded string of the image, excluding the Data
> URL portion e.g. remove `data:image/jpeg;base64,`

## Development

Whilst editing code and making changes you can use nodemon to refresh after changes are saved to disk. This runs the TS files using ts-node, it's not the compiled code.

```shell
~ npm run dev
```

### Testing

To run the tests use the following command:

```shell
~ npm run test
```

This command will build the code from source and then run Jasmine to execute the tests.
