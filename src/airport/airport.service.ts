import { counties } from '../airport';

export default class AirportService {
    public countries() {
        return counties;
    }

    public onlyCountries() {
        return counties.map(e => e.name);
    }
}