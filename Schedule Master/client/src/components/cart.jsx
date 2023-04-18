import { Link, useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import * as React from 'react';
import MaterialReactTable from 'material-react-table';
import Axios from "axios";
import "./Navbar"
import Navbar from "./Navbar";

//used for modals
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Cart(props) {
    //sets up the columns we use when we display the data from the db
    //header is how we want the column name to be displayed
    //accessorKey is the name of the column in the db
    const columns = useMemo(
        () => [
          {
            header: 'CRN',
            accessorKey: 'crn',
            size: 25
          },
          {
            header: 'Subject',
            accessorKey: 'subject',
            size: 75
          },
          {
            header: 'Course Number',
            accessorKey: 'course_number',
            size: 25
          },
          {
            header: 'Title',
            accessorKey: 'title',
          },
          {
            header: 'Instructor',
            accessorKey: 'instructor',
            size: 100
          },
          {
            header: 'Seats Available',
            accessorKey: 'seats_available',
            size: 25
          },
          {
            header: 'Seats Total',
            accessorKey: 'seats_total',
            size: 25
          },
          {
            header: 'Open',
            accessorKey: 'is_open',
            size: 25
          },
          {
            header: 'Meeting Days',
            accessorKey: 'meeting_days',
            size: 25
    
          },
          {
            header: 'Start time',
            accessorKey: 'start_time',
            size: 50
          },
          {
            header: 'End time',
            accessorKey: 'end_time',
            size: 50
          },
          {
            header: 'Location',
            accessorKey: 'location',
            size: 75
          },
        ],
        [],
    );
    
    
    //we need to wait untill we read the cart data before we do anything else
    const [isLoading, setLoading] = useState(true); // Loading state





    //used to represent the cart
    //we need to load cart data if we are accessing cart from another webpage where the cart exists
    const [cartSelection, setCartSelection] = useState([]);
    const location = useLocation();
    
    //current Cart selection, use to access the array
    const saveCart = () => {
        setCartSelection(location.state.currentCart);
        console.log("props: " + location.state.currentCart);
        console.log("cartSelection: " + cartSelection);
        setLoading(false); //set loading state
        console.log("Finishing Loading Cart");
        console.log("cartSelection After Load: " + cartSelection);
    }

    //if the cart exists, save it, otherwise, don't do anything
    useEffect( () => {
        if (location.state !== null)
        {
            console.log("Loading Cart");
            saveCart();
        }
        else
        {
            console.log("Cart is empty");
        }
    }, []);
    


    //now we have updated the cart to hold the information passed to it from other pages
    //now we can use the cart to pull the information we need to from the db




    //how we get data from the db, similar to selection.jsx
    const [courseList, setCourseList] = useState([]);

    //need to use location.state.currentCart instead of cartSelection as setCartSelection takes a while to run,
    //so it might not be done in time before this function gets called
    const getCourses = () => {

      //if there are no courses in the current cart to pull from the db, return nothing
      if (location.state.currentCart === null || location.state.currentCart === [] || location.state.currentCart.length <= 0)
      {
        setCourseList([]);
      }
      

      //otherwise there are courses in the cart that we do want to return
      else
      {
        Axios.post('http://localhost:3001/cartCourses', {crnList: location.state.currentCart}).then((response) => {
          console.log("response: " + response);
          console.log("getting courses");
          setCourseList(response.data);
          console.log("got courses" + courseList);
        })
      }
    }
    
    //only pull data from the database if the cart exists, if it doesn't exist, don't do anything
    useEffect( () => {
      if (location.state !== null)
      {
        getCourses()
      }
      else{
        console.log("location state is null");
      }
    }, [cartSelection]);






    //DROPPING COURSES
    //to drop courses from the cart, we first need to be able to select rows
    const [rowSelection, setRowSelection] = useState({});

    //another useEffect function, this time it triggers whenever rowSelection changes
    //this just prints out the currently selected rows on the console
    useEffect(() => {
      //do something when the row selection changes...
      console.info("row selection");
      console.info({ rowSelection });
    }, [rowSelection]);


    var reg = false;

    const dropClasses = () => {
      //if cartSelection exists and we have some courses in there, filter them out
      if ( typeof cartSelection !== 'undefined' && Array.isArray(cartSelection) && cartSelection.length > 0 ) {
        var result = cartSelection.filter(item => !Object.keys(rowSelection).includes(item));
        setRowSelection([]);
        if (result.length > 0)
        {
          console.log("Courses that we are keeping: " + result)
          setCartSelection(result);
          console.log("location.state.currentCart BEFORE: " + location.state.currentCart);
          location.state.currentCart = result;
          console.log("location.state.currentCart AFTER: " + location.state.currentCart);
          if (location.state === null)
          getCourses();

          if (reg === false)
          {
            handleOpen();
          }
        }

        else
        {
          console.log("no courses to drop");
          location.state.currentCart = [];
          setCartSelection([]);
        }
        
      }

      //else, set cart selection to an empty array
      else
      {
        console.log("no courses to drop");
        setCartSelection([]);
        getCourses();
      }
      // window.location.reload();
    }



    
    //COURSE REGISTRATION:
    const registerForCourses = () => {
      reg = true;
      //if there are selected rows and courses in the cart
      if (Object.keys(rowSelection).length !== 0 &&  cartSelection.length !== 0)
      {
        Axios.post('http://localhost:3001/registerCourses', {crnList: cartSelection}).then((response) => {
          console.log(response);
        })

        regModalOpen();
        dropClasses();
      }

      reg = false;
    }





    //MODAL STUFF
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [regModalStatus, setregModalStatus] = React.useState(false);
    const regModalOpen = () => setregModalStatus(true);
    const regModalClose = () => setregModalStatus(false);

    return (
        <div className="page">
            <div style={{margin: 80}}>
              <Navbar currentCart={cartSelection}></Navbar>
            </div>
              <h1>Course Cart</h1>
            <div>

            </div>

            <div style={{maxWidth: '95vw', maxHeight: '70vh', margin: 50, overflowX: 'auto', overflowY: 'auto', flexShrink: 0.5}}>
              <MaterialReactTable
              columns={columns}
              data={courseList}
              enableRowSelection //enables us to select rows
              getRowId={(row) => row.crn} //give each row a more useful id, we will use crn to determine which rows we have selected
              onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
              state={{ rowSelection, courseList }} //pass our managed row selection state to the table to use
              />
            </div>

            <div>
              <button style={{margin: 30}} className="btn btn-primary btn-lg" onClick={registerForCourses} >Register for Courses</button>
              <button style={{margin: 30}} className="btn btn-primary btn-lg" onClick={dropClasses} >Drop Classes From Cart</button>
            </div>


            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Classes have been Dropped
                </Typography>
              </Box>
            </Modal>


            <Modal
              open={regModalStatus}
              onClose={regModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Registered for Classes!
                </Typography>
              </Box>
            </Modal>
        </div>
    )
}

export default Cart;