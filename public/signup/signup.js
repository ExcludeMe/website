function showError(error) {
  document.getElementById("input-error").innerHTML = error;
}
function removeError() {
  document.getElementById("input-error").innerHTML = "";
}

document.getElementById("password-confirm").addEventListener("input", (ev) => {
  let password = document.getElementById("password").value;
  let confirm = document.getElementById("password-confirm").value;
  if (confirm != password) {
    showError("The passwords doesn't match.");
  } else {
    removeError();
  }
});

document.getElementById("username").addEventListener("input", (ev) => {
  let reg = new RegExp("^[^:,-!?\\=+#'$%&/()[]{}|<>]+$");
  let username = document.getElementById("username").value;
  if (!reg.exec(username)) {
    showError("The username can't include ^:,-!?\\=+#'$%&/()[]{}|<>]+$");
  } else {
    removeError();
  }
});
