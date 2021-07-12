"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SantanderServerlessStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apigateway = require("@aws-cdk/aws-apigateway");
class SantanderServerlessStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        const lambdaSanTecCreateUser = new lambda.Function(this, 'lambdaSanTecCreateUser', {
            functionName: "DEV_SANTEC_CREATE_USER",
            code: new lambda.AssetCode('assets/lambdas/createUser'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            environment: {
                ENV: 'DEV'
            }
        });
        const lambdaSanTecGetUser = new lambda.Function(this, 'lambdaSanTecGetUser', {
            functionName: "DEV_SANTEC_GET_USER",
            code: new lambda.AssetCode('assets/lambdas/getUser'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            environment: {
                ENV: 'DEV'
            }
        });
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
        const resourceUser = this.api.root.addResource('users');
        const methodGetUser = new apigateway.LambdaIntegration(lambdaSanTecGetUser, { requestTemplates: { "application/json": '{ "statusCode": "200" }' } });
        resourceUser.addMethod('GET', methodGetUser);
        const methodCreateUser = new apigateway.LambdaIntegration(lambdaSanTecCreateUser, { requestTemplates: { "application/json": '{ "statusCode": "200" }' } });
        resourceUser.addMethod('POST', methodCreateUser);
    }
}
exports.SantanderServerlessStack = SantanderServerlessStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FudGFuZGVyX3NlcnZlcmxlc3Mtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYW50YW5kZXJfc2VydmVybGVzcy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsOENBQThDO0FBQzlDLHNEQUF1RDtBQUd2RCxNQUFhLHdCQUF5QixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBR3JELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBQzdDLE1BQU0sc0JBQXNCLEdBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNoRixZQUFZLEVBQUMsd0JBQXdCO1lBQ3JDLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUM7WUFDdkQsT0FBTyxFQUFFLGVBQWU7WUFDeEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxXQUFXLEVBQUU7Z0JBQ1gsR0FBRyxFQUFFLEtBQUs7YUFDWDtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sbUJBQW1CLEdBQUUsSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUMzRSxZQUFZLEVBQUMscUJBQXFCO1lBQ2xDLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUM7WUFDcEQsT0FBTyxFQUFFLGVBQWU7WUFDeEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxXQUFXLEVBQUU7Z0JBQ1gsR0FBRyxFQUFFLEtBQUs7YUFDWDtTQUNGLENBQUMsQ0FBQTtRQUdGLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDbkQsV0FBVyxFQUFFLGlCQUFpQjtZQUU5QixXQUFXLEVBQUUscUNBQXFDO1lBQ2xELGFBQWEsRUFBRTtnQkFDYixZQUFZLEVBQUUsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLElBQUk7YUFDdkI7WUFDRCwyQkFBMkIsRUFBRTtnQkFDM0IsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDekMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLDJCQUEyQjthQUN0RTtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxNQUFNLGFBQWEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FDbEQsbUJBQW1CLEVBQ25CLEVBQUMsZ0JBQWdCLEVBQUUsRUFBQyxrQkFBa0IsRUFBRSx5QkFBeUIsRUFBQyxFQUFDLENBQ3RFLENBQUM7UUFDRixZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU3QyxNQUFNLGdCQUFnQixHQUFHLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUNyRCxzQkFBc0IsRUFDdEIsRUFBQyxnQkFBZ0IsRUFBRSxFQUFDLGtCQUFrQixFQUFFLHlCQUF5QixFQUFDLEVBQUMsQ0FDdEUsQ0FBQztRQUNGLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFFbkQsQ0FBQztDQUNGO0FBeERELDREQXdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IGFwaWdhdGV3YXkgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheScpO1xuaW1wb3J0IHtBUElHYXRld2F5fSBmcm9tIFwiYXdzLXNka1wiO1xuXG5leHBvcnQgY2xhc3MgU2FudGFuZGVyU2VydmVybGVzc1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgcHVibGljIGFwaTogYXBpZ2F0ZXdheS5SZXN0QXBpO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcbiAgICBjb25zdCBsYW1iZGFTYW5UZWNDcmVhdGVVc2VyPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdsYW1iZGFTYW5UZWNDcmVhdGVVc2VyJywge1xuICAgICAgZnVuY3Rpb25OYW1lOlwiREVWX1NBTlRFQ19DUkVBVEVfVVNFUlwiLFxuICAgICAgY29kZTogbmV3IGxhbWJkYS5Bc3NldENvZGUoJ2Fzc2V0cy9sYW1iZGFzL2NyZWF0ZVVzZXInKSxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgRU5WOiAnREVWJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBsYW1iZGFTYW5UZWNHZXRVc2VyPSBuZXcgIGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnbGFtYmRhU2FuVGVjR2V0VXNlcicsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTpcIkRFVl9TQU5URUNfR0VUX1VTRVJcIixcbiAgICAgIGNvZGU6IG5ldyBsYW1iZGEuQXNzZXRDb2RlKCdhc3NldHMvbGFtYmRhcy9nZXRVc2VyJyksXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEVOVjogJ0RFVidcbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgICB0aGlzLmFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgJ3NhbnRlY0FwaScsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiAnU2FuVGVjIEFQSSBSRVNUJyxcblxuICAgICAgZGVzY3JpcHRpb246ICdBUEkgUkVTVCBJbnRybyBBV1MgU2VydmVybGVzcyB5IElBQycsXG4gICAgICBkZXBsb3lPcHRpb25zOiB7XG4gICAgICAgIGxvZ2dpbmdMZXZlbDogYXBpZ2F0ZXdheS5NZXRob2RMb2dnaW5nTGV2ZWwuSU5GTyxcbiAgICAgICAgZGF0YVRyYWNlRW5hYmxlZDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWdhdGV3YXkuQ29ycy5BTExfT1JJR0lOUyxcbiAgICAgICAgYWxsb3dNZXRob2RzOiBhcGlnYXRld2F5LkNvcnMuQUxMX01FVEhPRFMgLy8gdGhpcyBpcyBhbHNvIHRoZSBkZWZhdWx0XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzb3VyY2VVc2VyPSB0aGlzLmFwaS5yb290LmFkZFJlc291cmNlKCd1c2VycycpO1xuICAgIGNvbnN0IG1ldGhvZEdldFVzZXIgPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihcbiAgICAgICAgbGFtYmRhU2FuVGVjR2V0VXNlcixcbiAgICAgICAge3JlcXVlc3RUZW1wbGF0ZXM6IHtcImFwcGxpY2F0aW9uL2pzb25cIjogJ3sgXCJzdGF0dXNDb2RlXCI6IFwiMjAwXCIgfSd9fVxuICAgICk7XG4gICAgcmVzb3VyY2VVc2VyLmFkZE1ldGhvZCgnR0VUJywgbWV0aG9kR2V0VXNlcik7XG5cbiAgICBjb25zdCBtZXRob2RDcmVhdGVVc2VyID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oXG4gICAgICAgIGxhbWJkYVNhblRlY0NyZWF0ZVVzZXIsXG4gICAgICAgIHtyZXF1ZXN0VGVtcGxhdGVzOiB7XCJhcHBsaWNhdGlvbi9qc29uXCI6ICd7IFwic3RhdHVzQ29kZVwiOiBcIjIwMFwiIH0nfX1cbiAgICApO1xuICAgIHJlc291cmNlVXNlci5hZGRNZXRob2QoJ1BPU1QnLCBtZXRob2RDcmVhdGVVc2VyKTtcblxuICB9XG59XG4iXX0=