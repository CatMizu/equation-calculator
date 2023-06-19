import React from "react";
import styles from "./Parameters.module.css";

function Parameter({ parameter, onParameterChange, onParameterDelete }) {
  return (
    <div>
      <label>
        Key:
        <input
          type="text"
          name="name"
          value={parameter.name || ""}
          className={styles.inputField}
          onChange={(event) => onParameterChange("name", event)}
        />
      </label>
      <label>
        Value:
        <input
          type="number"
          name="value"
          value={parameter.value || ""}
          className={styles.inputField}
          onChange={(event) => onParameterChange("value", event)}
        />
      </label>
      <button className={styles["delete-button"]} onClick={onParameterDelete}>
        Delete
      </button>
    </div>
  );
}

export default Parameter;
