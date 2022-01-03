import React from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import TablePagination from "@mui/material/TablePagination";

interface Column {
  id: "title" | "url" | "created_at" | "author";
  label: string;
  minWidth?: number;
  align?: "right";
}

export interface InitPost {
  title: string;
  url: string;
  author: string;
  created_at: Date;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "url", label: "Url", minWidth: 170 },
  { id: "created_at", label: "Created At", minWidth: 170 },
  { id: "author", label: "Author", minWidth: 170 },
];

interface Props {}

function Home(props: Props) {
  const {} = props;
  const history = useHistory();

  const [page, setPage] = React.useState<number>(0);
  const [tablePage, setTablePage] = React.useState<number>(0);
  const [hits, setHits] = React.useState<InitPost[]>([]);

  React.useEffect(() => {
    getHits();
    const interval = setInterval(() => {
      getHits();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getHits = () => {
    Axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
    )
      .then((res) => {
        setHits((prevHits) => [...res.data.hits, ...prevHits]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goDetails = (post: InitPost) => {
    history.push({
      pathname: "/details",
      state: post,
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setTablePage(newPage);
  };

  return (
    <div data-testid="home">
      <Typography variant="h2">Post List</Typography>
      <Container style={{ maxWidth: "100%" }}>
        <Paper>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {hits
                  .slice(tablePage * 10, tablePage * 10 + 10)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return <TableCell key={column.id}>{value}</TableCell>;
                      })}

                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => goDetails(row)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={hits.length}
            rowsPerPage={10}
            page={tablePage}
            onPageChange={handleChangePage}
          />
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={hits.length}
            rowsPerPage={10}
            page={tablePage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Container>
    </div>
  );
}

export default Home;
