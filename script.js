document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Utility Functions ---
    // Function to get data from localStorage
    const getStorage = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error reading from localStorage for key:", key, e);
            return [];
        }
    };

    // Function to save data to localStorage
    const setStorage = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`Data for key '${key}' saved to localStorage.`);
        } catch (e) {
            console.error("Error writing to localStorage for key:", key, e);
        }
    };

    // Function to get the next ID
    const getNextId = (arr) =>
        arr.length > 0 ? Math.max(...arr.map((item) => item.id)) + 1 : 1;

    // Function to format date for display
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            // Using 'id-ID' for Indonesian date format
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        } catch (e) {
            console.error("Invalid date string for formatting:", dateString, e);
            return dateString;
        }
    };

    // Helper function to get local YYYY-MM-DD date string without timezone shift
    const getLocalDateString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Helper function to compare two dates by year, month, and day
    const isSameDate = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    // --- 2. Data Management (Simulated API with localStorage) ---
    // Initialize data from localStorage or dummy data if empty
    let projects = getStorage("projects");
    let tasks = getStorage("tasks");
    let schedules = getStorage("schedules");
    let teams = getStorage("teams");
    let currentCalendarDate = new Date();

    // Initialize dummy data if storage is empty
    const initializeDummyData = () => {
        if (projects.length === 0) {
            projects = [{
                id: 1,
                title: "Diskusi Proyek Perangkat Lunak",
                description: "Tim perangkat lunak bertanggung jawab atas perencanaan, penjadwalan, penganggaran, pelaksanaan, dan pengiriman proyek perangkat lunak dan web. Mereka memastikan keberhasilan penyelesaian semua proyek perangkat lunak.",
                progress: 75,
                daysLeft: 3,
                avatars: ["men/32", "women/44", "men/54"],
                type: "blue",
            }, {
                id: 2,
                title: "Pengembangan Modul Autentikasi",
                description: "Mengembangkan modul autentikasi pengguna baru dengan fitur login dan registrasi yang aman.",
                progress: 40,
                daysLeft: 7,
                avatars: ["men/10", "women/20"],
                type: "purple",
            }, {
                id: 3,
                title: "Perencanaan Proyek Q3",
                description: "Menguraikan seluruh ruang lingkup proyek, tonggak sejarah, dan alokasi sumber daya untuk kuartal mendatang.",
                progress: 10,
                daysLeft: 14,
                avatars: ["women/5", "men/15"],
                type: "red",
            }, ];
            setStorage("projects", projects);
        }

        if (tasks.length === 0) {
            tasks = [{
                id: 1,
                title: "Desain Aplikasi Seluler",
                description: "Pertemuan Desain UI/UX",
                subject: "Desain",
                teacher: "Ms Diana Smith",
                type: "Task",
                status: "in-progress",
                progress: 5,
                priority: "high",
                subtasks: [{
                    id: 1,
                    text: "Brainstorming Konsep",
                    completed: false
                }],
                avatars: ["men/1", "women/2"],
                team: "design",
                startDate: "2025-07-10",
                startTime: "09:00",
                endDate: "2025-07-15",
                endTime: "17:00",
                assignTo: "John Doe",
            }, {
                id: 2,
                title: "Kisah Motivator Terkenal",
                description: "Menganalisis biografi tokoh inspiratif",
                subject: "Biografi",
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
            }, {
                id: 6,
                title: "Tugas Prioritas Medium",
                description: "Contoh tugas dengan prioritas medium",
                subject: "Umum",
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
            }, {
                id: 3,
                title: "Tugas Properti Aljabar",
                description: "Penyelesaian masalah properti aljabar dari buku teks",
                subject: "Matematika",
                teacher: "Mr Jhon Lock",
                type: "Task",
                status: "in-progress",
                progress: 60,
                priority: "high",
                subtasks: [{
                    id: 1,
                    text: "Selesaikan soal 1-5",
                    completed: false
                }, {
                    id: 2,
                    text: "Periksa jawaban",
                    completed: false
                }, ],
                avatars: ["men/5", "women/6"],
                team: "marketing",
                startDate: "2025-07-12",
                startTime: "13:00",
                endDate: "2025-07-18",
                endTime: "16:00",
                assignTo: "Michael Johnson",
            }, {
                id: 4,
                title: "Teori Properti Aljabar",
                description: "Memahami konsep dasar properti aljabar",
                subject: "Matematika",
                teacher: "Mr Jhon Lock",
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
            }, {
                id: 5,
                title: "Menentukan IQ Seseorang",
                description: "Memahami berbagai metode dan tes untuk mengukur IQ",
                subject: "Psikologi",
                teacher: "Mr Melvin Ruslan",
                type: "Theory",
                status: "in-progress",
                progress: 80,
                priority: "low",
                subtasks: [{
                    id: 1,
                    text: "Baca Bab 3",
                    completed: false
                }],
                avatars: ["men/9", "women/10"],
                team: "development",
                startDate: "2025-07-11",
                startTime: "14:00",
                endDate: "2025-07-13",
                endTime: "17:00",
                assignTo: "Chris Green",
            }, ];
            setStorage("tasks", tasks);
        }
        if (schedules.length === 0) {
            // Use July 2025 dates to match the calendar display in index page
            schedules = [{
                id: 1,
                title: "Membuat Aplikasi Seluler yang Keren",
                description: "Pertemuan Desain UI/UX",
                time: "09:00 - 10:00 AM",
                statusColor: "green",
                completed: false,
                avatars: ["men/1", "women/2"],
                date: "2025-07-13",
            }, {
                id: 2,
                title: "Rencana & Strategi Pemasaran",
                description: "Pertemuan Pemasaran",
                time: "10:00 - 11:00 AM",
                statusColor: "blue",
                completed: false,
                avatars: ["men/3", "women/4"],
                date: "2025-07-15",
            }, {
                id: 3,
                title: "Persiapan Ujian Literatur Proyek",
                description: "Sesi Kelompok Belajar",
                time: "13:00 - 15:00 PM",
                statusColor: "red",
                completed: false,
                avatars: ["men/5", "women/6"],
                date: "2025-07-20",
            }, ];
            setStorage("schedules", schedules);
        }
        if (teams.length === 0) {
            teams = [{
                id: "design",
                name: "Desain"
            }, {
                id: "development",
                name: "Pengembangan"
            }, {
                id: "marketing",
                name: "Pemasaran"
            }, ];
            setStorage("teams", teams);
        }
    };

    initializeDummyData(); // Call data initialization when DOM is loaded

    // --- 3. DOM Elements Cache ---
    // Cache all frequently accessed DOM elements
    const DOMElements = {
        dashboardContainer: document.getElementById("dashboardContainer"),
        mobileMenuToggle: document.getElementById("mobileMenuToggle"),
        sidebarLeft: document.getElementById("sidebarLeft"),
        sidebarOverlay: document.getElementById("sidebarOverlay"),

        projectSummaryContainer: document.getElementById("projectSummaryContainer"),
        prevProjectBtn: document.getElementById("prevProject"),
        nextProjectBtn: document.getElementById("nextProject"),

        inProgressTasksDiv: document.getElementById("inProgressTasks"),
        completedTasksDiv: document.getElementById("completedTasks"),
        inProgressCountSpan: document.getElementById("inProgressCount"),
        completedCountSpan: document.getElementById("completedCount"),

        addTaskButton: document.getElementById("addTaskButton"),
        addTaskModalOverlay: document.getElementById("addTaskModalOverlay"),
        addTaskModalCloseButton: document.getElementById("addTaskModalClose"),
        addTaskForm: document.getElementById("addTaskForm"),
        modalTitle: document.getElementById("modalTitle"),
        createTaskModalButton: document.getElementById("createTaskModalButton"),

        tasksTabs: document.querySelector(".tasks-filters"),
        taskStatusFilterSelect: document.getElementById("taskStatusFilterSelect"),
        priorityFilterSelect: document.getElementById("priorityFilterSelect"), // Added to DOMElements

        currentMonthYearHeader: document.getElementById("currentMonthYear"),
        calendarGridEl: document.getElementById("calendarGrid"),
        prevMonthBtn: document.getElementById("prevMonthBtn"),
        nextMonthBtn: document.getElementById("nextMonthBtn"),

        todayScheduleList: document.getElementById("todayScheduleList"),
        todayScheduleMenuButton: document.getElementById("todayScheduleMenuButton"), // Added
        todayScheduleDropdown: document.getElementById("todayScheduleDropdown"), // Added
        addNewScheduleBtn: document.getElementById("addNewScheduleBtn"), // Added
        editTodayScheduleBtn: document.getElementById("editTodayScheduleBtn"), // Added

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
        tasksListContainer: document.getElementById("tasksListContainer"),
    };

    // --- 4. Render Functions ---

    // Render project summary cards
    const renderProjectSummary = () => {
        if (!DOMElements.projectSummaryContainer) return;
        DOMElements.projectSummaryContainer.innerHTML = "";

        const allTasks = getStorage("tasks") || [];
        const allTeams = getStorage("teams") || [{
            id: "design",
            name: "Desain"
        }, {
            id: "development",
            name: "Pengembangan"
        }, {
            id: "marketing",
            name: "Pemasaran"
        }, {
            id: "general",
            name: "Umum"
        }, ];

        const inProgressTasks = allTasks.filter(task => task.status === "in-progress");

        const projectsMap = new Map();

        // Initialize projectsMap with all teams, even if no tasks
        allTeams.forEach(team => {
            projectsMap.set(team.id, {
                title: team.name,
                description: "",
                tasks: [],
                avatars: new Set(),
                progressSum: 0,
                daysLeftMin: null,
            });
        });

        inProgressTasks.forEach(task => {
            const projectKey = task.team || "general";
            if (!projectsMap.has(projectKey)) {
                projectsMap.set(projectKey, {
                    title: projectKey.charAt(0).toUpperCase() + projectKey.slice(1),
                    description: "",
                    tasks: [],
                    avatars: new Set(),
                    progressSum: 0,
                    daysLeftMin: null,
                });
            }
            const project = projectsMap.get(projectKey);
            project.tasks.push(task);
            project.progressSum += task.progress || 0;
            // Use earliest endDate for daysLeft
            if (task.endDate) {
                const endDate = new Date(task.endDate);
                if (!project.daysLeftMin || endDate < project.daysLeftMin) {
                    project.daysLeftMin = endDate;
                }
            }
            // Collect avatars from assignedUsers or avatars property
            if (Array.isArray(task.avatars)) {
                task.avatars.forEach(av => project.avatars.add(av));
            } else if (task.assignTo) {
                // Generate a consistent avatar string for assignedTo if no specific avatar is given
                const seed = task.assignTo.split(' ')[0]; // Use first name as a seed
                const gender = Math.random() < 0.5 ? 'men' : 'women'; // Random gender
                const number = Math.floor(Math.random() * 100); // Random number
                project.avatars.add(`${gender}/${number}`);
            }
            // Use description from first task as project description
            if (!project.description && task.description) {
                project.description = task.description;
            }
        });

        // Render each project card
        projectsMap.forEach((project, key) => {
            const avgProgress = project.tasks.length > 0 ? Math.round(project.progressSum / project.tasks.length) : 0;
            const daysLeft = project.daysLeftMin ?
                Math.max(0, Math.ceil((project.daysLeftMin - new Date()) / (1000 * 60 * 60 * 24))) :
                "N/A";

            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            // Gradient background classes based on team id
            const teamColorMap = {
                design: "purple",
                development: "green",
                marketing: "orange",
                general: "gray",
            };
            const colorClass = teamColorMap[key] || "blue";
            projectCard.classList.add(colorClass);

            // Avatars HTML
            const avatarsHtml = Array.from(project.avatars)
                .map(av => {
                    if (typeof av === "string" && (av.startsWith("men/") || av.startsWith("women/"))) {
                        return `<img src="https://randomuser.me/api/portraits/${av}.jpg" alt="User Avatar">`;
                    } else if (typeof av === "string") {
                        // For names or unknown format, show initials
                        const initials = av.split(" ").map(n => n[0]).join("").toUpperCase();
                        return `<div class="avatar-initials">${initials}</div>`;
                    }
                    return ''; // Fallback for unexpected avatar format
                })
                .join("");

            const teamName = project.title || "General";
            const teamClass = teamName.toLowerCase().replace(/\s+/g, "-");

            projectCard.innerHTML = `
                <div class="project-card-header">
                    <span class="team-badge ${teamClass}">${teamName}</span>
                    <i class='bx bx-dots-horizontal-rounded'></i>
                </div>
                <h3>${project.tasks[0]?.title || "No Title"}</h3>
                <p>${project.description || "No description available."}</p>
                <div class="project-card-footer">
                    <div class="progress-info">
                        <span>Progress</span>
                        <span>${avgProgress}%</span>
                    </div>
                    <progress value="${avgProgress}" max="100"></progress>
                    <div class="progress-info">
                        <span>${daysLeft} Hari Tersisa</span>
                        <div class="avatar-group">
                            ${avatarsHtml}
                        </div>
                    </div>
                </div>
            `;

            DOMElements.projectSummaryContainer.appendChild(projectCard);
        });
    };

    const renderTasks = (searchKeyword = "") => {
        if (!DOMElements.inProgressTasksDiv || !DOMElements.completedTasksDiv)
            return;
        DOMElements.inProgressTasksDiv.innerHTML = "";
        DOMElements.completedTasksDiv.innerHTML = "";
        let inProgressCount = 0;
        let completedCount = 0;

        const normalizedSearch = searchKeyword.trim().toLowerCase();

        const statusFilter = DOMElements.taskStatusFilterSelect ? DOMElements.taskStatusFilterSelect.value : "";
        const priorityFilter = DOMElements.priorityFilterSelect ? DOMElements.priorityFilterSelect.value : "all"; // Use DOMElements.priorityFilterSelect

        const filteredTasks = tasks.filter(task => {
            if (statusFilter && statusFilter !== "all" && task.status !== statusFilter) {
                return false;
            }
            if (priorityFilter && priorityFilter !== "all" && task.priority !== priorityFilter) {
                return false;
            }
            if (normalizedSearch) {
                const titleMatch = task.title.toLowerCase().includes(normalizedSearch);
                const subtaskMatch = Array.isArray(task.subtasks) && task.subtasks.some(sub => sub.text.toLowerCase().includes(normalizedSearch));
                if (!titleMatch && !subtaskMatch) {
                    return false;
                }
            }
            return true;
        });

        if (filteredTasks.length === 0) {
            const noTasksMessage = document.createElement("div");
            noTasksMessage.classList.add("no-tasks-message");
            noTasksMessage.textContent = "No tasks match your search.";
            DOMElements.inProgressTasksDiv.appendChild(noTasksMessage);
            // Only add to completed if there's no in-progress message to avoid duplication
            if (statusFilter === "all" || statusFilter === "completed") {
                DOMElements.completedTasksDiv.appendChild(noTasksMessage.cloneNode(true));
            }
            DOMElements.inProgressCountSpan.textContent = "0";
            DOMElements.completedCountSpan.textContent = "0";
            return;
        }

        filteredTasks.forEach((task) => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            taskCard.dataset.taskId = task.id;

            const dateRange =
                task.startDate && task.endDate ?
                `${formatDateForDisplay(task.startDate)} - ${formatDateForDisplay(
                        task.endDate
                    )}` :
                "";

            const progress =
                Array.isArray(task.subtasks) && task.subtasks.length > 0 ?
                Math.round(
                    (task.subtasks.filter((s) => s.completed).length /
                        task.subtasks.length) *
                    100
                ) :
                task.progress || 0;

            const priorityLabel = task.priority ?
                task.priority.charAt(0).toUpperCase() + task.priority.slice(1) :
                "Normal";

            const commentCount = Array.isArray(task.comments) ?
                task.comments.length :
                0;
            const attachmentCount = Array.isArray(task.attachments) ?
                task.attachments.length :
                0;

            let progressBarColor = "#007bff"; // default blue
            if (progress === 100) {
                progressBarColor = "#28a745"; // green for completed
            }

            taskCard.innerHTML = `
                <div class="task-menu" data-task-id="${task.id}">&#8942;</div>
                <div class="task-menu-dropdown" style="display: none;">
                    <button class="edit-task-button" data-task-id="${task.id}">Edit Tugas</button>
                    <button class="delete-task-button" data-task-id="${task.id}">Hapus Tugas</button>
                </div>

                <h4>${task.title}</h4>
                <p class="task-date-range">${dateRange}</p>

                <div class="task-card-subtasks">
                    <ul>
                        ${(task.subtasks || [])
                            .map(
                                (sub) => `
                            <li>
                                <input type="checkbox" data-task-id="${task.id}" data-subtask-id="${sub.id}" ${sub.completed ? "checked" : ""}>
                                <label>${sub.text}</label>
                            </li>
                        `
                            )
                            .join("")}
                    </ul>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <button class="add-subtask-button" data-task-id="${task.id}">
                            <i class='bx bx-plus-medical'></i>
                            Add Subtask
                        </button>
                        <span class="priority-label ${task.priority ? task.priority.toLowerCase() : 'medium'}">
                            ${priorityLabel}
                        </span>
                    </div>
                </div>

                <div class="task-card-progress">
                    <div class="progress-info">
                        <span>Progress</span>
                        <span>${progress}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${progress}%; background-color: ${progressBarColor};"></div>
                    </div>
                </div>

                <div class="task-card-footer-meta">
                    <div class="avatar-group">
                        ${(task.avatars || [])
                            .map(
                                (avatar) => `
                            <img src="https://randomuser.me/api/portraits/${avatar}.jpg" alt="User">
                        `
                            )
                            .join("")}
                    </div>
                    <div class="task-meta-icons">
                        <i class='bx bx-message-rounded-dots'></i> ${commentCount}
                        <i class='bx bx-paperclip'></i> ${attachmentCount}
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

        // Re-attach listeners after rendering tasks
        attachTaskListeners();
    };

    // Render calendar
    const renderCalendar = (date) => {
        if (!DOMElements.currentMonthYearHeader || !DOMElements.calendarGridEl)
            return;
        DOMElements.currentMonthYearHeader.textContent = date.toLocaleString(
            "id-ID", {
                month: "long",
                year: "numeric"
            }
        );
        DOMElements.calendarGridEl.innerHTML = "";

        const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]; // Indonesian weekdays
        weekdays.forEach((day) => {
            const weekdayEl = document.createElement("div");
            weekdayEl.classList.add("calendar-weekday");
            weekdayEl.textContent = day;
            DOMElements.calendarGridEl.appendChild(weekdayEl);
        });

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday as first day

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startDayIndex; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("calendar-day", "inactive");
            DOMElements.calendarGridEl.appendChild(emptyDay);
        }

        const today = new Date(); // Get current date for "today" highlighting

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
                (s) => s.date && getLocalDateString(new Date(s.date)) === currentDayDateString
            );
            if (hasSchedule) {
                dayElement.classList.add("highlighted");
            }

            DOMElements.calendarGridEl.appendChild(dayElement);
        }
    };

    // Render today's schedule
    const renderTodaySchedule = (date) => {
        if (!DOMElements.todayScheduleList) return;
        DOMElements.todayScheduleList.innerHTML = "";
        const todayDateString = getLocalDateString(date); // Use getLocalDateString for consistency
        schedules = getStorage("schedules"); // Reload schedules to get latest updates
        const relevantSchedules = schedules.filter(
            (s) => s.date && getLocalDateString(new Date(s.date)) === todayDateString
        );

        if (relevantSchedules.length === 0) {
            DOMElements.todayScheduleList.innerHTML =
                '<p style="text-align: center; color: var(--text-light);">Tidak ada jadwal untuk hari ini.</p>';
            return;
        }

        relevantSchedules.forEach((schedule) => {
            const scheduleItem = document.createElement("div");
            scheduleItem.classList.add("schedule-item");
            scheduleItem.innerHTML = `
                <div class="schedule-item-indicator ${schedule.statusColor}"></div>
                <div class="schedule-item-content">
                    <h4>${schedule.title}</h4>
                    <p>${schedule.description || schedule.desc || ''}</p>
                    <div class="schedule-item-time">
                        <i class='bx bx-time'></i>
                        ${schedule.startTime || (schedule.time ? schedule.time.split(' - ')[0] : 'undefined')} - ${schedule.endTime || (schedule.time ? schedule.time.split(' - ')[1] : 'undefined')}
                    </div>
                </div>
                <div class="schedule-item-actions">
                    <div class="checkbox-container ${schedule.completed ? "checked" : ""}" data-schedule-id="${schedule.id}">
                        <i class='bx bx-check'></i>
                    </div>
                    <div class="avatar-group">
                        ${(Array.isArray(schedule.avatars) ? schedule.avatars : [])
                            .map(
                                (avatar) =>
                                    `<img src="https://randomuser.me/api/portraits/${avatar}.jpg" alt="User Avatar">`
                            )
                            .join("")}
                    </div>
                </div>
            `;
            DOMElements.todayScheduleList.appendChild(scheduleItem);
        });
    };

    // Populate team selection dropdown
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
            // Ensure the selected value remains if the chosen team still exists
            if (
                !DOMElements.chooseTeamSelect.value ||
                !teams.some((team) => team.id === DOMElements.chooseTeamSelect.value)
            ) {
                DOMElements.chooseTeamSelect.value = teams[0].id; // Select first team if none is selected
            }
        }
    };

    // Update date display on input fields
    const updateDateDisplay = (displayEl, hiddenEl) => {
        if (!displayEl || !hiddenEl) return;
        displayEl.value = formatDateForDisplay(hiddenEl.value);

        hiddenEl.addEventListener("change", () => {
            displayEl.value = formatDateForDisplay(hiddenEl.value);
        });

        displayEl.addEventListener("click", () => {
            if (hiddenEl.showPicker) {
                hiddenEl.showPicker();
            } else {
                hiddenEl.focus();
            }
        });
    };

    // --- 5. Modal Management Functions ---

    /**
     * Resets the add/edit task modal to initial "Add New Task" mode.
     * Clears form fields, resets display toggles, and updates modal title/button.
     */
    const resetModalToAddMode = () => {
        if (DOMElements.modalTitle)
            DOMElements.modalTitle.textContent = "Add New Task";
        if (DOMElements.createTaskModalButton)
            DOMElements.createTaskModalButton.textContent = "Create Task";
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
        populateChooseTeamSelect();
    };

    /**
     * Opens the add/edit task modal and populates the form for editing an existing task.
     * @param {Object} task The task object to be edited.
     */
    const openEditTaskModal = (task) => {
        if (!DOMElements.addTaskModalOverlay || !DOMElements.addTaskForm) return;

        if (DOMElements.modalTitle)
            DOMElements.modalTitle.textContent = "Edit Tugas";
        if (DOMElements.createTaskModalButton)
            DOMElements.createTaskModalButton.textContent = "Simpan Perubahan";

        DOMElements.addTaskModalOverlay.style.display = "flex";

        // Fill form fields with task data
        document.getElementById("taskTitle").value = task.title || "";
        document.getElementById("description").value = task.description || "";
        if (DOMElements.descriptionInputArea) {
            DOMElements.descriptionInputArea.style.display = task.description ?
                "block" :
                "none";
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

        if (DOMElements.attachmentInput) DOMElements.attachmentInput.value = "";
        if (DOMElements.attachmentFileNameDisplay)
            DOMElements.attachmentFileNameDisplay.textContent =
            task.attachmentFile || "";

        DOMElements.addTaskForm.dataset.editingTaskId = task.id;

        // Update date displays
        updateDateDisplay(DOMElements.startDateDisplay, DOMElements.startDateInput);
        updateDateDisplay(DOMElements.endDateDisplay, DOMElements.endDateInput);
    };

    // --- 6. Event Handlers ---

    // Handler for adding a subtask
    const handleAddSubtaskClick = (e) => {
        const addSubtaskBtn = e.currentTarget;
        const taskId = parseInt(addSubtaskBtn.dataset.taskId);
        const task = tasks.find((t) => t.id === taskId);

        if (task) {
            const existingInputContainer = addSubtaskBtn.parentElement.querySelector(
                ".new-subtask-input-container"
            );
            if (existingInputContainer) {
                existingInputContainer.querySelector("input").focus();
                return;
            }

            const inputContainer = document.createElement("div");
            inputContainer.classList.add("new-subtask-input-container");

            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter new subtask";
            input.classList.add("new-subtask-input-field");

            const addButton = document.createElement("button");
            addButton.textContent = "Add";
            addButton.classList.add("new-subtask-add-button");

            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel";
            cancelButton.classList.add("new-subtask-cancel-button");

            inputContainer.appendChild(input);
            inputContainer.appendChild(addButton);
            inputContainer.appendChild(cancelButton);

            // Insert inputContainer above the addSubtaskBtn
            addSubtaskBtn.parentElement.insertBefore(inputContainer, addSubtaskBtn);

            // Hide the addSubtaskBtn while input is visible
            addSubtaskBtn.style.display = "none";

            input.focus();

            const addSubtask = () => {
                const newSubtaskText = input.value.trim();
                if (newSubtaskText) {
                    if (!Array.isArray(task.subtasks)) {
                        task.subtasks = [];
                    }
                    task.subtasks.push({
                        id: getNextId(task.subtasks),
                        text: newSubtaskText,
                        completed: false,
                    });
                    setStorage("tasks", tasks);
                    renderTasks();
                } else {
                    alert("Subtask description cannot be empty.");
                }
            };

            addButton.addEventListener("click", () => {
                addSubtask();
                inputContainer.remove();
                addSubtaskBtn.style.display = "flex";
            });

            cancelButton.addEventListener("click", () => {
                inputContainer.remove();
                addSubtaskBtn.style.display = "flex";
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    addSubtask();
                    inputContainer.remove();
                    addSubtaskBtn.style.display = "flex";
                } else if (event.key === "Escape") {
                    inputContainer.remove();
                    addSubtaskBtn.style.display = "flex";
                }
            });
        }
    };

    // Handler for subtask checkbox change
    const handleSubtaskCheckboxChange = (e) => {
        const subtaskCheckbox = e.currentTarget;
        const taskId = parseInt(subtaskCheckbox.dataset.taskId);
        const subtaskId = parseInt(subtaskCheckbox.dataset.subtaskId);
        const task = tasks.find((t) => t.id === taskId);

        if (task && Array.isArray(task.subtasks)) {
            const subtask = task.subtasks.find((s) => s.id === subtaskId);
            if (subtask) {
                subtask.completed = subtaskCheckbox.checked;

                const totalSubtasks = task.subtasks.length;
                const completedSubtasks = task.subtasks.filter(
                    (s) => s.completed
                ).length;

                if (totalSubtasks > 0) {
                    task.progress = Math.round((completedSubtasks / totalSubtasks) * 100);
                } else {
                    task.progress = 0;
                }

                if (completedSubtasks === totalSubtasks && totalSubtasks > 0) {
                    task.status = "completed";
                    task.progress = 100;
                } else {
                    task.status = "in-progress";
                }

                setStorage("tasks", tasks);
                renderTasks();
            }
        }
    };

    // General handler for clicks within tasksListContainer (event delegation)
    const handleTasksListContainerClick = (e) => {
        const target = e.target;

        // Task Menu (three dots)
        const menuButton = target.closest(".task-menu");
        if (menuButton) {
            e.stopPropagation();
            const dropdown = menuButton.nextElementSibling;
            if (dropdown && dropdown.classList.contains("task-menu-dropdown")) {
                document.querySelectorAll(".task-menu-dropdown").forEach((dd) => {
                    if (dd !== dropdown) dd.style.display = "none";
                });
                dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
            }
            return;
        }

        // Edit Task button
        const editButton = target.closest(".edit-task-button");
        if (editButton) {
            const taskId = parseInt(editButton.dataset.taskId);
            const taskToEdit = tasks.find((t) => t.id === taskId);
            if (taskToEdit) openEditTaskModal(taskToEdit);
            const dropdown = editButton.closest(".task-menu-dropdown");
            if (dropdown) dropdown.style.display = "none";
            return;
        }

        // Delete Task button
        const deleteButton = target.closest(".delete-task-button");
        if (deleteButton) {
            const taskId = parseInt(deleteButton.dataset.taskId);
            if (confirm("Yakin ingin menghapus tugas ini?")) {
                tasks = tasks.filter((t) => t.id !== taskId);
                setStorage("tasks", tasks);
                renderTasks();
                alert("Tugas berhasil dihapus!");
            }
            const dropdown = deleteButton.closest(".task-menu-dropdown");
            if (dropdown) dropdown.style.display = "none";
            return;
        }

        // Add Subtask button
        const addSubtaskButton = target.closest(".add-subtask-button");
        if (addSubtaskButton) {
            handleAddSubtaskClick(e); // Delegate to the specific handler
            return;
        }

        // Subtask checkbox
        const subtaskCheckbox = target.closest('input[type="checkbox"][data-subtask-id]');
        if (subtaskCheckbox) {
            handleSubtaskCheckboxChange(e); // Delegate to the specific handler
            return;
        }
    };

    // Function to attach all task-related event listeners (using delegation where possible)
    const attachTaskListeners = () => {
        // Clear previous listeners to prevent duplication (better delegation)
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

    // --- 7. Initialize All Event Listeners ---

    // Toggle mobile menu
    if (DOMElements.mobileMenuToggle && DOMElements.dashboardContainer) {
        DOMElements.mobileMenuToggle.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.toggle("sidebar-open");
        });
    }

    // Real-time search input event listener
    const taskSearchInput = document.getElementById("taskSearchInput");
    if (taskSearchInput) {
        taskSearchInput.addEventListener("input", (e) => {
            const searchValue = e.target.value;
            renderTasks(searchValue);
        });
    }

    // Close sidebar on clicking close button
    const sidebarCloseButton = document.getElementById("sidebarCloseButton");
    if (sidebarCloseButton && DOMElements.dashboardContainer) {
        sidebarCloseButton.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.remove("sidebar-open");
        });
    }

    // Overlay sidebar (click to close)
    if (DOMElements.sidebarOverlay && DOMElements.dashboardContainer) {
        DOMElements.sidebarOverlay.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.remove("sidebar-open");
        });
    }

    // Project navigation buttons (placeholder)
    if (DOMElements.prevProjectBtn)
        DOMElements.prevProjectBtn.addEventListener("click", () =>
            alert("Proyek Sebelumnya (fungsi belum diimplementasikan)")
        );
    if (DOMElements.nextProjectBtn)
        DOMElements.nextProjectBtn.addEventListener("click", () =>
            alert("Proyek Berikutnya (fungsi belum diimplementasikan)")
        );

    // Open add task modal
    if (DOMElements.addTaskButton && DOMElements.addTaskModalOverlay) {
        DOMElements.addTaskButton.addEventListener("click", () => {
            resetModalToAddMode();
            if (DOMElements.addTaskModalOverlay) {
                DOMElements.addTaskModalOverlay.style.display = "flex";
            }
            populateChooseTeamSelect();
        });
    }

    // Close add task modal
    if (DOMElements.addTaskModalCloseButton && DOMElements.addTaskModalOverlay) {
        DOMElements.addTaskModalCloseButton.addEventListener("click", () => {
            DOMElements.addTaskModalOverlay.style.display = "none";
            resetModalToAddMode();
        });
    }

    // Close task dropdown menu when clicking outside
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

    // Submit add/edit task form
    if (DOMElements.addTaskForm) {
        DOMElements.addTaskForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const taskTitle = document.getElementById("taskTitle").value;
            const description = document.getElementById("description").value;
            const chosenTeam = DOMElements.chooseTeamSelect.value;
            const startDate = DOMElements.startDateInput.value;
            const startTime = DOMElements.startTimeInput.value;
            const endDate = DOMElements.endDateInput.value;
            const endTime = DOMElements.endTimeInput.value;
            const assignTo = DOMElements.assignToInput.value;
            const priority = DOMElements.prioritySelect.value;
            const attachmentFile =
                DOMElements.attachmentInput && DOMElements.attachmentInput.files[0] ?
                DOMElements.attachmentInput.files[0].name :
                null;

            if (!taskTitle || !chosenTeam || !startDate || !startTime || !endDate || !endTime || !assignTo) {
                alert("Please fill in all required fields: Title, Team, Start/End Date & Time, and Assignee.");
                return;
            }

            const editingTaskId = DOMElements.addTaskForm.dataset.editingTaskId;

            if (editingTaskId) {
                const taskIndex = tasks.findIndex(
                    (t) => t.id === parseInt(editingTaskId)
                );
                if (taskIndex !== -1) {
                    const task = tasks[taskIndex];
                    task.title = taskTitle;
                    task.description = description;
                    task.team = chosenTeam;
                    task.startDate = startDate;
                    task.startTime = startTime;
                    task.endDate = endDate;
                    task.endTime = endTime;
                    task.assignTo = assignTo;
                    task.priority = priority;
                    if (attachmentFile) task.attachmentFile = attachmentFile; // Only update if there's a new file
                    setStorage("tasks", tasks);
                    alert("Task updated successfully!");
                } else {
                    alert("Error: Task to edit not found.");
                }
            } else {
                const newTask = {
                    id: getNextId(tasks),
                    title: taskTitle,
                    description: description,
                    team: chosenTeam,
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime,
                    assignTo: assignTo,
                    attachmentFile: attachmentFile,
                    status: "in-progress",
                    progress: 0,
                    priority: priority,
                    subtasks: [],
                    avatars: ["men/32", "women/44"], // Default avatars
                    subject: "Umum", // Default subject
                    teacher: "N/A", // Default teacher
                    type: "Task", // Default type
                };
                tasks.unshift(newTask);
                setStorage("tasks", tasks);
                alert("Task added successfully!");
                // Reset priority filter to 'all' to ensure new task is visible
                if (DOMElements.priorityFilterSelect) {
                    DOMElements.priorityFilterSelect.value = "all";
                    DOMElements.priorityFilterSelect.style.backgroundColor = "";
                    DOMElements.priorityFilterSelect.title = "";
                    localStorage.setItem("priorityFilter", "all");
                }
            }

            DOMElements.addTaskModalOverlay.style.display = "none";
            resetModalToAddMode();
            renderTasks(); // Re-render tasks after add/edit
        });
    }

    // Task status filter
    if (DOMElements.taskStatusFilterSelect) {
        DOMElements.taskStatusFilterSelect.addEventListener("change", () => {
            renderTasks();
            // Save filter state to localStorage
            localStorage.setItem("taskStatusFilter", DOMElements.taskStatusFilterSelect.value);
        });
        // Restore filter state from localStorage
        const savedStatusFilter = localStorage.getItem("taskStatusFilter");
        if (savedStatusFilter) {
            DOMElements.taskStatusFilterSelect.value = savedStatusFilter;
        } else {
            // Set default status filter to "all" (show all) if no saved value
            DOMElements.taskStatusFilterSelect.value = "all";
        }
    }

    // Priority filter dropdown
    if (DOMElements.priorityFilterSelect) {
        DOMElements.priorityFilterSelect.addEventListener("change", () => {
            renderTasks();
            // Save priority filter state to localStorage
            localStorage.setItem("priorityFilter", DOMElements.priorityFilterSelect.value);
            // Visual feedback for active filter
            if (DOMElements.priorityFilterSelect.value !== "all") {
                DOMElements.priorityFilterSelect.style.backgroundColor = "#d0e6ff"; // light blue
                DOMElements.priorityFilterSelect.title = `Filtered by: ${DOMElements.priorityFilterSelect.options[DOMElements.priorityFilterSelect.selectedIndex].text}`;
            } else {
                DOMElements.priorityFilterSelect.style.backgroundColor = "";
                DOMElements.priorityFilterSelect.title = "";
            }
        });
        // Restore priority filter state from localStorage
        const savedPriorityFilter = localStorage.getItem("priorityFilter");
        if (savedPriorityFilter) {
            DOMElements.priorityFilterSelect.value = savedPriorityFilter;
            if (savedPriorityFilter !== "all") {
                DOMElements.priorityFilterSelect.style.backgroundColor = "#d0e6ff";
                DOMElements.priorityFilterSelect.title = `Filtered by: ${DOMElements.priorityFilterSelect.options[DOMElements.priorityFilterSelect.selectedIndex].text}`;
            }
        }
    }

    // Task tabs (Kategori, Anggota)
    if (DOMElements.tasksTabs) {
        DOMElements.tasksTabs.addEventListener("click", (e) => {
            const clickedButton = e.target.closest("button");
            if (clickedButton) {
                DOMElements.tasksTabs
                    .querySelectorAll("button")
                    .forEach((btn) => btn.classList.remove("active"));
                clickedButton.classList.add("active");

                const buttonText = clickedButton.textContent.trim();

                if (buttonText.includes("Kategori")) {
                    if (DOMElements.tasksListContainer)
                        DOMElements.tasksListContainer.style.display = "flex";
                    renderTasks(); // Re-render tasks for "Kategori" tab
                } else if (buttonText.includes("Anggota")) {
                    alert("Tab Anggota diklik - implementasikan tampilan daftar anggota.");
                    if (DOMElements.tasksListContainer)
                        DOMElements.tasksListContainer.style.display = "none";
                    return;
                }
            }
        });
    }

    // Calendar month navigation
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

    // Mark schedule as completed
    if (DOMElements.todayScheduleList) {
        DOMElements.todayScheduleList.addEventListener("click", (e) => {
            const checkboxContainer = e.target.closest(".checkbox-container");
            if (checkboxContainer) {
                const scheduleId = parseInt(checkboxContainer.dataset.scheduleId);
                const schedule = schedules.find((s) => s.id === scheduleId);
                if (schedule) {
                    schedule.completed = !schedule.completed;
                    setStorage("schedules", schedules);
                    checkboxContainer.classList.toggle("checked", schedule.completed);
                }
            }
        });
    }

    // Toggle description area
    if (DOMElements.addDescriptionToggle) {
        DOMElements.addDescriptionToggle.addEventListener("click", function() {
            if (DOMElements.descriptionInputArea) {
                const isHidden =
                    DOMElements.descriptionInputArea.style.display === "none" ||
                    DOMElements.descriptionInputArea.style.display === "";
                DOMElements.descriptionInputArea.style.display = isHidden ?
                    "block" :
                    "none";
                if (isHidden && DOMElements.descriptionTextarea)
                    DOMElements.descriptionTextarea.focus();
            }
        });
    }

    // Toggle new team input area
    if (DOMElements.chooseTeamToggle) {
        DOMElements.chooseTeamToggle.addEventListener("click", function() {
            if (DOMElements.teamDisplayDropdown)
                DOMElements.teamDisplayDropdown.style.display = "none";
            if (DOMElements.teamInputArea) {
                DOMElements.teamInputArea.style.display = "flex";
                DOMElements.newTeamInput.focus();
            }
        });
    }

    // Add new team from modal
    if (DOMElements.addTeamButtonModal) {
        DOMElements.addTeamButtonModal.addEventListener("click", function() {
            const newTeamName = DOMElements.newTeamInput.value.trim();
            if (newTeamName) {
                const newTeamId = newTeamName.toLowerCase().replace(/\s/g, "-");
                if (!teams.some((team) => team.id === newTeamId)) {
                    teams.push({
                        id: newTeamId,
                        name: newTeamName
                    });
                    setStorage("teams", teams);
                    populateChooseTeamSelect();
                    DOMElements.chooseTeamSelect.value = newTeamId;

                    if (DOMElements.teamInputArea)
                        DOMElements.teamInputArea.style.display = "none";
                    if (DOMElements.teamDisplayDropdown)
                        DOMElements.teamDisplayDropdown.style.display = "flex";
                    DOMElements.newTeamInput.value = "";
                } else {
                    alert("Team already exists!");
                }
            } else {
                alert("Please enter a team name.");
            }
        });
    }

    // Display attachment file name
    if (DOMElements.attachmentInput) {
        DOMElements.attachmentInput.addEventListener("change", function() {
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

    // Initialize date displays for modal
    updateDateDisplay(DOMElements.startDateDisplay, DOMElements.startDateInput);
    updateDateDisplay(DOMElements.endDateDisplay, DOMElements.endDateInput);

    // --- 8. Initial Renders ---

    // Toggle visibility of In Progress and Completed task columns
    const inProgressToggle = document.getElementById("inProgressToggle");
    const completedToggle = document.getElementById("completedToggle");
    const inProgressTasksDiv = document.getElementById("inProgressTasks");
    const completedTasksDiv = document.getElementById("completedTasks");

    if (inProgressToggle && inProgressTasksDiv) {
        inProgressToggle.addEventListener("click", () => {
            inProgressTasksDiv.classList.toggle("collapsed");
            inProgressToggle.classList.toggle("bx-chevron-up");
            inProgressToggle.classList.toggle("bx-chevron-down");
        });
    }

    if (completedToggle && completedTasksDiv) {
        completedToggle.addEventListener("click", () => {
            completedTasksDiv.classList.toggle("collapsed");
            completedToggle.classList.toggle("bx-chevron-up");
            completedToggle.classList.toggle("bx-chevron-down");
        });
    }

    // Call initial render functions after everything is set up
    if (DOMElements.taskStatusFilterSelect) {
        DOMElements.taskStatusFilterSelect.value = localStorage.getItem("taskStatusFilter") || "all";
    }
    renderProjectSummary();
    renderTasks();
    renderCalendar(currentCalendarDate);
    renderTodaySchedule(currentCalendarDate);
    populateChooseTeamSelect();

    // --- 9. Today Schedule Dropdown Menu Functionality ---

    // Toggle dropdown menu visibility
    if (DOMElements.todayScheduleMenuButton && DOMElements.todayScheduleDropdown) {
        DOMElements.todayScheduleMenuButton.addEventListener("click", (e) => {
            e.stopPropagation();
            const dropdown = DOMElements.todayScheduleDropdown;
            if (dropdown.style.display === "none" || dropdown.style.display === "") {
                dropdown.style.display = "block";
                updateEditTodayScheduleButtonVisibility();
            } else {
                dropdown.style.display = "none";
            }
        });

        // Close dropdown if clicking outside
        document.addEventListener("click", (e) => {
            if (
                DOMElements.todayScheduleDropdown &&
                !DOMElements.todayScheduleDropdown.contains(e.target) &&
                DOMElements.todayScheduleMenuButton && // Check if button exists before using contains
                !DOMElements.todayScheduleMenuButton.contains(e.target)
            ) {
                DOMElements.todayScheduleDropdown.style.display = "none";
            }
        });
    }

    // Function to check if there is a schedule today and toggle edit button visibility
    function updateEditTodayScheduleButtonVisibility() {
        if (!DOMElements.editTodayScheduleBtn) return;
        const todayDateString = getLocalDateString(new Date()); // Use getLocalDateString
        const hasTodaySchedule = schedules.some(
            (s) => s.date && getLocalDateString(new Date(s.date)) === todayDateString
        );
        DOMElements.editTodayScheduleBtn.style.display = hasTodaySchedule ? "flex" : "none";
    }

    // Handler for "Tambah jadwal baru" button
    if (DOMElements.addNewScheduleBtn) {
        DOMElements.addNewScheduleBtn.addEventListener("click", () => {
            // Open schedule.html page for adding new schedule
            window.location.href = "schedule.html#add";
        });
    }

    // Handler for "Edit schedule hari ini" button
    if (DOMElements.editTodayScheduleBtn) {
        DOMElements.editTodayScheduleBtn.addEventListener("click", () => {
            const todayDateString = getLocalDateString(new Date()); // Use getLocalDateString
            const todaySchedule = schedules.find(
                (s) => s.date && getLocalDateString(new Date(s.date)) === todayDateString
            );
            if (todaySchedule) {
                // Open schedule.html page with hash to edit the schedule by id
                window.location.href = `schedule.html#edit-${todaySchedule.id}`;
            } else {
                alert("Tidak ada jadwal hari ini untuk diedit.");
            }
        });
    }

    // Initial call to update edit schedule button visibility
    updateEditTodayScheduleButtonVisibility();
});
