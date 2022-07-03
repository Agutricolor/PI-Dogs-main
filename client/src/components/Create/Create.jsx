import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRace, getTemperaments } from "../../redux/actions";
import "./Create.css";

const validateForm = (form) => {
  var errors = {};
  if (form.name.length < 1) errors.name = "A name is required";
  if (form.height < 1) errors.height = "You need to put height";
  if (form.weight < 1) errors.weight = "You need to put weight";
  return errors;
};

function Create() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [form, setForm] = useState({
    name: "",
    weight: 0,
    height: 0,
    lifeYears: 0,
    temperaments: [],
  });
  const [errors, setErrors] = useState({});
  console.log("form", form);
  const handleAddTemp = (e) => {
    if (!form.temperaments.includes(e.target.value)) {
      setForm({
        ...form,
        temperaments: [...form.temperaments, e.target.value],
      });
    }
  };

  const handleRemoveTemp = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      temperaments: form.temperaments.filter((t) => t !== e.target.name),
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRace(form));
    console.log("submit", form);
    setForm({
      name: "",
      weight: 0,
      height: 0,
      lifeYears: 0,
      temperaments: [],
    });
  };
  useEffect(() => {
    dispatch(getTemperaments());
    setErrors(validateForm(form));
  }, [dispatch, form]);
  return (
    <div className="background">
      <div className="container">
        <h1>Create a new Race/Dog</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div className="inputs">
            <label>Weight in kgs</label>
            <input name="weight" type="number" onChange={handleChange} />
            {errors.weight && <p className="danger">{errors.weight}</p>}
          </div>
          <div className="inputs">
            <label>Height in cm</label>
            <input name="height" type="number" onChange={handleChange} />
            {errors.height && <p className="danger">{errors.height}</p>}
          </div>
          <div className="inputs">
            <label>Years of life</label>
            <input name="lifeYears" type="number" onChange={handleChange} />
          </div>
          <div>
            <select className="select" defaultValue="" onChange={handleAddTemp}>
              <option value="">Choose a temperament</option>
              {temperaments.map((temp) => {
                return <option value={temp}>{temp}</option>;
              })}
            </select>
          </div>
          <div>
            {form.temperaments?.map((t) => (
              <button className="submit" name={t} onClick={handleRemoveTemp}>
                {t}
              </button>
            ))}
          </div>
          <div>
            {!errors.name && !errors.height && !errors.weight ? (
              <div>
                <button className="submit" type="submit">
                  Create
                </button>
              </div>
            ) : (
              <h3 className="danger">Required info is missing</h3>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
