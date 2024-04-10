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
  const [orderLines, setOrderLines] = useState({});

  //create a table row for projects
  function createProjectRow(projectID, title, target, total) {
    return {
      projectID,
      title,
      target,
      total,
      history: [],
    };
  }
  //create a table row for orders in each project
  function createOrdersRow(orderID, date, customerEmail, value) {
    return (
      {
        orderID,
        date,
        customerEmail,
        value,
      } || {}
    );
  }

  const fetchOrdersForProject = async projectID => {
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
        //create the basic row for the project
        for (const project of projects) {
          const newRow = createProjectRow(
            project._id,
            project.title,
            project.target,
            project.total || 0
          );
          // create the orders rows
          const orders = await fetchOrdersForProject(project._id);
          if (orders.length !== 0) {
            for (const order of orders) {
              const date = new Date(order._doc.createdDate).toLocaleDateString();
              const newOrderRow = createOrdersRow(
                order._id,
                date,
                order.customerEmail,
                order._doc.totalValue
              );
              newRow.history.push(newOrderRow);
            }
          }
          setRows(prevRows => [...prevRows, newRow || {}]);
        }
      } else {
        setRows([]);
      }
    };
    //run the logic above
    innerFunc();
  }, [projects]);

  function Row({row}) {
    const [open, setOpen] = useState(false);

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

// setOrders(prevOrders => {
//   const newOrders = Array.isArray(orders) ? orders : [];
//   return [...prevOrders, ...newOrders];
// });
