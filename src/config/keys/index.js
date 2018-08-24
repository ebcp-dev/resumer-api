const environment = process.env.NODE_ENV || 'development';
const config = require(`./${environment}`).config;
console.log(`Environment: ${environment}`);
export default config;
