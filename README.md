### Scripts to setup and test the project

- **You can use Setup to quickly setup and start the project:** `npm run setup`
- **Install:** `npm install`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Prettify:** `npm run prettify`
- **Run jasmine tests:** `npm run test`
- **Start server:** `npm run start`

### Usage

The server runs on localhost:3000

#### Access the Web App

Open: [http://localhost:3000/](http://localhost:3000/)

#### Resize Images Endpoint

Endpoint URL: [http://localhost:3000/api/images](http://localhost:3000/api/images)

**Query Parameters:**

- **filename**: Name of the image file
- **width**: Desired width in pixels (must be a positive number)
- **height**: Desired height in pixels (must be a positive number)

**Examples:**

1. **List available image names:**

   ```
   http://localhost:3000/api/images
   ```

   Displays a list of available image names.

2. **Display original image:**

   ```
   http://localhost:3000/api/images?filename=fjord
   ```

   Displays the original `fjord` image.

3. **Resize image:**

   ```
   http://localhost:3000/api/images?filename=fjord&width=200&height=200
   ```

   Resizes the `fjord` image to 200x200 pixels and stores the resulting image. Subsequent calls will serve the resized image from cache.

4. **Invalid width parameter:**

   ```
   http://localhost:3000/api/images?filename=fjord&width=-200&height=200
   ```

   Displays a hint indicating the invalid width parameter.

5. **Missing height parameter:**
   ```
   http://localhost:3000/api/images?filename=fjord&width=200
   ```
   Displays a tip indicating the missing height parameter.

---

## Project Structure

This project follows a structured organization to make it easier to read and understand and develop future code into it:

```
image-processing-api-deci/
├── assets/
│   └── images/
│       ├── full/
│       └── thumb/
├── dist/
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── node_modules/
├── source/
│   ├── controllers/
│   │   ├── api/
│   │   │   ├── processing.ts
│   │   │   └── upload.ts
│   │   └── router.ts
│   ├── tests/
│   │   ├── helpers/
│   │   │   └── reporter.ts
│   │   ├── fileSpec.ts
│   │   └── indexSpec.ts
│   ├── image-functions.ts
│   ├── index.ts
│   └── resize.ts
├── spec/
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

- `assets/`: Contains image assets used in the application, organized into `full` and `thumb` directories for full-sized and thumbnail images respectively.
- `dist/`: Directory for distribution files.
- `frontend/`: Holds the static front-end files including JavaScript, HTML, and CSS.
- `source/`: Contains the core application logic:
  - `controllers/`: Manages API routes and processing.
  - `tests/`: Includes unit tests and helper files for testing.
  - `image-functions.ts`: Functions related to image processing.
  - `index.ts` and `resize.ts`: Main application logic and image resizing functionality.
- `spec/`: configuration files for Jasmine and UNIT Testing.
- `.eslintignore`, `.eslintrc.json`, `.prettierrc.json`: Configuration files for code linting and formatting.
- `package.json`, `package-lock.json`: Dependencies and project configuration.
- `tsconfig.json`: TypeScript configuration file.

This structure helps keep the project modular and organized, making it easier to navigate and maintain.

---

### Notes

- Images are served from `assets/images/full`. Additional images can be placed in this directory, trying to add any file other than .jpg will result into an error and wont get uploaded.
- Resized images are stored in `assets/images/thumb`. Deleting images from this directory will cause them to be re-created on subsequent requests to the same endpoint.
- In the web app, The Filename box in the resize section is Case-sensitive, adding a space or a capital letter will result in an error.
