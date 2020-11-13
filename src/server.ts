import 'dotenv/config'
import App from './app';
import AirportController from './airport/airport.controller';

const app = new App([
    new AirportController()
]);

app.start();