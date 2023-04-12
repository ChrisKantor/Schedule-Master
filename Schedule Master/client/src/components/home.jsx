function Home() {
    return (
        <div className="homePage">
            <h1>Home Page of Schedule Master!</h1>
            
            {/* brings us to the login page */}
            <a href="/login">
                <button>Go To Login Page</button>
            </a>
        </div>
    )
}

export default Home;