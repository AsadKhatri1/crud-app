import React, { useState } from 'react';
import './style.css';

const Home = () => {
  const [inputs, setInputs] = useState({
    title: '',
    expense: '',
    date: '',
  });

  const [data, setData] = useState([]);

  const [editClick, setEditClick] = useState(false);

  const [editIndex, setEditIndex] = useState('');

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editClick) {
      let tempTableData = data;
      Object.assign(tempTableData[editIndex], inputs);
      setData([...tempTableData]);
      setEditClick(false);
      setInputs({
        title: '',
        expense: '',
        date: '',
      });
    } else {
      setData([...data, inputs]);
      setInputs({
        title: '',
        expense: '',
        date: '',
      });
    }
  };

  const deletHandler = (index) => {
    let finlaData = data.filter((item, i) => i !== index);
    setData(finlaData);
  };

  const editHandler = (index) => {
    let tempData = data[index];

    setInputs({
      title: tempData.title,
      expense: tempData.expense,
      date: tempData.date,
    });
    setEditClick(true);

    setEditIndex(index);
  };
  return (
    <>
      <div className="page">
        <h1>Crud App</h1>
      </div>
      <div className="form-div page">
        <form className="form" onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            value={inputs.title}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="expense">Expense</label>
          <br />
          <input
            type="number"
            name="expense"
            id="expense"
            placeholder="expense"
            value={inputs.expense}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="date">Date</label>
          <br />
          <input
            type="date"
            name="date"
            id="date"
            placeholder="date"
            value={inputs.date}
            onChange={handleChange}
          />
          <br />
          <br />
          <button type="submit" className="button">
            {editClick ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      {data.map((item, index) => (
        <ul className="list" key={item.title}>
          <li>{item.title}</li>
          <li>{item.expense}</li>
          <li>{item.date}</li>
          <button onClick={() => deletHandler(index)}>Delete</button>
          <button onClick={() => editHandler(index)}>Edit</button>
        </ul>
      ))}

      <div className="display"></div>
    </>
  );
};

export default Home;
