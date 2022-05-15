import type { NextPage } from 'next'
import CoinGecko from 'coingecko-api';
import Head from 'next/head';

const CoinGeckoClient = new CoinGecko();
const tableHeadStyle = "px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-purple-500 uppercase border-b border-gray-200 bg-gray-50";
const coinDataStyle = "px-6 py-4 whitespace-no-wrap border-b border-gray-200";

const Home: NextPage = (props: any) => {
  const { data } = props.result;
  return (
    <div>
      <Head>
        <title>Coinboard</title>
      </Head>

      <h1 className="text-3xl font-bold underline">Coinboard</h1>
      <div className="flex flex-col mt-8">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className={tableHeadStyle}>Image</th>
                  <th className={tableHeadStyle}>Symbol</th>
                  <th className={tableHeadStyle}>24H Change</th>
                  <th className={tableHeadStyle}>Price</th>
                  <th className={tableHeadStyle}>Market Cap</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((coin: any) => {
                  console.log(coin);
                  return <tr key={coin.id}>
                    <td className={coinDataStyle}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img className="w-10 h-10 rounded-full" src={coin.image}></img>
                        </div>
                      </div>
                    </td>
                    <td className={coinDataStyle}>{coin.symbol.toUpperCase()}</td>
                    <td className={coinDataStyle}>{coin.price_change_percentage_24h}</td>
                    <td className={coinDataStyle}>{coin.current_price}</td>
                    <td className={coinDataStyle}>{coin.market_cap}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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