# The API Server for thehorizon.blue
To install the required dependencies
```bash
cd thehorizon.blue/server
# it's better to install package locally instead of globally.
# in order to do so, first install virtualenv
pip3 install virtualenv  # use sudo if you encounter permission issue
virtualenv serverenv

# to activate the virtual environment
source serverenv/bin/activate

# from now on, we can use pip and python instead of pip3 and python3,
# since they are the defaults in our serverenv

# install the required dependencies
pip install -r requirement.txt
```

# To run the server
```bash
# while you are still in activated status
python wsgi.py
```
Then you can see the server running at http://localhost:2333/


# After you are done
```bash
# Export newly install dependencies, if there is any
pip freeze > requirement.txt

# deactivate the virtual environment
deactivate
```
