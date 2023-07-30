import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { TodosContext } from "./components/TodosContext.";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// Data For Todo Components
const initialTodo = [
  {
    id: uuidv4(),
    title: "جافا اسكريبت ",
    details: " تعلم لغة الجافا اسكريبت ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب ",
    details: "قراءة كتاب العادات الذرية  ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "صالة الالعاب الرياضة",
    details: " ممارسة رياضة رفع الاثقال  ",
    isCompleted: false,
  },
];

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Alexandria, sans-serif", // تطبيق الخط Alexandria كخط افتراضي
    },
    palette: {
      primary: {main: "#dd2c00"}
    }
    // يمكنك إضافة المزيد من التخصيصات هنا حسب احتياجاتك
  });

  const [todos, setTodos] = useState(initialTodo);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: "flex", height: "100vh", alignItems: "center" }}
        className="App "
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
