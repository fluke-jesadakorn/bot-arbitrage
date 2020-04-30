import { Button, Input } from 'antd';
import axios from 'axios';
import crypto from 'crypto';
import { useSelector } from 'react-redux'
const BININCE_HOST = 'https://api.binance.com';
const BINANCE_KEY = process.env.BINANCE_KEY || 'Plase insert API_KEY';
const BINANCE_SECRET = process.env.BINANCE_SECRET || 'Please insert API SECRET';

const Binance = () => {
    const a = useSelector(state => state)
    const [ETHUSDT, setETHUSDT] = React.useState([
        {
            id: 0,
            qty: 0,
            price: 0,
            calculate: 0,
        }
    ])

    const [XRPETH, setXRPETH] = React.useState([
        {
            id: 0,
            qty: 0,
            price: 0,
            calculate: 0,
        }
    ])
    const [XRPUSDT, setXRPUSDT] = React.useState([
        {
            id: 0,
            qty: 0,
            price: 0,
            calculate: 0,
        }
    ])

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
                queryUrl: '&limit=1'
            }
        }
    }

    const signature = crypto.createHmac('sha256', BINANCE_SECRET)
        .update(query.account.dataQueryString)
        .digest('hex')

    React.useEffect(() => {
        // getAPI('ETHUSDT');
        // getAPI('ETHXRP');
        // getAPI('XRPUSDT');
    }, [ETHUSDT])

    const getSymbol = (data) => {
        axios.get(`https://api.binance.com${data.queryUrl}${data.params}`)
            .then(res => {
                let obj = []
                console.log(res.data)
            })
            .catch(e => console.error(e))
    }

    const getAPI = (symbol) => {
        axios.get(`https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=1`)
            .then(res => {
                switch (symbol) {
                    case "ETHUSDT": setETHUSDT(res.data[0]);
                    case "XRPETH": setXRPETH(res.data[0])
                    case "XRPUSDT": setXRPUSDT(res.data[0])
                    default: return ""
                }
            })
            .catch(e => console.error(e))
    }


    const Table = React.memo(({ dataSource, column }) => {
        return (
            <>
                {console.log(a)}
                <table>
                    <tr>
                        {column.map((data, key) => (
                            <th key={key}>{data}</th>
                        ))}
                        <th>%</th>
                        <th>Action</th>
                    </tr>

                    <tr>
                        <td><Input value={dataSource.qty} /></td>
                        <td><Input value={dataSource.price} /></td>
                        <td><Input value={dataSource.price} /></td>
                        <td>{dataSource.price}</td>
                        <td>0</td>
                        <td><Button onClick={() => {
                            getAPI('ETHUSDT')
                            getAPI('XRPETH')
                            getAPI('XRPUSDT')
                        }}>Refresh</Button></td>
                    </tr>

                </table>
                <style jsx={true}>{`
                table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }
                
                td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                
                tr:nth-child(even) {
                    background-color: #dddddd;
                }
                `}</style>
            </>
        )
    })

    return (
        <>
            {JSON.stringify(ETHUSDT)}
            <Table dataSource={ETHUSDT} column={["USDT", "ETH", "XRP", "USDT"]} />
            <Table dataSource={ETHUSDT} column={["USDT", "XRP", "ETH", "USDT"]} />
        </>
    )
}

export default Binance