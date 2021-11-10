'use strict';

const path = require('path');
const fs = require('fs').promises;

const jsonPath = path.join(__dirname, 'iceCreams.json');

const read = async filePath=>{
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    }
    catch(err){
        throw new Error('not valid json')
    }
}

const getAllFlavors = async ()=>{
    try{
        const iceCreams = await read(jsonPath);
        return Object.keys(iceCreams);
    }
    catch(err){
        return [];
    }
};

const hasFlavor = async flavor =>{
    try{
        const iceCreams = await read(jsonPath);
        return Object.keys(iceCreams).includes(flavor);
    }
    catch(err){
        return false;
    }
};


// To get the icecream 
const getIceCream = async flavor =>{
    try{
        const iceCreams = await read(jsonPath);
        return iceCreams[flavor] || null;
    }
    catch(err){
        return null;
    }
}


module.exports = {getAllFlavors, hasFlavor, getIceCream};

// getAllFlavors().then(console.log).catch(console.log);
// hasFlavor('raspberry').then(console.log).catch(console.log);
// getIceCream('raspberry').then(console.log).catch(console.log);