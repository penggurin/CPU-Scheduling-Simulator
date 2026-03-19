// State management
let darkMode = false;
let jobs = [
  { id: 1, arrivalTime: 0, burstTime: 4, priority: 2 },
  { id: 2, arrivalTime: 1, burstTime: 3, priority: 1 },
  { id: 3, arrivalTime: 2, burstTime: 1, priority: 3 },
];

// Pastel colors for jobs
const pastelColors = [
  {
    bg: "bg-pink-300",
    dark: "bg-pink-400",
    hex: "#82a0f5",
    darkHex: "#f472b6",
  },
  {
    bg: "bg-purple-300",
    dark: "bg-purple-400",
    hex: "#9bdb8f",
    darkHex: "#c084fc",
  },
  {
    bg: "bg-blue-300",
    dark: "bg-blue-400",
    hex: "#daf170",
    darkHex: "#60a5fa",
  },
  {
    bg: "bg-green-300",
    dark: "bg-green-400",
    hex: "#c0e46e",
    darkHex: "#4ade80",
  },
  {
    bg: "bg-yellow-300",
    dark: "bg-yellow-400",
    hex: "#fde047",
    darkHex: "#facc15",
  },
  {
    bg: "bg-orange-300",
    dark: "bg-orange-400",
    hex: "#fdba74",
    darkHex: "#fb923c",
  },
  { bg: "bg-red-300", dark: "bg-red-400", hex: "#fca5a5", darkHex: "#f87171" },
  {
    bg: "bg-indigo-300",
    dark: "bg-indigo-400",
    hex: "#a5b4fc",
    darkHex: "#818cf8",
  },
];

// DOM elements
const darkModeToggle = document.getElementById("darkModeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const algorithmSelect = document.getElementById("algorithm");
const numJobsInput = document.getElementById("numJobs");
const jobsTableBody = document.getElementById("jobsTableBody");
const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");
const resultsSection = document.getElementById("resultsSection");
const ganttBars = document.getElementById("ganttBars");
const ganttTimeline = document.getElementById("ganttTimeline");
const statsTableBody = document.getElementById("statsTableBody");
const cpuPercentage = document.getElementById("cpuPercentage");
const cpuCircleProgress = document.getElementById("cpuCircleProgress");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderJobsTable();
  setupEventListeners();
});

// Event listeners
function setupEventListeners() {
  darkModeToggle.addEventListener("click", toggleDarkMode);
  numJobsInput.addEventListener("change", handleNumJobsChange);
  runBtn.addEventListener("click", runScheduler);
  resetBtn.addEventListener("click", reset);
}

