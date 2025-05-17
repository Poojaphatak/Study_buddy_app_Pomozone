document.getElementById("login-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
if (response.ok) {
  localStorage.setItem("userId", data.userId);
  window.location.href = "/spaces";
  
  console.log(data.userId);
} else {
  alert(data.error || "Login failed");
}
});
