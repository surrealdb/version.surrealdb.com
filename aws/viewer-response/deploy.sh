#!/bin/sh -x

aws --profile surreal cloudfront describe-function --name version-surrealdb-com-viewer-response > temp.json
ETAG=$(jq -r '.ETag' temp.json)
aws --profile surreal cloudfront update-function --name version-surrealdb-com-viewer-response --function-code fileb://index.js --function-config Comment="",Runtime="cloudfront-js-1.0" --if-match $ETAG > temp.json
ETAG=$(jq -r '.ETag' temp.json)
aws --profile surreal cloudfront publish-function --name version-surrealdb-com-viewer-response --if-match $ETAG > temp.json
rm -rf temp.json
