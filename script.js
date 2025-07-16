document.addEventListener("DOMContentLoaded", () => {
    // =====================================================================
    // --- 1. Fungsi Utilitas ---
    // =====================================================================

    /**
     * Mengambil data dari localStorage.
     * @param {string} key Kunci penyimpanan.
     * @returns {Array} Data yang diurai atau array kosong jika tidak ada/error.
     */
    const getStorage = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error(`Error membaca dari localStorage untuk kunci: ${key}`, e);
            return [];
        }
    };

    /**
     * Menyimpan data ke localStorage.
     * @param {string} key Kunci penyimpanan.
     * @param {Array} data Data yang akan disimpan.
     */
    const setStorage = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`Data untuk kunci '${key}' berhasil disimpan ke localStorage.`);
        } catch (e) {
            console.error(`Error menulis ke localStorage untuk kunci: ${key}`, e);
        }
    };

    /**
     * Mendapatkan ID berikutnya untuk item baru dalam array.
     * @param {Array} arr Array data.
     * @returns {number} ID berikutnya.
     */
    const getNextId = (arr) =>
        arr.length > 0 ? Math.max(...arr.map((item) => item.id)) + 1 : 1;

    /**
     * Memformat string tanggal menjadi format tampilan lokal (id-ID).
     * @param {string} dateString String tanggal (misal: "YYYY-MM-DD").
     * @returns {string} Tanggal yang diformat.
     */
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        } catch (e) {
            console.error(`String tanggal tidak valid untuk pemformatan: ${dateString}`, e);
            return dateString;
        }
    };

    /**
     * Mendapatkan string tanggal YYYY-MM-DD lokal tanpa pergeseran zona waktu.
     * @param {Date} date Objek Date.
     * @returns {string} String tanggal dalam format YYYY-MM-DD.
     */
    const getLocalDateString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    /**
     * Membandingkan dua tanggal berdasarkan tahun, bulan, dan hari.
     * @param {Date} d1 Tanggal pertama.
     * @param {Date} d2 Tanggal kedua.
     * @returns {boolean} True jika tanggalnya sama.
     */
    const isSameDate = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    // =====================================================================
    // --- 2. Manajemen Data (Simulasi API dengan localStorage) ---
    // =====================================================================

    // Inisialisasi data dari localStorage atau dummy data jika kosong
    let projects = getStorage("projects");
    let tasks = getStorage("tasks");
    let schedules = getStorage("schedules");
    let teams = getStorage("teams");
    let currentCalendarDate = new Date(); // Tanggal kalender yang sedang aktif

    /**
     * Menginisialisasi data dummy jika localStorage kosong.
     * Ini memastikan aplikasi memiliki data untuk ditampilkan pertama kali.
     */
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
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            schedules = [{
                id: 1,
                title: "Diskusi Desain Aplikasi",
                description: "Rapat tim untuk finalisasi wireframe.",
                startTime: "09:00",
                endTime: "10:00",
                statusColor: "green",
                completed: false,
                avatars: ["men/1", "women/2"],
                date: getLocalDateString(today),
            }, {
                id: 2,
                title: "Presentasi Proyek Klien",
                description: "Presentasi kemajuan proyek kepada klien utama.",
                startTime: "13:00",
                endTime: "14:30",
                statusColor: "blue",
                completed: false,
                avatars: ["men/3", "women/4"],
                date: getLocalDateString(today),
            }, {
                id: 3,
                title: "Sesi Brainstorming Marketing",
                description: "Sesi ide untuk kampanye Q4.",
                startTime: "10:00",
                endTime: "11:00",
                statusColor: "red",
                completed: false,
                avatars: ["men/5", "women/6"],
                date: getLocalDateString(tomorrow),
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
            }, {
                id: "general",
                name: "Umum"
            }, ];
            setStorage("teams", teams);
        }
    };

    initializeDummyData();

    // =====================================================================
    // --- 3. Cache Elemen DOM ---
    // =====================================================================

    const DOMElements = {
        dashboardContainer: document.getElementById("dashboardContainer"),
        mobileMenuToggle: document.getElementById("mobileMenuToggle"),
        sidebarOverlay: document.getElementById("sidebarOverlay"),

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
        inProgressToggle: document.getElementById("inProgressToggle"),
        completedToggle: document.getElementById("completedToggle"),

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
        deleteSelectedTodayScheduleBtn: document.getElementById("deleteSelectedTodayScheduleBtn"),
        refreshScheduleBtn: document.getElementById("refreshScheduleBtn"),
    };

    // =====================================================================
    // --- 4. Fungsi Render ---
    // =====================================================================

    const renderProjectSummary = () => {
        if (!DOMElements.projectSummaryContainer) return;
        DOMElements.projectSummaryContainer.innerHTML = "";

        const allTasks = getStorage("tasks") || [];
        const allTeams = getStorage("teams") || [{ id: "general", name: "Umum" }];
        const inProgressTasks = allTasks.filter(task => task.status === "in-progress");
        const projectsMap = new Map();

        allTeams.forEach(team => {
            projectsMap.set(team.id, {
                title: team.name, description: "", tasks: [], avatars: new Set(), progressSum: 0, daysLeftMin: null,
            });
        });

        inProgressTasks.forEach(task => {
            const projectKey = task.team || "general";
            const project = projectsMap.get(projectKey) || {
                title: projectKey.charAt(0).toUpperCase() + projectKey.slice(1),
                description: "", tasks: [], avatars: new Set(), progressSum: 0, daysLeftMin: null,
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
                task.avatars.forEach(av => project.avatars.add(av));
            } else if (task.assignTo) {
                const gender = Math.random() < 0.5 ? 'men' : 'women';
                const number = Math.floor(Math.random() * 100);
                project.avatars.add(`${gender}/${number}`);
            }
            if (!project.description && task.description) {
                project.description = task.description;
            }
        });

        projectsMap.forEach((project, key) => {
            if (project.tasks.length === 0) return;

            const avgProgress = project.tasks.length > 0 ? Math.round(project.progressSum / project.tasks.length) : 0;
            const daysLeft = project.daysLeftMin ?
                Math.max(0, Math.ceil((project.daysLeftMin - new Date()) / (1000 * 60 * 60 * 24))) : "N/A";

            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            const teamColorMap = { design: "purple", development: "green", marketing: "orange", general: "gray", };
            const colorClass = teamColorMap[key] || "blue";
            projectCard.classList.add(colorClass);

            const avatarsHtml = Array.from(project.avatars)
                .map(av => {
                    if (typeof av === "string" && (av.startsWith("men/") || av.startsWith("women/"))) {
                        return `<img src="https://randomuser.me/api/portraits/${av}.jpg" alt="User Avatar">`;
                    } else if (typeof av === "string") {
                        const initials = av.split(" ").map(n => n[0]).join("").toUpperCase();
                        return `<div class="avatar-initials">${initials}</div>`;
                    }
                    return '';
                })
                .join("");

            const teamName = project.title || "General";
            const teamClass = teamName.toLowerCase().replace(/\s+/g, "-");

            projectCard.innerHTML = `
                <div class="project-card-header">
                    <span class="team-badge ${teamClass}">${teamName}</span>
                    <i class='bx bx-dots-horizontal-rounded'></i>
                </div>
                <h3>${project.tasks[0]?.title || "Tidak Ada Judul"}</h3>
                <p>${project.description || "Tidak ada deskripsi."}</p>
                <div class="project-card-footer">
                    <div class="progress-info">
                        <span>Progres</span>
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
        if (!DOMElements.inProgressTasksDiv || !DOMElements.completedTasksDiv) return;
        DOMElements.inProgressTasksDiv.innerHTML = "";
        DOMElements.completedTasksDiv.innerHTML = "";
        let inProgressCount = 0;
        let completedCount = 0;

        const normalizedSearch = searchKeyword.trim().toLowerCase();
        const statusFilter = DOMElements.taskStatusFilterSelect ? DOMElements.taskStatusFilterSelect.value : "all";
        const priorityFilter = DOMElements.priorityFilterSelect ? DOMElements.priorityFilterSelect.value : "all";

        const filteredTasks = tasks.filter(task => {
            if (statusFilter !== "all" && task.status !== statusFilter) return false;
            if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
            if (normalizedSearch) {
                const titleMatch = task.title.toLowerCase().includes(normalizedSearch);
                const subtaskMatch = Array.isArray(task.subtasks) && task.subtasks.some(sub => sub.text.toLowerCase().includes(normalizedSearch));
                if (!titleMatch && !subtaskMatch) return false;
            }
            return true;
        });

        if (filteredTasks.length === 0) {
            const noTasksMessage = `<div class="no-tasks-message">Tidak ada tugas yang cocok dengan pencarian/filter.</div>`;
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

            const dateRange = task.startDate && task.endDate ?
                `${formatDateForDisplay(task.startDate)} - ${formatDateForDisplay(task.endDate)}` : "";
            // CALCULATE PROGRESS DYNAMICALLY
            const progress = Array.isArray(task.subtasks) && task.subtasks.length > 0 ?
                Math.round((task.subtasks.filter((s) => s.completed).length / task.subtasks.length) * 100) :
                task.progress || 0; // Fallback to stored progress if no subtasks

            const priorityLabel = task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : "Normal";
            const commentCount = Array.isArray(task.comments) ? task.comments.length : 0;
            const attachmentCount = Array.isArray(task.attachments) ? task.attachments.length : 0;
            let progressBarColor = "#007bff";
            if (progress === 100) progressBarColor = "#28a745";

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
                            .map((sub) => `
                            <li>
                                <input type="checkbox" class="subtask-checkbox" data-task-id="${task.id}" data-subtask-id="${sub.id}" ${sub.completed ? "checked" : ""}>
                                <label>${sub.text}</label>
                            </li>
                        `).join("")}
                    </ul>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <button class="add-subtask-button" data-task-id="${task.id}">
                            <i class='bx bx-plus-medical'></i>
                            Tambah Subtugas
                        </button>
                        <span class="priority-label ${task.priority ? task.priority.toLowerCase() : 'medium'}">
                            ${priorityLabel}
                        </span>
                    </div>
                </div>
                <div class="task-card-progress">
                    <div class="progress-info">
                        <span>Progres</span>
                        <span>${progress}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${progress}%; background-color: ${progressBarColor};"></div>
                    </div>
                </div>
                <div class="task-card-footer-meta">
                    <div class="avatar-group">
                        ${(task.avatars || [])
                            .map((avatar) => `<img src="https://randomuser.me/api/portraits/${avatar}.jpg" alt="User">`).join("")}
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
        attachTaskListeners(); // Attach listeners after rendering
    };

    const renderCalendar = (date) => {
        if (!DOMElements.currentMonthYearHeader || !DOMElements.calendarGridEl) return;
        DOMElements.currentMonthYearHeader.textContent = date.toLocaleString("id-ID", { month: "long", year: "numeric" });
        DOMElements.calendarGridEl.querySelectorAll('.calendar-day').forEach(el => el.remove());

        const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
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

            const hasSchedule = schedules.some((s) => s.date && getLocalDateString(new Date(s.date)) === currentDayDateString);
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
            DOMElements.todayScheduleList.innerHTML = '<p style="text-align: center; color: var(--text-light);">Tidak ada jadwal untuk hari ini.</p>';
            updateDeleteSelectedTodayScheduleButtonVisibility();
            updateEditTodayScheduleButtonVisibility();
            return;
        }

        relevantSchedules.forEach((schedule) => {
            const scheduleItem = document.createElement("div");
            scheduleItem.classList.add("schedule-item");
            scheduleItem.dataset.scheduleId = schedule.id;

            scheduleItem.innerHTML = `
                <div class="schedule-item-indicator ${schedule.statusColor || 'blue'}"></div>
                <div class="schedule-item-content">
                    <h4>${schedule.title}</h4>
                    <p>${schedule.description || schedule.desc || ''}</p>
                    <div class="schedule-item-time">
                        <i class='bx bx-time'></i>
                        ${schedule.startTime || (schedule.time ? schedule.time.split(' - ')[0] : 'undefined')} - ${schedule.endTime || (schedule.time ? schedule.time.split(' - ')[1] : 'undefined')}
                    </div>
                </div>
                <input type="checkbox" class="schedule-select-checkbox" data-id="${schedule.id}" aria-label="Pilih jadwal untuk dihapus" style="float: right; margin-left: 10px;"/>
                <div class="avatar-group">
                    ${(Array.isArray(schedule.avatars) ? schedule.avatars : [])
                        .map((avatar) => `<img src="https://randomuser.me/api/portraits/${avatar}.jpg" alt="Avatar Pengguna">`).join("")}
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
            if (!DOMElements.chooseTeamSelect.value || !teams.some((team) => team.id === DOMElements.chooseTeamSelect.value)) {
                DOMElements.chooseTeamSelect.value = teams[0].id;
            }
        }
    };

    const updateDateDisplay = (displayEl, hiddenEl) => {
        if (!displayEl || !hiddenEl) return;
        displayEl.value = hiddenEl.type === 'date' ? formatDateForDisplay(hiddenEl.value) : hiddenEl.value;

        hiddenEl.addEventListener("change", () => {
            displayEl.value = hiddenEl.type === 'date' ? formatDateForDisplay(hiddenEl.value) : hiddenEl.value;
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
    // --- 5. Fungsi Manajemen Modal ---
    // =====================================================================

    const resetModalToAddMode = () => {
        if (DOMElements.modalTitle) DOMElements.modalTitle.textContent = "Tambah Tugas Baru";
        if (DOMElements.createTaskModalButton) DOMElements.createTaskModalButton.textContent = "Buat Tugas";
        if (DOMElements.addTaskForm) {
            DOMElements.addTaskForm.removeAttribute("data-editing-task-id");
            DOMElements.addTaskForm.reset();
        }
        if (DOMElements.descriptionInputArea) DOMElements.descriptionInputArea.style.display = "none";
        if (DOMElements.teamInputArea) DOMElements.teamInputArea.style.display = "none";
        if (DOMElements.teamDisplayDropdown) DOMElements.teamDisplayDropdown.style.display = "flex";
        if (DOMElements.attachmentFileNameDisplay) DOMElements.attachmentFileNameDisplay.textContent = "";
        populateChooseTeamSelect();
    };

    const openEditTaskModal = (task) => {
        if (!DOMElements.addTaskModalOverlay || !DOMElements.addTaskForm) return;

        if (DOMElements.modalTitle) DOMElements.modalTitle.textContent = "Edit Tugas";
        if (DOMElements.createTaskModalButton) DOMElements.createTaskModalButton.textContent = "Simpan Perubahan";

        DOMElements.addTaskModalOverlay.style.display = "flex";

        document.getElementById("taskTitle").value = task.title || "";
        document.getElementById("description").value = task.description || "";
        if (DOMElements.descriptionInputArea) {
            DOMElements.descriptionInputArea.style.display = task.description ? "block" : "none";
        }

        if (DOMElements.chooseTeamSelect) {
            DOMElements.chooseTeamSelect.value = task.team || (teams.length > 0 ? teams[0].id : "");
        }

        if (DOMElements.teamInputArea) DOMElements.teamInputArea.style.display = "none";
        if (DOMElements.teamDisplayDropdown) DOMElements.teamDisplayDropdown.style.display = "flex";

        document.getElementById("startDate").value = task.startDate || "";
        document.getElementById("startTime").value = task.startTime || "";
        document.getElementById("endDate").value = task.endDate || "";
        document.getElementById("endTime").value = task.endTime || "";
        document.getElementById("assignTo").value = task.assignTo || "";
        if (DOMElements.prioritySelect) DOMElements.prioritySelect.value = task.priority || "normal";

        if (DOMElements.attachmentInput) DOMElements.attachmentInput.value = "";
        if (DOMElements.attachmentFileNameDisplay) DOMElements.attachmentFileNameDisplay.textContent = task.attachmentFile || "";

        DOMElements.addTaskForm.dataset.editingTaskId = task.id;

        updateDateDisplay(DOMElements.startDateDisplay, DOMElements.startDateInput);
        updateDateDisplay(DOMElements.endDateDisplay, DOMElements.endDateInput);
        updateDateDisplay(DOMElements.startTimeInput, DOMElements.startTimeInput);
        updateDateDisplay(DOMElements.endTimeInput, DOMElements.endTimeInput);
    };

    // =====================================================================
    // --- 6. Event Handler ---
    // =====================================================================

    // NOTE: This function is now using event delegation on tasksListContainer
    // It's not attached to individual buttons, but checks the click target.
    const handleAddSubtaskClick = (targetButton) => { // Mengubah parameter
        const taskId = parseInt(targetButton.dataset.taskId); // Menggunakan targetButton
        const task = tasks.find((t) => t.id === taskId);

        if (task) {
            const taskCard = targetButton.closest('.task-card'); // Temukan kartu tugas induk
            const subtasksDiv = taskCard.querySelector('.task-card-subtasks'); // Area subtask dalam kartu itu
            
            const existingInputContainer = subtasksDiv.querySelector(".new-subtask-input-container");
            if (existingInputContainer) {
                existingInputContainer.querySelector(".new-subtask-input-field").focus();
                return;
            }

            const inputContainer = document.createElement("div");
            inputContainer.classList.add("new-subtask-input-container");
            inputContainer.innerHTML = `
                <input type="text" placeholder="Masukkan subtugas baru" class="new-subtask-input-field">
                <button type="button" class="new-subtask-add-button">Tambah</button>
                <button type="button" class="new-subtask-cancel-button">Batal</button>
            `;
            // Sisipkan inputContainer di dalam task-card-subtasks, sebelum div yang berisi tombol add subtask
            // Atau bisa juga sebelum ul jika ingin di atas daftar subtask
            subtasksDiv.insertBefore(inputContainer, targetButton.parentElement); // Sisipkan sebelum div parent tombol

            targetButton.style.display = "none"; // Sembunyikan tombol saat input muncul

            const input = inputContainer.querySelector(".new-subtask-input-field");
            const addButton = inputContainer.querySelector(".new-subtask-add-button");
            const cancelButton = inputContainer.querySelector(".new-subtask-cancel-button");

            input.focus();

            const addAndRenderSubtask = () => {
                const newSubtaskText = input.value.trim();
                if (newSubtaskText) {
                    if (!Array.isArray(task.subtasks)) task.subtasks = [];
                    task.subtasks.push({ id: getNextId(task.subtasks), text: newSubtaskText, completed: false });
                    setStorage("tasks", tasks);
                    renderTasks(); // Render ulang untuk melihat perubahan
                } else {
                    alert("Deskripsi subtugas tidak boleh kosong.");
                }
            };

            addButton.addEventListener("click", addAndRenderSubtask);
            cancelButton.addEventListener("click", () => {
                inputContainer.remove();
                targetButton.style.display = "flex"; // Tampilkan kembali tombol
            });
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    addAndRenderSubtask();
                } else if (event.key === "Escape") {
                    inputContainer.remove();
                    targetButton.style.display = "flex"; // Tampilkan kembali tombol
                }
            });
        }
    };

    // NOTE: This function is now using event delegation on tasksListContainer
    // It's not attached to individual checkboxes.
    const handleSubtaskCheckboxChange = (checkbox) => { // Mengubah parameter
        const taskId = parseInt(checkbox.dataset.taskId);
        const subtaskId = parseInt(checkbox.dataset.subtaskId);
        const task = tasks.find((t) => t.id === taskId);

        if (task && Array.isArray(task.subtasks)) {
            const subtask = task.subtasks.find((s) => s.id === subtaskId);
            if (subtask) {
                subtask.completed = checkbox.checked;
                console.log(`Subtask ${subtask.id} of Task ${task.id} completed: ${subtask.completed}`);

                const totalSubtasks = task.subtasks.length;
                const completedSubtasks = task.subtasks.filter((s) => s.completed).length;

                task.progress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
                console.log(`Task ${task.id} progress: ${task.progress}%`);

                // Update task status based on subtask completion
                if (task.progress === 100) {
                    task.status = "completed";
                } else {
                    task.status = "in-progress";
                }
                console.log(`Task ${task.id} status: ${task.status}`);

                setStorage("tasks", tasks);
                renderTasks(); // Render ulang untuk melihat perubahan progres
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
                document.querySelectorAll(".task-menu-dropdown").forEach((dd) => { if (dd !== dropdown) dd.style.display = "none"; });
                dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
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

        // Delegasikan klik pada tombol 'Tambah Subtugas'
        const addSubtaskButton = target.closest(".add-subtask-button");
        if (addSubtaskButton) {
            handleAddSubtaskClick(addSubtaskButton); // Pass the clicked button to the handler
            return;
        }

        // Delegasikan klik pada checkbox subtugas
        const subtaskCheckbox = target.closest('.subtask-checkbox'); // Use the class added in renderTasks
        if (subtaskCheckbox) {
            handleSubtaskCheckboxChange(subtaskCheckbox); // Pass the clicked checkbox to the handler
            return;
        }
    };

    const attachTaskListeners = () => {
        if (DOMElements.tasksListContainer) {
            DOMElements.tasksListContainer.removeEventListener("click", handleTasksListContainerClick);
            DOMElements.tasksListContainer.addEventListener("click", handleTasksListContainerClick);
        }
    };

    // =====================================================================
    // --- 7. Inisialisasi Semua Event Listener Utama Aplikasi ---
    // =====================================================================

    if (DOMElements.mobileMenuToggle && DOMElements.dashboardContainer) {
        DOMElements.mobileMenuToggle.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.toggle("sidebar-open");
        });
    }

    if (DOMElements.sidebarOverlay && DOMElements.dashboardContainer) {
        DOMElements.sidebarOverlay.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.remove("sidebar-open");
        });
    }

    if (DOMElements.taskSearchInput) {
        DOMElements.taskSearchInput.addEventListener("input", (e) => {
            renderTasks(e.target.value);
        });
    }

    if (DOMElements.prevProjectBtn) DOMElements.prevProjectBtn.addEventListener("click", () => alert("Proyek Sebelumnya (fungsi belum diimplementasikan)"));
    if (DOMElements.nextProjectBtn) DOMElements.nextProjectBtn.addEventListener("click", () => alert("Proyek Berikutnya (fungsi belum diimplementasikan)"));

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
            if (menuButton && !menuButton.contains(e.target) && !dd.contains(e.target)) {
                dd.style.display = "none";
            }
        });
    });

    if (DOMElements.addTaskForm) {
        DOMElements.addTaskForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const taskTitle = DOMElements.addTaskForm.querySelector("#taskTitle").value;
            const description = DOMElements.addTaskForm.querySelector("#description").value;
            const chosenTeam = DOMElements.addTaskForm.querySelector("#chooseTeamSelect").value;
            const startDate = DOMElements.addTaskForm.querySelector("#startDate").value;
            const startTime = DOMElements.addTaskForm.querySelector("#startTime").value;
            const endDate = DOMElements.addTaskForm.querySelector("#endDate").value;
            const endTime = DOMElements.addTaskForm.querySelector("#endTime").value;
            const assignTo = DOMElements.addTaskForm.querySelector("#assignTo").value;
            const priority = DOMElements.addTaskForm.querySelector("#prioritySelect").value;
            const attachmentFile = DOMElements.attachmentInput && DOMElements.attachmentInput.files[0] ? DOMElements.attachmentInput.files[0].name : null;

            if (!taskTitle || !chosenTeam || !startDate || !startTime || !endDate || !endTime || !assignTo) {
                alert("Harap lengkapi semua bidang yang wajib diisi!");
                return;
            }

            const editingTaskId = DOMElements.addTaskForm.dataset.editingTaskId;

            if (editingTaskId) {
                const taskIndex = tasks.findIndex((t) => t.id === parseInt(editingTaskId));
                if (taskIndex !== -1) {
                    const task = tasks[taskIndex];
                    Object.assign(task, { title: taskTitle, description, team: chosenTeam, startDate, startTime, endDate, endTime, assignTo, priority });
                    if (attachmentFile) task.attachmentFile = attachmentFile;
                    setStorage("tasks", tasks);
                    alert("Tugas berhasil diperbarui!");
                } else {
                    alert("Error: Tugas yang akan diedit tidak ditemukan.");
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
                    avatars: ["men/32", "women/44"],
                    subject: "Umum",
                    teacher: "N/A",
                    type: "Task",
                };
                tasks.unshift(newTask);
                setStorage("tasks", tasks);
                alert("Tugas berhasil ditambahkan!");
                if (DOMElements.priorityFilterSelect) {
                    DOMElements.priorityFilterSelect.value = "all";
                    DOMElements.priorityFilterSelect.style.backgroundColor = "";
                    DOMElements.priorityFilterSelect.title = "";
                    localStorage.setItem("priorityFilter", "all");
                }
            }
            DOMElements.addTaskModalOverlay.style.display = "none";
            resetModalToAddMode();
            renderTasks();
        });
    }

    if (DOMElements.taskStatusFilterSelect) {
        DOMElements.taskStatusFilterSelect.addEventListener("change", () => {
            renderTasks();
            localStorage.setItem("taskStatusFilter", DOMElements.taskStatusFilterSelect.value);
        });
        const savedStatusFilter = localStorage.getItem("taskStatusFilter");
        if (savedStatusFilter) DOMElements.taskStatusFilterSelect.value = savedStatusFilter;
        else DOMElements.taskStatusFilterSelect.value = "all";
    }

    if (DOMElements.priorityFilterSelect) {
        DOMElements.priorityFilterSelect.addEventListener("change", () => {
            renderTasks();
            localStorage.setItem("priorityFilter", DOMElements.priorityFilterSelect.value);
            if (DOMElements.priorityFilterSelect.value !== "all") {
                DOMElements.priorityFilterSelect.style.backgroundColor = "#d0e6ff";
                DOMElements.priorityFilterSelect.title = `Difilter berdasarkan: ${DOMElements.priorityFilterSelect.options[DOMElements.priorityFilterSelect.selectedIndex].text}`;
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
                DOMElements.priorityFilterSelect.title = `Difilter berdasarkan: ${DOMElements.priorityFilterSelect.options[DOMElements.priorityFilterSelect.selectedIndex].text}`;
            }
        }
    }

    if (DOMElements.tasksTabs) {
        DOMElements.tasksTabs.addEventListener("click", (e) => {
            const clickedButton = e.target.closest("button");
            if (clickedButton) {
                DOMElements.tasksTabs.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
                clickedButton.classList.add("active");

                const buttonText = clickedButton.textContent.trim();
                if (buttonText.includes("Kategori")) {
                    if (DOMElements.tasksListContainer) DOMElements.tasksListContainer.style.display = "flex";
                    renderTasks();
                } else if (buttonText.includes("Anggota")) {
                    alert("Tab Anggota diklik - implementasikan tampilan daftar anggota.");
                    if (DOMElements.tasksListContainer) DOMElements.tasksListContainer.style.display = "none";
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
        DOMElements.addDescriptionToggle.addEventListener("click", function() {
            console.log("DEBUG: addDescriptionToggle clicked!");
            if (DOMElements.descriptionInputArea) {
                const currentDisplay = DOMElements.descriptionInputArea.style.display;
                console.log("DEBUG: Current descriptionInputArea display:", currentDisplay);

                const isHidden = (currentDisplay === "none" || currentDisplay === "");
                DOMElements.descriptionInputArea.style.display = isHidden ? "block" : "none";
                console.log("DEBUG: New descriptionInputArea display set to:", DOMElements.descriptionInputArea.style.display);

                if (isHidden && DOMElements.descriptionTextarea) {
                    DOMElements.descriptionTextarea.focus();
                    console.log("DEBUG: Description textarea focused.");
                } else if (!DOMElements.descriptionTextarea) {
                    console.warn("WARNING: descriptionTextarea element not found, cannot focus.");
                }

            } else {
                console.warn("ERROR: DOMElements.descriptionInputArea not found in DOM!");
            }
        });
    } else {
        console.warn("ERROR: DOMElements.addDescriptionToggle not found in DOM!");
    }

    if (DOMElements.chooseTeamToggle) {
        DOMElements.chooseTeamToggle.addEventListener("click", function() {
            if (DOMElements.teamDisplayDropdown) DOMElements.teamDisplayDropdown.style.display = "none";
            if (DOMElements.teamInputArea) {
                DOMElements.teamInputArea.style.display = "flex";
                DOMElements.newTeamInput.focus();
            }
        });
    }

    if (DOMElements.addTeamButtonModal) {
        DOMElements.addTeamButtonModal.addEventListener("click", function() {
            const newTeamName = DOMElements.newTeamInput.value.trim();
            if (newTeamName) {
                const newTeamId = newTeamName.toLowerCase().replace(/\s/g, "-");
                if (!teams.some((team) => team.id === newTeamId)) {
                    teams.push({ id: newTeamId, name: newTeamName });
                    setStorage("teams", teams);
                    populateChooseTeamSelect();
                    DOMElements.chooseTeamSelect.value = newTeamId;

                    if (DOMElements.teamInputArea) DOMElements.teamInputArea.style.display = "none";
                    if (DOMElements.teamDisplayDropdown) DOMElements.teamDisplayDropdown.style.display = "flex";
                    DOMElements.newTeamInput.value = "";
                } else {
                    alert("Tim sudah ada!");
                }
            } else {
                alert("Harap masukkan nama tim.");
            }
        });
    }

    if (DOMElements.attachmentInput) {
        DOMElements.attachmentInput.addEventListener("change", function() {
            if (this.files.length > 0) {
                if (DOMElements.attachmentFileNameDisplay) DOMElements.attachmentFileNameDisplay.textContent = this.files[0].name;
            } else {
                if (DOMElements.attachmentFileNameDisplay) DOMElements.attachmentFileNameDisplay.textContent = "";
            }
        });
    }

    // =====================================================================
    // --- 9. Fungsionalitas Menu Dropdown Jadwal Hari Ini ---
    // =====================================================================

    const updateDeleteSelectedTodayScheduleButtonVisibility = () => {
        if (!DOMElements.deleteSelectedTodayScheduleBtn) {
            console.warn("WARNING: DOMElements.deleteSelectedTodayScheduleBtn tidak ditemukan.");
            return;
        }
        const checkboxes = DOMElements.todayScheduleList.querySelectorAll('.schedule-select-checkbox');
        const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
        DOMElements.deleteSelectedTodayScheduleBtn.style.display = anyChecked ? 'flex' : 'none';
        console.log("DEBUG: Visibilitas tombol 'Hapus jadwal terpilih' diperbarui:", DOMElements.deleteSelectedTodayScheduleBtn.style.display);
    };

    function updateEditTodayScheduleButtonVisibility() {
        if (!DOMElements.editTodayScheduleBtn) {
            console.warn("WARNING: DOMElements.editTodayScheduleBtn tidak ditemukan.");
            return;
        }
        const todayDateString = getLocalDateString(currentCalendarDate);
        const hasTodaySchedule = schedules.some((s) => s.date && getLocalDateString(new Date(s.date)) === todayDateString);
        DOMElements.editTodayScheduleBtn.style.display = hasTodaySchedule ? "flex" : "none";
        console.log("DEBUG: Visibilitas tombol 'Edit jadwal hari ini' diperbarui:", DOMElements.editTodayScheduleBtn.style.display);
    }

    if (DOMElements.todayScheduleMenuButton && DOMElements.todayScheduleDropdown) {
        console.log("DEBUG: Memasang event listener untuk todayScheduleMenuButton.");
        DOMElements.todayScheduleMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = DOMElements.todayScheduleDropdown;
            if (dropdown.style.display === 'none' || dropdown.style.display === '') {
                dropdown.style.display = 'flex';
                updateDeleteSelectedTodayScheduleButtonVisibility();
                updateEditTodayScheduleButtonVisibility();
            } else {
                dropdown.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (DOMElements.todayScheduleDropdown && !DOMElements.todayScheduleDropdown.contains(e.target) &&
                DOMElements.todayScheduleMenuButton && !DOMElements.todayScheduleMenuButton.contains(e.target)) {
                DOMElements.todayScheduleDropdown.style.display = 'none';
            }
        });
    } else {
        console.warn("WARNING: DOMElements.todayScheduleMenuButton atau DOMElements.todayScheduleDropdown tidak ditemukan, event listener tidak terpasang.");
    }

    if (DOMElements.addNewScheduleBtn) {
        DOMElements.addNewScheduleBtn.addEventListener('click', () => {
            DOMElements.todayScheduleDropdown.style.display = 'none';
            if (document.getElementById('addScheduleModal')) {
                const scheduleForm = document.getElementById('scheduleForm');
                if (scheduleForm) scheduleForm.reset();
                const formTitle = document.getElementById('formTitle');
                if (formTitle) formTitle.textContent = "Tambah Jadwal Baru";
                const saveScheduleButton = document.getElementById('saveScheduleButton');
                if (saveScheduleButton) saveScheduleButton.textContent = "Tambah Jadwal";
                const scheduleIdInput = document.getElementById('scheduleId');
                if (scheduleIdInput) scheduleIdInput.value = '';

                if (document.getElementById('dateDisplay') && document.getElementById('dateInput')) {
                    document.getElementById('dateInput').value = '';
                    document.getElementById('dateDisplay').value = '';
                }
                if (document.getElementById('startTimeDisplay') && document.getElementById('startTimeInput')) {
                    document.getElementById('startTimeInput').value = '';
                    document.getElementById('startTimeDisplay').value = '';
                }
                if (document.getElementById('endTimeDisplay') && document.getElementById('endTimeInput')) {
                    document.getElementById('endTimeInput').value = '';
                    document.getElementById('endTimeDisplay').value = '';
                }

                document.getElementById('addScheduleModal').style.display = 'flex';
            } else {
                window.location.href = "schedule.html#add";
            }
        });
    }

    if (DOMElements.editTodayScheduleBtn) {
        DOMElements.editTodayScheduleBtn.addEventListener('click', () => {
            DOMElements.todayScheduleDropdown.style.display = 'none';
            const todayDateString = getLocalDateString(currentCalendarDate);
            const todaySchedules = schedules.filter(s => s.date && getLocalDateString(new Date(s.date)) === todayDateString);

            if (todaySchedules.length === 0) {
                alert('Tidak ada jadwal hari ini untuk diedit.');
                return;
            }

            const scheduleToEdit = todaySchedules[0];

            if (document.getElementById('addScheduleModal')) {
                const scheduleForm = document.getElementById('scheduleForm');
                const formTitle = document.getElementById('formTitle');
                const saveScheduleButton = document.getElementById('saveScheduleButton');
                const scheduleIdInput = document.getElementById('scheduleId');
                const titleInput = document.getElementById('title');
                const dateInput = document.getElementById('dateInput');
                const startTimeInput = document.getElementById('startTimeInput');
                const endTimeInput = document.getElementById('endTimeInput');
                const statusColorSelect = document.getElementById('statusColor');

                if (formTitle) formTitle.textContent = "Edit Jadwal";
                if (saveScheduleButton) saveScheduleButton.textContent = "Simpan Perubahan";
                if (scheduleIdInput) scheduleIdInput.value = scheduleToEdit.id;

                if (titleInput) titleInput.value = scheduleToEdit.title || '';
                if (dateInput) dateInput.value = scheduleToEdit.date || '';
                if (startTimeInput) startTimeInput.value = scheduleToEdit.startTime || '';
                if (endTimeInput) endTimeInput.value = scheduleToEdit.endTime || '';
                if (statusColorSelect) statusColorSelect.value = scheduleToEdit.statusColor || 'blue';

                if (document.getElementById('dateDisplay')) document.getElementById('dateInput').dispatchEvent(new Event('change'));
                if (document.getElementById('startTimeDisplay')) document.getElementById('startTimeInput').dispatchEvent(new Event('change'));
                if (document.getElementById('endTimeDisplay')) document.getElementById('endTimeInput').dispatchEvent(new Event('change'));

                document.getElementById('addScheduleModal').style.display = 'flex';
            } else {
                window.location.href = `schedule.html#edit-${scheduleToEdit.id}`;
            }
        });
    }

    if (DOMElements.deleteSelectedTodayScheduleBtn) {
        DOMElements.deleteSelectedTodayScheduleBtn.style.display = 'none';
        DOMElements.deleteSelectedTodayScheduleBtn.addEventListener('click', () => {
            DOMElements.todayScheduleDropdown.style.display = 'none';
            const checkboxes = DOMElements.todayScheduleList.querySelectorAll('.schedule-select-checkbox:checked');
            const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.id));

            if (idsToDelete.length === 0) {
                alert('Silakan centang jadwal yang ingin dihapus terlebih dahulu.');
                return;
            }
            if (confirm(`Yakin ingin menghapus ${idsToDelete.length} jadwal?`)) {
                schedules = schedules.filter(s => !idsToDelete.includes(s.id));
                setStorage('schedules', schedules);
                renderProjectSummary();
                renderTasks();
                renderCalendar(currentCalendarDate);
                renderTodaySchedule(currentCalendarDate);
                alert('Jadwal berhasil dihapus.');
            }
        });
    }

    if (DOMElements.refreshScheduleBtn) {
        DOMElements.refreshScheduleBtn.addEventListener('click', () => {
            DOMElements.todayScheduleDropdown.style.display = 'none';
            schedules = getStorage('schedules');
            renderTodaySchedule(currentCalendarDate);
            alert('Jadwal hari ini telah diperbarui.');
        });
    }

    if (DOMElements.todayScheduleList) {
        DOMElements.todayScheduleList.addEventListener('change', (e) => {
            if (e.target.classList.contains('schedule-select-checkbox')) {
                updateDeleteSelectedTodayScheduleButtonVisibility();
            }
        });
    }

    if (DOMElements.todayScheduleList) {
        DOMElements.todayScheduleList.addEventListener("click", (e) => {
            if (e.target.classList.contains('schedule-select-checkbox')) {
                return;
            }
            const scheduleItem = e.target.closest(".schedule-item");
            if (scheduleItem) {
                const tasksSection = document.querySelector(".tasks-section");
                if (tasksSection) {
                    tasksSection.scrollIntoView({ behavior: "smooth" });
                    tasksSection.classList.add("highlight-tasks");
                    setTimeout(() => { tasksSection.classList.remove("highlight-tasks"); }, 2000);
                }
            }
        });
    }

    // =====================================================================
    // --- 10. Inisialisasi Akhir Aplikasi ---
    // =====================================================================

    renderProjectSummary();
    renderTasks();
    renderCalendar(currentCalendarDate);
    renderTodaySchedule(currentCalendarDate);
    populateChooseTeamSelect();

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

    if (DOMElements.dashboardContainer && window.innerWidth <= 768) {
        DOMElements.dashboardContainer.classList.remove('sidebar-open');
    }
});
