document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Utility Functions ---
    // Fungsi untuk mendapatkan data dari localStorage
    const getStorage = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error reading from localStorage for key:", key, e);
            return [];
        }
    };

    // Fungsi untuk menyimpan data ke localStorage
    const setStorage = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`Data for key '${key}' saved to localStorage.`);
        } catch (e) {
            console.error("Error writing to localStorage for key:", key, e);
        }
    };

    // Fungsi untuk mendapatkan ID berikutnya
    const getNextId = (arr) =>
        arr.length > 0 ? Math.max(...arr.map((item) => item.id)) + 1 : 1;

    // Fungsi untuk memformat tanggal
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            // Menggunakan 'id-ID' untuk format tanggal Indonesia
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

    // --- 2. Data Management (Simulated API with localStorage) ---
    // Inisialisasi data dari localStorage atau dummy data jika kosong
    let projects = getStorage("projects");
    let tasks = getStorage("tasks");
    let schedules = getStorage("schedules");
    let teams = getStorage("teams");
    let currentCalendarDate = new Date();

    // Inisialisasi dummy data jika storage kosong
    const initializeDummyData = () => {
        if (projects.length === 0) {
            projects = [
                {
                    id: 1,
                    title: "Diskusi Proyek Perangkat Lunak",
                    description:
                        "Tim perangkat lunak bertanggung jawab atas perencanaan, penjadwalan, penganggaran, pelaksanaan, dan pengiriman proyek perangkat lunak dan web. Mereka memastikan keberhasilan penyelesaian semua proyek perangkat lunak.",
                    progress: 75,
                    daysLeft: 3,
                    avatars: ["men/32", "women/44", "men/54"],
                    type: "blue",
                },
                {
                    id: 2,
                    title: "Pengembangan Modul Autentikasi",
                    description:
                        "Mengembangkan modul autentikasi pengguna baru dengan fitur login dan registrasi yang aman.",
                    progress: 40,
                    daysLeft: 7,
                    avatars: ["men/10", "women/20"],
                    type: "purple",
                },
                {
                    id: 3,
                    title: "Perencanaan Proyek Q3",
                    description:
                        "Menguraikan seluruh ruang lingkup proyek, tonggak sejarah, dan alokasi sumber daya untuk kuartal mendatang.",
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
                        title: "Desain Aplikasi Seluler",
                        description: "Pertemuan Desain UI/UX",
                        subject: "Desain",
                        teacher: "Ms Diana Smith",
                        type: "Task",
                        status: "in-progress",
                        progress: 5,
                        priority: "high",
                        subtasks: [{ id: 1, text: "Brainstorming Konsep", completed: false }],
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
                    },
                    {
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
                    },
                {
                    id: 3,
                    title: "Tugas Properti Aljabar",
                    description: "Penyelesaian masalah properti aljabar dari buku teks",
                    subject: "Matematika",
                    teacher: "Mr Jhon Lock",
                    type: "Task",
                    status: "in-progress",
                    progress: 60,
                    priority: "high",
                    subtasks: [
                        { id: 1, text: "Selesaikan soal 1-5", completed: false },
                        { id: 2, text: "Periksa jawaban", completed: false },
                    ],
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
                },
                {
                    id: 5,
                    title: "Menentukan IQ Seseorang",
                    description: "Memahami berbagai metode dan tes untuk mengukur IQ",
                    subject: "Psikologi",
                    teacher: "Mr Melvin Ruslan",
                    type: "Theory",
                    status: "in-progress",
                    progress: 80,
                    priority: "low",
                    subtasks: [{ id: 1, text: "Baca Bab 3", completed: false }],
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
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();

            schedules = [
                {
                    id: 1,
                    title: "Membuat Aplikasi Seluler yang Keren",
                    description: "Pertemuan Desain UI/UX",
                    time: "09:00 - 10:00 AM",
                    statusColor: "green",
                    completed: false,
                    avatars: ["men/1", "women/2"],
                    date: new Date(year, month, day).toISOString(),
                },
                {
                    id: 2,
                    title: "Rencana & Strategi Pemasaran",
                    description: "Pertemuan Pemasaran",
                    time: "10:00 - 11:00 AM",
                    statusColor: "blue",
                    completed: false,
                    avatars: ["men/3", "women/4"],
                    date: new Date(year, month, day).toISOString(),
                },
                {
                    id: 3,
                    title: "Persiapan Ujian Literatur Proyek",
                    description: "Sesi Kelompok Belajar",
                    time: "13:00 - 15:00 PM",
                    statusColor: "red",
                    completed: false,
                    avatars: ["men/5", "women/6"],
                    date: new Date(year, month, day).toISOString(),
                },
            ];
            setStorage("schedules", schedules);
        }
        if (teams.length === 0) {
            teams = [
                { id: "design", name: "Desain" },
                { id: "development", name: "Pengembangan" },
                { id: "marketing", name: "Pemasaran" },
            ];
            setStorage("teams", teams);
        }
    };

    initializeDummyData(); // Panggil inisialisasi data saat DOM dimuat

    // --- 3. DOM Elements Cache ---
    // Cache semua elemen DOM yang akan sering diakses
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

        currentMonthYearHeader: document.getElementById("currentMonthYear"),
        calendarGridEl: document.getElementById("calendarGrid"),
        prevMonthBtn: document.getElementById("prevMonthBtn"),
        nextMonthBtn: document.getElementById("nextMonthBtn"),

        todayScheduleList: document.getElementById("todayScheduleList"),

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
        tasksListContainer: document.getElementById("tasksListContainer"), // Tambahkan ini
    };

    // --- 4. Render Functions ---

    // Render kartu ringkasan proyek
    const renderProjectSummary = () => {
        if (!DOMElements.projectSummaryContainer) return;
        DOMElements.projectSummaryContainer.innerHTML = "";

        // Get tasks from localStorage
        const allTasks = getStorage("tasks") || [];
        const allTeams = getStorage("teams") || [
            { id: "design", name: "Desain" },
            { id: "development", name: "Pengembangan" },
            { id: "marketing", name: "Pemasaran" },
            { id: "general", name: "Umum" },
        ];

        // Filter in-progress tasks
        const inProgressTasks = allTasks.filter(task => task.status === "in-progress");

        // Group tasks by project key (using team as project identifier)
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
                project.avatars.add(task.assignTo);
            }
            // Use description from first task as project description
            if (!project.description && task.description) {
                project.description = task.description;
            }
        });

        // Render each project card
        projectsMap.forEach((project, key) => {
            const avgProgress = project.tasks.length > 0 ? Math.round(project.progressSum / project.tasks.length) : 0;
            const daysLeft = project.daysLeftMin
                ? Math.max(0, Math.ceil((project.daysLeftMin - new Date()) / (1000 * 60 * 60 * 24)))
                : "N/A";

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
                    if (typeof av === "string" && av.startsWith("men/") || av.startsWith("women/")) {
                        return `<img src="https://randomuser.me/api/portraits/${av}.jpg" alt="User Avatar">`;
                    } else {
                        // For names or unknown format, show initials
                        const initials = av.split(" ").map(n => n[0]).join("").toUpperCase();
                        return `<div class="avatar-initials">${initials}</div>`;
                    }
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
                <p>${project.description}</p>
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

    const renderTasks = () => {
        if (!DOMElements.inProgressTasksDiv || !DOMElements.completedTasksDiv)
            return;
        DOMElements.inProgressTasksDiv.innerHTML = "";
        DOMElements.completedTasksDiv.innerHTML = "";
        let inProgressCount = 0;
        let completedCount = 0;

        const filteredTasks = tasks; // filter jika perlu

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
                : "Normal";

            const commentCount = Array.isArray(task.comments)
                ? task.comments.length
                : 0;
            const attachmentCount = Array.isArray(task.attachments)
                ? task.attachments.length
                : 0;

            // Determine progress bar color based on progress
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
<input type="checkbox" data-task-id="${task.id}" data-subtask-id="${sub.id}" ${sub.completed ? "checked" : ""}
                            }>
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

            // Masukkan ke kolom sesuai status
            if (task.status === "completed") {
                DOMElements.completedTasksDiv.appendChild(taskCard);
                completedCount++;
            } else {
                DOMElements.inProgressTasksDiv.appendChild(taskCard);
                inProgressCount++;
            }

            // Pasang event listener titik tiga
            const menuBtn = taskCard.querySelector(".task-menu");
            const dropdown = taskCard.querySelector(".task-menu-dropdown");
            if (menuBtn && dropdown) {
                menuBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    dropdown.style.display =
                        dropdown.style.display === "none" ? "flex" : "none";
                });
            }

            // Edit
            const editBtn = taskCard.querySelector(".edit-task-button");
            if (editBtn) {
                editBtn.addEventListener("click", () => {
                    const id = parseInt(editBtn.dataset.taskId);
                    const taskToEdit = tasks.find((t) => t.id === id);
                    if (taskToEdit) openEditTaskModal(taskToEdit);
                    dropdown.style.display = "none";
                });
            }

            // Delete
            const deleteBtn = taskCard.querySelector(".delete-task-button");
            if (deleteBtn) {
                deleteBtn.addEventListener("click", () => {
                    const id = parseInt(deleteBtn.dataset.taskId);
                    if (confirm("Yakin ingin menghapus tugas ini?")) {
                        tasks = tasks.filter((t) => t.id !== id);
                        setStorage("tasks", tasks);
                        renderTasks();
                    }
                    dropdown.style.display = "none";
                });
            }

            // Subtask checkbox
            taskCard
                .querySelectorAll('input[type="checkbox"][data-subtask-id]')
                .forEach((cb) => {
                    cb.addEventListener("change", (e) => {
                        const taskId = parseInt(cb.dataset.taskId);
                        const subtaskId = parseInt(cb.dataset.subtaskId);
                        const task = tasks.find((t) => t.id === taskId);
                        if (!task) return;

                        const subtask = task.subtasks.find((s) => s.id === subtaskId);
                        if (subtask) subtask.completed = cb.checked;

                        const total = task.subtasks.length;
                        const done = task.subtasks.filter((s) => s.completed).length;

                        task.progress = total > 0 ? Math.round((done / total) * 100) : 0;
                        task.status = task.progress === 100 ? "completed" : "in-progress";

                        setStorage("tasks", tasks);
                        renderTasks();
                    });
                });

            // Add Subtask
            const addSubtaskBtn = taskCard.querySelector(".add-subtask-button");
            if (addSubtaskBtn) {
            addSubtaskBtn.addEventListener("click", () => {
                addSubtaskBtn.style.display = "none"; // Hide the button when showing the form

                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Subtask name";
                input.classList.add("new-subtask-input-field");

                const saveBtn = document.createElement("button");
                saveBtn.textContent = "Add";
                saveBtn.classList.add("new-subtask-add-button");

                const cancelBtn = document.createElement("button");
                cancelBtn.textContent = "Cancel";
                cancelBtn.classList.add("new-subtask-cancel-button");

                const container = document.createElement("div");
                container.classList.add("new-subtask-input-container");

                container.appendChild(input);
                container.appendChild(saveBtn);
                container.appendChild(cancelBtn);

                addSubtaskBtn.parentElement.insertBefore(container, addSubtaskBtn);

                const showButtonAgain = () => {
                    addSubtaskBtn.style.display = "flex"; // Show the button again
                    container.remove();
                };

                saveBtn.addEventListener("click", () => {
                    const id = parseInt(addSubtaskBtn.dataset.taskId);
                    const task = tasks.find((t) => t.id === id);
                    if (!task || !input.value.trim()) return;

                    const newSubtask = {
                        id: getNextId(task.subtasks),
                        text: input.value.trim(),
                        completed: false,
                    };
                    task.subtasks.push(newSubtask);
                    setStorage("tasks", tasks);
                    renderTasks();
                    showButtonAgain();
                });

                cancelBtn.addEventListener("click", () => {
                    showButtonAgain();
                });
            });
            }
        });

        DOMElements.inProgressCountSpan.textContent = inProgressCount;
        DOMElements.completedCountSpan.textContent = completedCount;
    };

    // Handler for edit button click
    const handleEditButtonClick = (e) => {
        console.log("Edit button clicked");
        e.stopPropagation();
        const button = e.target.closest("button[data-task-id]");
        const taskIdStr = button ? button.dataset.taskId : null;
        console.log("Edit button clicked, dataset.taskId:", taskIdStr);
        const taskId = taskIdStr ? parseInt(taskIdStr) : NaN;
        console.log("Parsed taskId:", taskId);
        if (!isNaN(taskId)) {
            const task = tasks.find((t) => t.id === taskId);
            if (task) {
                openEditTaskModal(task);
            } else {
                console.error("Tugas tidak ditemukan untuk diedit:", taskId);
            }
        } else {
            console.error("ID tugas tidak valid untuk diedit:", taskIdStr);
        }
        // Close dropdown menu after click edit
        if (button) {
            const dropdown = button.closest(".task-menu-dropdown");
            if (dropdown) dropdown.style.display = "none";
        }
    };

    // Handler for delete button click
    const handleDeleteButtonClick = (e) => {
        console.log("Delete button clicked");
        e.stopPropagation();
        const button = e.target.closest("button[data-task-id]");
        const taskIdStr = button ? button.dataset.taskId : null;
        console.log("Delete button clicked, dataset.taskId:", taskIdStr);
        const taskId = taskIdStr ? parseInt(taskIdStr) : NaN;
        console.log("Parsed taskId:", taskId);
        if (!isNaN(taskId)) {
            if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
                const taskIndex = tasks.findIndex((t) => t.id === taskId);
                if (taskIndex !== -1) {
                    tasks.splice(taskIndex, 1);
                    setStorage("tasks", tasks);
                    renderTasks();
                    alert("Tugas berhasil dihapus!");
                } else {
                    console.error("Tugas tidak ditemukan untuk dihapus:", taskId);
                }
            }
        } else {
            console.error("ID tugas tidak valid untuk dihapus:", taskIdStr);
        }
        // Close dropdown menu after click delete
        if (button) {
            const dropdown = button.closest(".task-menu-dropdown");
            if (dropdown) dropdown.style.display = "none";
        }
    };

    // Render kalender
    const renderCalendar = (date) => {
        if (!DOMElements.currentMonthYearHeader || !DOMElements.calendarGridEl)
            return;
        DOMElements.currentMonthYearHeader.textContent = date.toLocaleString(
            "id-ID",
            { month: "long", year: "numeric" }
        );
        DOMElements.calendarGridEl.innerHTML = "";

        const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]; // Sesuaikan dengan bahasa Indonesia
        weekdays.forEach((day) => {
            const weekdayEl = document.createElement("div");
            weekdayEl.classList.add("calendar-weekday");
            weekdayEl.textContent = day;
            DOMElements.calendarGridEl.appendChild(weekdayEl);
        });

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Senin sebagai hari pertama

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startDayIndex; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("calendar-day", "inactive");
            DOMElements.calendarGridEl.appendChild(emptyDay);
        }

        const today = new Date();
        const todayDateString = today.toISOString().split("T")[0];

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            dayElement.textContent = day;

            const currentDate = new Date(year, month, day);
            const currentDayDateString = currentDate.toISOString().split("T")[0];

            if (currentDayDateString === todayDateString) {
                dayElement.classList.add("today");
            }

            const hasSchedule = schedules.some(
                (s) => s.date && s.date.split("T")[0] === currentDayDateString
            );
            if (hasSchedule && currentDayDateString !== todayDateString) {
                dayElement.classList.add("schedule-highlighted");
            }

            DOMElements.calendarGridEl.appendChild(dayElement);
        }
    };

    // Render jadwal hari ini
    const renderTodaySchedule = (date) => {
        if (!DOMElements.todayScheduleList) return;
        DOMElements.todayScheduleList.innerHTML = "";
        const todayDateString = date.toISOString().split("T")[0];
        // Reload schedules from localStorage to get latest updates
        schedules = getStorage("schedules");
        const relevantSchedules = schedules.filter(
            (s) => s.date && s.date.split("T")[0] === todayDateString
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
                <div class="schedule-item-indicator ${schedule.statusColor
                }"></div>
                <div class="schedule-item-content">
                    <h4>${schedule.title}</h4>
                    <p>${schedule.description ? schedule.description : (schedule.desc ? schedule.desc : '')}</p>
                    <div class="schedule-item-time">
                        <i class='bx bx-time'></i>
                        ${schedule.startTime ? schedule.startTime : (schedule.time ? schedule.time.split(' - ')[0] : 'undefined')} - ${schedule.endTime ? schedule.endTime : (schedule.time ? schedule.time.split(' - ')[1] : 'undefined')}
                    </div>
                </div>
                <div class="schedule-item-actions">
                    <div class="checkbox-container ${schedule.completed ? "checked" : ""
                }" data-schedule-id="${schedule.id}">
                        <i class='bx bx-check'></i>
                    </div>
                    <div class="avatar-group">
                        ${(Array.isArray(schedule.avatars)
                    ? schedule.avatars
                    : []
                )
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

    // Mengisi dropdown pilihan tim
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
            // Pastikan nilai yang dipilih tetap ada jika tim yang dipilih masih ada
            if (
                !DOMElements.chooseTeamSelect.value ||
                !teams.some((team) => team.id === DOMElements.chooseTeamSelect.value)
            ) {
                DOMElements.chooseTeamSelect.value = teams[0].id; // Pilih tim pertama jika tidak ada yang dipilih
            }
        }
    };

    // Memperbarui tampilan tanggal pada input
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
     * Mereset modal tambah/edit tugas ke mode "Tambah Tugas" awal.
     * Membersihkan bidang formulir, mereset toggle tampilan, dan memperbarui judul/tombol modal.
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
     * Membuka modal tambah/edit tugas dan mengisi formulir untuk mengedit tugas yang sudah ada.
     * @param {Object} task Objek tugas yang akan diedit.
     */
    const openEditTaskModal = (task) => {
        if (!DOMElements.addTaskModalOverlay || !DOMElements.addTaskForm) return;

        if (DOMElements.modalTitle)
            DOMElements.modalTitle.textContent = "Edit Tugas";
        if (DOMElements.createTaskModalButton)
            DOMElements.createTaskModalButton.textContent = "Simpan Perubahan";

        DOMElements.addTaskModalOverlay.style.display = "flex";

        // Mengisi bidang formulir dengan data tugas
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

        // Perbarui tampilan tanggal
        updateDateDisplay(DOMElements.startDateDisplay, DOMElements.startDateInput);
        updateDateDisplay(DOMElements.endDateDisplay, DOMElements.endDateInput);

        if (DOMElements.attachmentInput) DOMElements.attachmentInput.value = "";
        if (DOMElements.attachmentFileNameDisplay)
            DOMElements.attachmentFileNameDisplay.textContent =
                task.attachmentFile || "";

        DOMElements.addTaskForm.dataset.editingTaskId = task.id;
    };

    // --- 6. Event Handlers ---

    // Handler untuk menambahkan subtask
    const handleAddSubtaskClick = (e) => {
        console.log("Add Subtask button clicked");
        const addSubtaskBtn = e.currentTarget;
        const taskId = parseInt(addSubtaskBtn.dataset.taskId);
        const task = tasks.find((t) => t.id === taskId);

        if (task) {
            const existingInput = addSubtaskBtn.parentElement.querySelector(
                ".new-subtask-input-container"
            );
            if (existingInput) {
                existingInput.querySelector("input").focus();
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

    // Fungsi untuk memasang semua event listener terkait tugas
    const attachTaskListeners = () => {
        // Hapus listener sebelumnya untuk mencegah duplikasi (delegasi yang lebih baik)
        if (DOMElements.tasksListContainer) {
            // Event listener untuk menu titik tiga, edit, delete, dan status button
            // Menggunakan event delegation pada tasksListContainer
            DOMElements.tasksListContainer.removeEventListener(
                "click",
                handleTasksListContainerClick
            );
            DOMElements.tasksListContainer.addEventListener(
                "click",
                handleTasksListContainerClick
            );
        }

        // Event listener untuk tombol "Add Subtask"
        document.querySelectorAll(".add-subtask-button").forEach((button) => {
            button.removeEventListener("click", handleAddSubtaskClick); // Pastikan tidak ada duplikat
            button.addEventListener("click", handleAddSubtaskClick);
        });

        // Event listener untuk checkbox subtask
        document
            .querySelectorAll('input[type="checkbox"][data-subtask-id]')
            .forEach((checkbox) => {
                checkbox.removeEventListener("change", handleSubtaskCheckboxChange);
                checkbox.addEventListener("change", handleSubtaskCheckboxChange);
            });
    };

    // Handler umum untuk klik di dalam tasksListContainer
    const handleTasksListContainerClick = (e) => {
        // Ignore clicks on edit or delete buttons since they have direct event listeners
        if (
            e.target.closest(".edit-task-button") ||
            e.target.closest(".delete-task-button")
        ) {
            return;
        }

        // Klik tombol status tugas
        const statusButton = e.target.closest(".task-status-button");
        if (statusButton) {
            const taskId = parseInt(statusButton.dataset.taskId);
            const task = tasks.find((t) => t.id === taskId);
            if (task) {
                const action = statusButton.dataset.action;
                if (action === "mark-as-done-task") {
                    task.status = "completed";
                    task.progress = 100;
                    setStorage("tasks", tasks);
                    renderTasks();
                    alert(`Tugas "${task.title}" ditandai selesai!`);
                } else if (action === "add-or-create-task") {
                    const detail = prompt(
                        `Masukkan detail atau konten untuk "${task.title}":`
                    );
                    if (detail !== null) {
                        alert(
                            `Detail untuk "${task.title}": "${detail}" (Tidak disimpan, aksi placeholder)`
                        );
                    }
                }
            }
            return;
        }

        // Klik menu titik tiga
        const menuButton = e.target.closest(".task-menu");
        if (menuButton) {
            e.stopPropagation(); // Mencegah event bubbling yang akan menutup dropdown
            const dropdown = menuButton.nextElementSibling;
            if (dropdown && dropdown.classList.contains("task-menu-dropdown")) {
                // Tutup semua dropdown lain sebelum membuka yang ini
                document.querySelectorAll(".task-menu-dropdown").forEach((dd) => {
                    if (dd !== dropdown) dd.style.display = "none";
                });
                dropdown.style.display =
                    dropdown.style.display === "flex" ? "none" : "flex";
            }
            return;
        }

        // Klik tombol Edit Tugas
        let editButton = e.target.closest(".edit-task-button");
        console.log("Clicked element:", e.target);
        console.log("Found editButton:", editButton);
        if (!editButton && e.target.dataset && e.target.dataset.taskId) {
            // If no closest editButton found, but event target has data-task-id, use event target
            editButton = e.target;
            console.log("Using event target as editButton:", editButton);
        }
        if (editButton) {
            // If the clicked element is inside the button but not the button itself, find the button parent
            if (!editButton.dataset || !editButton.dataset.taskId) {
                editButton = editButton.closest("button[data-task-id]");
            }
            const taskIdStr =
                editButton && editButton.dataset ? editButton.dataset.taskId : null;
            console.log("editButton dataset.taskId:", taskIdStr);
            const taskId = taskIdStr ? parseInt(taskIdStr) : NaN;
            if (!isNaN(taskId)) {
                // Perbaikan: Pastikan taskId adalah angka
                const task = tasks.find((t) => t.id === taskId);
                if (task) {
                    openEditTaskModal(task);
                } else {
                    console.error("Tugas tidak ditemukan untuk diedit:", taskId);
                }
            } else {
                console.error("ID tugas tidak valid untuk diedit:", taskIdStr);
            }
            // Tutup dropdown menu setelah klik edit
            const dropdown = editButton.closest(".task-menu-dropdown");
            if (dropdown) dropdown.style.display = "none";
            return;
        }

        // Klik tombol Hapus Tugas
        let deleteButton = e.target.closest(".delete-task-button");
        console.log("Clicked element:", e.target);
        console.log("Found deleteButton:", deleteButton);
        if (deleteButton) {
            // If the clicked element is inside the button but not the button itself, find the button parent
            if (!deleteButton.dataset || !deleteButton.dataset.taskId) {
                deleteButton = deleteButton.closest("button[data-task-id]");
            }
            const taskIdStr =
                deleteButton && deleteButton.dataset
                    ? deleteButton.dataset.taskId
                    : null;
            console.log("deleteButton dataset.taskId:", taskIdStr);
            const taskId = taskIdStr ? parseInt(taskIdStr) : NaN;
            if (!isNaN(taskId)) {
                // Perbaikan: Pastikan taskId adalah angka
                if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
                    const taskIndex = tasks.findIndex((t) => t.id === taskId);
                    if (taskIndex !== -1) {
                        tasks.splice(taskIndex, 1);
                        setStorage("tasks", tasks);
                        renderTasks();
                        alert("Tugas berhasil dihapus!");
                    } else {
                        console.error("Tugas tidak ditemukan untuk dihapus:", taskId);
                    }
                }
            } else {
                console.error("ID tugas tidak valid untuk dihapus:", taskIdStr);
            }
            // Tutup dropdown menu setelah klik delete
            const dropdown = deleteButton.closest(".task-menu-dropdown");
            if (dropdown) dropdown.style.display = "none";
            return;
        }
    };

    // Handler untuk perubahan checkbox subtask
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

    // --- 7. Initialize All Event Listeners ---

    // Toggle menu seluler
    if (DOMElements.mobileMenuToggle && DOMElements.dashboardContainer) {
        DOMElements.mobileMenuToggle.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.toggle("sidebar-open");
        });
    }

    // Close sidebar on clicking close button
    const sidebarCloseButton = document.getElementById("sidebarCloseButton");
    if (sidebarCloseButton && DOMElements.dashboardContainer) {
        sidebarCloseButton.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.remove("sidebar-open");
        });
    }

    // Overlay sidebar (klik untuk menutup)
    if (DOMElements.sidebarOverlay && DOMElements.dashboardContainer) {
        DOMElements.sidebarOverlay.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.remove("sidebar-open");
        });
    }

    // Tombol navigasi proyek (placeholder)
    if (DOMElements.prevProjectBtn)
        DOMElements.prevProjectBtn.addEventListener("click", () =>
            alert("Proyek Sebelumnya (fungsi belum diimplementasikan)")
        );
    if (DOMElements.nextProjectBtn)
        DOMElements.nextProjectBtn.addEventListener("click", () =>
            alert("Proyek Berikutnya (fungsi belum diimplementasikan)")
        );

    // Buka modal tambah tugas
    if (DOMElements.addTaskButton && DOMElements.addTaskModalOverlay) {
        DOMElements.addTaskButton.addEventListener("click", () => {
            resetModalToAddMode();
            if (DOMElements.addTaskModalOverlay) {
                DOMElements.addTaskModalOverlay.style.display = "flex";
            }
            populateChooseTeamSelect();
        });
    }

    // Tutup modal tambah tugas
    if (DOMElements.addTaskModalCloseButton && DOMElements.addTaskModalOverlay) {
        DOMElements.addTaskModalCloseButton.addEventListener("click", () => {
            DOMElements.addTaskModalOverlay.style.display = "none";
            resetModalToAddMode();
        });
    }

    // Tutup dropdown menu tugas saat mengklik di luar
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

    // Submit formulir tambah/edit tugas
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
                DOMElements.attachmentInput && DOMElements.attachmentInput.files[0]
                    ? DOMElements.attachmentInput.files[0].name
                    : null;

            if (
                !taskTitle ||
                !chosenTeam ||
                !startDate ||
                !startTime ||
                !endDate ||
                !endTime ||
                !assignTo
            ) {
                alert(
                    "Please fill in all required fields: Title, Team, Start/End Date & Time, and Assignee."
                );
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
                    if (attachmentFile) task.attachmentFile = attachmentFile; // Hanya perbarui jika ada file baru
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
            }

            DOMElements.addTaskModalOverlay.style.display = "none";
            resetModalToAddMode();
            renderTasks(); // Render ulang tugas setelah penambahan/pengeditan
        });
    }

    // Filter status tugas
    if (DOMElements.taskStatusFilterSelect) {
        DOMElements.taskStatusFilterSelect.addEventListener("change", renderTasks);
    }

    // Tab tugas (Kategori, To-do, Anggota)
    if (DOMElements.tasksTabs) {
        DOMElements.tasksTabs.addEventListener("click", (e) => {
            const clickedButton = e.target.closest("button");
            if (clickedButton) {
                DOMElements.tasksTabs
                    .querySelectorAll("button")
                    .forEach((btn) => btn.classList.remove("active"));
                clickedButton.classList.add("active");

                const buttonText = clickedButton.textContent.trim();
                let filterValueFromButton = "";

                if (buttonText.includes("Kategori")) {
                    filterValueFromButton = "";
                    if (DOMElements.tasksListContainer)
                        DOMElements.tasksListContainer.style.display = "flex";
                } else if (buttonText.includes("To-do")) {
                    alert(
                        "Tab To-do diklik - implementasikan tampilan daftar To-do spesifik."
                    );
                    if (DOMElements.tasksListContainer)
                        DOMElements.tasksListContainer.style.display = "none";
                    return;
                } else if (buttonText.includes("Anggota")) {
                    alert(
                        "Tab Anggota diklik - implementasikan tampilan daftar anggota."
                    );
                    if (DOMElements.tasksListContainer)
                        DOMElements.tasksListContainer.style.display = "none";
                    return;
                }

                if (DOMElements.taskStatusFilterSelect) {
                    DOMElements.taskStatusFilterSelect.value = filterValueFromButton;
                }
                renderTasks();
            }
        });
    }

    // Navigasi bulan kalender
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

    // Centang jadwal selesai
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

    // Toggle area deskripsi
    if (DOMElements.addDescriptionToggle) {
        DOMElements.addDescriptionToggle.addEventListener("click", function () {
            if (DOMElements.descriptionInputArea) {
                const isHidden =
                    DOMElements.descriptionInputArea.style.display === "none" ||
                    DOMElements.descriptionInputArea.style.display === "";
                DOMElements.descriptionInputArea.style.display = isHidden
                    ? "block"
                    : "none";
                if (isHidden && DOMElements.descriptionTextarea)
                    DOMElements.descriptionTextarea.focus();
            }
        });
    }

    // Toggle area input tim baru
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

    // Tambah tim baru dari modal
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
                    alert("Team already exists!");
                }
            } else {
                alert("Please enter a team name.");
            }
        });
    }

    // Tampilkan nama file lampiran
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

    // Inisialisasi tampilan tanggal untuk modal (jika ada)
    updateDateDisplay(DOMElements.startDateDisplay, DOMElements.startDateInput);
    updateDateDisplay(DOMElements.endDateDisplay, DOMElements.endDateInput);

    // --- 8. Initial Renders ---
    // Panggil fungsi render awal setelah semua disiapkan
    renderProjectSummary();
    renderTasks();
    renderCalendar(currentCalendarDate);
    renderTodaySchedule(currentCalendarDate);
    populateChooseTeamSelect();
});
