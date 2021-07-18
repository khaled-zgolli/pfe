import {
  Box,
  createStyles,
  FormControl,
  InputAdornment,
  InputBase,
  makeStyles,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Theme,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { TableRows } from './tableRows';
import { AddProjet } from './addProjet';
import SearchIcon from '@material-ui/icons/Search';

//sellect style
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),

      '&:focus': {
        borderRadius: 4,
        borderColor: '#2196f3',
        boxShadow: '#2196f3',
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      whiteSpace: 'nowrap',
    },
    button: {
      marginBottom: theme.spacing(2),
    },
    select: {
      marginLeft: theme.spacing(2),
    },
  })
);

export interface row {
  _id: string;
  name: string;
  etat: string;
  progress: number;
  projectDetails: string;
  membersTasks: {
    searchMembers: { _id: string; name: string };
    tasks: string[];
  }[];
}
export interface column {
  id: string;
  label: string;
}

/* eslint-disable-next-line */
export interface TableProjetProps {
  rows: row[];
  columns: column[];
}

export const TableProjet: React.FC<TableProjetProps> = ({ rows, columns }) => {
  const classes = useStyles();

  //search
  const [search, setSearch] = useState<string>('');
  const [filtredRow, setFiltredRow] = useState<row[]>(rows);
  const [typeSearch, setTypeSearch] = useState<string>('id');
  //filter
  useEffect((): void => {
    if (search === '') {
      setFiltredRow(rows);
    } else {
      setFiltredRow(
        rows.filter((val: row) => {
          if (typeSearch === 'id') {
            return val._id.toLowerCase().includes(search);
          } else {
            return val.name.toLowerCase().includes(search);
          }
        })
      );
    }
  }, [search, rows, typeSearch]);

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(14);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //sorting
  const [orderDirection, setOrderDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState(' ');

  const handelSort = (columnName) => {
    const isAsc = valueToOrderBy === columnName && orderDirection === 'asc';
    setValueToOrderBy(columnName);
    setOrderDirection(isAsc ? 'desc' : 'asc');
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  const SortTable = (rowArray, comparator) => {
    const stabilizedZedRowArray = rowArray.map((el, index) => [el, index]);
    stabilizedZedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedZedRowArray.map((el) => el[0]);
  };
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <Box display="flex">
        <Box flexGrow={1}>
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              const timerId = setTimeout(() => {
                setSearch(e.target.value);
              }, 500);

              return () => {
                clearTimeout(timerId);
              };
            }}
            placeholder="Search ..."
            variant="outlined"
            size="small"
            className={classes.button}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl className={classes.select}>
            <NativeSelect
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setTypeSearch(e.target.value);
              }}
              id="demo-customized-select-native"
              input={<BootstrapInput />}
            >
              <option value="id">ID</option>
              <option value="email">Projet</option>
            </NativeSelect>
          </FormControl>
        </Box>

        <Box>
          <AddProjet />
        </Box>
      </Box>
      <div>
        <TableContainer>
          <Table padding="checkbox" className={classes.table}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      onClick={() => {
                        handelSort(column.id);
                      }}
                      active={valueToOrderBy === column.id}
                      direction={
                        valueToOrderBy === column.id ? orderDirection : 'asc'
                      }
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {SortTable(
                filtredRow,
                getComparator(orderDirection, valueToOrderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((filtredRow, index: number) => (
                  <TableRows
                    index={index}
                    filtredRow={filtredRow}
                    key={index}
                  />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    14,
                    25,
                    { label: 'All', value: filtredRow.length },
                  ]}
                  count={filtredRow.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
