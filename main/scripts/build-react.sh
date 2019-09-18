#!/usr/bin/env bash

echo Building React App

cd ../renderer
yarn build
echo Copying build...
rm -rf ../main/build
cp ./build ../main -r
cd ../main
