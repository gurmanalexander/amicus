#!/usr/bin/env bash
readonly currentDir=$(cd $(dirname $0); pwd)

VERSION=$(node -p "require('./package.json').version")
#NEW_VERSION=${VERSION}

IFS='.' read -ra ADDR <<< "${VERSION}"
INDEX=1
for i in "${ADDR[@]}"; do
    if [ ${INDEX} = 3 ]
    then
        NEW_VERSION=${NEW_VERSION}$(( $i + 1 ))
    else
        NEW_VERSION=${NEW_VERSION}${i}.
    fi
    INDEX=$(( $INDEX + 1 ))
done

perl -p -i -e "s/\"version\"\:\ {0,1}\"${VERSION}\"/\"version\"\: \"${NEW_VERSION}\"/g" $(grep -ril ${VERSION} ./package.json) < /dev/null 2> /dev/null

PACKAGES=(core
  auth
  broadcasting
  support)

PWD=`pwd`
ROOT=${PWD}
#ROOT_DIR=${PWD}/packages
#ROOT_OUT_DIR=${PWD}/dist/packages
ROOT_DIR=packages
ROOT_OUT_DIR=dist/packages
rm -Rf ${ROOT_OUT_DIR}

for PACKAGE in ${PACKAGES[@]}
do
  SRC_DIR=${ROOT_DIR}/amicus/${PACKAGE}
  OUT_DIR=${ROOT_OUT_DIR}/${PACKAGE}
  NPM_DIR=${PWD}/dist/packages-dist/${PACKAGE}
  MODULES_DIR=${NPM_DIR}/@amicus

  cd ${ROOT}

  mkdir -p ${ROOT_OUT_DIR}

  cp -rf ${SRC_DIR} ${OUT_DIR}
#  rsync -a ${OUT_DIR}/ ${NPM_DIR}

  echo "======        Copy ${PACKAGE}"
#  echo "======        Copy ${PACKAGE} package.json"
#  rsync -am --include="package.json" --include="*/" --exclude=* ${SRC_DIR}/ ${NPM_DIR}/

#  cp ${ROOT_DIR}/README.md ${NPM_DIR}/

  if [[ -d ${OUT_DIR} ]]; then
    (
      echo "======        VERSION: Updating version references"
      cd ${ROOT}/${OUT_DIR}
      echo "======        EXECUTE: perl -p -i -e \"s/0\.0\.0\-PLACEHOLDER/${NEW_VERSION}/g\" $""(grep -ril 0\.0\.0\-PLACEHOLDER .)"
      perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${NEW_VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
      cd ${ROOT}/${OUT_DIR} && npm publish --access public
    )
  fi

  echo "build package: ${PACKAGE}"


done