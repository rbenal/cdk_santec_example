import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda";
import apigateway = require('@aws-cdk/aws-apigateway');
import {APIGateway} from "aws-sdk";

export class SantanderServerlessStack extends cdk.Stack {
  public api: apigateway.RestApi;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const lambdaSanTecCreateUser= new lambda.Function(this, 'lambdaSanTecCreateUser', {
      functionName:"DEV_SANTEC_CREATE_USER",
      code: new lambda.AssetCode('assets/lambdas/createUser'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {
        ENV: 'DEV'
      }
    })

    const lambdaSanTecGetUser= new  lambda.Function(this, 'lambdaSanTecGetUser', {
      functionName:"DEV_SANTEC_GET_USER",
      code: new lambda.AssetCode('assets/lambdas/getUser'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {
        ENV: 'DEV'
      }
    })


    this.api = new apigateway.RestApi(this, 'santecApi', {
      restApiName: 'SanTec API REST',
      description: 'API REST Intro AWS Serverless y IAC',
      deployOptions: {
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS // this is also the default
      },
    });

    const resourceUser= this.api.root.addResource('users');
    const methodGetUser = new apigateway.LambdaIntegration(
        lambdaSanTecGetUser,
        {requestTemplates: {"application/json": '{ "statusCode": "200" }'}}
    );
    resourceUser.addMethod('GET', methodGetUser);

    const methodCreateUser = new apigateway.LambdaIntegration(
        lambdaSanTecCreateUser,
        {requestTemplates: {"application/json": '{ "statusCode": "200" }'}}
    );
    resourceUser.addMethod('POST', methodCreateUser);

  }
}
