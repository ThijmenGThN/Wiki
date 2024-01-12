
# next-leaflet

An optimized tech stack for efficiency, an all-in-one solution to quickly build modern web apps.

![preview](https://i.imgur.com/oulW1VO.png)



### Powered by

- [NextJS](https://nextjs.org)
- [Pocketbase](https://pocketbase.io)



### Features

- [Realtime Database](https://pocketbase.io)
- [Authentication](https://pocketbase.io/docs/authentication/)
- [File Storage](https://pocketbase.io/docs/files-handling/)
- [Localization](https://next-intl-docs.vercel.app)



### Includes

- [Tailwind](https://tailwindcss.com)
- [Gravatar](https://gravatar.com)
- [Heroicons](https://heroicons.com)
- [HeadlessUI](https://headlessui.com)



## Getting Started

<details><summary>Development</summary>

### Dependencies

- Install docker and docker compose.
    
    - Windows: [Docker Desktop](https://www.docker.com/get-started/)
    - Linux: [Guide from Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04)
    - Ubuntu >20.04: [Guide from Thijmen Heuvelink](https://wiki.thijmenheuvelink.nl/linux/install-docker)

### Development

> Ensure that you've [cloned](https://git-scm.com/docs/git-clone) the repository and are on the correct path. 

#### Start

``` docker compose up ```

The stack is now accessible on your preferred browser at http://localhost:3000, the pocketbase interface can be found at http://localhost:3000/pb/_/

#### Stop

To stop the stack from running simply execute the ` CTRL + C ` shortcut.

</details>



<details><summary>Production</summary>

### Preparation

1. Create a ` .env ` file:
   - Locate the ` .env.sample ` file in your project directory.
   - Duplicate or copy the contents of this file.
   - Rename the duplicate or copied file to ` .env `. 

2. Configure the environment variable:
   - Open the ` .env ` file in a text editor.
   - Locate the line that defines the ` PRODUCTION ` variable.
   - Set the value of ` PRODUCTION ` to ` "true" ` (include the quotes).

### Production

#### Start

> Unlike in the development steps we now add the  ` -d ` flag which makes the service run in the background.

``` docker compose up -d ```

The stack is now accessible on your preferred browser at http://localhost:3000 or on a differently defined port as stated in the `.env` file, the pocketbase interface can be found at http://localhost:3000/pb/_/



#### Stop

``` docker compose down ```

</details>



## Fundamentals

<details><summary>Install Node Packages</summary>

#### Install

``` docker compose exec next npm i -D <package> ```

#### Remove

``` docker compose exec next npm r <package> ```

</details>

> ` NPM ` ` MODULES `


<details><summary>Next Navigation API</summary>

Instead of using `next/navigation` you should opt for the helper at ` @helpers/navigation `, this is a replacement required by ` next-intl ` it offers the same functionality.

</details>

> ` Link ` ` useRouter ` ` Redirect ` ` usePathname `


<details><summary>Accessing Pocketbase</summary>

Pocketbase has a client executable, below is an example that outputs all available commands. You can learn more on how to use it [here](https://pocketbase.io/docs).

``` docker compose exec pocketbase pocketbase --help ```

</details>

> ` CLI `


<details><summary>Schema Snapshots</summary>

Executing the following will generate a schema snapshot in ` src/backend/migrations `, note that this process does not save any collection data.

``` docker compose exec pocketbase pocketbase migrate collections ```

</details>

> ` Pocketbase ` ` Migrations `



## Extras

<details><summary>Continuous Integration</summary>

### Preparation

> The workflow has been set up to connect to any VPS via SSH as defined in the Repository Secrets.

1. Install docker and docker compose on your VPS.
    
    - Windows: [Docker Desktop](https://www.docker.com/get-started/)
    - Linux: [Guide from Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04)
    - Ubuntu >20.04: [Guide from Thijmen Heuvelink](https://wiki.thijmenheuvelink.nl/linux/install-docker)

2. Setup a Runner on GitHub

    1. Create a new Runner
    
        - Navigate to ` Settings > Actions > Runners `

            > To set up a new self-hosted runner, follow the instructions provided by GitHub to configure the runner to listen for jobs. It is advisable to install it as a service.

    2. Define environment variables
    
        - Navigate and create new secrets in `Settings > Secrets and variables > Actions`

            Name|Expects|Description
            -|-|-
            SSH_KEY|Private Key|Generated private ssh-key which will beused    to access the VPS.
            SSH_HOST|IP Address|The address of your VPS that runs theGitHub    Actions Runner.
            SSH_USER|Username|System user which should be utilized for deployments.
            SSH_PORT|Port Number|The port that will be used to connectwith     the VPS, default is 22.
            APP_ENV|Environment|Contents of the ` .env ` file withadjusted     values for deployment.

### Activation

Define the branch in `.github/deploy.yml` and modify it from being ` disabled ` to an existing branch. Any modifications made to that particular branch will automatically trigger the Action, deploying your stack to your VPS.

</details>