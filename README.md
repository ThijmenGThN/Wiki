
# Wiki

An open-source wiki built with Pocketbase as backend, based on [next-leaflet](https://github.com/ThijmenGThN/next-leaflet) (a template), easily deploy this yourself via the instructions below.

![preview](https://i.imgur.com/9tsGgDn.png)

### Powered by

- [NextJS](https://nextjs.org)
- [Pocketbase](https://pocketbase.io)

## Development

<details><summary>Instructions</summary>

1. Install the required dependencies:
    - [NodeJS](https://nodejs.org)
    - [Docker](https://docker.com/get-started/)

2. Clone the repository to your system. 

    1.
        ```sh 
        git clone https://github.com/ThijmenGThN/Wiki
        ```

    2. 
        ```sh
        cd Wiki
        ```

3. Preparing the environment, it is recommend to use the sample file.

    1. 
        ```sh
        cp sample.env .env
        ```

    2.
        ```sh
        nano .env
        ```

4. Install the required packages, by default we do this with npm.

    ```
    npm install
    ```

5. Running Next.js for development.

    ```sh
    npm run dev
    ```

6. Starting pocketbase via docker.

    ```sh
    docker-compose up
    ```
    > Pocketbase can later be closed via `CTRL + C`

</details>

## Deployment

<details><summary>Instructions</summary>

1. Install the required dependencies:
    - [Docker](https://docker.com/get-started/)

2. Clone the repository to your system. 

    1.
        ```sh 
        git clone https://github.com/ThijmenGThN/Wiki
        ```

    2. 
        ```sh
        cd Wiki
        ```

3. Preparing the environment, it is recommend to use the sample file.

    1. 
        ```sh
        cp sample.env .env
        ```

    2.
        ```sh
        nano .env
        ```

4. Deploying your app with docker.

    ```sh
    docker-compose up -d
    ```
    > To stop your app from running, execute the following: `docker compose down`

</details>


### Deployment - GitHub Actions

<details><summary>Instructions</summary>

> **IMPORTANT** The CI/CD workflow for next-leaflet has been setup in a way where it'll connect to any VPS via SSH as defined in the Repository Secrets.

1. Prepare your VPS.

    1. Install the required dependencies:

        - [Docker](https://docker.com/get-started/)

2. Configure your runner.

    1. Within Github navigate to 
        
        ` Settings > Secrets and variables > Actions `

    2. Create the following repository secrets:

        Name|Expects|Description
        -|-|-
        SSH_KEY|Private Key|Generate a new ssh key without a password.
        SSH_HOST|IP Address|The address of your server with an Actions (runner) active.
        SSH_USER|Username|Host system user where next-leaflet should be deploy on.
        SSH_PORT|Port Number|This usually refers to the default ssh port 22.
        APP_ENV|Environment|A copy of .env.sample with adjusted values for deployment.

3. Enable the workflow.

    1. Designate a trigger branch within the ` .github/deploy.yml ` file.

        > Any change pushed to the targeted branch should now trigger a request to deploy next-leaflet via docker-compose on the designated VPS.


</details>
