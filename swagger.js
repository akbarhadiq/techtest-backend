const swaggerAutogen = require("swagger-autogen")({openapi:"3.0.0"})
const doc = {
    info: {
      title: 'Books API',
      description: 'Description'
    },
    host: process.env.HOST,
    components: {
      securitySchemes:{
          bearerAuth: {
              type: 'http',
              scheme: 'bearer'
          }
      }
    }
  };
  
  const outputFile = './swagger-output.json';
  const routes = ['./index.js'];
  
  /* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */
  
  swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./index.js'); // Your project's root file
  });;