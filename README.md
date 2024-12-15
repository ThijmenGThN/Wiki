
# Wiki

An open-source wiki built ontop of [Payload](https://payloadcms.com), easily deploy this yourself via the instructions below.

<p align="center">
  <img src="https://i.imgur.com/MuuSWcV.png">
</p>



#### ⭐ Show Your Support for Open Source!

If this Wiki has been helpful to you and you appreciate the power of open-source software, please consider giving this repository a star.

[![Stargazers](https://reporoster.com/stars/dark/notext/ThijmenGThN/wiki)](https://github.com/ThijmenGThN/wiki/stargazers)



## Features

- **Creating pages and categories**

    Easily organize your content by adding pages within specific categories. This helps in maintaining a structured and easy-to-navigate wiki.

- **Admin Interface**

    Manage your entire wiki through a user-friendly admin interface. This includes creating, editing, and deleting pages, as well as organizing them into categories.

- **Whitelabeling**

    Customize the appearance of your wiki. The admin interface allows you to change the site name, set an about message, and disclaimer.



## Getting Started

### Prerequisites 

Docker and it's compose plugin are required, below is a matrix on how to install both for your system:

|Operating System|Official Instructions|
|-|-|
|Linux|[docs.docker.com/../linux-install](https://docs.docker.com/desktop/install/linux-install/)
|MacOS|[docs.docker.com/.../mac-install](https://docs.docker.com/desktop/install/mac-install/)
|Windows|[docs.docker.com/.../windows-install](https://docs.docker.com/desktop/install/windows-install/)


### Starting it up

To start this wiki, follow these steps:

1. **Create a `docker-compose.yml` file** in the root directory of your project with the following content:

```yml
services:

  wiki: 
    image: ghcr.io/thijmengthn/wiki:latest
    container_name: wiki
    restart: unless-stopped
    volumes:
      - ./database:/app/database
    ports:
      - 3000:3000
    environment:
      - PAYLOAD_SECRET=073c61eb3cb96b4c455b3242
```

2. **Run the following command** to start the wiki:

    ```sh
    docker compose up -d
    ```

This will start the wiki in detached mode. You can access it by navigating to `http://localhost:3000` in your web browser.



## ✨ This wiki is for everyone!

Whether you need help, want to pitch in, or found a bug that needs fixing, just [open an issue](https://github.com/ThijmenGThN/swaparr/issues). We're all ears and ready to collaborate with you!
