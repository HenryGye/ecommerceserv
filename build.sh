git pull origin develop
git add .
git commit -m "build"
git push origin develop

export SHORT_COMMIT=$(git log -1 --pretty="%H" | cut -b -8)
export DOCKER_IMAGE_VERSION="prod_${SHORT_COMMIT}"

docker login -u "intelnexoec" -p "dckr_pat_EY2hedAJR91hc9Vn9Hx6-qVpgg0"

docker build -t intelnexoec/xtrim-ecommerce-web:${DOCKER_IMAGE_VERSION} -f Dockerfile .
docker tag intelnexoec/xtrim-ecommerce-web:${DOCKER_IMAGE_VERSION} intelnexoec/xtrim-ecommerce-web:latest
docker push intelnexoec/xtrim-ecommerce-web:${DOCKER_IMAGE_VERSION}
docker push intelnexoec/xtrim-ecommerce-web:latest
echo "tag: ${DOCKER_IMAGE_VERSION}"
