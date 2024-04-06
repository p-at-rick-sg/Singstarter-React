import {useEffect, useState} from 'react';
import useFetch from '../hooks/useFetch';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ProjectTable({projects, user}) {
  const fetchData = useFetch();
  const [rows, setRows] = useState([]);
  const [orders, setOrders] = useState([]);

  //Get the order data
  function createRow(title, target, total, date, customerID, value) {
    return {
      title,
      target,
      total,
      history: [
        {
          date,
          customerID,
          value,
        },
      ],
    };
  }
  // using this call with this data
  // const rows = [createData('Project 1', 1000, 150, 50), createData('Project 2', 5000, 500, 100)];

  const fetchOrdersForProject = async projectID => {
    //gets orders for 1 project
    try {
      const SUFFIX = '/api/projects/orders?projectID=' + projectID;
      const result = await fetchData(SUFFIX, 'GET', undefined, user.accessToken);
      return result.data || [];
    } catch (err) {
      console.error('failed to get orders by project id');
      return [];
    }
  };

  useEffect(() => {
    const innerFunc = async () => {
      if (projects.length !== 0) {
        const orders = await fetchOrdersForProject(projects[0]._id);
        setOrders(orders);

        console.log(projects);
      }
    };
    innerFunc();
  }, [projects]);

  useEffect(() => {
    if (orders.length !== 0) {
      const newRow = createRow(
        projects[0].title,
        projects[0].target,
        projects[0].total,
        orders[0].createdDate,
        orders[0].userID,
        orders[0].totalValue
      );
      // setRows(newRow);
      console.log(newRow);
    }
  }, [orders]);

  // useEffect(() => {
  //   if (orders.length !== 0) {
  //     setRows(
  //       createData(
  //         projects[0].title,
  //         projects[0].target,
  //         projects[0].total,
  //         orders[0].createdDate,
  //         orders[0].userID,
  //         orders[0].totalValue
  //       ) || []
  //     );
  //   }
  // }, [orders]);

  //trying to create the right format of data from the project object

  function Row(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);
    //the row rendering to the table below
    return (
      <>
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell align="right">{row.target}</TableCell>
          <TableCell align="right">{row.total}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{margin: 1}}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map(historyRow => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
  //Full table return
  return (
    <Box width={500}>
      <TableContainer component={Paper}>
        {rows && <p>test</p>}
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Your Projects</TableCell>
              <TableCell align="left">Target</TableCell>
              <TableCell align="left">Total Raised</TableCell>
              <TableCell align="left">Order Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows && rows.map(row => <Row key={row.title} row={row} />)}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
