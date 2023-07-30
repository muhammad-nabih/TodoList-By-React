// Material Ui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";

// Other Components
import "./todo.css";
import { TodosContext } from "./TodosContext.";

// Hooks
import { useContext, useState } from "react";

//  Handle Button Click Event From child Component
function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  // Event Handlers

  // Completed Or Not Completed
  function handleCheckClick() {
    const isCompleted=    todos.map((t) =>
        t.id === todo.id
          ? { ...t, isCompleted: (t.isCompleted = !t.isCompleted) }
          : t
      )
    setTodos(
  isCompleted
    );
           localStorage.setItem("todos", JSON.stringify(isCompleted));
  }

  // <==== this Group is parent of Delete Button ==== >

  // Show Dialog Of Delete ;
  function handleDelete() {
    setShowDeleteDialog(true);
  }

  // Close Dialog
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  // Delete Todo From List
  function handleDeleteTodo() {
    const updateTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updateTodos);
    handleDeleteDialogClose();
       localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  //<=== This Group is parent of Edit Button ===>

  // Hide Update dialog

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  // Show Edit dialog

  function handleUpdateTodoDialog() {
    setShowUpdateDialog(true);
  }

  // Edit Todo

  function handleUpdateTodo() {
    const updatedTodos = todos.map((t) => {
      console.log(todo.id);
      if (t.id === todo.id) {
        const dataUpdate = {
          ...t,
          title: updateTodo.title,
          details: updateTodo.details,
        };
        return dataUpdate;
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    handleUpdateClose();
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <>
      {/* Modal Dialog Delete*/}
      <Dialog
        onClose={handleDeleteDialogClose}
        sx={{ direction: "rtl" }}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من رغبتك في حذف المهمة ؟"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامة
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteTodo}>
            نعم . قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==Modal Dialog Delete == */}

      {/* Modal Dialog Edit*/}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        sx={{ direction: "rtl" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمة"}</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="العنوان "
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({
                ...updateTodo,
                title: e.target.value,
              });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="التفاصيل "
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e) =>
              setUpdateTodo({ ...updateTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إلغاء </Button>
          <Button autoFocus onClick={handleUpdateTodo}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==Modal Dialog Edit == */}

      <Card
        sx={{
          minWidth: 275,
          background: "#1c1b22",
          color: "white",
          marginTop: 5,
        }}
        className="todoCard"
      >
        <CardContent>
          <Grid container sx={{ flexDirection: "row-reverse" }} spacing={2}>
            <Grid xs={8}>
              <Typography variant="h5"  sx={{ textDecoration : todo.isCompleted ? "line-through" : "none" ,textAlign: "right" }}>
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ textAlign: "right", fontWeight: 200 }}
              >
                {todo.details}{" "}
              </Typography>
            </Grid>
            <Grid
              justifyContent={"space-around"}
              display={"flex"}
              alignItems={"center"}
              xs={4}
            >
              {/* Delete ICon Button  */}
              <IconButton
                onClick={handleDelete}
                sx={{
                  color: "#f50057",
                  background: "white",
                  border: "solid #f50057",
                }}
                aria-label="delete"
                size="medium"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              {/* == Delete Icon Button == */}

              {/* Edit ICon Button  */}
              <IconButton
                onClick={handleUpdateTodoDialog}
                sx={{
                  color: "#03a9f4",
                  background: "white",
                  border: "solid #03a9f4",
                }}
                aria-label="edit"
                size="medium"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              {/* == Edit Icon Button == */}

              {/* Check Icon Button  */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                sx={{
                  color: todo.isCompleted ? "white" : "#00e676",
                  background: todo.isCompleted ? "#00e676" : "white",
                  border: "solid #00e676",
                }}
                aria-label="check"
                size="medium"
              >
                <CheckIcon fontSize="inherit" />
              </IconButton>
              {/* ==Check Icon Button == */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
