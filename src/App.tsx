import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./App.css";
import { clear, search, selectFetch } from "./store/fetchSlice";
import {SearchSearchTypeEnum} from "generated/api"
import { Headline } from "components";

function App() {
  const [type, setType] = useState<SearchSearchTypeEnum>(SearchSearchTypeEnum.Users);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(selectFetch);

  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      if (value.length >= 3) {
        const params = { searchType: type, searchTerm: value };
        await dispatch(search(params));
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
        const params = { searchType: type, searchTerm: value };
        await dispatch(search(params));
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
        {loading === "loading" && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {loading === "loaded" && data
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
