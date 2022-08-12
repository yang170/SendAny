proxy_server_version = latest
frontend_version = latest
backend_version = latest

f: # build frontend
	cd frontend && npm run build

bi: # build backend image
	docker build -t backend:$(backend_version) . -f conf/dockerfiles/Dockerfile.backend

fi: f # build frontend image
	docker build -t frontend:$(frontend_version) . -f conf/dockerfiles/Dockerfile.frontend

tu: bi fi # bring test containers up
	docker compose -f conf/docker_compose/docker-compose-local.yml up

td: # bring test containers down
	docker compose -f conf/docker_compose/docker-compose-local.yml down
 