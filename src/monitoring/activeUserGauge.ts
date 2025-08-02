import type { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

const activeUsers = new client.Gauge({
    name: "active_users",
    help: "total no of users whose request isn't resolved yet",
    labelNames: ["method", "route", "status_code"]
})

export const activeUserGaugeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    activeUsers.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status_code: res.statusCode
    });
    res.on('finish', () => {
        setInterval(() => {
            activeUsers.dec({
                method: req.method,
                route: req.route ? req.route.path : req.path,
                status_code: res.statusCode
            })
        }, 10000)
    })

    next();
}