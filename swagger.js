const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Games Api',
        description: 'Games Api'
    },
    host: 'project2-tm4d.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);