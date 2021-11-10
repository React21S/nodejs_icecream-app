'use struct';

const fs = require('fs').promises;
const path = require('path');

const MIMETYPES = require (path.join(__dirname, 'mimetypes.json'));



const read2 = async filePath =>{
    try {
        const extension = path.extname(filePath).toLowerCase();
    const mime = MIMETYPES[extension] || {type:'application/octet-stream', encoding:'binary'};
   const fileData = await fs.readFile(filePath, mime.encoding);
   return {fileData, mime}
    }
    catch(err){
        return err; 
    }
};



read2('./mimetypes.json').then(console.log).catch(console.log)
read2('./handler.js').then(console.log).catch(console.log)