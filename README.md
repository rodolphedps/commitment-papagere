The project's structure is based on [**react-redux-boilerplate**](https://github.com/flexdinesh/react-redux-boilerplate).


## Quick start

1. Clone this repo using `git clone https://github.com/OyoKooN/Papagere-Front.git`
2. Move to the appropriate directory: `cd Papagere-Front`.
3. Run `yarn` to install dependencies.
4. Run `yarn start` to start the development mode at `http://localhost:3000`.

## Usefull commands

* Run `yarn storybook` to start storybook at `http://localhost:6006`.
* Run `yarn lint` to lint sources.


## Deployment
1. Make sure you have correctly set up the [**aws cli**](https://gist.github.com/bradwestfall/b5b0e450015dbc9b4e56e5f398df48ff#deployment). Ask Nathan to grant you an AWS key.
2. Run `yarn deploy:<staging/prod>` to deploy the current sources on [**staging**](https://app-staging.papagere.fr) or [**prod**](https://app.papagere.fr).

`yarn deploy:<target>` is a shortcut. Underneath the following commands are executed:
1. `yarn build:<target>` which build the app using the specified environment webpack configuration (staging or prod).
2. `yarn aws:s3:upload-<target>` which upload the builded to amazon s3.
3. `yarn aws:cloudfront:invalidate-<target>` which invalidate all cloudfront caches in order to make the app directly available to the world.
