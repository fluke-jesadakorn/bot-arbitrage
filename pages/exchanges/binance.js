import { Table, Button } from 'antd';
const BININCE_HOST = 'https://api.binance.com';
const BINANCE_KEY = process.env.BINANCE_KEY || 'Plase insert API_KEY';
const BINANCE_SECRET = process.env.BINANCE_SECRET || 'Please insert API SECRET';
import axios from 'axios';
import crypto from 'crypto';
import Paragraph from 'antd/lib/skeleton/Paragraph';

const Binance = () => {
    const query = {
        account: {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': BINANCE_KEY,
            },
            queryUrl: '/api/v3/account',
            dataQueryString: "recvWindow=5001&timestamp=" + Date.now().toString(),
        },
        trades: {
            queryUrl: '/api/v3/trades?symbol=',
            symbols: {
                mandatory: true,
                usdt: {
                    btc: "BTCUSDT",
                    bnb: "BNBUSDT",
                    ltc: "LTCUSDT"
                },
                eth: {
                    usdt: "ETHUSDT",
                    btc: "ETHBTC",
                    xrp: "XRPETH"
                }
            },
            paramsLimit: {
                mandatory: true,
                queryUrl: '&limit=5'
            }
        }
    }

    const signature = crypto.createHmac('sha256', BINANCE_SECRET)
        .update(query.account.dataQueryString)
        .digest('hex')

    const [state, setState] = React.useState([])
    React.useEffect(() => {
        // getSymbol();
    }, [])

    const getSymbol = (data) => {
        axios.get(`https://api.binance.com${data.queryUrl}${data.params}`)
            .then(res => {
                let obj = []
                console.log(res.data)
            })
            .catch(e => console.error(e))
    }

    const getAPI = async ({ queryUrl, params }) => {
        const result = await axios.get(`https://api.binance.com${queryUrl}${params}`)
            .then(res => setState(res.data))
            .catch(e => console.error(e))
    }

    const dataSource = [
        {}
    ];
    const column = [{}];

    return (
        <>
            {JSON.stringify(state)}
            <Button onClick={() => {
                getAPI({
                    queryUrl: query.trades.queryUrl, params: query.trades.symbols.eth.usdt
                        + query.trades.paramsLimit.queryUrl
                })
            }}>Fetch</Button>

            <Table />
        </>
    )
}

export default Binance