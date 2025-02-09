import { useEffect, useState } from "react";
import API from "./api";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        API.get("/")
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.log("Error:", error));
    }, []);

    return (
        <div>
            <h1>Frontend Connected to Backend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
