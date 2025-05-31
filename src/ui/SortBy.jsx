import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [SearchParams, setSearchParams] = useSearchParams();

  const sortBy = SearchParams.get("sortBy") || "";

  function handleChange(e) {
    SearchParams.set("sortBy", e.target.value);
    setSearchParams(SearchParams);
  }
  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      type="white"
    />
  );
}
