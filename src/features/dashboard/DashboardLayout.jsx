import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'
import Spinner from '../../ui/Spinner'
import Stats from './Stats'
import useCabin from '../cabins/useCabin'
import SalesChart from './SalesChart'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

export default function DashboardLayout() {
  const { isPending: isPending1, bookings=[] } = useRecentBookings()
  const { isPending: isPending2, confirmedStays, numDays } = useRecentStays()
  const {cabins=[], isPending: isPending3} = useCabin();

  if (isPending1 && isPending2 && isPending3) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins?.length} />
      <div>Statistics</div>
      <div>Today activities</div>
      <div>Chart stay duration</div>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}
