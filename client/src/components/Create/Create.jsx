import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRace, getTemperaments } from "../../redux/actions";

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
  };

  const handleHeightChange = (e) => {
    setForm({
      ...form,
      height: e.target.value,
    });
  };

  const handleWeightChange = (e) => {
    setForm({
      ...form,
      weight: e.target.value,
    });
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
  }, [dispatch]);
  return (
    <div>
      <h1>Create a new Race/Dog</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={form.name} onChange={handleNameChange} />
        <label>Weight in kgs</label>
        <input type="number" onChange={handleWeightChange} />
        <label>Height in cm</label>
        <input type="number" onChange={handleHeightChange} />
        <label>Years of life</label>
        <input type="number" onChange={handleLifeChange} />
        <select defaultValue="" onChange={handleAddTemp}>
          <option value="">Choose a temperament</option>
          {temperaments.map((temp) => {
            return <option value={temp}>{temp}</option>;
          })}
        </select>
        <div className="temperaments">
          {form.temperaments?.map((t) => (
            <button name={t} onClick={handleRemoveTemp}>
              {t}
            </button>
          ))}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Create;