// Dark mode toggle
function toggleDarkMode() {
  darkMode = !darkMode;
  const body = document.body;
  const dotsBackground = document.getElementById("dotsBackground");

  if (darkMode) {
    document.documentElement.classList.add("dark");
    body.classList.remove(
      "bg-gradient-to-br",
      "from-purple-50",
      "via-pink-50",
      "to-blue-50",
    );
    body.classList.add("bg-gray-900");
    dotsBackground.classList.remove("dots-bg-light");
    dotsBackground.classList.add("dots-bg-dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    updateDarkModeStyles(true);
  } else {
    document.documentElement.classList.remove("dark");
    body.classList.add(
      "bg-gradient-to-br",
      "from-purple-50",
      "via-pink-50",
      "to-blue-50",
    );
    body.classList.remove("bg-gray-900");
    dotsBackground.classList.add("dots-bg-light");
    dotsBackground.classList.remove("dots-bg-dark");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
    updateDarkModeStyles(false);
  }
}

function updateDarkModeStyles(isDark) {
  const elements = {
    titles: ["mainTitle", "configTitle"],
    cards: ["configCard", "ganttCard", "statsCard", "cpuCard"],
    labels: ["algoLabel", "numJobsLabel"],
    inputs: ["algorithm", "numJobs"],
    buttons: ["darkModeToggle", "resetBtn"],
  };

  // Update titles
  elements.titles.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (isDark) {
        el.classList.remove("text-gray-800");
        el.classList.add("text-white");
      } else {
        el.classList.add("text-gray-800");
        el.classList.remove("text-white");
      }
    }
  });

  // Update cards
  elements.cards.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (isDark) {
        el.classList.remove("bg-white/80", "border-gray-200");
        el.classList.add("bg-gray-800", "border-gray-700");
      } else {
        el.classList.add("bg-white/80", "border-gray-200");
        el.classList.remove("bg-gray-800", "border-gray-700");
      }
    }
  });

  // Update labels
  elements.labels.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (isDark) {
        el.classList.remove("text-gray-700");
        el.classList.add("text-gray-200");
      } else {
        el.classList.add("text-gray-700");
        el.classList.remove("text-gray-200");
      }
    }
  });

  // Update inputs
  elements.inputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (isDark) {
        el.classList.add("bg-gray-700", "border-gray-600", "text-white");
        el.classList.remove("border-gray-300");
      } else {
        el.classList.remove("bg-gray-700", "border-gray-600", "text-white");
        el.classList.add("border-gray-300");
      }
    }
  });

  // Update button
  const toggle = document.getElementById("darkModeToggle");
  if (isDark) {
    toggle.classList.remove("bg-white", "border-gray-300", "hover:bg-gray-100");
    toggle.classList.add("bg-gray-700", "border-gray-600", "hover:bg-gray-600");
  } else {
    toggle.classList.add("bg-white", "border-gray-300", "hover:bg-gray-100");
    toggle.classList.remove(
      "bg-gray-700",
      "border-gray-600",
      "hover:bg-gray-600",
    );
  }

  const resetButton = document.getElementById("resetBtn");
  if (isDark) {
    resetButton.classList.remove(
      "border-gray-300",
      "hover:bg-gray-100",
      "text-gray-700",
    );
    resetButton.classList.add(
      "border-gray-600",
      "hover:bg-gray-700",
      "text-gray-200",
      "bg-gray-800",
    );
  } else {
    resetButton.classList.add(
      "border-gray-300",
      "hover:bg-gray-100",
      "text-gray-700",
    );
    resetButton.classList.remove(
      "border-gray-600",
      "hover:bg-gray-700",
      "text-gray-200",
      "bg-gray-800",
    );
  }

  // Update CPU circle
  const cpuCircleBase = document.getElementById("cpuCircleBase");
  if (cpuCircleBase) {
    cpuCircleBase.setAttribute("stroke", isDark ? "#374151" : "#e5e7eb");
  }

  const cpuText = document.getElementById("cpuPercentage");
  if (cpuText) {
    if (isDark) {
      cpuText.classList.remove("text-gray-800");
      cpuText.classList.add("text-white");
    } else {
      cpuText.classList.add("text-gray-800");
      cpuText.classList.remove("text-white");
    }
  }
}

// Handle number of jobs change
function handleNumJobsChange() {
  const num = parseInt(numJobsInput.value) || 1;
  const newJobs = Array.from({ length: num }, (_, i) => ({
    id: i + 1,
    arrivalTime: jobs[i]?.arrivalTime ?? 0,
    burstTime: jobs[i]?.burstTime ?? 1,
    priority: jobs[i]?.priority ?? 1,
  }));
  jobs = newJobs;
  renderJobsTable();
}

// Render jobs table
function renderJobsTable() {
  jobsTableBody.innerHTML = "";
  jobs.forEach((job, index) => {
    const row = document.createElement("tr");
    row.className = darkMode
      ? "border-b border-gray-700"
      : "border-b border-gray-100";
    row.innerHTML = `
            <td class="${darkMode ? "text-gray-300" : "text-gray-600"} py-2 px-4">P${job.id}</td>
            <td class="py-2 px-4">
                <input
                    type="number"
                    min="0"
                    value="${job.arrivalTime}"
                    data-index="${index}"
                    data-field="arrivalTime"
                    class="job-input w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300"
                    }"
                />
            </td>
            <td class="py-2 px-4">
                <input
                    type="number"
                    min="1"
                    value="${job.burstTime}"
                    data-index="${index}"
                    data-field="burstTime"
                    class="job-input w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300"
                    }"
                />
            </td>
            <td class="py-2 px-4">
                <input
                    type="number"
                    min="1"
                    value="${job.priority}"
                    data-index="${index}"
                    data-field="priority"
                    class="job-input w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300"
                    }"
                />
            </td>
        `;
    jobsTableBody.appendChild(row);
  });

  // Add event listeners to job inputs
  document.querySelectorAll(".job-input").forEach((input) => {
    input.addEventListener("change", handleJobInputChange);
  });
}

