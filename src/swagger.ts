const swaggerAutogen = require('swagger-autogen')();

import info from './docs/info'
const outputFile = './src/docs/swagger-output.json';
const endpointsFiles = ['./src/routes.ts'];

export default async function swagger() {
    swaggerAutogen(outputFile, endpointsFiles, info).then(async() => {
      await require('./index.ts');           // Your project's root file
    })
  
 }