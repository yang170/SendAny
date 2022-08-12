# Run Configs

Run configs from the project root folder

- Set context to `.` when using `docker/build-push-action`

  ```
  - name: Build and push Docker image
    uses: docker/build-push-action@ad44023a93711e3deb337508980b4b5e9bcdc5dc
    with:
      context: .
      file: ./conf/dockerfiles/Dockerfile.frontend
      push: true
      tags: ${{ steps.meta.outputs.tags }}
      labels: ${{ steps.meta.outputs.labels }}
  ```

# Environment

`docker-compose-deploy.yml` requires the following environment variable in the host machine

```
export DB_PASSWORD=[your_val]
export DB_ROOT_PASSWORD=[your_val]
export DB_USERNAME=[your_val]
export DB_DATABASE=[your_val]
export FULL_CHAIN_PATH=[your_val]
export PRIV_KEY_PATH=[your_val]
```
