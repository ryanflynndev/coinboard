import type { GetServerSideProps, NextPage } from 'next'
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
          </tr>
        </thead>
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