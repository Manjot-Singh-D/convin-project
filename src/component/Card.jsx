import React from "react";

import Editable from "./Editable";
import ModalContainer from "./ModalContainer";
import "../Stylesheets/styles.css";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteCard,
  editCard,
  toggleEditCard,
  toggleSelectCard,
} from "../store/slices/userSlices";

const Card = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.users;
  });
  const { name, link, edit, selected } =
    data[props.bucketIndex]["cardDetails"][props.cardIndex];

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(
      editCard({
        bucketIndex: props.bucketIndex,
        cardIndex: props.cardIndex,
        cardName: e.target.name,
        cardValue: e.target.value,
      })
    );
  };
  const editValue = (bucketIndex, cardIndex, edit) => {
    dispatch(toggleEditCard({ bucketIndex, cardIndex, edit }));
  };

  const selectValue = (bucketIndex, cardIndex, select) => {
    dispatch(toggleSelectCard({ bucketIndex, cardIndex, select }));
  };

  const saveCardDetails = (bucketIndex, cardIndex) => {
    editValue(bucketIndex, cardIndex, edit);
    dispatch(
      editCard({ bucketIndex, cardIndex, cardName: "name", cardValue: name })
    );
    dispatch(
      editCard({ bucketIndex, cardIndex, cardName: "link", cardValue: link })
    );
  };
  const deleteCardFcn = (bucketIdx, cardIdx) => {
    dispatch(deleteCard({ bucketIdx, cardIdx }));
  };

  return (
    <div className={`card ${selected ? "selected" : ""}`}>
      {!edit && (
        <ModalContainer
          selectBtn={props.selectBtn}
          selected={selected}
          selectValue={selectValue}
          cardIndex={props.cardIndex}
          bucketIndex={props.bucketIndex}
        />
      )}
      <div
        className="cardEditValue"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Editable
          isEdit={edit}
          handleChange={(e) => handleChange(e)}
          value={name}
          name={"name"}
        />
        <Editable
          isEdit={edit}
          handleChange={(e) => handleChange(e)}
          value={link}
          name={"link"}
        />
      </div>

      <div className="cardBtnGroup">
        <button
          onClick={() => deleteCardFcn(props.bucketIndex, props.cardIndex)}
        >
          Delete Card
        </button>
        {!edit && (
          <button
            style={{ color: "#ffffff" }}
            onClick={() => editValue(props.bucketIndex, props.cardIndex, edit)}
          >
            Edit
          </button>
        )}
        {edit && (
          <button
            onClick={() => saveCardDetails(props.bucketIndex, props.cardIndex)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
