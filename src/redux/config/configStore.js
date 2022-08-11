import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice";

export const store = configureStore({
  devTools : process.env.NODE_ENV !== "production",
  reducer: {
		todos: todos
  },
});

// export default store;