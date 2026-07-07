type Props = {
    currentPage: string;
    onNavigate: (page: string) => void;
}

function NavBar({ currentPage, onNavigate }: Props) {
    return (
        <nav className="navbar">

            <button
                className={currentPage === "home" ? "active" : ""}
                onClick={() => onNavigate("home")}
                disabled={currentPage === "home"}
            >
                Home
            </button>

            <button
                className={currentPage === "chat" ? "active" : ""}
                onClick={() => onNavigate("chat")}
                disabled={currentPage === "chat"}
            >
                Chat
            </button>

            <button
                className={currentPage === "resume" ? "active" : ""}
                onClick={() => onNavigate("resume")}
                disabled={currentPage === "resume"}
            >
                Resume
            </button>

            <button
                className={currentPage === "jobmatch" ? "active" : ""}
                onClick={() => onNavigate("jobmatch")}
                disabled={currentPage === "jobmatch"}
            >
                Job Match
            </button>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                }}
            >
                Logout
            </button>

        </nav>
    )
}

export default NavBar;