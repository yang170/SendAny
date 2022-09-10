proxy_server_version = latest
frontend_version = latest
backend_version = latest
frontend_container_name = docker_compose-frontend-1
backend_container_name = docker_compose-backend-1

clean:
	docker image prune -f
	docker rm $(docker ps --filter status=exited -q)

f: # build frontend
	cd frontend && npm run build

bi: # build backend image
	docker build -t backend:$(backend_version) . -f conf/dockerfiles/Dockerfile.backend

fi: f # build frontend image
	docker build -t frontend:$(frontend_version) . -f conf/dockerfiles/Dockerfile.frontend

fid: # build frontend image for dev
	docker build -t frontend-dev:$(frontend_version) . -f conf/dockerfiles/Dockerfile.frontend-dev

fid-shell:
	docker exec -it $(frontend_container_name) bash

bi-shell:
	docker exec -it $(backend_container_name) bash

du: # bring dev containers up
	docker compose -f conf/docker_compose/docker-compose-local.yml up -d

dd: # bring dev containers down
	docker compose -f conf/docker_compose/docker-compose-local.yml down
