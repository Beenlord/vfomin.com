# Wedding

https://wedding.vfomin.com/

## Docker: Build & Push

```sh
docker buildx build --push -t vovikko/wedding.vfomin.com:latest .
```

## Docker: deploy

```yml
services:
    nuxt-app:
        image: vovikko/wedding.vfomin.com:latest
        container_name: wedding.vfomin.com
        ports:
            - '1308:3000'
        environment:
            NODE_ENV: production
        restart: unless-stopped
```

```sh
docker compose up -d --pull always
```

## TODO

1. ✔ Welcome
2. ✔ Calendar
3. Schedule
4. Placement
5. Form
6. Contacts
7. Footer

1. Пластинка
2. Песня
3. ✔ Анимация
