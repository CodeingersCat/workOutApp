import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export const CreateExercise = () => {
  const [exer, setExer] = useState({
    name: "",
    description: "",
    duration: 0,
    date: new Date(),
    sysdate: new Date(),
    users: [],
  });

  const { name, description, duration, date, users, sysdate } = exer;

  const handleChange = (nam) => (event) => {
    setExer({ ...exer, [nam]: event.target.value });
  };

  useEffect(() => {
    axios.get("https://workout-list-app.herokuapp.com/users").then((userslist) => {
      if (userslist.data.length > 0) {
        setExer({
          ...exer,
          users: userslist.data.map((user) => { return {"name":user.username, "id": user._id}}),
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let pos = date.toString().search('G');
    const rdate = date.toString().substring(0, pos)
    const exers = {name, duration, description, rdate, sysdate};
    axios
      .post("https://workout-list-app.herokuapp.com/exercises/add", exers)
      .then((user) => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formInput = () => {
    return (
      <div className="mb-3">
        <h1 className="text-center mt-3">Add new workout</h1>
        <br />
        <div className="container w-75 mt-5">
          <div className="mb-3">
            <select value={name} onChange={handleChange("name")} className="form-select" placeholder="Username">
              <option defaultValue>Username</option>
              {users.map(user => (
                  <option key={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text-area"
              className="form-control"
              placeholder="Description"
              style={{ height: "100px" }}
              value={description}
              onChange={handleChange("description")}
            ></textarea>
            <label>Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              placeholder="Duration in minutes"
              value={duration}
              onChange={handleChange("duration")}
            ></input>
            <label>Duration ( in minutes )</label>
          </div>
          <div className="form-floating mb-3">
            <span className="text-muted small">&nbsp; Date :</span>
            <br />
            <DatePicker
              className="form-control"
              selected={date}
              onChange={(date) => setExer({ ...exer, date: date, sysdate:date })}
              dateFormat="MMMM d yyyy, h:mm:ss a"
              showTimeSelect
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={onSubmit}
            >
              Add exercise
            </button>
          </div>
        </div>
      </div>
    );
  };

  return( 
  <div>
    {formInput()}
  </div>
  )
};
