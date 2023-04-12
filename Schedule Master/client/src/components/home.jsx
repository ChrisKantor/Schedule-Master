function Home() {
    return (
        <div className="page">
            <nav className="navbar navbar-expand-lg" style={{width: "100%", backgroundColor: "#c9ad60"}}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">WebSiteName</a>
                    </div>
                    <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="active"><a href="/">Home</a></li>
                        <li><a href="/selection">Course Selection</a></li>
                        <li><a href="/cart">Cart</a></li>
                    </ul>
                </div>
            </nav>

            <h1>Home Page of Schedule Master!</h1>
            
            {/* brings us to the login page */}
            <a href="/login">
                <button>Go To Login Page</button>
            </a>
        </div>
    )
}

export default Home;