import {useEffect, useState} from 'react';
import useFetch from '../hooks/useFetch';

import Box from '@mui/material/Box';
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LoupeIcon from '@mui/icons-material/Loupe';

export default function ProjectTable({projects, user, setSelectedProjectID}) {
  const fetchData = useFetch();
  const [rows, setRows] = useState([]);
  const [orders, setOrders] = useState([]);

  //Get the order data
  function createRow(projectID, title, target, total, orderID, date, customerEmail, value) {
    return {
      projectID,
      title,
      target,
      total,
      history: [
        {
          orderID,
          date,
          customerEmail,
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
      console.log('fetching this data: ', result);
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
        setOrders(prevOrders => {
          const newOrders = Array.isArray(orders) ? orders : [];
          return [...prevOrders, ...newOrders];
        });
      }
    };
    innerFunc();
  }, [projects]);

  useEffect(() => {
    if (orders.length !== 0) {
      const newRow = createRow(
        projects[0]._id,
        projects[0].title,
        projects[0].target,
        projects[0].total || 0,
        orders[0]._doc._id,
        orders[0]._doc.createdDate,
        orders[0].customerEmail,
        orders[0]._doc.totalValue
      );
      //setRows([...rows, newRow || {}]);
      setRows(prevRows => [...prevRows, newRow || {}]);
      console.log('rows: ', rows);
    }
  }, [orders]);

  function Row({row}) {
    const [open, setOpen] = useState(false);
    const [showingDetails, setShowingDetails] = useState(false);

    const handleRowClick = () => {
      switch (open) {
        case true:
          setOpen(false);
          setSelectedProjectID(null);
          break;
        case false:
          setOpen(true);
          setSelectedProjectID(row.projectID);
          break;
        default:
          console.log('no case matches');
      }
    };

    //creating the row
    return (
      <>
        <TableRow key={row.projectID} sx={{'& > *': {borderBottom: 'unset'}}}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={handleRowClick}>
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
                      <TableCell align="right">Total($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map(historyRow => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerEmail}</TableCell>
                        <TableCell align="right">{historyRow.value}</TableCell>
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
        {/* {orders && <p>{orders[0].customerEmail}</p>} */}
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Your Projects</TableCell>
              <TableCell align="left">Target</TableCell>
              <TableCell align="left">Total Raised</TableCell>
              <TableCell align="left">Unit Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows && rows.map(row => <Row key={row.projectID} row={row} />)}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
