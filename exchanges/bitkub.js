const axios = require('axios')
const API_HOST = 'https://api.bitkub.com',
    BITKUB_KEY = process.env.API_KEY || 'Plase insert API_KEY',
    BITKUB_SECRET = process.env.API_SECRET || 'Please insert API SECRET'

let data = {
    ts: ""
}

const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-BTK-APIKEY': BITKUB_KEY,
}

let signature = () => {
    return crypto.createHmac('sha256', BITKUB_SECRET)
        .update(JSON.stringify({ ...data, ts: +data.ts }))
        .digest('hex')
}

const sig = signature()
data['sig'] = sig

const getData = async (url, query) => {
    try {
        const result = await axios.get(`${url}${query}`)
        return await result.data
    } catch (e) {
        console.error(e)
    }
}

const postData = async () => {
    try {
        await axios.post(`${API_HOST}/api/market/wallet`, JSON.stringify({ sig: data.sig, ts: +data.ts }), {
            headers: header
        }).then(res => {
            console.log(res.data)
        })
    }
    catch (e) {
        console.error(e)
    }
}

exports.bitkub = {
    getSymbol: getData(API_HOST, '/api/market/symbols'),
    getServerTime: getData(API_HOST, '/api/servertime'),
    getWalletBalance: () => {
        this.bitkub.getServerTime.then(res => {
            data['ts'] = res
        })
    }
}