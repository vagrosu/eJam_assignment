import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SuperheroCard from "./SuperheroCard";
import { Alert, Box, CircularProgress, Pagination } from "@mui/material";
import { useState } from "react";
import SortByHumilityDropdown from "./SortByHumilityDropdown";
import AddSuperheroModal from "./AddSuperheroModal";

const PAGE_SIZE = 10;

type GetSuperheroesResponseType = {
  isSuccess: boolean;
  statusCode: number;
  data: {
    superheroes: {
      id: string;
      name: string;
      superpower: string;
      humilityScore: number;
    }[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByHumility, setSortByHumility] = useState<undefined | "ascending" | "descending">(undefined);

  const { data, isLoading, error } = useQuery<GetSuperheroesResponseType, Error>({
    queryKey: ["superheroes", currentPage, sortByHumility],
    queryFn: async () => {
      return axios
        .get("http://localhost:3000/v1/superheroes", {
          params: {
            page: currentPage,
            pageSize: PAGE_SIZE,
            sortByHumility: sortByHumility,
          },
        })
        .then((res) => res.data);
    },
  });
  const pageCount = data ? Math.ceil(data.data.pagination.total / data.data.pagination.pageSize) : undefined;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
        maxWidth: "1600px",
      }}
    >
      <h1>Humble Superheroes</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0 16px",
        }}
      >
        <SortByHumilityDropdown
          sortByHumility={sortByHumility}
          setSortByHumility={setSortByHumility}
          setCurrentPage={setCurrentPage}
        />
        <AddSuperheroModal />
      </div>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">Failed to get Superheroes</Alert>
      ) : (
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 2,
            }}
          >
            {data?.data.superheroes.map((superhero) => (
              <SuperheroCard key={superhero.id} superhero={superhero} />
            ))}
          </Box>
        </Box>
      )}

      <Pagination
        count={pageCount}
        color="primary"
        page={currentPage}
        onChange={(_, page) => setCurrentPage(page)}
        sx={{ "& .MuiPaginationItem-root": { color: "white" } }}
      />
    </div>
  );
}