// Handle job input change
function handleJobInputChange(e) {
  const index = parseInt(e.target.dataset.index);
  const field = e.target.dataset.field;
  const value = parseInt(e.target.value) || 0;
  jobs[index][field] = value;
}

// FCFS Algorithm
function calculateFCFS() {
  const sortedJobs = [...jobs].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const gantt = [];
  const jobResults = [];
  let currentTime = 0;

  sortedJobs.forEach((job) => {
    if (currentTime < job.arrivalTime) {
      currentTime = job.arrivalTime;
    }
    const startTime = currentTime;
    const endTime = currentTime + job.burstTime;
    gantt.push({ jobId: job.id, startTime, endTime });

    const turnaroundTime = endTime - job.arrivalTime;
    const waitingTime = turnaroundTime - job.burstTime;
    jobResults.push({ jobId: job.id, turnaroundTime, waitingTime });

    currentTime = endTime;
  });

  return { gantt, jobResults, totalTime: currentTime };
}

// SJF Non-Preemptive Algorithm
function calculateSJF() {
  const gantt = [];
  const jobResults = [];
  const remainingJobs = jobs.map((j) => ({ ...j, completed: false }));
  let currentTime = 0;
  let completed = 0;

  while (completed < jobs.length) {
    const availableJobs = remainingJobs.filter(
      (j) => j.arrivalTime <= currentTime && !j.completed,
    );

    if (availableJobs.length === 0) {
      currentTime++;
      continue;
    }

    const shortestJob = availableJobs.reduce((min, job) =>
      job.burstTime < min.burstTime ? job : min,
    );

    const startTime = currentTime;
    const endTime = currentTime + shortestJob.burstTime;
    gantt.push({ jobId: shortestJob.id, startTime, endTime });

    const turnaroundTime = endTime - shortestJob.arrivalTime;
    const waitingTime = turnaroundTime - shortestJob.burstTime;
    jobResults.push({ jobId: shortestJob.id, turnaroundTime, waitingTime });

    currentTime = endTime;
    shortestJob.completed = true;
    completed++;
  }

  return { gantt, jobResults, totalTime: currentTime };
}

// Non-Preemptive Priority Algorithm
function calculateNPP() {
  const gantt = [];
  const jobResults = [];
  const remainingJobs = jobs.map((j) => ({ ...j, completed: false }));
  let currentTime = 0;
  let completed = 0;

  while (completed < jobs.length) {
    const availableJobs = remainingJobs.filter(
      (j) => j.arrivalTime <= currentTime && !j.completed,
    );

    if (availableJobs.length === 0) {
      currentTime++;
      continue;
    }

    // Lower priority number = higher priority
    const highestPriorityJob = availableJobs.reduce((max, job) =>
      job.priority < max.priority ? job : max,
    );

    const startTime = currentTime;
    const endTime = currentTime + highestPriorityJob.burstTime;
    gantt.push({ jobId: highestPriorityJob.id, startTime, endTime });

    const turnaroundTime = endTime - highestPriorityJob.arrivalTime;
    const waitingTime = turnaroundTime - highestPriorityJob.burstTime;
    jobResults.push({
      jobId: highestPriorityJob.id,
      turnaroundTime,
      waitingTime,
    });

    currentTime = endTime;
    highestPriorityJob.completed = true;
    completed++;
  }

  return { gantt, jobResults, totalTime: currentTime };
}

