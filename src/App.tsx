import { requestUsers, requestUsersWithError, User, Query } from "./api";
import "./styles.css";
import Layout from "./components/layout";
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
  const [error, setError] = useState<String | null>(null); // Состояние для сообщения об ошибке

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
          setError(null); // Очищаем сообщение об ошибке при успешном запросе
        })
        .catch((error) => {
          console.error(
            "Произошла ошибка при запросе пользователей:",
            error.message
          );
          setError(
            "Произошла ошибка при запросе пользователей: " + error.message
          );
          // Дополнительные действия по обработке ошибки, если необходимо
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
        <Layout users={result} isLoading={isLoading} returnProps={searchUser} />
      )}
    </div>
  );
}
