import { requestUsers, requestUsersWithError, User, Query } from "./api";
import "./styles.css";
import UserList from "./components/userList";
import { useEffect, useState } from "react";

export default function App() {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [userParam, setUserPram] = useState<Query>({
    name: "",
    age: "",
    limit: 4,
    offset: 0,
  });
  let [result, setResult] = useState<User[]>([]);
  const [error, setError] = useState<String | null>(null);

  function searchUser(data: Query) {
    setIsLoading(false);
    setUserPram({
      name: data.name,
      age: data.age,
      limit: data.limit,
      offset: data.offset < 0 ? 0 : data.offset,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      requestUsers(userParam)
        .then((data) => {
          setResult(data);
          setIsLoading(true);
          setError(null);
        })
        .catch((error) => {
          console.error(
            "Произошла ошибка при запросе пользователей:",
            error.message
          );
          setError(
            "Произошла ошибка при запросе пользователей: " + error.message
          );
        });
    };
    requestUsersWithError({ name: "", age: "", limit: 4, offset: 0 }).catch(
      console.error
    );
    fetchData();
  }, [userParam]);

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <UserList
          users={result}
          isLoading={isLoading}
          onFilterChange={searchUser}
        />
      )}
    </div>
  );
}
