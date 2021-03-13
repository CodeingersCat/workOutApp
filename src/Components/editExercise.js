import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditExercise = () => {
  const { id } = useParams();

  const [values, setValues] = useState({
    name: "",
    description: "",
    duration: 0,
    sysdate: new Date(),
  });

  const { name, description, duration, sysdate } = values;

  useEffect(() => {
    axios.get("https://workout-list-app.herokuapp.com/exercises/" + id).then((da) => {
      const d = da.data;
      setValues({...values, name: d.name, description: d.description, duration: d.duration, sysdate: new Date(d.sysdate)});
      
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (nam) => (event) => {
    setValues({ ...values, [nam]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let pos = sysdate.toString().search('G');
    const rdate = sysdate.toString().substring(0, pos)
    const exers = {name, duration, description, rdate, sysdate};
    axios
      .post("https://workout-list-app.herokuapp.com/exercises/update/"+id, exers)
      .then((user) => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mb-3">
      <h1 className="text-center mt-3">Edit workout</h1>
      <br />
      <div className="container w-75 mt-5">
        <div className="form-floating mb-3">
          <input
            className="form-control"
            value={name}
            placeholder={name}
            disabled
          ></input>
          <label>Username</label>
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
            selected={sysdate}
            value={sysdate}
            onChange={(dat) => setValues({ ...values, sysdate: dat })}
            dateFormat="MMMM d yyyy, h:mm:ss a"
            showTimeSelect
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={onSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary mx-1"
            onClick={() => {window.location = '/'}}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
