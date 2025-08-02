import type { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

const requestcounter = new client.Counter({
    name: "request_count",
    help: "total_request_count",
    labelNames: ["method", "route", "status_code"]
})

export const requestCountMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`request took ${endTime - startTime}ms`);

        requestcounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
    })

    next();
}