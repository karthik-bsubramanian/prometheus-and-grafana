import client from "prom-client";
import express from "express";
import { requestCountMiddleWare } from "./monitoring/requestCounter.js";
import { activeUserGaugeMiddleware } from "./monitoring/activeUserGauge.js";
const app = express();

app.use(requestCountMiddleWare);
app.use(activeUserGaugeMiddleware);

app.get('/get',(req,res)=>{
    res.json({
        message: "Holy moly welcome"
    })
})

app.post('/post',(req,res)=>{
    res.json({
        message: "thanks for hitting post endpoint"
    })
})

app.get('/metrics', async (req, res) => {
    const metric = await client.register.metrics();
    res.set('Content-Type',client.register.contentType);
    res.end(metric);
})

app.listen(3000,()=>{
    console.log("app running on port 3000");
});