# VoteAmerica Uptime Tracking

See active deployment of the dev branch at this link:
https://se-voteamerica-puptime.web.app/

# Add Users

To add yourself to the repository, open a Pull Request modifying `COLLABORATORS`, entering your GitHub username in a newline.

All Pull Requests must follow the Pull Request Template, with a title formatted like such `[Project Name]: <Descriptive Title>`

## Requirements

- [Documentations](https://drive.google.com/drive/folders/1owdnKXvx-FyYvALV9cWvn-TwQ8FGJoUA)
- [Web design](https://www.figma.com/file/yaOVkojOzh5EOd0u2C80xW/Vote-America?node-id=0%3A1)

## Archiecture

- Web-API: https://uptime.voteamerica.com/v1/uptime/sites/?limit=395
- frameworks: [vuejs](https://vuejs.org/)
- map: [mapbox](https://www.mapbox.com/maps)
- components: [bootstrapVue](https://bootstrap-vue.org/)
- deployment: [firebase](https://firebase.google.com/)

## Source code

- src/componens - components
- src/router - router
- src/views - views

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## MapBox set up

access token to MapBox should be configured as \${{ secrets.MAPBOX_TOKEN }}

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
