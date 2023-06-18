import React from "react";
import styles from "./Parameters.module.css";

function Parameter({ parameter, onParameterChange, onParameterDelete }) {
  return (
    <div>
      <label className={styles.labelField}>
        Key:
        <input
          type="text"
          name="name"
          value={parameter.name || ""}
          className={styles.inputField}
          onChange={(event) => onParameterChange("name", event)}
        />
      </label>
      <label className={styles.labelField}>
        Value:
        <input
          type="number"
          name="value"
          value={parameter.value || ""}
          className={styles.inputField}
          onChange={(event) => onParameterChange("value", event)}
        />
      </label>
      <button onClick={onParameterDelete}>Delete</button>
    </div>
  );
}

export default Parameter;
