import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getSubastas(event, context) {
    let subastas;
    try {
        const resultado = await dynamodb.scan({
            TableName: process.env.SUBASTA_TABLE_NAME
            }).promise();
        
        subastas = resultado.Items;
        
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
        
    }
  
    return {
    statusCode: 200,
    body: JSON.stringify(subastas),
  };
}

export const handler = middy(getSubastas)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());


