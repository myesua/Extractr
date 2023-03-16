import * as dotenv from 'dotenv';
dotenv.config();

const { hostname, port } = process.env;
export { hostname, port };
