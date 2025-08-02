import type { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

const activeUsersGauge = new client.Gauge({
    name: "active_users",
    help: "total no of users whose request isn't resolved yet",
})

export const activeUserGaugeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    activeUsersGauge.inc();
    res.on('finish', () => {
        // Decrement the gauge when the request finishes
        activeUsersGauge.dec();
    })

    next();
}