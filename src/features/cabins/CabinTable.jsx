import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function CabinTable() {
  const { isLoading, cabins, count, isPlaceholderData } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") ?? "all";

  let filterCabins;
  if (filterValue === "all") filterCabins = structuredClone(cabins);
  if (filterValue === "no-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2) SORT
  const sortBy = searchParams.get("sortBy") ?? "startDate-asc";
  const [filed, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const compareCharacter = (a, b) => {
    if (modifier === 1) return a[filed].localeCompare(b[filed]);
    if (modifier === -1) return b[filed].localeCompare(a[filed]);
  };

  const sortedCabins =
    filed === "name"
      ? filterCabins.sort(compareCharacter)
      : filterCabins.sort((a, b) => (a[filed] - b[filed]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} count={count} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} isPlaceholderData={isPlaceholderData} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
