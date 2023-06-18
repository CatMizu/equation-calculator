import React from "react";

function Parameter({ parameter, onParameterChange, onParameterDelete }) {
  return (
    <div>
      <label>
        Key:
        <input
          type="text"
          name="key"
          value={parameter.key || ""}
          onChange={onParameterChange}
        />
      </label>
      <label>
        Value:
        <input
          type="number"
          name="value"
          value={parameter.value || ""}
          onChange={onParameterChange}
        />
      </label>
      <button onClick={onParameterDelete}>Delete</button>
    </div>
  );
}

export default Parameter;
