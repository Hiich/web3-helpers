const fs = require('fs');

//split metadata into separate files
function splitMetadata() {
    const metadataFile = `./metadata.json`;
    //read metadata file
    const metadataJson = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));

    const meta = metadataJson.data
    //split metadata into separate files with tokenId as filename
    meta.forEach((item) => {
        const tokenId = item.name.split('#')[1];
        const tokenMetadata = JSON.stringify(item);
        const tokenMetadataFile = `./metadata/${tokenId}.json`;
        fs.writeFileSync(tokenMetadataFile, tokenMetadata, 'utf8');
    });
}


splitMetadata();