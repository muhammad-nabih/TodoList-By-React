import * as React from "react";
// استيراد الهوكات
import { useEffect, useState, useContext } from "react";
import { TodosContext } from "./TodosContext.";
// آيقونات Material UI
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// مكوّنات
import Todo from "./Todo";
// مكتبة أخرى
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [todo, setTodo] = useState("");
  const { todos, setTodos } = useContext(TodosContext);
  const [displayTodosType, setDisplayTodosType] = useState("all");

  let todosType = todos;

  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTodos = todos.filter((t) => {
    return t.isCompleted === false;
  });

  if (displayTodosType === "completed") {
    todosType = completedTodos;
  } else if (displayTodosType === "non-completed") {
    todosType = notCompletedTodos;
  } 

  const TodosJxs = todosType.map((t) => {
    return <Todo id={t.id} todo={t} />;
  });

  // Completed and Not completed and all todo

  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  function handleClick() {
    const newTask = {
      id: uuidv4(),
      title: todo,
      details: "",
      isCompleted: false,
    };
    const addTodo = [...todos, newTask];
    setTodos(addTodo);
    localStorage.setItem("todos", JSON.stringify(addTodo));
    setTodo("");
  }

  const valid = !todo ? true : false;

  useEffect(() => {
    // const storageData = JSON.parse(localStorage.getItem("todos"));
    // if (Array.isArray(storageData)) {
    //   setTodos(storageData);
    // }


        const storageData = JSON.parse(localStorage.getItem("todos"))??[];
        
          setTodos(storageData);
      
  }, []);

  // useEffect(() => {
  //   const storageDate = JSON.parse(localStorage.getItem("todos"));
  //   setTodos(storageDate);
  // }, []);

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxHeight:"80vh", overflowY:"scroll"}}>
        <CardContent>
          <Typography color={'primary'} variant="h2" sx={{ fontWeight: 400 }}>
            مهامي{" "}
          </Typography>

          <Divider />

          {/*  بداية مجموعة أزرار التصفية */}
          <ToggleButtonGroup
            value={displayTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            style={{ marginTop: "20px" }}
            color="primary"
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/*  نهاية مجموعة أزرار التصفية */}
          {TodosJxs}

          {/* حقل الإدخال + زر الإضافة */}
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 2 }}
            flexDirection={"row-reverse"}
          >
            <Grid xs={8}>
              {" "}
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمة "
                variant="outlined"
                value={todo}
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={4}>
              <Button
                disabled={valid}
                sx={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleClick();
                }}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
