import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
  comments:[],
};

export const __getTodos = createAsyncThunk("todos/getTodos", async (payload, thunkAPI) => {
  try {
    // const data = await axios.get("http://localhost:3001/todos");
    const data = await axios.get("https://redux-toolkit-todolist.herokuapp.com/todos");
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteTodos = createAsyncThunk("todos/deleteTodos", async (payload, thunkAPI) => {
  try {
    // const data = await axios.delete(`http://localhost:3001/todos/${payload}`);
    const data = await axios.delete(`https://redux-toolkit-todolist.herokuapp.com/todos/${payload}`);
    thunkAPI.dispatch(__getTodos())
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __postTodos = createAsyncThunk("todos/postTodos", async (payload, thunkAPI) => {
  try {
    // const data = await axios.post("http://localhost:3001/todos", payload);
    const data = await axios.post("https://redux-toolkit-todolist.herokuapp.com/todos", payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) { 
    return thunkAPI.rejectWithValue(error);
  }
});

export const __putTodos = createAsyncThunk("todos/putTodos", async (payload, thunkAPI) => {
  try {
    // await axios.patch(`http://localhost:3001/todos/${payload.id}`, payload);
    await axios.patch(`https://redux-toolkit-todolist.herokuapp.com/todos/${payload.id}`, payload);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    // return thunkAPI.rejectWithValue(error);
  }
});

export const __postComment = createAsyncThunk('comments/postComment', async (payload, thunkAPI) => {
  try {
    // const data = await axios.post('http://localhost:3001/comments', payload);
    const data = await axios.post('https://redux-toolkit-todolist.herokuapp.com/comments', payload);
    // return thunkAPI.fulfillWithValue(payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue("ERROR=>", error);
  }
});

export const __getComments = createAsyncThunk("comments/getComments", async (payload, thunkAPI) => {
  try {
    // const data = await axios.get('http://localhost:3001/comments');
    const data = await axios.get('https://redux-toolkit-todolist.herokuapp.com/comments');
    // return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteComment = createAsyncThunk("comments/delteComments", async (payload, thunkAPI) => {
  try {
    // await axios.delete(`http://localhost:3001/comments/${payload}`);
    await axios.delete(`https://redux-toolkit-todolist.herokuapp.com/comments/${payload}`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updateComment = createAsyncThunk("comments/updateComments", async (payload, thunkAPI) => {
  try {
    await axios.patch(`https://redux-toolkit-todolist.herokuapp.com/comments/${payload}`, payload);
    thunkAPI.dispatch(__getComments());
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});




export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos.filter((todo) => todo.id !== action.payload);
    },
    [__deleteTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__postTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__postTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__putTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__putTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      // state.todos = action.payload
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
        return { ...todo, content: action.payload.content };
        } else {
        return todo;
        }
        });
    },
    [__putTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__postComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter((v) => v.id !== action.payload);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },



    
  },
});

export const { } = todosSlice.actions;
export default todosSlice.reducer;
