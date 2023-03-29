import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addBucket(state, action) {
      state.push(action.payload);
    },
    removeBucket(state, action) {
      state.splice(action.payload, 1);
    },
    removeAllBuckets(state, action) {
      return [];
    },
    editBucket(state, action) {
      let bucketIdx = action.payload.idx;
      let bucketName = action.payload.name;
      return [
        ...state.slice(0, bucketIdx),
        { ...state[bucketIdx], ["bucketName"]: bucketName },
        ...state.slice(bucketIdx + 1),
      ];
    },
    toggleEditBucket(state, action) {
      let bucketIdx = action.payload.idx;
      let bucketEdit = action.payload.edit;
      return [
        ...state.slice(0, bucketIdx),
        { ...state[bucketIdx], ["edit"]: !bucketEdit },
        ...state.slice(bucketIdx + 1),
      ];
    },

    addCard(state, action) {
      let bucketIdx = action.payload.idx;
      let cardDetails = action.payload.cardDetails;

      return [
        ...state.slice(0, bucketIdx),
        {
          ...state[bucketIdx],
          ["cardDetails"]: [...state[bucketIdx]["cardDetails"], cardDetails],
        },
        ...state.slice(bucketIdx + 1),
      ];
    },
    deleteCard(state, action) {
      let bucketIdx = action.payload.bucketIdx;
      let cardIdx = action.payload.cardIdx;
      state[bucketIdx]["cardDetails"].splice(cardIdx, 1);
    },
    editCard(state, action) {
      let bucketIndex = action.payload.bucketIndex;
      let cardIndex = action.payload.cardIndex;
      let cardName = action.payload.cardName;
      let cardValue = action.payload.cardValue;
      return [
        ...state.slice(0, bucketIndex),
        {
          ...state[bucketIndex],
          ["cardDetails"]: [
            ...state[bucketIndex]["cardDetails"].slice(0, cardIndex),
            {
              ...state[bucketIndex]["cardDetails"][cardIndex],
              [cardName]: cardValue,
            },
            ...state[bucketIndex]["cardDetails"].slice(cardIndex + 1),
          ],
        },
        ...state.slice(bucketIndex + 1),
      ];
    },
    toggleEditCard(state, actions) {
      const { bucketIndex, cardIndex, edit } = actions.payload;
      return [
        ...state.slice(0, bucketIndex),
        {
          ...state[bucketIndex],
          ["cardDetails"]: [
            ...state[bucketIndex]["cardDetails"].slice(0, cardIndex),
            {
              ...state[bucketIndex]["cardDetails"][cardIndex],
              ["edit"]: !edit,
            },
            ...state[bucketIndex]["cardDetails"].slice(cardIndex + 1),
          ],
        },
        ...state.slice(bucketIndex + 1),
      ];
    },
    toggleSelectCard(state, actions) {
      const { bucketIndex, cardIndex, select } = actions.payload;
      return [
        ...state.slice(0, bucketIndex),
        {
          ...state[bucketIndex],
          ["cardDetails"]: [
            ...state[bucketIndex]["cardDetails"].slice(0, cardIndex),
            {
              ...state[bucketIndex]["cardDetails"][cardIndex],
              ["selected"]: !select,
            },
            ...state[bucketIndex]["cardDetails"].slice(cardIndex + 1),
          ],
        },
        ...state.slice(bucketIndex + 1),
      ];
    },
    unSelectAllCards(state, actions) {
      let temp = state;
      temp.map((t, idx1) => {
        let cards = t["cardDetails"];

        cards.map((c, idx2) => {
          temp[idx1]["cardDetails"][idx2]["selected"] = false;
        });
      });
      return temp;
    },
    changeBucketCard(state, actions) {
      let { value, bucketIndex } = actions.payload;

      return [
        ...state.slice(0, bucketIndex),
        { ...state[bucketIndex], ["cardDetails"]: value },
        ...state.slice(bucketIndex + 1),
      ];
    },
  },
});
export { userSlice };
export const {
  addBucket,
  removeBucket,
  editBucket,
  toggleEditBucket,
  removeAllBuckets,
  addCard,
  deleteCard,
  editCard,
  toggleEditCard,
  toggleSelectCard,
  unSelectAllCards,
  changeBucketCard,
} = userSlice.actions;
