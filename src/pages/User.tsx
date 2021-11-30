import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const User = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        async function fetch() {
            const res = await axios.get(`https://api.github.com/users/${id}`);
            console.log("res ,id", res);
            setData(res.data);
        }
        fetch();
    }, [id]);
    if (!data) {
        return <div>...</div>;
    }
    return (
        <div>
            <Link to="/">Home</Link>
            <h2>Name: {data.login}</h2>

            <br />
            <img alt="avatar" height={200} width={200} src={data.avatar_url} />
        </div>
    );
};

export default User;
