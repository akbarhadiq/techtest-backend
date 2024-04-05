const swaggerAutogen = require("swagger-autogen")({openapi:"3.0.0"})
const doc = {
    info: {
      title: 'Books API',
      description: 'Description'
    },
    definitions:{
    },
    host: process.env.HOST,
    components: {
      securitySchemes:{
          bearerAuth: {
              type: 'http',
              scheme: 'bearer'
          }
      },
      schemas:{
        BookSchema:{
            $title:'Book Title',
            $code:'Unique Book Code',
            $stock:10
        },
        MemberSchema:{
            $name:'Member Name'
        },
        BorrowDataSchema:{
            $member_id:1,
            $book_id:5
        }
      },
      examples:{
        bookExample:{
            value:{
                title:"Catcher in The Rye",
                code:"CATCH1",
                stock:1
            }
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