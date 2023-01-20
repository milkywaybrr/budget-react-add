import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const params = useParams();

    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
        .then((response) => response.json())
        .then((data) => setUser(data));
    }, []);

    console.log(user);

    return(
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.website}</p>
            <p>{user.username}</p>
            <p>{user.address?.city}</p>
        </div>
    )
}

export default UserPage;