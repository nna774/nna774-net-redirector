ACCOUNT_ID := 3bd3734ebcb844066c0cdb16327847b5
WORKER_NAME := nna774-net-redirector

all: deploy

build:
	npm run build

# NOTE: You can set those vriables in ~/.bashrc or ~/.zshrc like this:
#   export CLOUDFLARE_TOKEN=xxxx
credentials:
	$(eval $(if $(CLOUDFLARE_TOKEN),,$(error Please Specify CLOUDFLARE_TOKEN. You can create your API token at https://dash.cloudflare.com/profile/api-tokens. The permission should be 'Workers Scripts:Edit')))

deploy: build credentials
	curl -s \
		-X PUT "https://api.cloudflare.com/client/v4/accounts/$(ACCOUNT_ID)/workers/scripts/$(WORKER_NAME)" \
		-H "Content-Type: application/javascript" \
		-H "Authorization: Bearer $$CLOUDFLARE_TOKEN" \
		--data-binary @dist/worker.js
