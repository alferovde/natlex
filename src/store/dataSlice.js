import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import randomDate from "@js-random/date";
const initialState = {
  data: [],
  isLoading: false,
};

export const fetchAllPost = createAsyncThunk(
  "data/fetchAllPost",
  async (_, {}) => {
    console.log("adad");
    let resuls = await axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/posts`,
    });

    return resuls;
  }
);

export const getAllData = createSlice({
  name: "data",
  initialState,
  reducers: {
    editUser(state, action) {
      let newSatate = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });

      state.data = newSatate;
    },

    deleteUser(state, action) {
      state.data = current(state.data).filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPost.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchAllPost.fulfilled, (state, action) => {
        //Выбираю первые 10 записей для примера

        state.data = action.payload.data.slice(0, 10);

        state.data = state.data.map((item) => {
          //Добавляем в стейт рандомную дату, так как API этого нет.
          //Требуется по заданию
          let from2010To2012 = randomDate({
            from: new Date(2023, 3, 1).getTime(),
            to: new Date(2023, 3, 30).getTime(),
          });
          return {
            ...item,
            date: from2010To2012.getTime(),
            backGroundColor: "",
          };
        });

        state.isLoading = false;
      })
      .addCase(fetchAllPost.rejected, (state, action) => {});
  },
});
export const { editUser, deleteUser } = getAllData.actions;
export default getAllData.reducer;
