import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';
import PersonajeBuilder from '../_models/PersonajeBuilder'
import Personaje from '../_models/Personaje'

const dynamodb = new AWS.DynamoDB.DocumentClient();
const swapi = require('swapi-node');
const max = 77; const min = 1;

async function crearSubasta(event, context) {

  // recuperación de un personaje random de star wars
  let randomInt = Math.floor(Math.random() * (max - min) + min);  
  swapi.getPerson(randomInt).then((result) => {
      console.log(result);
      // creamos objeto PersonajeBuilder
      const personajeBuilder = new PersonajeBuilder();
      personajeBuilder.setNombre = result.name;
      personajeBuilder.setAltura = result.height;
      personajeBuilder.setPeso = result.mass;
      personajeBuilder.setColor_cabello = result.hair_color;
      personajeBuilder.setColor_piel = result.skin_color;
      personajeBuilder.setColor_ojos = result.eye_color;
      personajeBuilder.setAnio_nacimiento = result.birth_year;
      personajeBuilder.setGenero = result.gender;
      personajeBuilder.setPlaneta = result.homeworld;
      personajeBuilder.setPeliculas = result.films;
      personajeBuilder.setEspecies = result.species;
      personajeBuilder.setVehiculos = result.vehicles;
      personajeBuilder.setNaves_estelares = result.starships;
      personajeBuilder.setFecha_creacion = result.created;
      personajeBuilder.setFecha_edicion = result.edited;
      personajeBuilder.setUrl = result.url;

      const personaje = new Personaje(personajeBuilder);
      event.body = personaje;
  });

  const {personaje_funko} = event.body;
  const now = new Date();

  // creamos el objeto subasta de un muñeco de un personaje de Star Wars
  const subasta = {
    id: uuid(),
    personaje_funko,
    estado: 'ABIERTO',
    horaCreacion: now.toISOString(),
  }

  try {
    // persistencia
    await dynamodb.put({
      TableName: process.env.SUBASTA_TABLE_NAME,
      Item: subasta,
    }).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  
  return {
    statusCode: 201,
    body: JSON.stringify(subasta),
  };
}

export const handler = middy(crearSubasta)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());


