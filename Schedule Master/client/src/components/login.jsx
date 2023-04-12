function Login() {
    return (
        <div className="loginPage">
            <h1>Welcome to Schedule Master!</h1>
            
            {/* Our Login Form 
                action-="" is what we want to do when we submit this form, in this case, go to the home page
                
                we could add logic to actually authenticate someone who is trying to login, or require a certain amout of input*/}
            <form action="/" className="border rounded-5 shadow-lg text-center mx-auto p-5 bg-light" style={{marginTop: "10px"}}>
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

        </div>
    )
}

export default Login;