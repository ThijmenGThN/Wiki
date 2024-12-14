
# Wiki

An open-source wiki built with PayloadCMS as backend, based on [next-leaflet](https://github.com/ThijmenGThN/next-leaflet) (a template), easily deploy this yourself via the instructions below.

![preview](https://i.imgur.com/9tsGgDn.png)

### Powered by

- [NextJS](https://nextjs.org)
- [PayloadCMS](https://payloadcms.com)

## Getting Started

### Docker Compose

To start the wiki using Docker Compose, create a `docker-compose.yml` file with the following content:

```yaml
services:
    wiki:
        image: ghcr.io/thijmengthn/wiki:latest
        ports:
            - "3000:3000"
```

Then, run the following command to start the services:

```sh
docker-compose up -d
```

### PayloadCMS

To set up PayloadCMS, follow the instructions provided in the [PayloadCMS documentation](https://payloadcms.com/docs/getting-started/installation).

