# Table Distribution

Small tool to divide people into groups over multiple unique rounds.

## API Keys

You will have to add 3 files, 2 are called `/src/environments/environment(.prod).ts` with the necessary api keys and should look like this:

```
export const environment = {
  production: true,
  backendurl: "https://<URL>:<SERVER_PORT>/<API_PATH>"
};
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The frontend will automatically reload if you change any of the source files.

## Build & Deploy

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Github Pages

When building for Github Pages you should build with add: `--base-href "https://USERNAME.github.io/REPOSITORY_NAME/"`. Next, duplicate the `index.html` file and name it `404.html `.

To publish it, remove `/dist` from `.gitignore`, make a local commit and push to the gh-pages branch with:

```
$ git push origin `git subtree split --prefix dist master`:gh-pages --force
```

Lastly undo the edit in `.gitignore` and reset your master branch with `git reset HEAD~`.
Don't forget to re-enable your custom domain if you are using one.

[More Info](http://clontz.org/blog/2014/05/08/git-subtree-push-for-deployment/)

### Automated deploy

The script `deploy.sh` should do all the above actions automatically. Just make sure you change the domainname in the script. You should have completed the process manually first before you use the script.

[More Info](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
