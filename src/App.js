import "./App.css";
import Card from "./components/Card";
import LeaderCard from "./components/LeaderCard";
import { BeatLoader } from "react-spinners";
import { useState, useRef, useEffect } from "react";
const users = [];
function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [usersArray, setUsersArray] = useState(users);
  const [loading, setLoading] = useState(true);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const pointsRef = useRef();
  const imageUrlRef = useRef(null);

  function searchClickHandler() {
    if (query.length < 3) {
      return setError("The characters should be greater or equal to 3");
    } else {
      setError(null);
      setUsersArray(usersArray.filter((user) => user.name.includes(query)));
    }
  }

  function serachChangeHandler(event) {
    setQuery(event.target.value);
    if (event.target.value.length >= 3) {
      setError(null);
    }
  }
  async function submitHandler(event) {
    event.preventDefault();
    console.log(URL.createObjectURL(imageUrlRef.current.files[0]))
    await fetch("http://localhost:4000/api/users/", {
      method: "POST",
      body: JSON.stringify({
        id: usersArray.length + 1,
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        imageUrl: URL.createObjectURL(imageUrlRef.current.files[0]),
        points: pointsRef.current.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (
      nameRef.current.value &&
      descriptionRef.current.value &&
      pointsRef.current.value
    ) {
      setUsersArray([
        {
          id: usersArray.length + 1,
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          imageUrl: URL.createObjectURL(imageUrlRef.current.files[0]),
          points: pointsRef.current.value,
        },
        ...users,
      ]);
    }
  }
  
  async function getUsers() {
    try {
      const response = await fetch("http://localhost:4000/api/users/", {
        method: "GET",
      });
      const data = await response.json();
      setUsersArray(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }
  

  useEffect(() => {
    getUsers();
  }, []);
  async function deleteUser(id) {
    await fetch(`http://localhost:4000/api/users/${id}`, {
      method: "DELETE"
    }).then((result) => {
      result.json();
      getUsers()

    });
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Leaderboard</h1>
      <Card className={"w-50 mt-3"}>
        <h2>Create User</h2>
        <form onSubmit={submitHandler}>
          <div>
            <input
              placeholder="Enter Name"
              type="text"
              required
              ref={nameRef}
            />
          </div>
          <div>
            <input
              placeholder="Enter Description"
              type="text"
              required
              ref={descriptionRef}
            />
          </div>
          <div>
            <input
              placeholder="Enter Points"
              type="number"
              required
              ref={pointsRef}
            />
          </div>
          <div>
            <input type="file" ref={imageUrlRef} />
          </div>
          <button className="btn" type="submit">
            Add User
          </button>
        </form>
      </Card>

      <Card className={"w-50 mt-3"}>
        <input
          placeholder="Search User"
          onChange={serachChangeHandler}
          className={error && "input-error"}
          value={query}
        />
        <button className="btn-custom" onClick={searchClickHandler}>
          Search
        </button>
        {error ? <div className="error-div">{error}</div> : ""}
      </Card>
      <Card className={"w-50 mt-3"}>
        {loading ? (
          <BeatLoader size={25} color="green"/>
        ) : usersArray.length ? (
          usersArray.map(function (user) {
            return (
              <LeaderCard
                name={user.name}
                description={user.description}
                imageUrl={user.imageUrl}
                points={user.points}
                id={user.id}
                onDelete={deleteUser}
              />
            );
          })
        ) : (
          <div>Users not Found</div>
        )}
      </Card>
    </>
  );
}

export default App;