// SRTF (Shortest Remaining Time First) - Preemptive Algorithm
function calculateSRTF() {
  const gantt = [];
  const remainingBurst = jobs.map((j) => j.burstTime);
  const completionTime = new Array(jobs.length).fill(0);
  let currentTime = 0;
  let completed = 0;
  let lastJobId = -1;
  let lastStartTime = 0;

  while (completed < jobs.length) {
    const availableJobs = jobs
      .map((job, index) => ({ ...job, index }))
      .filter(
        (j) => j.arrivalTime <= currentTime && remainingBurst[j.index] > 0,
      );

    if (availableJobs.length === 0) {
      currentTime++;
      continue;
    }

    // Find job with shortest remaining time
    const shortestJob = availableJobs.reduce((min, job) =>
      remainingBurst[job.index] < remainingBurst[min.index] ? job : min,
    );

    const jobIndex = shortestJob.index;

    // If switching to a different job, save the previous gantt segment
    if (lastJobId !== shortestJob.id && lastJobId !== -1) {
      gantt.push({
        jobId: lastJobId,
        startTime: lastStartTime,
        endTime: currentTime,
      });
      lastStartTime = currentTime;
    } else if (lastJobId === -1) {
      lastStartTime = currentTime;
    }

    lastJobId = shortestJob.id;
    currentTime++;
    remainingBurst[jobIndex]--;

    if (remainingBurst[jobIndex] === 0) {
      completionTime[jobIndex] = currentTime;
      completed++;

      // Add the final segment for this job
      gantt.push({
        jobId: shortestJob.id,
        startTime: lastStartTime,
        endTime: currentTime,
      });
      lastJobId = -1;
    }
  }

  // Calculate turnaround and waiting times
  const jobResults = jobs.map((job, index) => {
    const turnaroundTime = completionTime[index] - job.arrivalTime;
    const waitingTime = turnaroundTime - job.burstTime;
    return { jobId: job.id, turnaroundTime, waitingTime };
  });

  return { gantt, jobResults, totalTime: currentTime };
}

// Run scheduler
function runScheduler() {
  const algorithm = algorithmSelect.value;
  let result;

  switch (algorithm) {
    case "fcfs":
      result = calculateFCFS();
      break;
    case "sjf":
      result = calculateSJF();
      break;
    case "npp":
      result = calculateNPP();
      break;
    case "srtf":
      result = calculateSRTF();
      break;
    default:
      result = calculateFCFS();
  }
  renderTimelineCard();
  renderStatistics(result.jobResults);
  renderGanttChart(result.gantt, result.totalTime);

  const totalBurstTime = jobs.reduce((sum, job) => sum + job.burstTime, 0);
  const utilization = (totalBurstTime / result.totalTime) * 100;
  renderCPUUtilization(utilization);

  resultsSection.classList.remove("hidden");
}
function renderTimeline(maxTime) {
  ganttTimeline.innerHTML = "";

  // Base line
  const line = document.createElement("div");
  line.className = "timeline-line";
  ganttTimeline.appendChild(line);

  for (let i = 0; i <= maxTime; i++) {
    const position = (i / maxTime) * 100;

    // Tick
    const tick = document.createElement("div");
    tick.className = "timeline-tick";
    tick.style.left = `${position}%`;

    // Label (A, B, C, D...) OR numbers
    const label = document.createElement("div");
    label.className = `timeline-label ${
      darkMode ? "text-gray-300" : "text-gray-700"
    }`;
    label.style.left = `${position}%`;

    // 👉 Choose one:
    // label.textContent = i; // numbers (0,1,2...)
    label.textContent = String.fromCharCode(65 + i); // A, B, C...

    ganttTimeline.appendChild(tick);
    ganttTimeline.appendChild(label);
  }
}
function renderTimelineCard() {
  const container = document.getElementById("timelineContainer");
  container.innerHTML = "";

  const sortedJobs = [...jobs].sort((a, b) => a.arrivalTime - b.arrivalTime);

  const maxTime = Math.max(...sortedJobs.map((j) => j.arrivalTime), 1);

  const wrapper = document.createElement("div");
  wrapper.className = "relative w-full h-20";

  // LINE
  const line = document.createElement("div");
  line.className = "absolute top-1/2 left-0 w-full h-[2px] bg-gray-500";
  wrapper.appendChild(line);

  sortedJobs.forEach((job) => {
    // 🔥 position based on ACTUAL TIME
    const position = (job.arrivalTime / maxTime) * 100;

    // TICK
    const tick = document.createElement("div");
    tick.className = "absolute w-[2px] h-4 bg-gray-500";
    tick.style.left = `${position}%`;
    tick.style.top = "50%";
    tick.style.transform = "translate(-50%, -50%)";
    wrapper.appendChild(tick);

    // TOP LABEL (P1, P2...)
    const pLabel = document.createElement("div");
    pLabel.className = `absolute text-sm font-semibold ${
      darkMode ? "text-gray-200" : "text-gray-800"
    }`;
    pLabel.style.left = `${position}%`;
    pLabel.style.top = "0";
    pLabel.style.transform = "translateX(-50%)";
    pLabel.textContent = `P${job.id}`;
    wrapper.appendChild(pLabel);

    // BOTTOM LABEL (arrival time)
    const timeLabel = document.createElement("div");
    timeLabel.className = `absolute text-xs ${
      darkMode ? "text-gray-400" : "text-gray-600"
    }`;
    timeLabel.style.left = `${position}%`;
    timeLabel.style.bottom = "0";
    timeLabel.style.transform = "translateX(-50%)";
    timeLabel.textContent = job.arrivalTime;
    wrapper.appendChild(timeLabel);
  });

  container.appendChild(wrapper);
}
// Render Gantt Chart
function renderGanttChart(gantt, maxTime) {
  ganttBars.innerHTML = "";
  ganttTimeline.innerHTML = "";

  gantt.forEach((item, index) => {
    const width = ((item.endTime - item.startTime) / maxTime) * 100;
    const color = pastelColors[(item.jobId - 1) % pastelColors.length];
    const bgColor = darkMode ? color.darkHex : color.hex;

    // Create bar
    const bar = document.createElement("div");
    bar.className =
      "gantt-bar flex items-center justify-center font-semibold border-2";
    bar.style.width = `${width}%`;
    bar.style.minWidth = "60px";
    bar.style.height = "60px";
    bar.style.backgroundColor = bgColor;
    bar.style.borderColor = darkMode ? "#374151" : "#ffffff";
    bar.style.color = darkMode ? "#1f2937" : "#1f2937";
    bar.textContent = `P${item.jobId}`;
    ganttBars.appendChild(bar);

    // Create timeline marker
    const timeline = document.createElement("div");
    timeline.className = "relative text-sm";
    timeline.style.width = `${width}%`;
    timeline.style.minWidth = "60px";

    const startMarker = document.createElement("div");
    startMarker.className = `absolute left-0 ${darkMode ? "text-gray-300" : "text-gray-600"}`;
    startMarker.textContent = item.startTime;
    timeline.appendChild(startMarker);

    if (index === gantt.length - 1) {
      const endMarker = document.createElement("div");
      endMarker.className = `absolute right-0 ${darkMode ? "text-gray-300" : "text-gray-600"}`;
      endMarker.textContent = item.endTime;
      timeline.appendChild(endMarker);
    }

    ganttTimeline.appendChild(timeline);
  });
}

