document.addEventListener("DOMContentLoaded", () => {
  // =====================================================================
  // --- 1. Utility Functions ---
  // =====================================================================

  /**
   * Get data from localStorage.
   * @param {string} key Storage key.
   * @returns {Array} Parsed data or an empty array if not found/error.
   */
  const getStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`Error reading from localStorage for key: ${key}`, e);
      return [];
    }
  };

  /**
   * Save data to localStorage.
   * @param {string} key Storage key.
   * @param {Array} data Data to be saved.
   */
  const setStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`Data for key '${key}' saved to localStorage.`);
    } catch (e) {
      console.error(`Error writing to localStorage for key: ${key}`, e);
    }
  };

  /**
   * Get the next available ID for a new item in an array.
   * @param {Array} arr Data array.
   * @returns {number} Next ID.
   */
  const getNextId = (arr) =>
    arr.length > 0 ? Math.max(...arr.map((item) => item.id)) + 1 : 1;

  /**
   * Format date string for display (English - short month, numeric day, numeric year).
   * @param {string} dateString Date string (e.g., "YYYY-MM-DD").
   * @returns {string} Formatted date.
   */
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        // Changed to en-GB for English format
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      console.error(`Invalid date string for formatting: ${dateString}`, e);
      return dateString;
    }
  };

  /**
   * Get local YYYY-MM-DD date string without timezone shift.
   * @param {Date} date Date object.
   * @returns {string} Date string in YYYY-MM-DD format.
   */
  const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  /**
   * Compare two dates by year, month, and day.
   * @param {Date} d1 First date.
   * @param {Date} d2 Second date.
   * @returns {boolean} True if dates are the same.
   */
  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // =====================================================================
  // --- 2. Data Management (Simulated API with localStorage) ---
  // =====================================================================

  let projects = getStorage("projects");
  let tasks = getStorage("tasks");
  let schedules = getStorage("schedules");
  let teams = getStorage("teams");
  let currentCalendarDate = new Date();

  /**
   * Initialize dummy data if localStorage is empty.
   */
  const initializeDummyData = () => {
    if (projects.length === 0) {
      projects = [
        {
          id: 1,
          title: "Software Project Discussion", // English
          description:
            "The software team is responsible for planning, scheduling, budgeting, executing, and delivering software and web projects. They ensure the successful completion of all software projects.", // English
          progress: 75,
          daysLeft: 3,
          avatars: ["men/32", "women/44", "men/54"],
          type: "blue",
        },
        {
          id: 2,
          title: "Authentication Module Development", // English
          description:
            "Developing a new user authentication module with secure login and registration features.", // English
          progress: 40,
          daysLeft: 7,
          avatars: ["men/10", "women/20"],
          type: "purple",
        },
        {
          id: 3,
          title: "Q3 Project Planning", // English
          description:
            "Outlining the entire project scope, milestones, and resource allocation for the upcoming quarter.", // English
          progress: 10,
          daysLeft: 14,
          avatars: ["women/5", "men/15"],
          type: "red",
        },
      ];
      setStorage("projects", projects);
    }

    if (tasks.length === 0) {
      tasks = [
        {
          id: 1,
          title: "Mobile App Design", // English
          description: "UI/UX Design Meeting", // English
          subject: "Design", // English
          teacher: "Ms Diana Smith",
          type: "Task",
          status: "in-progress",
          progress: 5,
          priority: "high",
          subtasks: [
            {
              id: 1,
              text: "Brainstorming Concepts",
              completed: false,
            },
          ], // English
          avatars: ["men/1", "women/2"],
          team: "design",
          startDate: "2025-07-10",
          startTime: "09:00",
          endDate: "2025-07-15",
          endTime: "17:00",
          assignTo: "John Doe",
        },
        {
          id: 2,
          title: "Famous Motivator Story", // English
          description: "Analyzing biographies of inspiring figures", // English
          subject: "Biography", // English
          teacher: "Mr Melvin Ruslan",
          type: "Theory",
          status: "completed",
          progress: 100,
          priority: "normal",
          subtasks: [],
          avatars: ["men/3", "women/4"],
          team: "development",
          startDate: "2025-07-01",
          startTime: "10:00",
          endDate: "2025-07-05",
          endTime: "12:00",
          assignTo: "Jane Smith",
        },
        {
          id: 6,
          title: "Medium Priority Task", // English
          description: "Example task with medium priority", // English
          subject: "General", // English
          teacher: "Ms Medium",
          type: "Task",
          status: "in-progress",
          progress: 30,
          priority: "medium",
          subtasks: [],
          avatars: ["men/11", "women/12"],
          team: "general",
          startDate: "2025-07-20",
          startTime: "09:00",
          endDate: "2025-07-25",
          endTime: "17:00",
          assignTo: "Medium User",
        },
        {
          id: 3,
          title: "Algebraic Properties Task", // English
          description:
            "Solving algebraic properties problems from the textbook", // English
          subject: "Mathematics", // English
          teacher: "Mr John Lock",
          type: "Task",
          status: "in-progress",
          progress: 60,
          priority: "high",
          subtasks: [
            {
              id: 1,
              text: "Solve problems 1-5",
              completed: false,
            },
            {
              id: 2,
              text: "Check answers",
              completed: false,
            },
          ], // English
          avatars: ["men/5", "women/6"],
          team: "marketing",
          startDate: "2025-07-12",
          startTime: "13:00",
          endDate: "2025-07-18",
          endTime: "16:00",
          assignTo: "Michael Johnson",
        },
        {
          id: 4,
          title: "Algebraic Properties Theory", // English
          description: "Understanding basic concepts of algebraic properties", // English
          subject: "Mathematics", // English
          teacher: "Mr John Lock",
          type: "Theory",
          status: "completed",
          progress: 100,
          priority: "normal",
          subtasks: [],
          avatars: ["men/7", "women/8"],
          team: "design",
          startDate: "2025-07-08",
          startTime: "09:00",
          endDate: "2025-07-09",
          endTime: "11:00",
          assignTo: "Emily Brown",
        },
        {
          id: 5,
          title: "Determining One's IQ", // English
          description:
            "Understanding various methods and tests for measuring IQ", // English
          subject: "Psychology", // English
          teacher: "Mr Melvin Ruslan",
          type: "Theory",
          status: "in-progress",
          progress: 80,
          priority: "low",
          subtasks: [
            {
              id: 1,
              text: "Read Chapter 3",
              completed: false,
            },
          ], // English
          avatars: ["men/9", "women/10"],
          team: "development",
          startDate: "2025-07-11",
          startTime: "14:00",
          endDate: "2025-07-13",
          endTime: "17:00",
          assignTo: "Chris Green",
        },
      ];
      setStorage("tasks", tasks);
    }
    if (schedules.length === 0) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      schedules = [
        {
          id: 1,
          title: "Mobile App Design Discussion", // English
          description: "Team meeting to finalize wireframes.", // English
          startTime: "09:00",
          endTime: "10:00",
          statusColor: "green",
          completed: false,
          avatars: ["men/1", "women/2"],
          date: getLocalDateString(today),
        },
        {
          id: 2,
          title: "Client Project Presentation", // English
          description: "Progress presentation to the main client.", // English
          startTime: "13:00",
          endTime: "14:30",
          statusColor: "blue",
          completed: false,
          avatars: ["men/3", "women/4"],
          date: getLocalDateString(today),
        },
        {
          id: 3,
          title: "Marketing Brainstorming Session", // English
          description: "Ideation session for Q4 campaign.", // English
          startTime: "10:00",
          endTime: "11:00",
          statusColor: "red",
          completed: false,
          avatars: ["men/5", "women/6"],
          date: getLocalDateString(tomorrow),
        },
      ];
      setStorage("schedules", schedules);
    }
  // Force reset teams array to English names to overwrite any existing localStorage data
  localStorage.removeItem("teams");
  teams = [
    {
      id: "design",
      name: "Design",
    },
    {
      id: "development",
      name: "Development",
    },
    {
      id: "marketing",
      name: "Marketing",
    },
    {
      id: "general",
      name: "General",
    },
  ];
  setStorage("teams", teams);
  console.log("Teams array set to English names:", teams);
  };

  initializeDummyData();

  // =====================================================================
  // --- 3. DOM Elements Cache ---
  // =====================================================================

  const DOMElements = {
    dashboardContainer: document.getElementById("dashboardContainer"),
    mobileMenuToggle: document.getElementById("mobileMenuToggle"),
    sidebarOverlay: document.getElementById("sidebarOverlay"),
    sidebarCloseButton: document.getElementById("sidebarCloseButton"),

    projectSummaryContainer: document.getElementById("projectSummaryContainer"),
    prevProjectBtn: document.getElementById("prevProject"),
    nextProjectBtn: document.getElementById("nextProject"),

    inProgressTasksDiv: document.getElementById("inProgressTasks"),
    completedTasksDiv: document.getElementById("completedTasks"),
    inProgressCountSpan: document.getElementById("inProgressCount"),
    completedCountSpan: document.getElementById("completedCount"),
    tasksListContainer: document.getElementById("tasksListContainer"),
    taskSearchInput: document.getElementById("taskSearchInput"),
    taskStatusFilterSelect: document.getElementById("taskStatusFilterSelect"),
    priorityFilterSelect: document.getElementById("priorityFilterSelect"),
    tasksTabs: document.querySelector(".tasks-filters"),
    inProgressToggle: document.getElementById("inProgressToggle"), // Icon for In Progress toggle
    completedToggle: document.getElementById("completedToggle"), // Icon for Completed toggle

    addTaskButton: document.getElementById("addTaskButton"),
    addTaskModalOverlay: document.getElementById("addTaskModalOverlay"),
    addTaskModalCloseButton: document.getElementById("addTaskModalClose"),
    addTaskForm: document.getElementById("addTaskForm"),
    modalTitle: document.getElementById("modalTitle"),
    createTaskModalButton: document.getElementById("createTaskModalButton"),
    addDescriptionToggle: document.getElementById("addDescriptionToggle"),
    descriptionInputArea: document.querySelector(".description-input-area"),
    descriptionTextarea: document.getElementById("description"),
    chooseTeamToggle: document.getElementById("chooseTeamToggle"),
    teamInputArea: document.querySelector(".team-input-area"),
    newTeamInput: document.getElementById("newTeamInput"),
    addTeamButtonModal: document.getElementById("addTeamButtonModal"),
    chooseTeamSelect: document.getElementById("chooseTeamSelect"),
    teamDisplayDropdown: document.getElementById("teamDisplayDropdown"),
    startDateDisplay: document.getElementById("startDateDisplay"),
    startDateInput: document.getElementById("startDate"),
    startTimeInput: document.getElementById("startTime"),
    endDateDisplay: document.getElementById("endDateDisplay"),
    endDateInput: document.getElementById("endDate"),
    endTimeInput: document.getElementById("endTime"),
    assignToInput: document.getElementById("assignTo"),
    prioritySelect: document.getElementById("prioritySelect"),
    attachmentInput: document.getElementById("attachmentInput"),
    attachmentFileNameDisplay: document.getElementById("attachmentFileName"),

    currentMonthYearHeader: document.getElementById("currentMonthYear"),
    calendarGridEl: document.getElementById("calendarGrid"),
    prevMonthBtn: document.getElementById("prevMonthBtn"),
    nextMonthBtn: document.getElementById("nextMonthBtn"),
    todayScheduleList: document.getElementById("todayScheduleList"),
    todayScheduleMenuButton: document.getElementById("todayScheduleMenuButton"),
    todayScheduleDropdown: document.getElementById("todayScheduleDropdown"),
    addNewScheduleBtn: document.getElementById("addNewScheduleBtn"),
    editTodayScheduleBtn: document.getElementById("editTodayScheduleBtn"),
    deleteSelectedTodayScheduleBtn: document.getElementById(
      "deleteSelectedTodayScheduleBtn"
    ),
    refreshScheduleBtn: document.getElementById("refreshScheduleBtn"),
  };

  // =====================================================================
  // --- 4. Render Functions ---
  // =====================================================================

  const renderProjectSummary = (filterStatus = "all") => {
    if (!DOMElements.projectSummaryContainer) return;
    DOMElements.projectSummaryContainer.innerHTML = "";

    const allTasks = getStorage("tasks") || [];
    const allTeams = getStorage("teams") || [
      { id: "general", name: "General" },
    ]; // English

    // Filter tasks based on filterStatus
    let filteredTasks;
    if (filterStatus === "all") {
      filteredTasks = allTasks;
    } else {
      filteredTasks = allTasks.filter((task) => task.status === filterStatus);
    }

    const projectsMap = new Map();

    allTeams.forEach((team) => {
      projectsMap.set(team.id, {
        title: team.name,
        description: "",
        tasks: [],
        avatars: new Set(),
        progressSum: 0,
        daysLeftMin: null,
      });
    });

    filteredTasks.forEach((task) => {
      const projectKey = task.team || "general";
      const project = projectsMap.get(projectKey) || {
        title: projectKey.charAt(0).toUpperCase() + projectKey.slice(1),
        description: "",
        tasks: [],
        avatars: new Set(),
        progressSum: 0,
        daysLeftMin: null,
      };
      projectsMap.set(projectKey, project);

      project.tasks.push(task);
      project.progressSum += task.progress || 0;

      if (task.endDate) {
        const endDate = new Date(task.endDate);
        if (!project.daysLeftMin || endDate < project.daysLeftMin) {
          project.daysLeftMin = endDate;
        }
      }
      if (Array.isArray(task.avatars)) {
        task.avatars.forEach((av) => project.avatars.add(av));
      } else if (task.assignTo) {
        const gender = Math.random() < 0.5 ? "men" : "women";
        const number = Math.floor(Math.random() * 100);
        project.avatars.add(`${gender}/${number}`);
      }
      if (!project.description && task.description) {
        project.description = task.description;
      }
    });

    projectsMap.forEach((project, key) => {
      if (project.tasks.length === 0) return;

      const avgProgress =
        project.tasks.length > 0
          ? Math.round(project.progressSum / project.tasks.length)
          : 0;
      const daysLeft = project.daysLeftMin
        ? Math.max(
            0,
            Math.ceil(
              (project.daysLeftMin - new Date()) / (1000 * 60 * 60 * 24)
            )
          )
        : "N/A";

      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");

      const teamColorMap = {
        design: "purple",
        development: "green",
        marketing: "orange",
        general: "gray",
      };
      const colorClass = teamColorMap[key] || "blue";
      projectCard.classList.add(colorClass);

      const avatarsHtml = Array.from(project.avatars)
        .map((av) => {
          if (
            typeof av === "string" &&
            (av.startsWith("men/") || av.startsWith("women/"))
          ) {
            return `<img src="https://randomuser.me/api/portraits/${av}.jpg" alt="User Avatar">`;
          } else if (typeof av === "string") {
            const initials = av
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();
            return `<div class="avatar-initials">${initials}</div>`;
          }
          return "";
        })
        .join("");

      const teamName = project.title || "General"; // English
      const teamClass = teamName.toLowerCase().replace(/\s+/g, "-");

      projectCard.innerHTML = `
                <div class="project-card-header">
                    <span class="team-badge ${teamClass}">${teamName}</span>
                    <i class='bx bx-dots-horizontal-rounded'></i>
                </div>
                <h3>${project.tasks[0]?.title || "No Title"}</h3> <p>${
        project.description || "No description available."
      }</p> <div class="project-card-footer">
                    <div class="progress-info">
                        <span>Progress</span> <span>${avgProgress}%</span>
                    </div>
                    <progress value="${avgProgress}" max="100"></progress>
                    <div class="progress-info">
                        <span>${daysLeft} Days Left</span> <div class="avatar-group">
                            ${avatarsHtml}
                        </div>
                    </div>
                </div>
            `;
      DOMElements.projectSummaryContainer.appendChild(projectCard);
    });
  };

  const renderTasks = (searchKeyword = "") => {
    console.log("DEBUG: renderTasks called with searchKeyword:", searchKeyword);
    if (!DOMElements.inProgressTasksDiv || !DOMElements.completedTasksDiv) {
      console.warn("DEBUG: Task containers not found in DOM.");
      return;
    }
    DOMElements.inProgressTasksDiv.innerHTML = "";
    DOMElements.completedTasksDiv.innerHTML = "";
    let inProgressCount = 0;
    let completedCount = 0;

    const normalizedSearch = searchKeyword.trim().toLowerCase();
    const statusFilter = DOMElements.taskStatusFilterSelect
      ? DOMElements.taskStatusFilterSelect.value
      : "all";
    const priorityFilter = DOMElements.priorityFilterSelect
      ? DOMElements.priorityFilterSelect.value
      : "all";

    const filteredTasks = tasks.filter((task) => {
      if (statusFilter !== "all" && task.status !== statusFilter) return false;
      if (priorityFilter !== "all" && task.priority !== priorityFilter)
        return false;
      if (normalizedSearch) {
        const titleMatch = task.title.toLowerCase().includes(normalizedSearch);
        const subtaskMatch =
          Array.isArray(task.subtasks) &&
          task.subtasks.some((sub) =>
            sub.text.toLowerCase().includes(normalizedSearch)
          );
        if (!titleMatch && !subtaskMatch) return false;
      }
      return true;
    });

    if (filteredTasks.length === 0) {
      const noTasksMessage = `<div class="no-tasks-message">No tasks matching your search/filters.</div>`; // English
      DOMElements.inProgressTasksDiv.innerHTML = noTasksMessage;
      DOMElements.completedTasksDiv.innerHTML = noTasksMessage;
      DOMElements.inProgressCountSpan.textContent = "0";
      DOMElements.completedCountSpan.textContent = "0";
      return;
    }

    filteredTasks.forEach((task) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("task-card");
      taskCard.dataset.taskId = task.id;

      const dateRange =
        task.startDate && task.endDate
          ? `${formatDateForDisplay(task.startDate)} - ${formatDateForDisplay(
              task.endDate
            )}`
          : "";
      const progress =
        Array.isArray(task.subtasks) && task.subtasks.length > 0
          ? Math.round(
              (task.subtasks.filter((s) => s.completed).length /
                task.subtasks.length) *
                100
            )
          : task.progress || 0;

      const priorityLabel = task.priority
        ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
        : "Normal"; // English
      const commentCount = Array.isArray(task.comments)
        ? task.comments.length
        : 0;
      // Get file count from localStorage for the task
      const storedFiles = getFilesForTask(task.id);
      const attachmentCount = storedFiles.length;
      let progressBarColor = "#007bff";
      if (progress === 100) progressBarColor = "#28a745";

      taskCard.innerHTML = `
                <div class="task-menu" data-task-id="${task.id}">&#8942;</div>
                <div class="task-menu-dropdown" style="display: none;">
                    <button class="edit-task-button" data-task-id="${
                      task.id
                    }">Edit Task</button>
                    <button class="delete-task-button" data-task-id="${
                      task.id
                    }">Delete Task</button>
                </div>
                <h4>${task.title}</h4>
                <p class="task-date-range">${dateRange}</p>
                <div class="task-card-subtasks">
                    <ul>
                ${(task.subtasks || [])
                  .map((sub) => {
                    // Removed paperclip icon and file count span for subtasks as per user request
                    return `
                            <li>
                                <input type="checkbox" class="subtask-checkbox" data-task-id="${
                                  task.id
                                }" data-subtask-id="${sub.id}" ${
                      sub.completed ? "checked" : ""
                    }>
                                <label>${sub.text}</label>
                            </li>
                        `;
                  })
                  .join("")}
                    </ul>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <button class="add-subtask-button" data-task-id="${
                          task.id
                        }">
                            <i class='bx bx-plus-medical'></i>
                            Add Subtask </button>
                        <span class="priority-label ${
                          task.priority ? task.priority.toLowerCase() : "medium"
                        }">
                            ${priorityLabel}
                        </span>
                    </div>
                </div>
                <div class="task-card-progress">
                    <div class="progress-info">
                        <span>Progress</span> <span>${progress}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${progress}%; background-color: ${progressBarColor};"></div>
                    </div>
                </div>
                <div class="task-card-footer-meta">
                    <div class="avatar-group">
                        ${(task.avatars || [])
                          .map(
                            (avatar) =>
                              `<img src="https://randomuser.me/api/portraits/${avatar}.jpg" alt="User">`
                          )
                          .join("")}
                    </div>
                    <div class="task-meta-icons">
                        <i class='bx bx-paperclip task-file-icon'></i><span class="task-file-count" style="color: #007bff; font-weight: 600; margin-left: 2px;">${attachmentCount}</span>
                        <i class='bx bx-message-rounded-dots'></i> ${commentCount}
                    </div>
                </div>
            `;

      if (task.status === "completed") {
        DOMElements.completedTasksDiv.appendChild(taskCard);
        completedCount++;
      } else {
        DOMElements.inProgressTasksDiv.appendChild(taskCard);
        inProgressCount++;
      }
    });

    DOMElements.inProgressCountSpan.textContent = inProgressCount;
    DOMElements.completedCountSpan.textContent = completedCount;
    attachTaskListeners();
  };

  const renderCalendar = (date) => {
    if (!DOMElements.currentMonthYearHeader || !DOMElements.calendarGridEl)
      return;
    DOMElements.currentMonthYearHeader.textContent = date.toLocaleString(
      "en-US",
      { month: "long", year: "numeric" }
    ); // English Month/Year
    DOMElements.calendarGridEl
      .querySelectorAll(".calendar-day")
      .forEach((el) => el.remove());

    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // English
    // Assuming weekday elements are static in HTML. If not, add them here.

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday as first day
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < startDayIndex; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("calendar-day", "inactive");
      DOMElements.calendarGridEl.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");
      dayElement.textContent = day;

      const currentDate = new Date(year, month, day);
      const currentDayDateString = getLocalDateString(currentDate);

      if (isSameDate(currentDate, today)) {
        const dotIndicator = document.createElement("span");
        dotIndicator.classList.add("today-dot-indicator");
        dayElement.appendChild(dotIndicator);
        dayElement.classList.add("today-highlight");
      }

      const hasSchedule = schedules.some(
        (s) =>
          s.date &&
          getLocalDateString(new Date(s.date)) === currentDayDateString
      );
      if (hasSchedule) {
        dayElement.classList.add("highlighted");
      }
      DOMElements.calendarGridEl.appendChild(dayElement);
    }
  };

  const renderTodaySchedule = (date) => {
    if (!DOMElements.todayScheduleList) return;
    DOMElements.todayScheduleList.innerHTML = "";
    const targetDateString = getLocalDateString(date);
    schedules = getStorage("schedules");
    const relevantSchedules = schedules.filter(
      (s) => s.date && getLocalDateString(new Date(s.date)) === targetDateString
    );

    if (relevantSchedules.length === 0) {
      DOMElements.todayScheduleList.innerHTML =
        '<p style="text-align: center; color: var(--text-light);">No schedules for today.</p>'; // English
      updateDeleteSelectedTodayScheduleButtonVisibility();
      updateEditTodayScheduleButtonVisibility();
      return;
    }

    relevantSchedules.forEach((schedule) => {
      const scheduleItem = document.createElement("div");
      scheduleItem.classList.add("schedule-item");
      scheduleItem.dataset.scheduleId = schedule.id;

      scheduleItem.innerHTML = `
    <div class="schedule-item-indicator ${
      schedule.statusColor || "blue"
    }"></div>
    <input type="checkbox" class="schedule-select-checkbox" data-id="${
      schedule.id
    }" aria-label="Select schedule for deletion" style=""/>
    <div class="schedule-item-content">
        <h4 class="title">${schedule.title}</h4>
        <p class="subtitle">${schedule.description || schedule.desc || ""}</p>
        <div class="schedule-item-time">
            <i class='bx bx-time'></i>
            ${
              schedule.startTime ||
              (schedule.time ? schedule.time.split(" - ")[0] : "undefined")
            } - ${
        schedule.endTime ||
        (schedule.time ? schedule.time.split(" - ")[1] : "undefined")
      }
        </div>
    </div>
`;
      DOMElements.todayScheduleList.appendChild(scheduleItem);
    });
    updateDeleteSelectedTodayScheduleButtonVisibility();
    updateEditTodayScheduleButtonVisibility();
  };

  const populateChooseTeamSelect = () => {
    if (!DOMElements.chooseTeamSelect) return;
    DOMElements.chooseTeamSelect.innerHTML = "";
    teams.forEach((team) => {
      const option = document.createElement("option");
      option.value = team.id;
      option.textContent = team.name;
      DOMElements.chooseTeamSelect.appendChild(option);
    });
    if (teams.length > 0) {
      if (
        !DOMElements.chooseTeamSelect.value ||
        !teams.some((team) => team.id === DOMElements.chooseTeamSelect.value)
      ) {
        DOMElements.chooseTeamSelect.value = teams[0].id;
      }
    }
  };

  const updateDateDisplay = (displayEl, hiddenEl) => {
    if (!displayEl || !hiddenEl) return;
    displayEl.value =
      hiddenEl.type === "date"
        ? formatDateForDisplay(hiddenEl.value)
        : hiddenEl.value;

    hiddenEl.addEventListener("change", () => {
      displayEl.value =
        hiddenEl.type === "date"
          ? formatDateForDisplay(hiddenEl.value)
          : hiddenEl.value;
    });

    displayEl.addEventListener("click", () => {
      if (hiddenEl.showPicker) {
        hiddenEl.showPicker();
      } else {
        hiddenEl.focus();
      }
    });
  };

  // =====================================================================
  // --- 5. Modal Management Functions ---
  // =====================================================================

  const resetModalToAddMode = () => {
    if (DOMElements.modalTitle)
      DOMElements.modalTitle.textContent = "Add New Task"; // English
    if (DOMElements.createTaskModalButton)
      DOMElements.createTaskModalButton.textContent = "Create Task"; // English
    if (DOMElements.addTaskForm) {
      DOMElements.addTaskForm.removeAttribute("data-editing-task-id");
      DOMElements.addTaskForm.reset();
    }
    if (DOMElements.descriptionInputArea)
      DOMElements.descriptionInputArea.style.display = "none";
    if (DOMElements.teamInputArea)
      DOMElements.teamInputArea.style.display = "none";
    if (DOMElements.teamDisplayDropdown)
      DOMElements.teamDisplayDropdown.style.display = "flex";
    if (DOMElements.attachmentFileNameDisplay)
      DOMElements.attachmentFileNameDisplay.textContent = "";
    // Enable file input and hide warning message in add mode
    if (DOMElements.attachmentInput)
      DOMElements.attachmentInput.disabled = false;
    const warningMsg = document.getElementById("attachmentWarningMessage");
    if (warningMsg) warningMsg.style.display = "none";
    populateChooseTeamSelect();
  };

  const openEditTaskModal = (task) => {
    if (!DOMElements.addTaskModalOverlay || !DOMElements.addTaskForm) return;

    if (DOMElements.modalTitle)
      DOMElements.modalTitle.textContent = "Edit Task"; // English
    if (DOMElements.createTaskModalButton)
      DOMElements.createTaskModalButton.textContent = "Save Changes"; // English

    DOMElements.addTaskModalOverlay.style.display = "flex";

    document.getElementById("taskTitle").value = task.title || "";
    document.getElementById("description").value = task.description || "";
    if (DOMElements.descriptionInputArea) {
      DOMElements.descriptionInputArea.style.display = task.description
        ? "block"
        : "none";
    }

    if (DOMElements.chooseTeamSelect) {
      DOMElements.chooseTeamSelect.value =
        task.team || (teams.length > 0 ? teams[0].id : "");
    }

    if (DOMElements.teamInputArea)
      DOMElements.teamInputArea.style.display = "none";
    if (DOMElements.teamDisplayDropdown)
      DOMElements.teamDisplayDropdown.style.display = "flex";

    document.getElementById("startDate").value = task.startDate || "";
    document.getElementById("startTime").value = task.startTime || "";
    document.getElementById("endDate").value = task.endDate || "";
    document.getElementById("endTime").value = task.endTime || "";
    document.getElementById("assignTo").value = task.assignTo || "";
    if (DOMElements.prioritySelect)
      DOMElements.prioritySelect.value = task.priority || "normal";

    // Disable file input and show warning message in edit mode
    if (DOMElements.attachmentInput)
      DOMElements.attachmentInput.disabled = true;
    const warningMsg = document.getElementById("attachmentWarningMessage");
    if (warningMsg) {
      warningMsg.textContent =
        "File upload can only be done via the link icon on the task card.";
      warningMsg.style.display = "block";
    }

    if (DOMElements.attachmentInput) DOMElements.attachmentInput.value = "";
    if (DOMElements.attachmentFileNameDisplay)
      DOMElements.attachmentFileNameDisplay.textContent =
        task.attachmentFile || "";

    DOMElements.addTaskForm.dataset.editingTaskId = task.id;

    updateDateDisplay(DOMElements.startDateDisplay, DOMElements.startDateInput);
    updateDateDisplay(DOMElements.endDateDisplay, DOMElements.endDateInput);
    updateDateDisplay(DOMElements.startTimeInput, DOMElements.startTimeInput);
    updateDateDisplay(DOMElements.endTimeInput, DOMElements.endTimeInput);
  };

  // =====================================================================
  // --- 6. Event Handler ---
  // =====================================================================

  const handleAddSubtaskClick = (targetButton) => {
    const taskId = parseInt(targetButton.dataset.taskId);
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      const taskCard = targetButton.closest(".task-card");
      const subtasksDiv = taskCard.querySelector(".task-card-subtasks");

      const existingInputContainer = subtasksDiv.querySelector(
        ".new-subtask-input-container"
      );
      if (existingInputContainer) {
        existingInputContainer
          .querySelector(".new-subtask-input-field")
          .focus();
        return;
      }

      const inputContainer = document.createElement("div");
      inputContainer.classList.add("new-subtask-input-container");
      inputContainer.innerHTML = `
                <input type="text" placeholder="Enter new subtask" class="new-subtask-input-field"> <button type="button" class="new-subtask-add-button">Add</button> <button type="button" class="new-subtask-cancel-button">Cancel</button> `;
      subtasksDiv.insertBefore(inputContainer, targetButton.parentElement);

      targetButton.style.display = "none";

      const input = inputContainer.querySelector(".new-subtask-input-field");
      const addButton = inputContainer.querySelector(".new-subtask-add-button");
      const cancelButton = inputContainer.querySelector(
        ".new-subtask-cancel-button"
      );

      input.focus();

      const addAndRenderSubtask = () => {
        const newSubtaskText = input.value.trim();
        if (newSubtaskText) {
          if (!Array.isArray(task.subtasks)) task.subtasks = [];
          task.subtasks.push({
            id: getNextId(task.subtasks),
            text: newSubtaskText,
            completed: false,
          });
          setStorage("tasks", tasks);
          renderTasks();
        } else {
          alert("Subtask description cannot be empty."); // English
        }
      };

      addButton.addEventListener("click", addAndRenderSubtask);
      cancelButton.addEventListener("click", () => {
        inputContainer.remove();
        targetButton.style.display = "flex";
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          addAndRenderSubtask();
        } else if (event.key === "Escape") {
          inputContainer.remove();
          targetButton.style.display = "flex";
        }
      });
    }
  };

  const handleSubtaskCheckboxChange = (checkbox) => {
    const taskId = parseInt(checkbox.dataset.taskId);
    const subtaskId = parseInt(checkbox.dataset.subtaskId);
    const task = tasks.find((t) => t.id === taskId);

    if (task && Array.isArray(task.subtasks)) {
      const subtask = task.subtasks.find((s) => s.id === subtaskId);
      if (subtask) {
        subtask.completed = checkbox.checked;

        const totalSubtasks = task.subtasks.length;
        const completedSubtasks = task.subtasks.filter(
          (s) => s.completed
        ).length;

        task.progress =
          totalSubtasks > 0
            ? Math.round((completedSubtasks / totalSubtasks) * 100)
            : 0;

        if (task.progress === 100) {
          task.status = "completed";
        } else {
          task.status = "in-progress";
        }

        setStorage("tasks", tasks);
        renderTasks();
      }
    }
  };

  const handleTasksListContainerClick = (e) => {
    const target = e.target;

    const menuButton = target.closest(".task-menu");
    if (menuButton) {
      e.stopPropagation();
      const dropdown = menuButton.nextElementSibling;
      if (dropdown && dropdown.classList.contains("task-menu-dropdown")) {
        document.querySelectorAll(".task-menu-dropdown").forEach((dd) => {
          if (dd !== dropdown) dd.style.display = "none";
        });
        dropdown.style.display =
          dropdown.style.display === "flex" ? "none" : "flex";
      }
      return;
    }

    const editButton = target.closest(".edit-task-button");
    if (editButton) {
      const taskId = parseInt(editButton.dataset.taskId);
      const taskToEdit = tasks.find((t) => t.id === taskId);
      if (taskToEdit) openEditTaskModal(taskToEdit);
      const dropdown = editButton.closest(".task-menu-dropdown");
      if (dropdown) dropdown.style.display = "none";
      return;
    }

    const deleteButton = target.closest(".delete-task-button");
    if (deleteButton) {
      const taskId = parseInt(deleteButton.dataset.taskId);
      if (confirm("Are you sure you want to delete this task?")) {
        // English
        tasks = tasks.filter((t) => t.id !== taskId);
        setStorage("tasks", tasks);
        renderTasks();
        alert("Task deleted successfully!"); // English
      }
      const dropdown = deleteButton.closest(".task-menu-dropdown");
      if (dropdown) dropdown.style.display = "none";
      return;
    }

    const addSubtaskButton = target.closest(".add-subtask-button");
    if (addSubtaskButton) {
      handleAddSubtaskClick(addSubtaskButton);
      return;
    }

    const subtaskCheckbox = target.closest(".subtask-checkbox");
    if (subtaskCheckbox) {
      handleSubtaskCheckboxChange(subtaskCheckbox);
      return;
    }
  };

  const attachTaskListeners = () => {
    if (DOMElements.tasksListContainer) {
      DOMElements.tasksListContainer.removeEventListener(
        "click",
        handleTasksListContainerClick
      );
      DOMElements.tasksListContainer.addEventListener(
        "click",
        handleTasksListContainerClick
      );
    }
  };

  // ========================
  // DROPDOWN MENU LOGIC
  // ========================
  const menuIcons = document.querySelectorAll(".menu-icon");

  menuIcons.forEach((menu) => {
    menu.addEventListener("click", function (e) {
      e.stopPropagation(); // cegah klik global
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== this.nextElementSibling) menu.classList.remove("show");
      });
      const dropdown = this.nextElementSibling;
      dropdown.classList.toggle("show");
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((menu) => menu.classList.remove("show"));
  });

  // ========================
  // FILE UPLOAD MODAL LOGIC
  // ========================
  const fileUploadModalOverlay = document.getElementById(
    "fileUploadModalOverlay"
  );
  const fileUploadModalClose = document.getElementById("fileUploadModalClose");
  const fileUploadInput = document.getElementById("fileUploadInput");
  const fileListContainer = document.getElementById("fileListContainer");
  let currentFileTaskId = null;

  const getFilesForTask = (taskId) => {
    const files = localStorage.getItem(`taskFiles_${taskId}`);
    try {
      return files ? JSON.parse(files) : [];
    } catch {
      return [];
    }
  };

  const saveFilesForTask = (taskId, files) => {
    localStorage.setItem(`taskFiles_${taskId}`, JSON.stringify(files));
  };

  const renderFileList = () => {
    if (!fileListContainer || !currentFileTaskId) return;
    const files = getFilesForTask(currentFileTaskId);
    fileListContainer.innerHTML = "";

    if (files.length === 0) {
      fileListContainer.innerHTML = "<p>No files uploaded.</p>";
      return;
    }

    const viewableTypes = ["application/pdf", "image/png", "image/jpeg"];

    files.forEach((file, index) => {
      const container = document.createElement("div");
      container.className = "file-item";

      const name = document.createElement("span");
      name.textContent = file.name;

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "file-actions";

      // Determine file type from dataUrl prefix if possible
      let fileType = "";
      if (file.dataUrl && typeof file.dataUrl === "string") {
        const match = file.dataUrl.match(/^data:([^;]+);base64,/);
        if (match) {
          fileType = match[1];
        }
      }

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View";

      if (viewableTypes.includes(fileType)) {
        viewBtn.addEventListener("click", () => {
          const popup = window.open();
          if (popup) {
            popup.document.write(
              `<iframe src="${file.dataUrl}" style="width:100%;height:100vh;" frameborder="0"></iframe>`
            );
          } else {
            alert("Popup blocked.");
          }
        });
      } else {
        // Disable view button for unsupported types
        viewBtn.disabled = true;
        viewBtn.title = "Preview not available for this file type.";
      }

      const downloadBtn = document.createElement("button");
      downloadBtn.textContent = "Download";
      downloadBtn.addEventListener("click", () => {
        if (!file.dataUrl) {
          alert("File data not available for download.");
          return;
        }
        const link = document.createElement("a");
        link.href = file.dataUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        if (confirm(`Delete "${file.name}"?`)) {
          const updated = getFilesForTask(currentFileTaskId).filter(
            (_, i) => i !== index
          );
          saveFilesForTask(currentFileTaskId, updated);
          renderFileList();
          renderTasks(); // Added to update task card file count
        }
      });

      actionsDiv.appendChild(viewBtn);
      actionsDiv.appendChild(downloadBtn);
      actionsDiv.appendChild(deleteBtn);
      container.appendChild(name);
      container.appendChild(actionsDiv);
      fileListContainer.appendChild(container);
    });
  };

  const openFileUploadModal = (taskId) => {
    currentFileTaskId = taskId;
    renderFileList();
    fileUploadModalOverlay.style.display = "flex";
  };

  const closeFileUploadModal = () => {
    currentFileTaskId = null;
    fileUploadModalOverlay.style.display = "none";
    fileUploadInput.value = "";
  };

  fileUploadModalClose?.addEventListener("click", closeFileUploadModal);
  fileUploadModalOverlay?.addEventListener("click", (e) => {
    if (e.target === fileUploadModalOverlay) closeFileUploadModal();
  });

  // Remove direct event listener on paperclip icons and use event delegation instead
  if (DOMElements.tasksListContainer) {
    DOMElements.tasksListContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (
        target.classList.contains("bx-paperclip") ||
        target.closest(".bx-paperclip")
      ) {
        e.stopPropagation();
        const paperclipIcon = target.classList.contains("bx-paperclip")
          ? target
          : target.closest(".bx-paperclip");
        const taskCard = paperclipIcon.closest(".task-card");
        const taskId = taskCard?.dataset.taskId;
        if (taskId) openFileUploadModal(taskId);
      }
    });
  }

  // File input change event handler for file upload modal
  fileUploadInput?.addEventListener("change", (e) => {
    console.log("File upload input change event triggered");
    if (!currentFileTaskId) {
      console.warn("No currentFileTaskId set, aborting file save");
      return;
    }
    console.log("Current file task ID:", currentFileTaskId);

    const files = Array.from(e.target.files);
    console.log("Files selected:", files);

    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
    ];

    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

    // Check for file size and type before reading
    for (const file of files) {
      if (!allowed.includes(file.type)) {
        alert(`❌ Unsupported file type: ${file.name}`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`❌ The file "${file.name}" is too large. Maximum: 1 MB.`);
        return;
      }
    }

    const readerPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ name: file.name, dataUrl: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((uploadedFiles) => {
      console.log("Files read and ready to save:", uploadedFiles);
      const updated = getFilesForTask(currentFileTaskId).concat(uploadedFiles);
      console.log("Updated files list to save:", updated);

      try {
        saveFilesForTask(currentFileTaskId, updated);
        renderFileList();
      } catch (error) {
        if (error.name === "QuotaExceededError") {
          alert("⚠️ localStorage is almost full. Please delete some files.");
        } else {
          console.error(error);
        }
      }

      fileUploadInput.value = "";
    });
  });

  // =====================================================================
  // --- 7. Initialize All Application Event Listeners ---
  // =====================================================================

  // Toast notification function
  const showToast = (message) => {
    // Remove existing toast if any
    const existingToast = document.querySelector("#customToast");
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement("div");
    toast.id = "customToast";
    toast.textContent = message;

    // Append to body
    document.body.appendChild(toast);

    // Show toast with fade-in
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // Hide toast after 3 seconds with fade-out
    setTimeout(() => {
      toast.classList.remove("show");
      // Remove from DOM after fade-out
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  };

  // Add event listener for three-dot icon in Project Summary column
  if (DOMElements.projectSummaryContainer) {
    DOMElements.projectSummaryContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("bx-dots-horizontal-rounded")) {
        e.stopPropagation();
        showToast("This feature is currently under development. Please stay tuned!");
      }
    });
  }

  // Add event listener for comment/message icon in each task card
  if (DOMElements.tasksListContainer) {
    DOMElements.tasksListContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("bx-message-rounded-dots")) {
        e.stopPropagation();
        showToast("This feature is currently under development. Please stay tuned!");
      }
      // Add event delegation for avatar images in task cards
      if (target.tagName === "IMG" && target.closest(".avatar-group")) {
        e.stopPropagation();
        showToast("This feature is currently under development. Please stay tuned!");
      }
    });
  }

  // Add event delegation for avatar images in project summary cards
  if (DOMElements.projectSummaryContainer) {
    DOMElements.projectSummaryContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "IMG" && target.closest(".avatar-group")) {
        e.stopPropagation();
        showToast("This feature is currently under development. Please stay tuned!");
      }
    });
  }

  // Add event listener for notification bell icon in header
  const headerBellButton = document.querySelector(".header-icons > button.icon-button.bx-bell, .header-icons > button.icon-button i.bx-bx-bell, .header-icons > button.icon-button i.bx.bx-bell");
  if (headerBellButton) {
    headerBellButton.addEventListener("click", (event) => {
      event.stopPropagation();
      showToast("This feature is currently under development. Please stay tuned!");
    });
  }

  // Add event listener for user avatar image in header
  const userProfileImage = document.querySelector(".header-icons .user-profile img");
  if (userProfileImage) {
    userProfileImage.addEventListener("click", (event) => {
      event.stopPropagation();
      showToast("This feature is currently under development. Please stay tuned!");
    });
  }

  if (DOMElements.mobileMenuToggle && DOMElements.dashboardContainer) {
    DOMElements.mobileMenuToggle.addEventListener("click", () => {
      console.log("DEBUG: mobileMenuToggle clicked");
      DOMElements.dashboardContainer.classList.toggle("sidebar-open");
      console.log("DEBUG: sidebar-open class toggled on dashboardContainer");
    });
  }

  if (DOMElements.sidebarOverlay && DOMElements.dashboardContainer) {
    DOMElements.sidebarOverlay.addEventListener("click", () => {
      DOMElements.dashboardContainer.classList.remove("sidebar-open");
    });
  }

  if (DOMElements.sidebarCloseButton && DOMElements.dashboardContainer) {
    const updateSidebarCloseButtonVisibility = () => {
      if (DOMElements.dashboardContainer.classList.contains("sidebar-open")) {
        DOMElements.sidebarCloseButton.style.display = "block";
      } else {
        DOMElements.sidebarCloseButton.style.display = "none";
      }
    };

    // Initial check on page load
    updateSidebarCloseButtonVisibility();

    // Toggle sidebar close button visibility on sidebar open/close
    const mobileMenuToggle = DOMElements.mobileMenuToggle;
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => {
        setTimeout(() => {
          updateSidebarCloseButtonVisibility();
        }, 100); // Delay to allow class toggle
      });
    }

    DOMElements.sidebarCloseButton.addEventListener("click", () => {
      DOMElements.dashboardContainer.classList.remove("sidebar-open");
      updateSidebarCloseButtonVisibility();
    });

    // Update close button visibility on window resize
    window.addEventListener("resize", () => {
      updateSidebarCloseButtonVisibility();
    });

    // Initial call to set correct visibility on page load
    updateSidebarCloseButtonVisibility();
  }

  if (DOMElements.taskSearchInput) {
    DOMElements.taskSearchInput.addEventListener("input", (e) => {
      renderTasks(e.target.value);
    });
  }

  if (DOMElements.prevProjectBtn)
    DOMElements.prevProjectBtn.addEventListener("click", () =>
      alert("Previous Project (function not implemented)")
    ); // English
  if (DOMElements.nextProjectBtn)
    DOMElements.nextProjectBtn.addEventListener("click", () =>
      alert("Next Project (function not implemented)")
    ); // English

  if (DOMElements.addTaskButton && DOMElements.addTaskModalOverlay) {
    DOMElements.addTaskButton.addEventListener("click", () => {
      resetModalToAddMode();
      DOMElements.addTaskModalOverlay.style.display = "flex";
      populateChooseTeamSelect();
    });
  }

  if (DOMElements.addTaskModalCloseButton && DOMElements.addTaskModalOverlay) {
    DOMElements.addTaskModalCloseButton.addEventListener("click", () => {
      DOMElements.addTaskModalOverlay.style.display = "none";
      resetModalToAddMode();
    });
  }

  document.addEventListener("click", (e) => {
    document.querySelectorAll(".task-menu-dropdown").forEach((dd) => {
      const menuButton = dd.previousElementSibling;
      if (
        menuButton &&
        !menuButton.contains(e.target) &&
        !dd.contains(e.target)
      ) {
        dd.style.display = "none";
      }
    });
  });

  if (DOMElements.addTaskForm) {
    DOMElements.addTaskForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const taskTitle =
        DOMElements.addTaskForm.querySelector("#taskTitle").value;
      const description =
        DOMElements.addTaskForm.querySelector("#description").value;
      const chosenTeam =
        DOMElements.addTaskForm.querySelector("#chooseTeamSelect").value;
      const startDate =
        DOMElements.addTaskForm.querySelector("#startDate").value;
      const startTime =
        DOMElements.addTaskForm.querySelector("#startTime").value;
      const endDate = DOMElements.addTaskForm.querySelector("#endDate").value;
      const endTime = DOMElements.addTaskForm.querySelector("#endTime").value;
      const assignTo = DOMElements.addTaskForm.querySelector("#assignTo").value;
      const priority =
        DOMElements.addTaskForm.querySelector("#prioritySelect").value;
      const files = DOMElements.attachmentInput
        ? Array.from(DOMElements.attachmentInput.files)
        : [];

      if (
        !taskTitle ||
        !chosenTeam ||
        !startDate ||
        !startTime ||
        !endDate ||
        !endTime ||
        !assignTo
      ) {
        alert("Please fill in all required fields!"); // English
        return;
      }

      // Helper function to read a file as base64 data URL
      const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({ name: file.name, dataUrl: reader.result });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      // Read all files as base64 data URLs
      let uploadedFiles = [];
      if (files.length > 0) {
        try {
          uploadedFiles = await Promise.all(files.map(readFileAsDataURL));
        } catch (error) {
          alert("Error reading files. Please try again.");
          return;
        }
      }

      const editingTaskId = DOMElements.addTaskForm.dataset.editingTaskId;

      if (editingTaskId) {
        const taskIndex = tasks.findIndex(
          (t) => t.id === parseInt(editingTaskId)
        );
        if (taskIndex !== -1) {
          const task = tasks[taskIndex];
          Object.assign(task, {
            title: taskTitle,
            description,
            team: chosenTeam,
            startDate,
            startTime,
            endDate,
            endTime,
            assignTo,
            priority,
          });
          if (uploadedFiles.length > 0) {
            task.attachmentFile = uploadedFiles[0].name;
            try {
              saveFilesForTask(task.id, uploadedFiles);
            } catch (error) {
              if (error.name === "QuotaExceededError") {
                alert(
                  "⚠️ localStorage is almost full. Please delete some files."
                );
                return;
              } else {
                throw error;
              }
            }
          }
          setStorage("tasks", tasks);
          tasks = getStorage("tasks");  // Reload tasks from localStorage
          alert("Task updated successfully!"); // English
        } else {
          alert("Error: Task to edit not found."); // English
        }
      } else {
        const newTaskId = getNextId(tasks);
        const newTask = {
          id: newTaskId,
          title: taskTitle,
          description: description,
          team: chosenTeam,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          assignTo: assignTo,
          attachmentFile:
            uploadedFiles.length > 0 ? uploadedFiles[0].name : null,
          status: "in-progress",
          progress: 0,
          priority: priority,
          subtasks: [],
          avatars: ["men/32", "women/44"],
          subject: "General", // English
          teacher: "N/A",
          type: "Task",
        };
        tasks.unshift(newTask);
        try {
          setStorage("tasks", tasks);
          tasks = getStorage("tasks");  // Reload tasks from localStorage
          if (uploadedFiles.length > 0) {
            saveFilesForTask(newTaskId, uploadedFiles);
          }
        } catch (error) {
          if (error.name === "QuotaExceededError") {
            alert("⚠️ localStorage is almost full. Please delete some files.");
            return;
          } else {
            throw error;
          }
        }
        alert("Task added successfully!"); // English
        // Removed forced reset of priority filter to preserve user selection
        // if (DOMElements.priorityFilterSelect) {
        //   DOMElements.priorityFilterSelect.value = "all";
        //   DOMElements.priorityFilterSelect.style.backgroundColor = "";
        //   DOMElements.priorityFilterSelect.title = "";
        //   localStorage.setItem("priorityFilter", "all");
        // }
      }
      DOMElements.addTaskModalOverlay.style.display = "none";
      resetModalToAddMode();
      renderTasks();
    });
  }

  if (DOMElements.taskStatusFilterSelect) {
    DOMElements.taskStatusFilterSelect.addEventListener("change", () => {
      renderTasks();
      localStorage.setItem(
        "taskStatusFilter",
        DOMElements.taskStatusFilterSelect.value
      );
    });
    const savedStatusFilter = localStorage.getItem("taskStatusFilter");
    if (savedStatusFilter)
      DOMElements.taskStatusFilterSelect.value = savedStatusFilter;
    else DOMElements.taskStatusFilterSelect.value = "all";
  }

  if (DOMElements.priorityFilterSelect) {
    DOMElements.priorityFilterSelect.addEventListener("change", () => {
      renderTasks();
      localStorage.setItem(
        "priorityFilter",
        DOMElements.priorityFilterSelect.value
      );
      if (DOMElements.priorityFilterSelect.value !== "all") {
        DOMElements.priorityFilterSelect.style.backgroundColor = "#d0e6ff";
        DOMElements.priorityFilterSelect.title = `Filtered by: ${
          DOMElements.priorityFilterSelect.options[
            DOMElements.priorityFilterSelect.selectedIndex
          ].text
        }`; // English
      } else {
        DOMElements.priorityFilterSelect.style.backgroundColor = "";
        DOMElements.priorityFilterSelect.title = "";
      }
    });
    const savedPriorityFilter = localStorage.getItem("priorityFilter");
    if (savedPriorityFilter) {
      DOMElements.priorityFilterSelect.value = savedPriorityFilter;
      if (savedPriorityFilter !== "all") {
        DOMElements.priorityFilterSelect.style.backgroundColor = "#d0e6ff";
        DOMElements.priorityFilterSelect.title = `Filtered by: ${
          DOMElements.priorityFilterSelect.options[
            DOMElements.priorityFilterSelect.selectedIndex
          ].text
        }`; // English
      }
    }
  }

  if (DOMElements.tasksTabs) {
    DOMElements.tasksTabs.addEventListener("click", (e) => {
      const clickedButton = e.target.closest("button");
      if (clickedButton) {
        DOMElements.tasksTabs
          .querySelectorAll("button")
          .forEach((btn) => btn.classList.remove("active"));
        clickedButton.classList.add("active");

        const buttonText = clickedButton.textContent.trim();
        if (buttonText.includes("Category")) {
          // English
          if (DOMElements.tasksListContainer)
            DOMElements.tasksListContainer.style.display = "flex";
          renderTasks();
        } else if (buttonText.includes("Members")) {
          // English
          alert("Members tab clicked - implement members list view."); // English
          if (DOMElements.tasksListContainer)
            DOMElements.tasksListContainer.style.display = "none";
        }
      }
    });
  }

  if (DOMElements.prevMonthBtn) {
    DOMElements.prevMonthBtn.addEventListener("click", () => {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
      renderCalendar(currentCalendarDate);
      renderTodaySchedule(currentCalendarDate);
    });
  }
  if (DOMElements.nextMonthBtn) {
    DOMElements.nextMonthBtn.addEventListener("click", () => {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
      renderCalendar(currentCalendarDate);
      renderTodaySchedule(currentCalendarDate);
    });
  }

  // Toggle area deskripsi di modal tugas (Add/Edit Task)
  if (DOMElements.addDescriptionToggle) {
    DOMElements.addDescriptionToggle.addEventListener("click", function () {
      console.log("DEBUG: Add Description toggle clicked!");
      if (DOMElements.descriptionInputArea) {
        const currentDisplay = DOMElements.descriptionInputArea.style.display;
        console.log(
          "DEBUG: Current descriptionInputArea display:",
          currentDisplay
        );

        const isHidden = currentDisplay === "none" || currentDisplay === "";
        DOMElements.descriptionInputArea.style.display = isHidden
          ? "block"
          : "none";
        console.log(
          "DEBUG: New descriptionInputArea display set to:",
          DOMElements.descriptionInputArea.style.display
        );

        if (isHidden && DOMElements.descriptionTextarea) {
          DOMElements.descriptionTextarea.focus();
          console.log("DEBUG: Description textarea focused.");
        } else if (!DOMElements.descriptionTextarea) {
          console.warn(
            "WARNING: descriptionTextarea element not found, cannot focus."
          );
        }
      } else {
        console.warn(
          "ERROR: DOMElements.descriptionInputArea not found in DOM!"
        );
      }
    });
  } else {
    console.warn("ERROR: DOMElements.addDescriptionToggle not found in DOM!");
  }

  if (DOMElements.chooseTeamToggle) {
    DOMElements.chooseTeamToggle.addEventListener("click", function () {
      if (DOMElements.teamDisplayDropdown)
        DOMElements.teamDisplayDropdown.style.display = "none";
      if (DOMElements.teamInputArea) {
        DOMElements.teamInputArea.style.display = "flex";
        DOMElements.newTeamInput.focus();
      }
    });
  }

  if (DOMElements.addTeamButtonModal) {
    DOMElements.addTeamButtonModal.addEventListener("click", function () {
      const newTeamName = DOMElements.newTeamInput.value.trim();
      if (newTeamName) {
        const newTeamId = newTeamName.toLowerCase().replace(/\s/g, "-");
        if (!teams.some((team) => team.id === newTeamId)) {
          teams.push({ id: newTeamId, name: newTeamName });
          setStorage("teams", teams);
          populateChooseTeamSelect();
          DOMElements.chooseTeamSelect.value = newTeamId;

          if (DOMElements.teamInputArea)
            DOMElements.teamInputArea.style.display = "none";
          if (DOMElements.teamDisplayDropdown)
            DOMElements.teamDisplayDropdown.style.display = "flex";
          DOMElements.newTeamInput.value = "";
        } else {
          alert("Team already exists!"); // English
        }
      } else {
        alert("Please enter a team name."); // English
      }
    });
  }

  if (DOMElements.attachmentInput) {
    DOMElements.attachmentInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        if (DOMElements.attachmentFileNameDisplay)
          DOMElements.attachmentFileNameDisplay.textContent =
            this.files[0].name;
      } else {
        if (DOMElements.attachmentFileNameDisplay)
          DOMElements.attachmentFileNameDisplay.textContent = "";
      }
    });
  }

  // =====================================================================
  // --- 8. Today's Schedule Dropdown Menu Functionality ---
  // =====================================================================

  const updateDeleteSelectedTodayScheduleButtonVisibility = () => {
    if (!DOMElements.deleteSelectedTodayScheduleBtn) {
      console.warn(
        "WARNING: DOMElements.deleteSelectedTodayScheduleBtn not found."
      );
      return;
    }
    const checkboxes = DOMElements.todayScheduleList.querySelectorAll(
      ".schedule-select-checkbox"
    );
    const anyChecked = Array.from(checkboxes).some((cb) => cb.checked);
    DOMElements.deleteSelectedTodayScheduleBtn.style.display = anyChecked
      ? "flex"
      : "none";
    console.log(
      "DEBUG: 'Delete selected schedule' button visibility updated:",
      DOMElements.deleteSelectedTodayScheduleBtn.style.display
    );
  };

  function updateEditTodayScheduleButtonVisibility() {
    if (!DOMElements.editTodayScheduleBtn) {
      console.warn("WARNING: DOMElements.editTodayScheduleBtn not found.");
      return;
    }
    const todayDateString = getLocalDateString(currentCalendarDate);
    const hasTodaySchedule = schedules.some(
      (s) => s.date && getLocalDateString(new Date(s.date)) === todayDateString
    );
    DOMElements.editTodayScheduleBtn.style.display = hasTodaySchedule
      ? "flex"
      : "none";
    console.log(
      "DEBUG: 'Edit today's schedule' button visibility updated:",
      DOMElements.editTodayScheduleBtn.style.display
    );
  }

  if (
    DOMElements.todayScheduleMenuButton &&
    DOMElements.todayScheduleDropdown
  ) {
    console.log("DEBUG: Attaching event listener for todayScheduleMenuButton.");
    DOMElements.todayScheduleMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = DOMElements.todayScheduleDropdown;
      if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "flex";
        updateDeleteSelectedTodayScheduleButtonVisibility();
        updateEditTodayScheduleButtonVisibility();
      } else {
        dropdown.style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (
        DOMElements.todayScheduleDropdown &&
        !DOMElements.todayScheduleDropdown.contains(e.target) &&
        DOMElements.todayScheduleMenuButton &&
        !DOMElements.todayScheduleMenuButton.contains(e.target)
      ) {
        DOMElements.todayScheduleDropdown.style.display = "none";
      }
    });
  } else {
    console.warn(
      "WARNING: DOMElements.todayScheduleMenuButton or DOMElements.todayScheduleDropdown not found, event listener not attached."
    );
  }

  if (DOMElements.addNewScheduleBtn) {
    DOMElements.addNewScheduleBtn.addEventListener("click", () => {
      DOMElements.todayScheduleDropdown.style.display = "none";
      if (document.getElementById("addScheduleModal")) {
        const scheduleForm = document.getElementById("scheduleForm");
        if (scheduleForm) scheduleForm.reset();
        const formTitle = document.getElementById("formTitle");
        if (formTitle) formTitle.textContent = "Add New Schedule"; // English
        const saveScheduleButton =
          document.getElementById("saveScheduleButton");
        if (saveScheduleButton) saveScheduleButton.textContent = "Add Schedule"; // English
        const scheduleIdInput = document.getElementById("scheduleId");
        if (scheduleIdInput) scheduleIdInput.value = "";

        if (
          document.getElementById("dateDisplay") &&
          document.getElementById("dateInput")
        ) {
          document.getElementById("dateInput").value = "";
          document.getElementById("dateDisplay").value = "";
        }
        if (
          document.getElementById("startTimeDisplay") &&
          document.getElementById("startTimeInput")
        ) {
          document.getElementById("startTimeInput").value = "";
          document.getElementById("startTimeDisplay").value = "";
        }
        if (
          document.getElementById("endTimeDisplay") &&
          document.getElementById("endTimeInput")
        ) {
          document.getElementById("endTimeInput").value = "";
          document.getElementById("endTimeDisplay").value = "";
        }

        document.getElementById("addScheduleModal").style.display = "flex";
      } else {
        window.location.href = "schedule.html#add";
      }
    });
  }

  if (DOMElements.editTodayScheduleBtn) {
    DOMElements.editTodayScheduleBtn.addEventListener("click", () => {
      DOMElements.todayScheduleDropdown.style.display = "none";
      const todayDateString = getLocalDateString(currentCalendarDate);
      const todaySchedules = schedules.filter(
        (s) =>
          s.date && getLocalDateString(new Date(s.date)) === todayDateString
      );

      if (todaySchedules.length === 0) {
        alert("No schedules for today to edit."); // English
        return;
      }

      const scheduleToEdit = todaySchedules[0];

      if (document.getElementById("addScheduleModal")) {
        const scheduleForm = document.getElementById("scheduleForm");
        const formTitle = document.getElementById("formTitle");
        const saveScheduleButton =
          document.getElementById("saveScheduleButton");
        const scheduleIdInput = document.getElementById("scheduleId");
        const titleInput = document.getElementById("title");
        const dateInput = document.getElementById("dateInput");
        const startTimeInput = document.getElementById("startTimeInput");
        const endTimeInput = document.getElementById("endTimeInput");
        const statusColorSelect = document.getElementById("statusColor");

        if (formTitle) formTitle.textContent = "Edit Schedule"; // English
        if (saveScheduleButton) saveScheduleButton.textContent = "Save Changes"; // English
        if (scheduleIdInput) scheduleIdInput.value = scheduleToEdit.id;

        if (titleInput) titleInput.value = scheduleToEdit.title || "";
        if (dateInput) dateInput.value = scheduleToEdit.date || "";
        if (startTimeInput)
          startTimeInput.value = scheduleToEdit.startTime || "";
        if (endTimeInput) endTimeInput.value = scheduleToEdit.endTime || "";
        if (statusColorSelect)
          statusColorSelect.value = scheduleToEdit.statusColor || "blue";

        if (document.getElementById("dateDisplay"))
          document
            .getElementById("dateInput")
            .dispatchEvent(new Event("change"));
        if (document.getElementById("startTimeDisplay"))
          document
            .getElementById("startTimeInput")
            .dispatchEvent(new Event("change"));
        if (document.getElementById("endTimeDisplay"))
          document
            .getElementById("endTimeInput")
            .dispatchEvent(new Event("change"));

        document.getElementById("addScheduleModal").style.display = "flex";
      } else {
        window.location.href = `schedule.html#edit-${scheduleToEdit.id}`;
      }
    });
  }

  if (DOMElements.deleteSelectedTodayScheduleBtn) {
    DOMElements.deleteSelectedTodayScheduleBtn.style.display = "none";
    DOMElements.deleteSelectedTodayScheduleBtn.addEventListener("click", () => {
      DOMElements.todayScheduleDropdown.style.display = "none";
      const checkboxes = DOMElements.todayScheduleList.querySelectorAll(
        ".schedule-select-checkbox:checked"
      );
      const idsToDelete = Array.from(checkboxes).map((cb) =>
        parseInt(cb.dataset.id)
      );

      if (idsToDelete.length === 0) {
        alert("Please select schedules to delete first."); // English
        return;
      }
      if (
        confirm(
          `Are you sure you want to delete ${idsToDelete.length} schedule(s)?`
        )
      ) {
        // English
        schedules = schedules.filter((s) => !idsToDelete.includes(s.id));
        setStorage("schedules", schedules);
        renderProjectSummary();
        renderTasks();
        renderCalendar(currentCalendarDate);
        renderTodaySchedule(currentCalendarDate);
        alert("Schedule(s) deleted successfully."); // English
      }
    });
  }

  if (DOMElements.refreshScheduleBtn) {
    DOMElements.refreshScheduleBtn.addEventListener("click", () => {
      DOMElements.todayScheduleDropdown.style.display = "none";
      schedules = getStorage("schedules");
      renderTodaySchedule(currentCalendarDate);
      alert("Today's schedule has been refreshed."); // English
    });
  }

  if (DOMElements.todayScheduleList) {
    DOMElements.todayScheduleList.addEventListener("change", (e) => {
      if (e.target.classList.contains("schedule-select-checkbox")) {
        updateDeleteSelectedTodayScheduleButtonVisibility();
      }
    });
  }

  if (DOMElements.todayScheduleList) {
    DOMElements.todayScheduleList.addEventListener("click", (e) => {
      if (e.target.classList.contains("schedule-select-checkbox")) {
        return;
      }
      const scheduleItem = e.target.closest(".schedule-item");
      if (scheduleItem) {
        const tasksSection = document.querySelector(".tasks-section");
        if (tasksSection) {
          tasksSection.scrollIntoView({ behavior: "smooth" });
          tasksSection.classList.add("highlight-tasks");
          setTimeout(() => {
            tasksSection.classList.remove("highlight-tasks");
          }, 2000);
        }
      }
    });
  }

  // =====================================================================
  // --- 9. Initial Application Setup ---
  // =====================================================================

  // Initial render calls
  renderProjectSummary();
  renderTasks();
  renderCalendar(currentCalendarDate);
  renderTodaySchedule(currentCalendarDate);
  populateChooseTeamSelect();

  // Add event listener for project summary filter dropdown
  const projectSummaryFilter = document.getElementById("projectSummaryFilter");
  if (projectSummaryFilter) {
    projectSummaryFilter.addEventListener("change", (e) => {
      const selectedStatus = e.target.value;
      renderProjectSummary(selectedStatus);
    });
  }

  // Add toggle visibility button event listener
  const toggleVisibilityButton = document.getElementById(
    "toggleProjectSummaryVisibility"
  );
  let projectCardsHidden = false;
  if (toggleVisibilityButton) {
    toggleVisibilityButton.addEventListener("click", () => {
      const projectCards = document.querySelectorAll(".project-card");
      if (!projectCardsHidden) {
        // Hide all project cards with smooth transition
        projectCards.forEach((card) => {
          card.classList.add("hidden");
        });
        toggleVisibilityButton.textContent = "Show All";
        toggleVisibilityButton.setAttribute("aria-pressed", "true");
        projectCardsHidden = true;
      } else {
        // Show all project cards
        projectCards.forEach((card) => {
          card.classList.remove("hidden");
        });
        toggleVisibilityButton.textContent = "Hide All";
        toggleVisibilityButton.setAttribute("aria-pressed", "false");
        projectCardsHidden = false;
      }
    });
  }

  // Initialize date/time display inputs for the task modal form
  if (DOMElements.startDateDisplay && DOMElements.startDateInput) {
    updateDateDisplay(DOMElements.startDateDisplay, DOMElements.startDateInput);
  }
  if (DOMElements.endDateDisplay && DOMElements.endDateInput) {
    updateDateDisplay(DOMElements.endDateDisplay, DOMElements.endDateInput);
  }
  if (DOMElements.startTimeDisplay && DOMElements.startTimeInput) {
    updateDateDisplay(DOMElements.startTimeDisplay, DOMElements.startTimeInput);
  }
  if (DOMElements.endTimeDisplay && DOMElements.endTimeInput) {
    updateDateDisplay(DOMElements.endTimeDisplay, DOMElements.endTimeInput);
  }

  // Ensure initial state of sidebar: open on large screens, closed on smaller screens
  if (DOMElements.dashboardContainer) {
    if (window.innerWidth > 992) {
      DOMElements.dashboardContainer.classList.add("sidebar-open");
    } else {
      DOMElements.dashboardContainer.classList.remove("sidebar-open");
    }
  }

  // Add toggle functionality for In Progress tasks column
  if (DOMElements.inProgressToggle && DOMElements.inProgressTasksDiv) {
    DOMElements.inProgressToggle.addEventListener("click", () => {
      const tasksDiv = DOMElements.inProgressTasksDiv;
      const icon = DOMElements.inProgressToggle;
      if (tasksDiv.classList.contains("collapsed")) {
        tasksDiv.classList.remove("collapsed");
        icon.classList.remove("bx-chevron-up");
        icon.classList.add("bx-chevron-down");
      } else {
        tasksDiv.classList.add("collapsed");
        icon.classList.remove("bx-chevron-down");
        icon.classList.add("bx-chevron-up");
      }
    });
  }

  // Add toggle functionality for Completed tasks column
  if (DOMElements.completedToggle && DOMElements.completedTasksDiv) {
    DOMElements.completedToggle.addEventListener("click", () => {
      const tasksDiv = DOMElements.completedTasksDiv;
      const icon = DOMElements.completedToggle;
      if (tasksDiv.classList.contains("collapsed")) {
        tasksDiv.classList.remove("collapsed");
        icon.classList.remove("bx-chevron-up");
        icon.classList.add("bx-chevron-down");
      } else {
        tasksDiv.classList.add("collapsed");
        icon.classList.remove("bx-chevron-down");
        icon.classList.add("bx-chevron-up");
      }
    });
  }
});
