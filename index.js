'use strict';

const http = require('http');
const path = require('path');
const host = "localhost";
const port = 3000;


const {read, send, sendJson, isIn}=require(path.join(__dirname, 'library', 'handler.js'));

const {getAllFlavors, 
    hasFlavor, 
    getIceCream}=require(path.join(__dirname, 'iceCreamStorage', 'iceCreamFreezer.js'));

const resourceRoutes =['/favicon', '/styles/', '/js/', '/images/'];


const homePath = path.join(__dirname, 'home.html');

const server = http.createServer(async(req, res)=>{
    const{pathname} = new URL (`http://${host}:${port}${req.url}`)
    const route = decodeURIComponent(pathname);

    try {
        if(route ==='/'){
            send(res, await read(homePath));
        }
        else if(isIn(route, ...resourceRoutes)){
            const result = await read(path.join(__dirname, route));
            send(res, result);
        }
        else if (route==='/icecreams'){
            const flavors = await getAllFlavors();
            sendJson(res,flavors);
        }
        else if(route.startsWith('/icecreams/')){ // route = '/icecreams/vanilla'
            const pathParts = route.split('/');
            if (pathParts.length>2){
                const iceCreamFlavor = pathParts[2];
                if (await hasFlavor(iceCreamFlavor)){
                    const iceCream = await getIceCream(iceCreamFlavor);
                    sendJson(res, iceCream)
                }
                else {
                    sendJson(res, {message:'Ice cream not found'}, 404)
                }
            }
        }
        else{
            sendJson(res,{message:'Not found'}, 404);
        }

    }
    catch(err){
        sendJson(res,{message:err.message}, 404);
    }
});

server.listen(port, host, ()=>console.log(`Server is running on ${host}:${port}`));