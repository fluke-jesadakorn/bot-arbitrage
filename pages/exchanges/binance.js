import { Button, Input } from 'antd';
import axios from 'axios';
import crypto from 'crypto';
import { useSelector, useDispatch } from 'react-redux'
import { adminSignout } from '../firebase/command'

const BININCE_HOST = 'https://api.binance.com';
const BINANCE_KEY = process.env.BINANCE_KEY || 'Plase insert API_KEY';
const BINANCE_SECRET = process.env.BINANCE_SECRET || 'Please insert API SECRET';

const Binance = () => {
    const pairs = useSelector(state => state.trades.payload)
    const dispatch = useDispatch()

    const [col1Row1, setCol1Row1] = React.useState(+pairs.ETHUSDT.qty)
    const [col1Row2, setCol1Row2] = React.useState((col1Row1 / +pairs.ETHUSDT.price) * 0.1)
    const [col1Row3, setCol1Row3] = React.useState((+col1Row2 / +pairs.XRPETH.price) * 0.1)
    const [col1Row4, setCol1Row4] = React.useState((+col1Row3 * +pairs.XRPUSDT.price) * 0.1)

    const [col2Row1, setCol2Row1] = React.useState((+pairs.XRPUSDT.qty))
    const [col2Row2, setCol2Row2] = React.useState((+col2Row1 / +pairs.XRPUSDT.price) * 0.1)
    const [col2Row3, setCol2Row3] = React.useState((+col2Row2 * +pairs.XRPETH.price) * 0.1)
    const [col2Row4, setCol2Row4] = React.useState((+col2Row3 * +pairs.XRPUSDT.price) * 0.1)

    const [col3Row1, setCol3Row1] = React.useState(+pairs.XRPUSDT.qty)
    const [col3Row2, setCol3Row2] = React.useState((+col3Row1 * +pairs.XRPUSDT.price) * 0.1)
    const [col3Row3, setCol3Row3] = React.useState((+col3Row2 / +pairs.ETHUSDT.price) * 0.1)
    const [col3Row4, setCol3Row4] = React.useState((+col3Row3 / +pairs.XRPETH.price) * 0.1)

    const [col4Row1, setCol4Row1] = React.useState(+pairs.XRPETH.qty)
    const [col4Row2, setCol4Row2] = React.useState((+col4Row1 * +pairs.XRPETH.price) * 0.1)
    const [col4Row3, setCol4Row3] = React.useState((+col4Row2 * +pairs.ETHUSDT.price) * 0.1)
    const [col4Row4, setCol4Row4] = React.useState((+col4Row3 / +pairs.XRPUSDT.price) * 0.1)

    const [col5Row1, setCol5Row1] = React.useState(+pairs.ETHUSDT.qty)
    const [col5Row2, setCol5Row2] = React.useState((+col4Row1 * +pairs.XRPETH.price) * 0.1)
    const [col5Row3, setCol5Row3] = React.useState((+col4Row2 / +pairs.XRPETH.price) * 0.1)
    const [col5Row4, setCol5Row4] = React.useState((+col4Row3 * +pairs.XRPETH.price) * 0.1)

    const [col6Row1, setCol6Row1] = React.useState(+pairs.XRPETH.qty)
    const [col6Row2, setCol6Row2] = React.useState((+col4Row1 / +pairs.XRPUSDT.price) * 0.1)
    const [col6Row3, setCol6Row3] = React.useState((+col4Row2 * +pairs.ETHUSDT.price) * 0.1)
    const [col6Row4, setCol6Row4] = React.useState((+col4Row3 / +pairs.XRPETH.price) * 0.1)

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
    }

    const signature = crypto.createHmac('sha256', BINANCE_SECRET)
        .update(query.account.dataQueryString)
        .digest('hex')

    const getSymbol = (data) => {
        axios.get(`https://api.binance.com${data.queryUrl}${data.params}`)
            .then(res => {
                let obj = []
                console.log(res.data)
            })
            .catch(e => console.error(e))
    }

    const pair = [
        "ETHUSDT", "XRPETH", "XRPUSDT",
    ];

    const getPiaring = async (pairing) => {
        try {
            const result = await axios.get(`https://api.binance.com/api/v3/trades?symbol=${pairing}&limit=1`)
            await dispatch({
                type: "SET_TRADES",
                payload: Object.assign(pairs, { [pairing]: { ...result.data[0] } }) //not duplicate when dynamic key
            })
        } catch (e) {
            console.error(e)
        }
    }

    const colume = [
        [
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" /><br />USDT</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" /><br />ETH</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" alt="XRP" /><br />XRP</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" /><br />USDT</div>,
            "Profit",
            "Action",
        ],
        [
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" /><br />USDT</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" alt="XRP" /><br />XRP</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" /><br />ETH</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" /><br />USDT</div>,
            "Profit",
            "Action",
        ],
        [
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" alt="XRP" /><br />XRP</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" /><br />USDT</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" /><br />ETH</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" alt="XRP" /><br />XRP</div>,
            "Profit",
            "Action",
        ],
        [
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" alt="XRP" /><br />XRP</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" /><br />ETH</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" /><br />USDT</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" alt="XRP" /><br />XRP</div>,
            "Profit",
            "Action",
        ],
        [
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" /><br />ETH</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" /><br />USDT</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" alt="XRP" /><br />XRP</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" /><br />"ETH"</div>,
            "Profit",
            "Action",
        ],
        [
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" /><br />ETH</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png" alt="XRP" /><br />XRP</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png" alt="USDT" /><br />USDT</div>,
            <div><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" alt="ETH" /><br />"ETH"</div>,
            "Profit",
            "Action",
        ],
    ]

    const dataSource = [
        [
            <div>Quantity:<Input value={+col1Row1} onChange={(e) => setCol1Row1(e.target.value)} /> </div>,
            <div>Price: <Input value={(+col1Row1 / +pairs.ETHUSDT.price) * 0.1} onChange={(e) => setCol1Row2(e.target.value)} /></div>,
            <div>Price: <Input value={(+col1Row2 / +pairs.XRPETH.price) * 0.1} onChange={(e) => setCol1Row3(e.target.value)} /></div>,
            <div>Price: <Input value={(+col1Row3 * +pairs.XRPUSDT.price) * 0.1} onChange={(e) => setCol1Row4(e.target.value)} /></div>,
            <div>Profit: <Input value={(+col1Row1 / +col1Row4) * 100 + "%"} disabled /></div>,
            <Button onClick={() => { pair.map(pair => getPiaring(pair)) }}>Refresh</Button>
        ],
        [
            <div>Quantity:<Input value={+col2Row1} onChange={(e) => setCol2Row1(e.target.value)} /> </div>,
            <div>Price: <Input value={(+col2Row1 / +pairs.XRPUSDT.price) * 0.1} onChange={(e) => setCol2Row2(e.target.value)} /></div>,
            <div>Price: <Input value={(+col2Row2 * +pairs.XRPETH.price) * 0.1} onChange={(e) => setCol2Row3(e.target.value)} /></div>,
            <div>Price: <Input value={(+col2Row3 * +pairs.XRPUSDT.price) * 0.1} onChange={(e) => setCol2Row4(e.target.value)} /></div>,
            <div>Price: <Input value={(+col2Row1 / +col2Row4) * 100 + "%"} disabled /></div>,
            <Button onClick={() => { pair.map(pair => getPiaring(pair)) }}>Refresh</Button>
        ],
        [
            <div>Quantity:<Input value={+col3Row1} onChange={(e) => setCol3Row1(e.target.value)} /> </div>,
            <div>Price: <Input value={(+col3Row1 * +pairs.XRPUSDT.price) * 0.1} onChange={(e) => setCol3Row2(e.target.value)} /></div>,
            <div>Price: <Input value={(+col3Row2 / +pairs.ETHUSDT.price) * 0.1} onChange={(e) => setCol3Row3(e.target.value)} /></div>,
            <div>Price: <Input value={(+col3Row3 / +pairs.XRPETH.price) * 0.1} onChange={(e) => setCol3Row4(e.target.value)} /></div>,
            <div>Price: <Input value={(+col3Row1 / +col3Row4) * 100 + "%"} disabled /></div>,
            <Button onClick={() => { pair.map(pair => getPiaring(pair)) }}>Refresh</Button>
        ],
        [
            <div>Quantity:<Input value={+col4Row1} onChange={(e) => setCol4Row1(e.target.value)} /> </div>,
            <div>Price: <Input value={(+col4Row1 * +pairs.XRPETH.price)} onChange={(e) => setCol4Row2(e.target.value)} /></div>,
            <div>Price: <Input value={(+col4Row2 * +pairs.ETHUSDT.price)} onChange={(e) => setCol4Row3(e.target.value)} /></div>,
            <div>Price: <Input value={(+col4Row3 / +pairs.XRPUSDT.price)} onChange={(e) => setCol4Row4(e.target.value)} /></div>,
            <div>Price: <Input value={(+col4Row1 / +col4Row4) * 100 + "%"} disabled /></div>,
            <Button onClick={() => { pair.map(pair => getPiaring(pair)) }}>Refresh</Button>
        ],
        [
            <div>Quantity:<Input value={+col5Row1} onChange={(e) => setCol5Row1(e.target.value)} /> </div>,
            <div>Price: <Input value={(+col5Row1 * +pairs.ETHUSDT.price)} onChange={(e) => setCol5Row2(e.target.value)} /></div>,
            <div>Price: <Input value={(+col5Row2 / +pairs.XRPETH.price)} onChange={(e) => setCol5Row3(e.target.value)} /></div>,
            <div>Price: <Input value={(+col5Row3 * +pairs.XRPUSDT.price)} onChange={(e) => setCol5Row4(e.target.value)} /></div>,
            <div>Price: <Input value={(+col5Row1 / +col5Row4) * 100 + "%"} disabled /></div>,
            <Button onClick={() => { pair.map(pair => getPiaring(pair)) }}>Refresh</Button>
        ],
        [
            <div>Quantity:<Input value={+col6Row1} onChange={(e) => setCol6Row1(e.target.value)} /> </div>,
            <div>Price: <Input value={(+col6Row1 / +pairs.XRPETH.price)} onChange={(e) => setCol6Row2(e.target.value)} /></div>,
            <div>Price: <Input value={(+col6Row2 * +pairs.XRPUSDT.price)} onChange={(e) => setCol6Row3(e.target.value)} /></div>,
            <div>Price: <Input value={(+col6Row3 / +pairs.ETHUSDT.price)} onChange={(e) => setCol6Row4(e.target.value)} /></div>,
            <div>Price: <Input value={(+col6Row1 / +col6Row4) * 100 + "%"} disabled /></div>,
            <Button onClick={() => { pair.map(pair => getPiaring(pair)) }}>Refresh</Button>
        ],
    ]

    const Table = ({ column, dataSource }) => {
        return <>
            <table>
                <tr>
                    {column.map((res, key) => (
                        <th key={key}>{res}</th>
                    ))}
                </tr>
                <tr>
                    {dataSource.map((res, key) => (
                        <td key={key}>{res}</td>
                    ))}
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
    }

    React.useEffect(() => {
        pair.map(item => getPiaring(item)) // initialPair
    }, [dataSource, colume])

    return (
        <>
            <Button onClick={adminSignout}>Signout</Button>
            {JSON.stringify(pairs)}
            <Button >Refresh All</Button>
            <Button onClick={() => console.log(pairs)}>Log Data</Button>
            {colume.map((item, key) =>
                <Table dataSource={dataSource[key]} column={item} key={key} />
            )}
        </>
    )
}

export default Binance