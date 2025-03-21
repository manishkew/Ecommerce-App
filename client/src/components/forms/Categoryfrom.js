import React from "react";

const Categoryfrom = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
         
          <input
            type="text"
            className="form-control"
            placeholder="enter new category"
            value = {value}
            onChange={(event)=>setValue(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Categoryfrom;
