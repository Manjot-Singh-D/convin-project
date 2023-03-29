import React, { useState } from "react";
import Card from "../component/Card";
import Loading from "../component/Loading";
import Empty from "../component/Empty";
import "../Stylesheets/styles.css";

import { useDispatch, useSelector } from "react-redux";
import {
  addCard,
  unSelectAllCards,
  changeBucketCard,
} from "../store/slices/userSlices";
import DropDownn from "../component/DropDownn";

const CardPage = () => {
  const [selectBtn, setSelectBtn] = useState(false);
  let path = window.location?.pathname
    ?.split("%20")
    .join(" ")
    .slice(1)
    .split("_");
  let bucketIndex = Number(path.slice(-1));
  let t = path.pop();
  let bucketName = path?.join(" ");
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.users;
  });

  if (data.length === 0) {
    window.location.href = "/";
  }
  const cardDetails = data[bucketIndex].cardDetails;

  const addCardFcn = (cardDetails, idx) => {
    dispatch(addCard({ cardDetails, idx }));
  };

  const getTwoValues = (fromIndex, toIndex) => {
    let allSelectedValues = [...data[toIndex]["cardDetails"]];
    let allOtherValues = [];
    data[fromIndex]["cardDetails"].map((value, idx) => {
      if (value.selected) {
        allSelectedValues = [
          ...allSelectedValues,
          { ...value, ["selected"]: false },
        ];
      } else {
        allOtherValues = [...allOtherValues, value];
      }
    });

    return { allSelectedValues, allOtherValues };
  };
  const moveCards = (fromIndex, toIndex) => {
    let { allSelectedValues, allOtherValues } = getTwoValues(
      fromIndex,
      toIndex
    );

    dispatch(
      changeBucketCard({
        value: allSelectedValues,
        bucketIndex: Number(toIndex),
      })
    );
    dispatch(
      changeBucketCard({
        value: allOtherValues,
        bucketIndex: Number(fromIndex),
      })
    );
    setSelectBtn(false);
  };

  const newCard = {
    name: "",
    link: "",
    selected: false,
    edit: true,
  };

  if (bucketIndex !== -1) {
    return (
      <div className="cardContainer">
        <div className="cardBtnGroup">
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            <span style={{ textDecoration: "underline" }}>BUCKET NAME</span> -{" "}
            {bucketName}
          </h2>
          <button onClick={() => addCardFcn(newCard, bucketIndex)}>
            Add New Card
          </button>
          <button
            onClick={() =>
              setSelectBtn((selectBtn) => {
                if (selectBtn) {
                  dispatch(unSelectAllCards());
                }
                return !selectBtn;
              })
            }
          >
            Select Card
          </button>
          {selectBtn && (
            <DropDownn bucketIndex={bucketIndex} moveCards={moveCards} />
          )}
        </div>
        <div className="cardBox">
          {cardDetails.length === 0 && (
            <Empty value={["Add New Card", "No Card Found."]} />
          )}
          {cardDetails.length > 0 &&
            cardDetails.map((card, index) => {
              return (
                <Card
                  key={index}
                  selectBtn={selectBtn}
                  bucketIndex={bucketIndex}
                  cardIndex={index}
                />
              );
            })}
        </div>
      </div>
    );
  } else {
    <Loading />;
  }
};

export default CardPage;
