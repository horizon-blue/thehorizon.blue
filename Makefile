# Some useful scripts to setup server && client
# For HorizonBlue's thehorizon.blue site

# defining some color for showing in the terminal
RED = \033[0;31m
GREEN = \033[0;32m
BLUE = \033[0;34m
CYAN = \033[0;36m
NC = \033[0m

.PHONY: server serverenv done freeze client build dependencies

# flask-related operations
serverenv: server/serverenv/bin/activate

# Only perform this update when requirements are changed
server/serverenv/bin/activate: server/requirements.txt
	@test -d server/serverenv || (echo "${RED}No virtual environment found in server/serverenv, initializing a new one...${NC}" && virtualenv server/serverenv && echo "${GREEN}Done.${NC}") || (pip3 install virtualenv && virtualenv server/serverenv && echo "${GREEN}Done.${NC}")
	@echo "${CYAN}Installing required packages from ${BLUE}requirements.txt${CYAN}...${NC}"
	server/serverenv/bin/pip install -r server/requirements.txt
	@touch server/serverenv/bin/activate
	@echo "${GREEN}Done.${NC}"

server: serverenv
	@echo "${CYAN}Starting the server...${NC}"
	@server/serverenv/bin/python server/server.py

install-%:
	@echo "${CYAN}pip install ${BLUE}$(@:install-%=%)${NC}"
	@server/serverenv/bin/pip install $(@:install-%=%)
	@server/serverenv/bin/pip freeze > server/requirements.txt

uninstall-%:
	@echo "${CYAN}pip uninstall ${BLUE}$(@:uninstall-%=%)${NC}"
	@server/serverenv/bin/pip uninstall $(@:uninstall-%=%)
	@server/serverenv/bin/pip freeze > server/requirements.txt

freeze:
	@echo "${CYAN}Saving installed packages to ${BLUE}requirements.txt${CYAN}...${NC}"
	server/serverenv/bin/pip freeze > server/requirements.txt
	@echo "${GREEN}Done.${NC}"

# express-related operations.. kind of unnecessary because of the npm commands are simple enough
client: backup/index.html
	@echo "${CYAN}Starting the client...${NC}"
	@npm run start

# connects to dev-server
client-test: backup/index.html
	@echo "${CYAN}Starting the client...${NC}"
	@npm run start test

# a meaningless file to track the update of package.json
backup/index.html: package.json
	@echo "${CYAN}Installing dependencies...${NC}"
	npm install
	@touch backup/index.html
	@echo "${GREEN}Done.${NC}"

install:
	npm install && cd patch && ./applyPatch.sh && cd ..


