const fetch = require("node-fetch")
const api = "https://api.opensea.io/api/v1/asset/0x3544ae7a9177c38dcced8a2924c085cdb9eaf81d/<token_id>/?force_update=true"

const updateMedata = async () => {
    for (let i = 1; i <= 120; i++) {
        await fetch(api.replace("<token_id>", i))
    }
}

updateMedata()