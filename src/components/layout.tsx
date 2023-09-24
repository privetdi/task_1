import React, {
  ChangeEventHandler,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Query, User } from "../api";

interface Iprops {
  users: User[];
  returnProps: (data: Query) => void;
  isLoading: boolean;
}

const button = {
  background: "grey",
  height: "30px",
  paddingTop: "0px",
  paddingBottom: "0px",
};

function Layout({ users, returnProps, isLoading }: Iprops) {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [select, setSelect] = useState<number>(4);
  const [page, setPage] = useState<number>(0);
  const [query, setQuery] = useState<Query>({
    name: "",
    age: "",
    limit: 4,
    offset: 0,
  });
  function getParametersRequest<T extends keyof Query>(
    property: T,
    value: Query[T],
    prevObject: Query
  ): Query {
    let newObject = {
      ...prevObject,
      [property]: value,
    };
    setQuery(newObject);
    return newObject;
  }

  const handleIncrement = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      returnProps(getParametersRequest("offset", nextPage, query));
      return nextPage;
    });
  };

  const handleDecrement = () => {
    setPage((prevPage) => {
      returnProps(getParametersRequest("offset", prevPage - 1, query));
      return prevPage - 1;
    });
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect((prevSelect) => {
      const newValue: number = parseInt(event.target.value, 10);
      returnProps(getParametersRequest("limit", newValue, query));
      return newValue;
    });
  };

  const handleInputChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(() => {
      const name = event.target.value;
      returnProps(getParametersRequest("name", name, query));
      return name;
    });
  };
  const handleInputChangeAge = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(() => {
      const age = event.target.value;
      returnProps(getParametersRequest("age", age, query));
      return age;
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={name}
          onChange={handleInputChangeName}
          placeholder="Name"
        />
        <input
          type="Number"
          value={age}
          onChange={handleInputChangeAge}
          placeholder="Age"
        />
      </div>
      {isLoading ? (
        users.length > 0 ? (
          users.map((item, index) => {
            return <div key={index}>{`${item.name}, ${item.age}`}</div>;
          })
        ) : (
          "Users not found"
        )
      ) : (
        <div>Loading</div>
      )}
      {isLoading ? (
        <div style={{ display: "flex", height: "30px", alignItems: "center" }}>
          <p>By page</p>
          <select value={select} onChange={handleChangeSelect}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          <p>page</p>
          <button
            disabled={page === 0 ? true : false}
            onClick={handleDecrement}
            style={button}
          >
            prev
          </button>
          <span>{page + 1}</span>
          <button onClick={handleIncrement} style={button}>
            next
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Layout;
