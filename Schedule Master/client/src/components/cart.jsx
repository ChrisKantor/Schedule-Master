import { useLocation } from "react-router-dom";
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
            size: 75
            },
            {
            header: 'Subject',
            accessorKey: 'subject',
            size: 75
            },
            {
            header: 'Course Number',
            accessorKey: 'course_number',
            size: 75
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
            size: 50
            },
            {
            header: 'Seats Total',
            accessorKey: 'seats_total',
            size: 50
            },
            {
            header: 'Open',
            accessorKey: 'open',
            size: 25
            },
            {
            header: 'Time',
            accessorKey: 'time',
            size: 75
            },
            {
            header: 'Location',
            accessorKey: 'location',
            size: 75
            },
        ],
        [],
    );
    

    const location = useLocation();
    // console.log(props, "props");
    // console.log(location, "Use location hook");

    //current Cart selection, use to access the array
    console.log("Current Cart: " + location.state.currentCart);

    //how we get data from the db, similar to selection.jsx
    const [courseList, setCourseList] = useState([]);

    const getCourses = () => {
        Axios.post('http://localhost:3001/cartCourses', {crnList: location.state.currentCart}).then((response) => {
            console.log(response);
            setCourseList(response.data);
        })
    }

    useEffect( () => {
        getCourses()
        }, []);
    
    return (
        <div className="page">
            <div style={{margin: 120}}>
                <Navbar></Navbar>
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