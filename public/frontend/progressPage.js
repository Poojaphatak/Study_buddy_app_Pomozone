// async function fetchProgress() {
//   try {
//     const res = await fetch(`http://localhost:3000/progress/today/${userId}`);
//     const data = await res.json();

//     const completed = data.completedMinutes;
//     const goal = data.goalMinutes;

//     const percent = Math.min((completed / goal) * 100, 100); // Max 100%
//     updateProgressCircle(percent);

//     document.getElementById("progress-text").innerText =
//       `${completed} / ${goal} mins`;
//   } catch (err) {
//     console.error("Failed to fetch progress", err);
//   }
// }
