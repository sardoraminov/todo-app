// For update todos
let title = document.getElementById("title");
let user = document.getElementById("user");
let updateBtn = document.getElementById("updateBtn");

const server_uri = "http://localhost:3001/todos";

// For deleting
let deleteBtn = document.getElementById("deleteBtn");

function updateTodo() {
  const id = updateBtn.getAttribute("data-id");

  axios
    .put(`/todos/edit/${id}`, {
      title: title.value,
      user: user.value,
    })
    .then((res) => { 
      console.log(res.data);
      window.location.replace(server_uri);
    })
    .catch((err) => {
      console.error(err);
    });
}

function deleteOne() {
  const id = deleteBtn.getAttribute("data-id");
  console.log(id);

  axios
    .delete(`/todos/${id}`)
    .then((res) => {
      window.location.reload();
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

updateBtn.addEventListener("click", updateTodo);
deleteBtn.addEventListener("click", deleteOne);