// Render statistics
function renderStatistics(results) {
  statsTableBody.innerHTML = "";

  results.forEach((result) => {
    const row = document.createElement("tr");
    row.className = darkMode
      ? "border-b border-gray-700"
      : "border-b border-gray-100";
    row.innerHTML = `
            <td class="py-2 px-4 font-semibold ${darkMode ? "text-gray-300" : "text-gray-800"}">P${result.jobId}</td>
            <td class="py-2 px-4 ${darkMode ? "text-gray-300" : "text-gray-600"}">${result.turnaroundTime}</td>
            <td class="py-2 px-4 ${darkMode ? "text-gray-300" : "text-gray-600"}">${result.waitingTime}</td>
        `;
    statsTableBody.appendChild(row);
  });

  // Add average row
  const avgTurnaround = (
    results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length
  ).toFixed(2);
  const avgWaiting = (
    results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length
  ).toFixed(2);

  const avgRow = document.createElement("tr");
  avgRow.className = `font-semibold ${darkMode ? "border-t-2 border-gray-600" : "border-t-2 border-gray-300"}`;
  avgRow.innerHTML = `
        <td class="py-2 px-4 ${darkMode ? "text-gray-200" : "text-gray-700"}">Average</td>
        <td class="py-2 px-4 ${darkMode ? "text-gray-200" : "text-gray-700"}">${avgTurnaround} ms</td>
        <td class="py-2 px-4 ${darkMode ? "text-gray-200" : "text-gray-700"}">${avgWaiting} ms</td>
    `;
  statsTableBody.appendChild(avgRow);
}

// Render CPU Utilization
function renderCPUUtilization(percentage) {
  cpuPercentage.textContent = `${percentage.toFixed(1)}%`;

  const circumference = 2 * Math.PI * 56;
  const offset = circumference * (1 - percentage / 100);
  cpuCircleProgress.setAttribute("stroke-dashoffset", offset);
}

// Reset
function reset() {
  resultsSection.classList.add("hidden");
  ganttBars.innerHTML = "";
  ganttTimeline.innerHTML = "";
  statsTableBody.innerHTML = "";
  cpuPercentage.textContent = "0%";
  cpuCircleProgress.setAttribute("stroke-dashoffset", "351.858");
}
