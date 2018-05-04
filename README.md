# thehorizon.blue [![Build Status](https://travis-ci.com/Horizon-Blue/thehorizon.blue.svg?token=XV3X1fzXRsddUMeHcBWZ&branch=master)](https://travis-ci.com/Horizon-Blue/thehorizon.blue)

![ICON](./icon.png)

## I have done major upgrade to my blog and decide to open a [new repository](https://github.com/Horizon-Blue/tracing) instead of maintaining this old one.

Yet another personal blog.

The Makefile has already taken care of everything, to run the dev server && client, simply run the following scripts... They will automatically setup && install dependencies when necessary.

```bash
make server

make client  # this will connect client to https://api.thehorizon.blue

# to test client on dev-server, run the following
make client-test # this will connect client to http://localhost:2333
```

The dev client will be hosted on [http://localhost:3000/](http://localhost:3000/), and the dev server will be hosted on [http://localhost:2333/](http://localhost:2333/).

To install packages for client, simply run the regular `npm install <package_name>` command. For server, to install package under python virtualenv, run `make install-<package_name>`, which will in term install the package using pip from virtualenv, and will call pip freeze from within virtualenv to save the package. For example:

```bash
# To install Flask
make install-Flask

# Similarly, to uninstall Flask
make uninstall-Flask
```
