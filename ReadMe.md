# M7011E Dynamic Web Project
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/maxluetkemeyer/m7011e/docker-image.yml)

![Porject Screenshot](https://github.com/maxluetkemeyer/m7011e/blob/main/.github/banner.png)


## Try it out!
We have a version of our project running publicly:

[https://m7011e.maxlu.cloud/](https://m7011e.maxlu.cloud/)

## Development setup
- Clone the repository [https://github.com/maxluetkemeyer/m7011e](https://github.com/maxluetkemeyer/m7011e)
- Install Visual Studio Code as your code editor
- Install Docker
- Open the folder with VSCode
- The project contains configuration files for a Docker devlopment container (.devcontainer)
- VSCode should prompt you with a message to open the project in the DevContainer
- If not, you can start the DevContainer with the command: "Dev Containers: Open Folder In Container..." (Press Ctrl+Shift+P)
- Inside the container switch to another Node Version
```bash
nvm use 23.1.0
```

- Generate the Database Client for the ORM Prisma
```bash
npx prisma generate
```

- Edit the .env like described in the .env.example file
  - Change google configuration
  - Decide, whether the auth routes should be included in the normal app server

- Place your service_account_key.json from your Google Cloud project in the folder "private/service_account_key.json"

- Start the dev runtime
```bash
npm run dev
```

- If you do Database changes, update the ORM
```bash
npx prisma db pull
npx prisma generate
```


## Installation
- Install Docker and Docker Compose
- Adjust the compose.yml file
  - Edit the .env file with your value. An example can be found in .env.example
  - Adjust the locations for your SSL certificates at the proxy service
  - Place your service_account_key.json from your Google Cloud project in the folder "private/service_account_key.json"
- Start the Docker composition
```bash
docker compose up --build -d
```
- Watch the Docker Logs
```bash
docker compose logs --follow
```

## Usage
- Basic Account when run the first time:
  - email: mail@invalid
  - password: hello123


## Testing
- Run Unit tests
```bash
npm test
```

- Get test coverage
```bash
npx jest --coverage
```

## Background information
- https://expressjs.com/en/starter/hello-world.html
- https://handlebarsjs.com/guide/#what-is-handlebars
- https://blog.shoebpatel.com/2021/01/23/The-Secret-Parameter-LFR-and-Potential-RCE-in-NodeJS-Apps/
- https://github.com/prisma/prisma-examples/tree/latest/orm/rest-express
- https://jwt.io/introduction
- https://www.npmjs.com/package/jose
- https://stackoverflow.com/questions/10966689/set-client-side-accessible-cookie-in-express
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
- https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
- https://cloud.google.com/nodejs/docs/reference/storage/latest
- https://googleapis.dev/nodejs/storage/latest/
- https://nodejs.org/en/learn/test-runner/introduction
- https://jestjs.io/
- https://www.npmjs.com/package/otpauth
