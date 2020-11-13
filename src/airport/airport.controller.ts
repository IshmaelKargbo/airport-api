import { NextFunction, Request, Response, Router } from "express";
import AirportService from './airport.service';

export default class AirportController {
    public path = "/country";
    public router = Router();
    service = new AirportService();

    constructor() {
        this.initRoute();
    }

    private initRoute() {
        this.router
            .get(`${this.path}/all`, this.all)
            .get(`${this.path}/only-country`, this.only);
    }

    private all = (req: Request, res: Response, next: NextFunction) => {
        try {
            const all = this.service.countries();
            res.send(all);
        } catch (error) {
            next(error);
        }
    }

    private only = (req: Request, res: Response, next: NextFunction) => {
        try {
            const only = this.service.onlyCountries();
            res.send(only);
        } catch (error) {
            next(error);
        }
    }
}