#!/bin/sh -x

rm -rf code.zip
zip -r --symlinks code.zip . -x '*.git*'
aws s3 cp --region us-east-1 code.zip s3://deploy.surrealdb.com/version-surrealdb-com.zip
aws lambda --region us-east-1 update-function-code --function-name version-surrealdb-com --s3-bucket deploy.surrealdb.com --s3-key version-surrealdb-com.zip && sleep 3
aws lambda --region us-east-1 update-function-configuration --function-name version-surrealdb-com --runtime nodejs20.x --handler index.main --timeout 5 --memory-size 128 && sleep 3
ARN=$(aws lambda --region us-east-1 publish-version --function-name version-surrealdb-com | jq -r ".FunctionArn")
rm -rf code.zip

aws cloudfront get-distribution --id E1GI33GIUVQC5Z > config.json
ETAG=$(jq -r '.ETag' config.json)
jq '.Distribution.DistributionConfig' config.json > temp.json && mv temp.json config.json
jq --arg ARN "$ARN" '.DefaultCacheBehavior.LambdaFunctionAssociations.Items = [.DefaultCacheBehavior.LambdaFunctionAssociations.Items[] | if (.EventType == "origin-request") then (.LambdaFunctionARN = $ARN) else . end]' config.json > temp.json && mv temp.json config.json
aws cloudfront update-distribution --id E1GI33GIUVQC5Z --if-match $ETAG --distribution-config file://config.json > /dev/null
rm -rf config.json
