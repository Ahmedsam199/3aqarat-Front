// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import { Users } from 'react-feather'

// ** Custom Components
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'
import { useSelector } from 'react-redux'

const SubscribersGained = ({ kFormatter }) => {
const {
  Contracts,
  ContractType,
  Property,
  Party,
  Currency,
  CurrencyExchange,
  tempData: { network },
  Offline,
} = useSelector((state) => state);
  // ** State
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/card/card-statistics/subscribers').then(res => setData(res.data))
    return () => setData(null)
  }, [])

  return data !== null ? (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color='primary'
      stats={Party.length}
      statTitle='Users'
      series={data.series}
      type='area'
    />
  ) : null
}

export default SubscribersGained
