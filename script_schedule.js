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
            console.error(
                `rror reads from localStorage for the key: ${key}`,
                e
            );
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
            console.log(
                `The data for key '${key}' as successfully saved to localStorage.`
            );
        } catch (e) {
            console.error(
                `Error writing to localStorage for the key: ${key}`,
                e
            );
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
     * Memformat string tanggal ISO menjadi format tampilan lokal (id-ID).
     * @param {string} isoDateString String tanggal ISO (misal: "YYYY-MM-DD").
     * @returns {string} Tanggal yang diformat.
     */
    const formatDateDisplay = (isoDateString) => {
        if (!isoDateString) return "";
        try {
            const date = new Date(isoDateString);
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        } catch (e) {
            console.error(
                `Invalid date string for formatting: ${isoDateString}`,
                e
            );
            return isoDateString;
        }
    };

    /**
     * Memformat rentang waktu.
     * @param {string} start Waktu mulai (HH:MM).
     * @param {string} end Waktu selesai (HH:MM).
     * @returns {string} Rentang waktu yang diformat.
     */
    const formatTimeRange = (start, end) => {
        if (!start || !end) return "";
        return `${start} - ${end}`;
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

    // =====================================================================
    // --- 2. Manajemen Data (Simulasi API dengan localStorage) ---
    // =====================================================================

    let schedules = getStorage("schedules"); // Data jadwal utama
    // Data lain seperti projects dan tasks tidak ada di sini, diasumsikan hanya untuk dashboard utama.
    // Jika perlu, Anda bisa mengimpornya atau memuatnya juga.

    /**
     * Menginisialisasi data dummy untuk jadwal jika localStorage kosong.
     */
    const initializeDummyData = () => {
        if (schedules.length === 0) {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();

            schedules = [
                {
                    id: 1,
                    title: "Daily Standup",
                    date: getLocalDateString(new Date(year, month, day)),
                    startTime: "09:00",
                    endTime: "09:15",
                    statusColor: "blue",
                    description: "Quick team sync-up.",
                },
                {
                    id: 2,
                    title: "Client Meeting",
                    date: getLocalDateString(new Date(year, month, day)),
                    startTime: "10:00",
                    endTime: "11:00",
                    statusColor: "green",
                    description: "Discuss Q3 deliverables.",
                },
                {
                    id: 3,
                    title: "Project Review",
                    date: getLocalDateString(new Date(year, month, day + 1)),
                    startTime: "14:00",
                    endTime: "15:00",
                    statusColor: "purple",
                    description: "Review progress for Alpha project.",
                },
            ];
            setStorage("schedules", schedules);
        }
    };

    initializeDummyData(); // Panggil inisialisasi data saat DOM dimuat

    // =====================================================================
    // --- 3. Cache Elemen DOM ---
    // =====================================================================

    // Cache semua elemen DOM yang akan sering diakses
    const DOMElements = {
        // Layout Utama (sidebar, header)
        dashboardContainer: document.getElementById("dashboardContainer"),
        mobileMenuToggle: document.getElementById("mobileMenuToggle"),
        sidebarOverlay: document.getElementById("sidebarOverlay"),

        // Daftar Jadwal Utama
        scheduleListEl: document.getElementById("scheduleList"),
        openAddScheduleModalButton: document.getElementById(
            "openAddScheduleModalButton"
        ),

        // Modal Tambah/Edit Jadwal
        addScheduleModal: document.getElementById("addScheduleModal"),
        closeAddScheduleModalButton: document.getElementById(
            "closeAddScheduleModalButton"
        ),
        scheduleForm: document.getElementById("scheduleForm"),
        formTitle: document.getElementById("formTitle"),
        scheduleIdInput: document.getElementById("scheduleId"),
        titleInput: document.getElementById("title"),
        descriptionInput: document.getElementById("description"),
        dateDisplay: document.getElementById("dateDisplay"),
        dateInputHidden: document.getElementById("dateInput"),
        startTimeDisplay: document.getElementById("startTimeDisplay"),
        startTimeInputHidden: document.getElementById("startTimeInput"),
        endTimeDisplay: document.getElementById("endTimeDisplay"),
        endTimeInputHidden: document.getElementById("endTimeInput"),
        statusColorSelect: document.getElementById("statusColor"),
        saveScheduleButton: document.getElementById("saveScheduleButton"),
        cancelEditButton: document.getElementById("cancelEditButton"),

        // Kalender dan Jadwal Hari Ini (Sidebar Kanan)
        currentMonthYearHeader: document.getElementById("currentMonthYear"),
        calendarGridEl: document.getElementById("calendarGrid"),
        prevMonthBtn: document.getElementById("prevMonthBtn"),
        nextMonthBtn: document.getElementById("nextMonthBtn"),
        todayScheduleList: document.getElementById("todayScheduleList"),
        todayScheduleMenuButton: document.getElementById(
            "todayScheduleMenuButton"
        ),
        todayScheduleDropdown: document.getElementById(
            "todayScheduleDropdown"
        ),
        addNewScheduleBtn: document.getElementById("addNewScheduleBtn"),
        editTodayScheduleBtn: document.getElementById("editTodayScheduleBtn"),
        deleteSelectedTodayScheduleBtn: document.getElementById(
            "deleteSelectedTodayScheduleBtn"
        ),
        refreshScheduleBtn: document.getElementById("refreshScheduleBtn"),
    };

    let currentCalendarDate = new Date(); // Tanggal kalender yang sedang aktif

    // =====================================================================
    // --- 4. Fungsi Render ---
    // =====================================================================

    /**
     * Mengisi input tampilan (teks) berdasarkan nilai input tersembunyi (date/time).
     * Juga melampirkan event listener untuk membuka picker.
     * @param {HTMLElement} displayEl Elemen input yang terlihat (tipe text).
     * @param {HTMLInputElement} hiddenInputEl Elemen input tersembunyi (tipe date/time).
     */
    const setupPickerInput = (displayEl, hiddenInputEl) => {
        if (!displayEl || !hiddenInputEl) return;

        const updateDisplay = () => {
            if (hiddenInputEl.type === "date") {
                displayEl.value = formatDateDisplay(hiddenInputEl.value);
            } else if (hiddenInputEl.type === "time") {
                displayEl.value = hiddenInputEl.value;
            }
        };

        // Set nilai tampilan awal jika input tersembunyi sudah memiliki nilai
        updateDisplay();

        // Event listener untuk klik pada input tampilan yang akan membuka picker input tersembunyi
        displayEl.addEventListener("click", () => {
            if (hiddenInputEl.showPicker) {
                // Metode modern untuk membuka picker
                hiddenInputEl.showPicker();
            } else {
                hiddenInputEl.focus(); // Fallback untuk browser lama
            }
        });

        // Event listener untuk perubahan pada input tersembunyi yang akan memperbarui input tampilan
        hiddenInputEl.addEventListener("change", updateDisplay);
    };

    /**
     * Memperbarui mode form modal (Tambah atau Edit).
     * @param {boolean} isEditMode True jika dalam mode edit, false jika mode tambah.
     */
    const updateFormMode = (isEditMode) => {
        if (DOMElements.formTitle)
            DOMElements.formTitle.textContent = isEditMode
                ? "Edit Schedule"
                : "Add New Schedule";
        if (DOMElements.saveScheduleButton)
            DOMElements.saveScheduleButton.textContent = isEditMode
                ? "Save Changes"
                : "Add Schedule";
        if (DOMElements.cancelEditButton)
            DOMElements.cancelEditButton.style.display = isEditMode
                ? "inline-block"
                : "none";

        // Update title label and placeholder based on mode
        const titleLabel = document.getElementById("titleLabel");
        const titleInput = document.getElementById("title");
        if (titleLabel && titleInput) {
            if (isEditMode) {
                titleLabel.textContent = "Title";
                titleInput.placeholder = "Enter schedule title";
            } else {
                titleLabel.textContent = "Title of schedule";
                titleInput.placeholder = "Title of schedule";
            }
        }
    };

    /**
     * Mereset form modal tambah/edit jadwal ke kondisi awal (mode tambah).
     */
    const resetForm = () => {
        if (!DOMElements.scheduleForm) return;
        DOMElements.scheduleForm.reset();
        if (DOMElements.scheduleIdInput) DOMElements.scheduleIdInput.value = "";
        if (DOMElements.descriptionInput) DOMElements.descriptionInput.value = "";
        if (DOMElements.dateDisplay) DOMElements.dateDisplay.value = ""; // Bersihkan field tampilan tanggal
        if (DOMElements.startTimeDisplay) DOMElements.startTimeDisplay.value = ""; // Bersihkan field tampilan waktu mulai
        if (DOMElements.endTimeDisplay) DOMElements.endTimeDisplay.value = ""; // Bersihkan field tampilan waktu selesai
        if (DOMElements.statusColorSelect) DOMElements.statusColorSelect.value = "blue"; // Atur warna default
        updateFormMode(false); // Atur tombol kembali ke mode Tambah
    };

    /**
     * Merender daftar jadwal utama di `scheduleListEl`.
     */
    const renderSchedules = () => {
        DOMElements.scheduleListEl.innerHTML = "";
        if (schedules.length === 0) {
            DOMElements.scheduleListEl.innerHTML =
                '<p class="empty-list-message">No schedules added yet.</p>';
            return;
        }

        // Urutkan jadwal berdasarkan tanggal dan waktu
        schedules.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);
            return dateA - dateB;
        });

        schedules.forEach((schedule) => {
            const div = document.createElement("div");
            div.className = "schedule-item";
            div.innerHTML = `
                <div class="schedule-item-indicator ${schedule.statusColor || "blue"
                }"></div>
                <div class="schedule-item-content">
                    <div class="title">${schedule.title}</div>
                    <div class="description" style="font-size: 0.85rem; color: var(--text-light); margin-top: 0.2rem;">${schedule.description || ""}</div>
                    <div class="time">
                        <i class='bx bx-calendar'></i> ${formatDateDisplay(
                    schedule.date
                )} |
                        <i class='bx bx-time'></i> ${formatTimeRange(
                    schedule.startTime,
                    schedule.endTime
                )}
                    </div>
                </div>
                <div class="schedule-item-actions">
                    <button type="button" class="edit-schedule-btn" data-id="${schedule.id
                }"><i class='bx bx-edit-alt'></i></button>
                    <button type="button" class="delete-schedule-btn" data-id="${schedule.id
                }"><i class='bx bx-trash'></i></button>
                </div>
            `;
            DOMElements.scheduleListEl.appendChild(div);
        });
        // Perbarui kalender dan jadwal hari ini setelah daftar utama dirender
        renderCalendar(currentCalendarDate);
        renderTodaySchedule(currentCalendarDate);
    };

    /**
     * Merender kalender untuk bulan yang diberikan.
     * @param {Date} date Tanggal untuk merender bulan.
     */
    const renderCalendar = (date) => {
        if (
            !DOMElements.currentMonthYearHeader ||
            !DOMElements.calendarGridEl
        )
            return;

        DOMElements.currentMonthYearHeader.textContent = date.toLocaleString(
            "id-ID",
            { month: "long", year: "numeric" }
        );
        // Bersihkan semua elemen hari yang ditambahkan secara dinamis
        DOMElements.calendarGridEl
            .querySelectorAll(".calendar-day")
            .forEach((el) => el.remove());

        const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
        // Asumsi elemen weekdays sudah ada di HTML. Jika tidak, tambahkan di sini.

        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Senin sebagai hari pertama
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date(); // Tanggal aktual hari ini

        // Tambahkan hari-hari kosong di awal bulan
        for (let i = 0; i < startDayIndex; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("calendar-day", "inactive");
            DOMElements.calendarGridEl.appendChild(emptyDay);
        }

        // Tambahkan hari-hari dalam sebulan
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            dayElement.textContent = day;

            const currentDate = new Date(year, month, day);
            const currentDayDateString = getLocalDateString(currentDate);

            // Tandai 'hari ini'
            if (getLocalDateString(currentDate) === getLocalDateString(today)) {
                const dotIndicator = document.createElement("span");
                dotIndicator.classList.add("today-dot-indicator");
                dayElement.appendChild(dotIndicator);
                dayElement.classList.add("today-highlight");
            }

            // Tandai hari dengan jadwal
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

    /**
     * Merender jadwal untuk tanggal yang diberikan di bagian "Today Schedule".
     * Juga memperbarui visibilitas tombol delete dan edit di dropdown jadwal hari ini.
     * @param {Date} date Tanggal untuk merender jadwal.
     */
    const renderTodaySchedule = (date) => {
        if (!DOMElements.todayScheduleList) return;
        DOMElements.todayScheduleList.innerHTML = "";
        const targetDateString = getLocalDateString(date);
        schedules = getStorage("schedules"); // Muat ulang jadwal dari localStorage untuk data terbaru
        const relevantSchedules = schedules.filter(
            (s) =>
                s.date &&
                getLocalDateString(new Date(s.date)) === targetDateString
        );

        if (relevantSchedules.length === 0) {
            DOMElements.todayScheduleList.innerHTML =
                '<p class="empty-list-message" style="text-align: center; color: var(--text-light);">No schedules for today.</p>';
            updateDeleteSelectedTodayScheduleButtonVisibility(); // Pastikan tombol delete tersembunyi
            updateEditTodayScheduleButtonVisibility(); // Pastikan tombol edit tersembunyi
            return;
        }

        relevantSchedules.forEach((schedule) => {
            const scheduleItem = document.createElement("div");
            scheduleItem.classList.add("schedule-item");
            scheduleItem.dataset.scheduleId = schedule.id;
            scheduleItem.innerHTML = `
                <div class="schedule-item-indicator ${schedule.statusColor || "blue"
                }"></div>
                <div class="schedule-item-content">
                    <h4>${schedule.title}</h4>
                    <p>${schedule.description || schedule.desc || ""}</p>
                    <div class="schedule-item-time">
                        <i class='bx bx-time'></i>
                        ${schedule.startTime ||
                (schedule.time
                    ? schedule.time.split(" - ")[0]
                    : "undefined")
                } - ${schedule.endTime ||
                (schedule.time ? schedule.time.split(" - ")[1] : "undefined")
                }
                    </div>
                </div>
                <input type="checkbox" class="schedule-select-checkbox" data-id="${schedule.id
                }" aria-label="Select schedule for deletion" />
            `;
            // Tidak ada avatar di schedule_style.css, jadi tidak termasuk dalam renderTodaySchedule
            // <div class="avatar-group">
            //     ${(Array.isArray(schedule.avatars) ? schedule.avatars : [])
            //         .map((avatar) => `<img src="https://randomuser.me/api/portraits/${avatar}.jpg" alt="User Avatar">`).join("")}
            // </div>

            DOMElements.todayScheduleList.appendChild(scheduleItem);
        });
        updateDeleteSelectedTodayScheduleButtonVisibility(); // Perbarui visibilitas tombol delete setelah merender
        updateEditTodayScheduleButtonVisibility(); // Perbarui visibilitas tombol edit setelah merender
    };

    // =====================================================================
    // --- 5. Event Handler ---
    // =====================================================================

    /**
     * Memperbarui visibilitas tombol "Hapus jadwal terpilih" di dropdown jadwal hari ini.
     * Tombol ini hanya akan terlihat jika ada setidaknya satu checkbox jadwal yang dicentang.
     */
    const updateDeleteSelectedTodayScheduleButtonVisibility = () => {
        if (!DOMElements.deleteSelectedTodayScheduleBtn) {
            console.warn(
                "WARNING: DOMElements.deleteSelectedTodayScheduleBtn was not found."
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
            "DEBUG: The visibility of the ‘Clear selected schedules’ button is updated:",
            DOMElements.deleteSelectedTodayScheduleBtn.style.display
        );
    };

    /**
     * Memperbarui visibilitas tombol "Edit jadwal hari ini" di dropdown jadwal hari ini.
     * Tombol ini akan terlihat jika ada jadwal yang dirender untuk hari ini.
     */
    function updateEditTodayScheduleButtonVisibility() {
        if (!DOMElements.editTodayScheduleBtn) {
            console.warn(
                "WARNING: DOMElements.editTodayScheduleBtn was not found."
            );
            return;
        }
        const todayDateString = getLocalDateString(currentCalendarDate); // Gunakan currentCalendarDate
        const hasTodaySchedule = schedules.some(
            (s) =>
                s.date && getLocalDateString(new Date(s.date)) === todayDateString
        );
        DOMElements.editTodayScheduleBtn.style.display = hasTodaySchedule
            ? "flex"
            : "none";
        console.log(
            "DEBUG: 'Edit today's schedule' button visibility updated:",
            DOMElements.editTodayScheduleBtn.style.display
        );
    }

    // =====================================================================
    // --- 6. Inisialisasi Semua Event Listener ---
    // =====================================================================

    // Sidebar dan Menu Seluler
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

    // Add close button functionality for sidebar if there is a close button
    const sidebarCloseButton = document.querySelector(".sidebar-close-button");
    if (sidebarCloseButton && DOMElements.dashboardContainer) {
        sidebarCloseButton.addEventListener("click", () => {
            DOMElements.dashboardContainer.classList.remove("sidebar-open");
        });
    }

    // Buka Modal Tambah Jadwal Utama
    if (
        DOMElements.openAddScheduleModalButton &&
        DOMElements.addScheduleModal
    ) {
        DOMElements.openAddScheduleModalButton.addEventListener(
            "click",
            () => {
                resetForm();
                DOMElements.addScheduleModal.style.display = "flex";
            }
        );
    }

    // Tutup Modal Tambah/Edit Jadwal
    if (
        DOMElements.closeAddScheduleModalButton &&
        DOMElements.addScheduleModal
    ) {
        DOMElements.closeAddScheduleModalButton.addEventListener(
            "click",
            () => {
                DOMElements.addScheduleModal.style.display = "none";
                resetForm(); // Reset form saat modal ditutup
            }
        );
    }

    // Submit Form Tambah/Edit Jadwal
    if (DOMElements.scheduleForm) {
        DOMElements.scheduleForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = DOMElements.scheduleIdInput.value;
            const title = DOMElements.titleInput.value.trim();
            const description = DOMElements.descriptionInput.value.trim();
            const date = DOMElements.dateInputHidden.value;
            const startTime = DOMElements.startTimeInputHidden.value;
            const endTime = DOMElements.endTimeInputHidden.value;
            const statusColor = DOMElements.statusColorSelect.value;

            if (!title || !date || !startTime || !endTime || !statusColor) {
                alert("Please complete all fields.");
                return;
            }

            if (id && id !== "") {
                // MODE EDIT
                const scheduleIndex = schedules.findIndex(
                    (s) => s.id === parseInt(id)
                );
                if (scheduleIndex > -1) {
                    schedules[scheduleIndex] = {
                        ...schedules[scheduleIndex], // Pertahankan properti lain
                        title,
                        description,
                        date,
                        startTime,
                        endTime,
                        statusColor,
                    };
                    setStorage("schedules", schedules);
                    alert("Schedule updated successfully!");
                } else {
                    console.warn("Schedule ID not found to update.");
                    alert("Error: Schedule not found to update.");
                }
            } else {
                // MODE TAMBAH
                const newSchedule = {
                    id: getNextId(schedules),
                    title,
                    description,
                    date,
                    startTime,
                    endTime,
                    statusColor,
                };
                schedules.push(newSchedule);
                setStorage("schedules", schedules);
                alert("Schedule added successfully!");
            }

            renderSchedules(); // Render ulang daftar jadwal utama
            DOMElements.addScheduleModal.style.display = "none"; // Sembunyikan modal
            resetForm(); // Reset form
        });
    }

    // Batalkan Edit (dari modal)
    if (DOMElements.cancelEditButton) {
        DOMElements.cancelEditButton.addEventListener("click", () => {
            resetForm();
            DOMElements.addScheduleModal.style.display = "none";
        });
    }

    // Delegasi Event untuk Tombol Edit dan Hapus pada Daftar Jadwal Utama
    if (DOMElements.scheduleListEl) {
        DOMElements.scheduleListEl.addEventListener("click", (e) => {
            const editButton = e.target.closest(".edit-schedule-btn");
            const deleteButton = e.target.closest(".delete-schedule-btn");

            if (editButton) {
                const idToEdit = parseInt(editButton.dataset.id);
                const scheduleToEdit = schedules.find((s) => s.id === idToEdit);
                if (scheduleToEdit) {
                    updateFormMode(true);
                    DOMElements.scheduleIdInput.value = scheduleToEdit.id;
                    DOMElements.titleInput.value = scheduleToEdit.title;
                    DOMElements.descriptionInput.value = scheduleToEdit.description || "";
                    DOMElements.dateInputHidden.value = scheduleToEdit.date;
                    DOMElements.startTimeInputHidden.value =
                        scheduleToEdit.startTime;
                    DOMElements.endTimeInputHidden.value = scheduleToEdit.endTime;
                    DOMElements.statusColorSelect.value =
                        scheduleToEdit.statusColor || "blue";

                    // Trigger change events untuk memperbarui tampilan input
                    DOMElements.dateInputHidden.dispatchEvent(new Event("change"));
                    DOMElements.startTimeInputHidden.dispatchEvent(
                        new Event("change")
                    );
                    DOMElements.endTimeInputHidden.dispatchEvent(
                        new Event("change")
                    );

                    DOMElements.addScheduleModal.style.display = "flex";
                }
            } else if (deleteButton) {
                const idToDelete = parseInt(deleteButton.dataset.id);
                if (confirm("Are you sure you want to delete this schedule?")) {
                    schedules = schedules.filter((s) => s.id !== idToDelete);
                    setStorage("schedules", schedules);
                    renderSchedules();
                    alert("Schedule deleted successfully!");
                }
            }
        });
    }

    // Navigasi Kalender (Bulan Sebelumnya/Berikutnya)
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

    // =====================================================================
    // --- 7. Fungsionalitas Menu Dropdown Jadwal Hari Ini ---
    // =====================================================================

    // Toggle visibilitas menu dropdown "Today Schedule"
    if (
        DOMElements.todayScheduleMenuButton &&
        DOMElements.todayScheduleDropdown
    ) {
        DOMElements.todayScheduleMenuButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent event bubbling to document click listener
            const dropdown = DOMElements.todayScheduleDropdown;
            if (
                dropdown.style.display === "none" ||
                dropdown.style.display === ""
            ) {
                dropdown.style.display = "flex"; // Show dropdown menu
            } else {
                dropdown.style.display = "none"; // Hide dropdown menu
            }
        });

        // Tutup dropdown jika mengklik di luar (kecuali tombol toggle itu sendiri)
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
    }

    // Tombol "Tambah jadwal baru" di dropdown
    if (DOMElements.addNewScheduleBtn) {
        DOMElements.addNewScheduleBtn.addEventListener("click", () => {
            DOMElements.todayScheduleDropdown.style.display = "none";
            // Buka modal tambah jadwal
            resetForm();
            DOMElements.addScheduleModal.style.display = "flex";
        });
    }

    // Tombol "Edit jadwal hari ini" di dropdown
    if (DOMElements.editTodayScheduleBtn) {
        DOMElements.editTodayScheduleBtn.addEventListener("click", () => {
            DOMElements.todayScheduleDropdown.style.display = "none";
            const todayDateString = getLocalDateString(currentCalendarDate);
            const todaySchedules = schedules.filter(
                (s) =>
                    s.date &&
                    getLocalDateString(new Date(s.date)) === todayDateString
            );

            if (todaySchedules.length === 0) {
                alert("There is no schedule today for editing.");
                return;
            }
            const scheduleToEdit = todaySchedules[0]; // Ambil jadwal pertama hari ini

            // Isi modal dengan data jadwal yang akan diedit
            updateFormMode(true);
            DOMElements.scheduleIdInput.value = scheduleToEdit.id;
            DOMElements.titleInput.value = scheduleToEdit.title;
            DOMElements.dateInputHidden.value = scheduleToEdit.date;
            DOMElements.startTimeInputHidden.value = scheduleToEdit.startTime;
            DOMElements.endTimeInputHidden.value = scheduleToEdit.endTime;
            DOMElements.statusColorSelect.value =
                scheduleToEdit.statusColor || "blue";

            DOMElements.dateInputHidden.dispatchEvent(new Event("change"));
            DOMElements.startTimeInputHidden.dispatchEvent(new Event("change"));
            DOMElements.endTimeInputHidden.dispatchEvent(new Event("change"));

            DOMElements.addScheduleModal.style.display = "flex";
        });
    }

    // Tombol "Hapus jadwal terpilih" di dropdown
    if (DOMElements.deleteSelectedTodayScheduleBtn) {
        DOMElements.deleteSelectedTodayScheduleBtn.style.display = "none"; // Sembunyikan secara default
        DOMElements.deleteSelectedTodayScheduleBtn.addEventListener(
            "click",
            () => {
                DOMElements.todayScheduleDropdown.style.display = "none";
                const checkboxes = DOMElements.todayScheduleList.querySelectorAll(
                    ".schedule-select-checkbox:checked"
                );
                const idsToDelete = Array.from(checkboxes).map((cb) =>
                    parseInt(cb.dataset.id)
                );

                if (idsToDelete.length === 0) {
                    alert(
                        "Please check the schedules you want to delete first."
                    );
                    return;
                }
                if (
                    confirm(`Sure you want to delete ${idsToDelete.length} schedule?`)
                ) {
                    schedules = schedules.filter(
                        (s) => !idsToDelete.includes(s.id)
                    );
                    setStorage("schedules", schedules);
                    renderSchedules(); // Render ulang daftar jadwal utama
                    renderTodaySchedule(currentCalendarDate); // Render ulang jadwal hari ini
                    alert("Schedule successfully deleted.");
                }
            }
        );
    }

    // Tombol "Refresh jadwal" di dropdown
    if (DOMElements.refreshScheduleBtn) {
        DOMElements.refreshScheduleBtn.addEventListener("click", () => {
            DOMElements.todayScheduleDropdown.style.display = "none";
            schedules = getStorage("schedules"); // Muat ulang data jadwal dari localStorage
            renderSchedules(); // Render ulang daftar jadwal utama
            renderTodaySchedule(currentCalendarDate); // Render ulang jadwal hari ini
            alert("The schedule has been updated.");
        });
    }

    // Event listener untuk checkbox di todayScheduleList untuk mengontrol visibilitas tombol delete
    if (DOMElements.todayScheduleList) {
        DOMElements.todayScheduleList.addEventListener("change", (e) => {
            if (e.target.classList.contains("schedule-select-checkbox")) {
                updateDeleteSelectedTodayScheduleButtonVisibility();
            }
        });
    }

    // Klik event pada item jadwal (bukan checkbox) untuk menavigasi ke bagian tugas
    // Ini mungkin tidak relevan di halaman `schedule.html` jika tidak ada bagian tasks.
    // Jika ada, pastikan selector `.tasks-section` benar.
    if (DOMElements.todayScheduleList) {
        DOMElements.todayScheduleList.addEventListener("click", (e) => {
            if (e.target.classList.contains("schedule-select-checkbox")) {
                return; // Jangan scroll jika klik pada checkbox
            }
            const scheduleItem = e.target.closest(".schedule-item");
            if (scheduleItem) {
                const tasksSection = document.querySelector(".tasks-section");
                if (tasksSection) {
                    tasksSection.scrollIntoView({ behavior: "smooth" });
                    tasksSection.classList.add("highlight-tasks"); // Opsional: efek highlight
                    setTimeout(() => {
                        tasksSection.classList.remove("highlight-tasks");
                    }, 2000);
                }
            }
        });
    }

    // =====================================================================
    // --- 8. Inisialisasi Akhir Aplikasi (Panggilan Awal) ---
    // =====================================================================

    // Setup picker input untuk tanggal dan waktu di modal jadwal
    setupPickerInput(DOMElements.dateDisplay, DOMElements.dateInputHidden);
    setupPickerInput(
        DOMElements.startTimeDisplay,
        DOMElements.startTimeInputHidden
    );
    setupPickerInput(
        DOMElements.endTimeDisplay,
        DOMElements.endTimeInputHidden
    );

    // Panggil fungsi render awal saat DOM siap
    renderSchedules(); // Ini akan memuat dan merender jadwal utama
    renderCalendar(currentCalendarDate); // Ini akan merender kalender
    // renderTodaySchedule akan dipanggil oleh renderSchedules, dan akan mengatur visibilitas tombol dropdown
    // Panggilan eksplisit di sini juga memastikan itu berjalan pertama kali.
    renderTodaySchedule(currentCalendarDate);

    // Pastikan status awal sidebar seluler (jika lebar layar <= 768px, sidebar tertutup)
    if (DOMElements.dashboardContainer && window.innerWidth <= 768) {
        DOMElements.dashboardContainer.classList.remove("sidebar-open");
    }
});

// Toggle description textarea visibility
const toggleDescriptionBtn = document.getElementById("toggleDescriptionBtn");
const descriptionContainer = document.getElementById("descriptionContainer");

if (toggleDescriptionBtn && descriptionContainer) {
    toggleDescriptionBtn.addEventListener("click", () => {
        if (descriptionContainer.style.display === "none") {
            descriptionContainer.style.display = "block";
        } else {
            descriptionContainer.style.display = "none";
        }
    });
}