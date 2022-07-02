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

  const handleAddTemp = (e) => {
    if (form.temperaments.includes(e.target.value)) return;
    setForm({
      ...form,
      temperaments: [...form.temperaments, e.target.value],
    });
  };

  const handleRemoveTemp = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      temperaments: form.temperaments.filter((t) => t !== e.target.name),
    });
  };

  const handleNameChange = (e) => {
    setForm({
      ...form,
      name: e.target.value,
    });
    setErrors(validateForm(form));
  };

  const handleHeightChange = (e) => {
    setForm({
      ...form,
      height: e.target.value,
    });
    setErrors(validateForm(form));
  };

  const handleWeightChange = (e) => {
    setForm({
      ...form,
      weight: e.target.value,
    });
    setErrors(validateForm(form));
  };

  const handleLifeChange = (e) => {
    setForm({
      ...form,
      lifeYears: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRace(form));
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
          <div>
            <label>Name</label>
            <input type="text" value={form.name} onChange={handleNameChange} />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div>
            <label>Weight in kgs</label>
            <input type="number" onChange={handleWeightChange} />
            {errors.weight && <p className="danger">{errors.weight}</p>}
          </div>
          <div>
            <label>Height in cm</label>
            <input type="number" onChange={handleHeightChange} />
            {errors.height && <p className="danger">{errors.height}</p>}
          </div>
          <div>
            <label>Years of life</label>
            <input type="number" onChange={handleLifeChange} />
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
