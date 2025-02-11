import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type SortByHumilityDropdownProps = {
  sortByHumility: undefined | "ascending" | "descending";
  setSortByHumility: (value: undefined | "ascending" | "descending") => void;
  setCurrentPage: (value: number) => void;
};

export default function SortByHumilityDropdown({
  sortByHumility,
  setSortByHumility,
  setCurrentPage,
}: SortByHumilityDropdownProps) {
  console.log(sortByHumility);
  return (
    <FormControl
      variant="filled"
      sx={{
        "minWidth": 200,
        "backgroundColor": "#333",
        "borderRadius": 1,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255, 255, 255, 0.7)",
        },
        "& .MuiSvgIcon-root": {
          color: "white",
        },
      }}
    >
      <InputLabel id="humility-score-label">Humility Score</InputLabel>
      <Select
        labelId="humility-score-label"
        id="humility-score-select"
        value={sortByHumility ?? "default"}
        style={{ color: "white" }}
        label="Humility Score"
        onChange={(e) => {
          const value = e.target.value === "default" ? undefined : (e.target.value as "ascending" | "descending");
          setSortByHumility(value);
          setCurrentPage(1);
        }}
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="ascending">Ascending</MenuItem>
        <MenuItem value="descending">Descending</MenuItem>
      </Select>
    </FormControl>
  );
}
