import type { NextFunction, Request, Response } from 'express';
import client from 'prom-client'

const requestDurationCounter = new client.Histogram({
    name: "request_resolve_duration",
    help: "Total time taken before the request resolves",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000]
});

export const requestDurationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();

        requestDurationCounter.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        }, endTime - startTime);
    })
    next();
}