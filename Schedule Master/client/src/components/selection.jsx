import { useMemo, useState, useEffect } from "react";
import MaterialReactTable from 'material-react-table';
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import Navbar from "./Navbar";

// Courses Table (12 columns)
// crn varchar(6) PK 
// subject varchar(3) 
// course_number int 
// title varchar(255) 
// instructor varchar(255) 
// seats_available int 
// seats_total int 
// is_open varchar(3) 
// meeting_days varchar(7) 
// start_time time 
// end_time time 
// location varchar(255)

// This function needed to be set up differently than others to use useMemo
// useMemo returns a memoized value, Think of memoization as caching a value so that it does not need to be recalculated.
export const Selection = (props) => {

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
  
  //how we load cart data that we are passed
  //used to represent the cart
  const [cartSelection, setCartSelection] = useState([]);

  const location = useLocation();

  //current Cart selection, use to access the array
  const saveCart = () => {
      console.log("Current Cart: " + location.state.currentCart);
      setCartSelection(location.state.currentCart);
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


  
  //how we display the data from the database
  const [courseList, setCourseList] = useState([]);

  const getCourses = () => {
    Axios.get('http://localhost:3001/courses').then((response) => {
      console.log(response);
      setCourseList(response.data);
    });
  };

  //useEffect basically triggers whenever the supplied dependency changes
  // useEffect(<function>, <dependency>) is the syntax, and dependency is optional.
  // if no dependency is provided, it will run continuously
  // in this case, getCourses() is our function, and the empty array is our dependency
  // since the array is empty, it will only run once. if we did not supply a dependency, it would be constantly running
  useEffect( () => {
    getCourses()
  }, []);



  //row selection functions

  //used to access selected rows later
  const [rowSelection, setRowSelection] = useState({});

  //another useEffect function, this time it triggers whenever rowSelection changes
  //this just prints out the currently selected rows on the console
  useEffect(() => {
    //do something when the row selection changes...
    console.info({ rowSelection });
  }, [rowSelection]);




  //Cart functions

  //used to represent the cart


  //another useEffect function, this time it triggers whenever cartSelection changes
  //this just prints out the current cart on the console
  useEffect(() => {
    //do something when the cartSelection changes...
    console.log("Current Cart Selection");
    console.info("Current Cart: " + cartSelection);
  }, [cartSelection]);


  //Function that adds our courses that we have selected to the cart
  const addToCart = () => {
    //if there are no selected courses
    if (Object.keys(rowSelection).length === 0)
    {
      console.log("Nothing selected");
    }

    //if there are some selected courses
    else
    {
      console.info("Selected Rows: " + Object.keys(rowSelection));

      //setCartSelection is the function we are using to update the cartSelection array
      //the ... operator basically means "everything in this array"
      //so we are basically saying cartSelection = everything in cart selection + everything in rowSelection
      //to solve the issues of duplicate CRNs being added to the cart
      //we turn the array into a set (which does not allow dups), then back into an array
      if ( typeof cartSelection !== 'undefined' && Array.isArray(cartSelection) && cartSelection.length > 0 ) {
        console.log(cartSelection.length);
        setCartSelection(cartSelection => [...new Set([...cartSelection, ...Object.keys(rowSelection)])]);
      }

      else {
        setCartSelection([]);
        setCartSelection(cartSelection => [...new Set([...cartSelection, ...Object.keys(rowSelection)])]);
      }
    }
  };



  return (
    <div className="page">
      <div style={{margin: 120}}>
        <Navbar currentCart={cartSelection}></Navbar>
      </div>
      <div>
        <MaterialReactTable
        columns={columns}
        data={courseList}
        enableRowSelection //enables us to select rows
        getRowId={(row) => row.crn} //give each row a more useful id, we will use crn to determine which rows we have selected
        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        state={{ rowSelection }} //pass our managed row selection state to the table to use
        />
      </div>
    
      <button style={{margin: 30}} className="btn btn-primary btn-lg" onClick={addToCart}>Add Classes To Cart</button>
    </div>
  );
};

export default Selection;