// Fetch user progress from backend
// Fetch user progress from backend
async function fetchProgress() {
  const userId = localStorage.getItem('userId');
  if (!userId) return;

  try {
    const res = await fetch(`/progress/${userId}`);
    const data = await res.json();

    const completed = data.focusMins || 0;
    const goal = data.focusGoal || 90;

    updateProgressCircle(completed, goal);
  } catch (error) {
    console.error("Failed to fetch progress:", error);
  }
}

// Function to update the circular progress bar
function updateProgressCircle(completed, goal) {
  const percentage = Math.min((completed / goal) * 100, 100);
  const circle = document.getElementById("progressCircle");
  const text = document.getElementById("progressText");

  circle.style.background = `conic-gradient(#ff9800 ${percentage}%, #e0e0e0 ${percentage}%)`;
  text.textContent = `${Math.floor(percentage)}%`;

  document.getElementById("completed").textContent = completed;
  document.getElementById("dailyGoal").textContent = goal;
}

// Add Pomodoro progress (for testing/demo)
document.getElementById("completePomodoro").addEventListener("click", async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  try {
    const res = await fetch("/progress/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, minutes: 30 }),
    });

    const updated = await res.json();
    updateProgressCircle(updated.completed, updated.goal);
  } catch (err) {
    console.error("Failed to update progress:", err);
  }
});

// 🟠 Call it as soon as the page loads
window.onload = fetchProgress;
