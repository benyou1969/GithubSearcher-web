import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./App.css";
import { clear, selectFetch, setDataReducer } from "./store/fetchSlice";

export const Headline = () => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <img alt="logo" src="/logo.png" height={40} width={40} />
      <div style={{ marginLeft: 15 }}>
        <span style={{ fontWeight: "bold", fontSize: 22 }}>
          Github Searcher
        </span>
        <br />
        <span style={{ fontWeight: 400, color: "gray" }}>
          Search users or repositories below
        </span>
      </div>
    </div>
  );
};

function App() {
  const [type, setType] = useState("users");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector(selectFetch);

  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      if (value.length >= 3) {
        await dispatch(setDataReducer(type, value));
      }
      if (value.length === 0) {
        await dispatch(clear());
      }
    }
  };

  const handleChangeValue = async (e: any) => {
    return setValue(e.currentTarget.value);
  };

  const handleChangeType = async (e: any) => {
    setType(e.currentTarget.value);
    console.log("type", type);
    console.log("value", value);
  };

  React.useEffect(() => {
    async function fetch() {
      console.log("type", type);
      console.log("value", value);
      if (value.length >= 3) {
        await dispatch(setDataReducer(type, value));
      }
    }
    fetch();
  }, [type]);

  return (
    <div className="App">
      <br />
      <div
        style={{
          display: data ? "inherit" : "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div>
          <Headline />
          <br />
          <div>
            <input
              type="search"
              name="search"
              placeholder="Start typing to search.."
              onChange={handleChangeValue}
              onKeyDown={handleSearch}
              value={value}
              style={{
                padding: 2,
                width: "300px",
                height: 45,
                marginRight: 10,
                border: "1px solid #e7e7e7",
              }}
            />

            <select
              title="Type"
              name="type"
              defaultValue={type}
              onChange={handleChangeType}
              style={{
                padding: 10,
                width: 110,
                height: 45,
                marginRight: 10,
                border: "1px solid #e7e7e7",
              }}
            >
              <option value="users">users</option>
              <option value="repositories">repositories</option>
              <option value="issues">issues</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="wrapper">
        {data
          ? data?.map((item, index) => (
              <div className="column">
                <div className="card" key={index}>
                  {type === "users" ? (
                    <div>
                      <Link to={`/users/${item.login}`}>
                        name: {item.login}
                      </Link>
                      <br />
                      <img
                        alt={"Pictures"}
                        height={100}
                        width={100}
                        src={item.avatar_url}
                      />
                    </div>
                  ) : type === "repositories" ? (
                    <div>
                      <a href={item.html_url} target="_blank" rel="noreferrer">
                        {item.full_name}
                      </a>
                      <p>{item.description}</p>
                    </div>
                  ) : type === "issues" ? (
                    <div>
                      <a href={item.html_url} target="_blank" rel="noreferrer">
                        url
                      </a>
                      <h1>{item.title}</h1>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
