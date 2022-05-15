import type { NextPage } from 'next'
import CoinGecko from 'coingecko-api';
import Head from 'next/head';

const CoinGeckoClient = new CoinGecko();

const Home: NextPage = (props: any) => {
  const { data } = props.result;
  return (
    <div>
      <Head>
        <title>Coinboard</title>
      </Head>

      <h1>Coinboard</h1>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin: any) => {
            console.log(coin);
            return <tr key={coin.id}>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.price_change_percentage_24h}</td>
              <td>{coin.current_price}</td>
              <td>{coin.market_cap}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await CoinGeckoClient.coins.markets({ params });
  return {
    props: {
      result
    }
  }
}