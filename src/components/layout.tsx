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
  cb: (data: Query) => void;
  isLoading: boolean;
}

const button = {
  background: "grey",
  height: "30px",
  paddingTop: "0px",
  paddingBottom: "0px",
};

function Layout({ users, cb, isLoading }: Iprops) {
  const [inputName, setInputName] = useState<string>("");
  const [inputAge, setInputAge] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<number>(4);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<Query>({
    name: "",
    age: "",
    limit: 4,
    offset: 0,
  });

  function setCbValue<T extends keyof Query>(
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
      let page = prevPage + 1;
      cb(setCbValue("offset", page, query));
      return page;
    });
  };

  const handleDecrement = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      cb(setCbValue("offset", page, query));
    }
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue((prevSelect) => {
      const newValue: number = parseInt(event.target.value, 10);
      cb(setCbValue("limit", newValue, query));
      return newValue;
    });
  };

  const handleInputChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputName(() => {
      const name = event.target.value;
      cb(setCbValue("name", name, query));
      return name;
    });
  };
  const handleInputChangeAge = (event: ChangeEvent<HTMLInputElement>) => {
    setInputAge(() => {
      const age = event.target.value;
      cb(setCbValue("age", age, query));
      return age;
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={inputName}
          onChange={handleInputChangeName}
          placeholder="Name"
        />
        <input
          type="Number"
          value={inputAge}
          onChange={handleInputChangeAge}
          placeholder="Age"
        />
      </div>
      {isLoading ? (
        users.map((item) => {
          return <div>{`${item.name}, ${item.age}`}</div>;
        })
      ) : (
        <div>Loading</div>
      )}
      <div style={{ display: "flex", height: "30px", alignItems: "center" }}>
        <p>By page</p>
        <select value={selectedValue} onChange={handleChangeSelect}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <p>page</p>
        <button onClick={handleDecrement} style={button}>
          prev
        </button>
        <span>{page}</span>
        <button onClick={handleIncrement} style={button}>
          next
        </button>
      </div>
    </div>
  );
}

export default Layout;
