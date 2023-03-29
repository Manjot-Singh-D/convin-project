import React from "react";

const Editable = (props) => {
  return (
    <div style={{ height: "5rem", width: "100%" }}>
      {props.isEdit && (
        <input
          style={{
            fontSize: props.isEdit ? "1rem" : "1.5rem",
            fontWeight: props.isEdit ? "400" : "700",
            width: "100%",
            backgroundColor: "none",
            color: "#2C3639",
            border: "none",
            borderBottom: props.isEdit ? "0.5px solid #00000040" : "none",
            outline: "none",
            background: "none",
            textOverflow: "ellipsis",
            display: "-webkit-flex",
            lineClamp: "3",
            overflow: "hidden",
            padding: "0.5rem 0rem",
          }}
          placeholder={props.name}
          type="text"
          value={props.value}
          name={props.name}
          onChange={props.handleChange}
          autoFocus
          disabled={!props.isEdit}
        />
      )}
      {!props.isEdit && (
        <p
          style={{
            fontSize: props.name === "link" ? "1rem" : "1.5rem",
            fontWeight: props.name === "link" ? "500" : "700",
            width: "100%",
            backgroundColor: "none",
            color: props.name === "link" ? "#646cffaa" : "#2C3639",
            border: props.isEdit ? "" : "none",
            outline: "none",
            background: "none",
            height: "5rem",
            marginBottom: "0px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            hyphens: "auto",

            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {props.value}
        </p>
      )}
    </div>
  );
};

export default Editable;
