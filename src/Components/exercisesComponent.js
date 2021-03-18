import React, { useEffect, useState } from "react";
import axios from "axios";

export const Exercise = () => {
  const [execs, setExecs] = useState([]);
  const [loading, setLoading] = useState({
    message: "Loading..."
  })
  const { message } = loading;

  useEffect(() => {
    axios.get("https://workout-list-app.herokuapp.com/exercises").then((res) => {
      let exers = res.data.map((exes) => {
        return {
          name: exes.name,
          description: exes.description,
          date: new Date(exes.sysdate),
          duration: exes.duration,
          id: exes._id,
        };
      });
      setExecs(exers);
      if(exers.length === 0){
        setLoading({message: "No workouts yet!"})
      }
    });
  }, []);

  const deleteEx = (id) => {
    axios.delete("https://workout-list-app.herokuapp.com/exercises/delete/" + id).then((res) => {
      let exers = execs.filter((ex) => ex.id !== res.data.id);
      setExecs(exers);
    });
  };

  return (
    <div className="overflow-hidden">
      <h1 className="text-center mt-3" style={{display: (execs.length === 0) ?  "" : "none"}}>{message}</h1>
      <div className="row px-5">
        {execs.slice(0).reverse().map((obj) => (
          <div className="col-sm-4 py-4 d-flex justify-content-center" key={obj.id}>
            <div
              className="card border border-dark border-2 rounded-3"
              style={{ width: "18rem", height: "23rem" }}
            >
              <div className="card-body">
                <h1 className="card-title display-2">{obj.duration}</h1>
                <span className="label border-bottom border-info">minutes</span>
                <div className="card-text py-4">
                  <div className="h4">{obj.name}</div>
                  <br />
                  <span>{obj.description}</span>
                  <br />
                  <span className="label">{obj.date.toString().substring(0, obj.date.toString().search('G'))}</span>
                </div>
                <div className="pt-3">
                  <button className="btn btn-outline-info" onClick={() => {window.location = "/edit/" + obj.id}}>
                    <i className="bi bi-pencil-fill" /> Edit
                  </button>
                  <button
                    className="btn btn-outline-danger mx-1"
                    onClick={() => deleteEx(obj.id)}
                  >
                    <i className="bi bi-trash-fill" /> Delete
                  </button>
              </div>
            </div>
          </div>
      </div>
        ))}
      </div>
    </div>
  );
};
