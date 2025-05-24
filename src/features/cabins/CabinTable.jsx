// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const { isPending, cabins } = useCabin();
  const [searchParams] = useSearchParams();

  if(!cabins.length) return <Empty resource={"Cabins"}/>

  if (isPending) return <Spinner />;

  //1. This is for discount
  const filterValue = searchParams.get("discount");
  console.log(filterValue);
  
  let filterCabin;
  if (filterValue == "all") filterCabin = cabins;
  
  if (filterValue == "no-discount")
    filterCabin = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue == "with-discount")
    filterCabin = cabins.filter((cabin) => cabin.discount > 0);



  // {value: 'name-asc', label: 'Sort by name (A-Z)'},
  //       {value: 'name-desc', label: 'Sort by name (Z-A)'},
  //       {value: 'regualrPrice-asc', label: 'Sort by price (low first)'},
  //       {value: 'regualrPrice-desc', label: 'Sort by price (high first)'},
  //       {value: 'maxCapacity-asc', label: 'Sort by capacity (low first)'},
  //       {value: 'maxCapacity-desc', label: 'Sort by capacity (high first)'}
  
  2//This is for sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split('-');
  const modifier = direction === "asc" ? 1 : -1;

  const sortCabins = filterCabin.sort((a,b)=> (a[field]- b[field])*modifier);




  if (isPending) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          data={sortCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}
