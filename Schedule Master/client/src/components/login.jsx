import "./LoginStyles.css";

function Login() {
    return (
        <div className="loginPage">
            <h1 className="theTitle">SCHEDULE MASTER</h1>
            <h2 className="theSubTitle">THE ULTIMATE CLASS SCHEDULING SOLUTION</h2>

            <hr></hr>

            <img className="usfLogo" src = "https://am-prod-client-files.ppub-tmaws.io/univsouthflorida/s3fs-public/72250689662c6f5cea9dcc_0.png?VersionId=QP32OQx5ITYKCnB96.R.HFoSD83gBxPE" alt="USF logo"></img>
            <h3 className="USFTxt">University of South Florida</h3>
            {/* Our Login Form 
                action-="" is what we want to do when we submit this form, in this case, go to the home page

                we could add logic to actually authenticate someone who is trying to login, or require a certain amout of input
                this website has a good tutorial from a glance
                https://www.geeksforgeeks.org/how-to-develop-user-registration-form-in-reactjs/*/}
            <form action="/" className="border rounded-5 shadow-lg text-center mx-auto p-5 bg-light">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"></input>
                </div>

                <a href="/home">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </a>
            </form> 

            
            <h3 className="notSchool">Not your school? &nbsp;
            <a href="/schoolOptions">
            <button className="changeSchools">Change Schools</button>
            </a>
            </h3>

        </div>
    )
}

export default Login;