'use struct';

const fs = require('fs').promises;
const path = require('path');

const MIMETYPES = require (path.join(__dirname, 'mimetypes.json'));

const read = filePath =>{
    const extension = path.extname(filePath).toLowerCase();
    const mime = MIMETYPES[extension] || {type:'application/octet-stream', encoding:'binary'};
    return fs.readFile(filePath, mime.encoding)
    .then(fileData=>({fileData, mime}))
    .catch(err=>err);
};

const  send = (res, resource)=>{
    res.writeHead(200, {
        'Content-Type': resource.mime.type,
        'content-Length':Buffer.byteLength(resource.fileData, resource.mime.encoding)
    });
    res.end(resource.fileData, resource.mime.encoding)
}

const sendJson= (res, jsonResource, statusCode=200)=>{
    const jsonData = JSON.stringify(jsonResource);
    res.writeHead(200, { 'Content-Type':'application/json'});
    res.end(jsonData)
}


const isIn = (route, ...routes)=>{
    for (let start of routes){
        if (route.startsWith(start)) return true;
    }
    return  false;
}

module.exports = {read,send, sendJson, isIn}

// read('./mimetypes.json').then(console.log).catch(console.log)
// read('./handler.js').then(console.log).catch(console.log)