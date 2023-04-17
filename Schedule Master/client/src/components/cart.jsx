import { Link, useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import MaterialReactTable from 'material-react-table';
import Axios from "axios";
import "./Navbar"
import Navbar from "./Navbar";

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
    

    //used to represent the cart
    const [cartSelection, setCartSelection] = useState([]);

    const location = useLocation();

    //current Cart selection, use to access the array
    const saveCart = () => {
        console.log("Current Cart: " + location.state.currentCart);
        setCartSelection(location.state.currentCart);
        console.log("Cart Selection!!!!!!!: " + cartSelection);
    }

    useEffect( () => {
        if (location.state !== null)
        {
            saveCart();
        }
        else
        {
            console.log("Cart is empty");
        }
    }, []);

    //how we get data from the db, similar to selection.jsx
    const [courseList, setCourseList] = useState([]);

    //need to use location.state.currentCart instead of cartSelection as setCartSelection takes a while to run,
    //so it might not be done in time before this function gets called
    const getCourses = () => {
      Axios.post('http://localhost:3001/cartCourses', {crnList: location.state.currentCart}).then((response) => {
          console.log(response);
          setCourseList(response.data);
      })
    }

    useEffect( () => {
      if (location.state !== null)
      {
        getCourses()
      }
    }, []);
    
    console.log("Cart Selection!!!!!!!: " + cartSelection);

    return (
        <div className="page">
            <div style={{margin: 120}}>
                <Navbar currentCart={cartSelection}></Navbar>
            </div>

            <div>
                <MaterialReactTable
                columns={columns}
                data={courseList}
                // enableRowSelection //enables us to select rows
                // getRowId={(row) => row.crn} //give each row a more useful id, we will use crn to determine which rows we have selected
                // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                // state={{ rowSelection }} //pass our managed row selection state to the table to use
                />
            </div>
        </div>
    )
}

export default Cart;