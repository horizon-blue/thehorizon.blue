# thehorizon.blue
![ICON](./icon.png)

Yet another personal blog.

The Makefile has already taken care of everything, to run the dev server && client, simply run `make server` and `make client`, it will automatically setup && install dependencies when necessary.

The dev client will be hosted on [http://localhost:3000/](http://localhost:3000/), and the dev server will be hosted on [http://localhost:2333/](http://localhost:2333/).

To install packages for client, simply run the regular `npm install <package_name>` command. For server, to install package under python virtualenv, run `make install-<package_name>`, which will in term install the package using pip from virtualenv, and will call pip freeze from within virtualenv to save the package. For example:
```bash
# To install Flask
make install-Flask

# Similarly, to uninstall Flask
make uninstall-Flask
```
