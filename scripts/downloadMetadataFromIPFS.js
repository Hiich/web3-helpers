const fs = require('fs');
const fetch = require('node-fetch');

const API_URL = 'https://uncanny.mypinata.cloud/ipfs/QmNkUKu6XYsVSxPv6vDgc9J6jSYihY7hpoGw8KMPbveQdw';

const missingIndex =
    [45]
const fetchData = async (index) => {
    const response = await fetch(`${API_URL}/${index}.json`);
    try {
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const errors = []
const storeData = async () => {
    const results = [];

    for (let index = 4077; index <= 5000; index++) {
        const data = await fetchData(index);
        if (data === null) {
            errors.push(index);
            continue;
        }

        results.push(data);
        //write data to single file
        fs.writeFileSync(`./metadata/${index}`, JSON.stringify(data));
    }
    console.log(errors);
};

const fetchMissingNFTs = async () => {
    const results = [];

    for (let index = 0; index < missingIndex.length; index++) {

        const data = await fetchData(missingIndex[index]);
        if (data === null) {
            errors.push(missingIndex[index]);
            continue;
        }

        results.push(data);
        //write data to single file
        fs.writeFileSync(`./focusbloc_meta/${missingIndex[index]}.json`, JSON.stringify(data));
    }

    console.log(errors);
};

// fetchMissingNFTs();
storeData();