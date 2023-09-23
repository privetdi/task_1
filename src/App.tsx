import { requestUsers, requestUsersWithError, User, Query } from "./api";
import "./styles.css";
import Layout from "./components/layout";
import { useEffect, useState } from "react";

export default function App() {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [user, setUser] = useState<Query>({
    name: "",
    age: "",
    limit: 4,
    offset: 0,
  });
  let [result, setResult] = useState<User[]>([]);

  function searchUser(data: Query) {
    setIsLoading(false);
    setUser({
      name: data.name,
      age: data.age,
      limit: data.limit,
      offset: data.offset,
    });
  }

  useEffect(() => {
    requestUsers(user).then((data) => {
      setResult(data);
      setIsLoading(true);
    });
    requestUsersWithError({ name: "", age: "", limit: 4, offset: 0 }).catch(
      console.error
    );
  }, [user]);

  return (
    <div>
      <Layout users={result} isLoading={isLoading} cb={searchUser} />
    </div>
  );
}
