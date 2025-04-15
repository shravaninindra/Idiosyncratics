VERSION=v3
DOCKERUSER=viprabha

#
# You should probably update the docker.io user if you update this
#

build:
	docker build -f Dockerfile -t logs  .
push:
	docker tag logs  $(DOCKERUSER)/sentiment-logs:$(VERSION)
	docker push $(DOCKERUSER)/sentiment-logs:$(VERSION)