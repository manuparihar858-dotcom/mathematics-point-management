document.addEventListener("DOMContentLoaded", function () {

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("page-title");
    const currentDate = document.getElementById("current-date");

    /* =========================
       STUDENT DATA
    ========================= */

    const students = {

        "Aarav Sharma": {
            initials: "AS",
            course: "Class 12 · Evening Batch",
            className: "12th",
            batch: "Evening",
            status: "Active",
            attendance: "94%",
            totalFee: "₹18,000",
            paid: "₹18,000",
            pending: "₹0",
            enrollment: "15 Sep 2026",
            phone: "+91 98XXXXXX21",
            parent: "Rajesh Sharma",
            parentPhone: "+91 97XXXXXX42",
            note: "Regular student. Strong performance in algebra and calculus. Needs additional practice in geometry."
        },

        "Riya Jain": {
            initials: "RJ",
            course: "Class 11 · Evening Batch",
            className: "11th",
            batch: "Evening",
            status: "Active",
            attendance: "89%",
            totalFee: "₹18,000",
            paid: "₹13,500",
            pending: "₹4,500",
            enrollment: "02 Aug 2026",
            phone: "+91 99XXXXXX34",
            parent: "Sanjay Jain",
            parentPhone: "+91 98XXXXXX17",
            note: "Good classroom participation. Fee follow-up required. Performing well in algebra."
        },

        "Aditya Verma": {
            initials: "AV",
            course: "JEE · Morning Batch",
            className: "JEE",
            batch: "Morning",
            status: "Active",
            attendance: "96%",
            totalFee: "₹24,000",
            paid: "₹24,000",
            pending: "₹0",
            enrollment: "10 Jul 2026",
            phone: "+91 97XXXXXX52",
            parent: "Amit Verma",
            parentPhone: "+91 96XXXXXX83",
            note: "Excellent attendance and strong problem-solving ability. Preparing for JEE Mathematics."
        },

        "Ananya Gupta": {
            initials: "AG",
            course: "Class 10 · Afternoon Batch",
            className: "10th",
            batch: "Afternoon",
            status: "Active",
            attendance: "91%",
            totalFee: "₹15,000",
            paid: "₹10,000",
            pending: "₹5,000",
            enrollment: "22 Aug 2026",
            phone: "+91 98XXXXXX65",
            parent: "Rakesh Gupta",
            parentPhone: "+91 95XXXXXX41",
            note: "Consistent performance. Needs additional practice before upcoming examinations."
        }

    };

    /* =========================
       DATE
    ========================= */

    function updateDate() {

        if (!currentDate) return;

        const today = new Date();

        currentDate.textContent =
            today.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
    }

    updateDate();

    /* =========================
       PAGE NAVIGATION
    ========================= */

    function showPage(pageName) {

        pages.forEach(function (page) {
            page.classList.remove("active");
        });

        navItems.forEach(function (item) {
            item.classList.remove("active");
        });

        const selectedPage =
            document.getElementById(pageName + "-page");

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

        const selectedNav =
            document.querySelector(
                '.nav-item[data-page="' +
                pageName +
                '"]'
            );

        if (selectedNav) {
            selectedNav.classList.add("active");
        }

        const titles = {
            dashboard: "Dashboard",
            students: "Students",
            fees: "Fee Management",
            enquiries: "Enquiries",
            attendance: "Attendance"
        };

        if (pageTitle) {
            pageTitle.textContent =
                titles[pageName] || "Dashboard";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            showPage(
                item.getAttribute("data-page")
            );

        });

    });

    document.querySelectorAll("[data-page]").forEach(function (button) {

        if (button.classList.contains("nav-item")) {
            return;
        }

        button.addEventListener("click", function () {

            const pageName =
                button.getAttribute("data-page");

            if (pageName) {
                showPage(pageName);
            }

        });

    });

    /* =========================
       STUDENT PROFILE
    ========================= */

    const modal =
        document.getElementById("student-modal");

    const modalOverlay =
        document.getElementById("student-modal-overlay");

    const closeModalButton =
        document.getElementById("student-modal-close");

    function openStudentProfile(name) {

        const student = students[name];

        if (!student || !modal) {
            return;
        }

        document.getElementById("profile-name")
            .textContent = name;

        document.getElementById("profile-avatar")
            .textContent = student.initials;

        document.getElementById("profile-course")
            .textContent = student.course;

        document.getElementById("profile-status")
            .textContent = student.status;

        document.getElementById("profile-attendance")
            .textContent = student.attendance;

        document.getElementById("profile-total-fee")
            .textContent = student.totalFee;

        document.getElementById("profile-paid")
            .textContent = student.paid;

        document.getElementById("profile-pending")
            .textContent = student.pending;

        document.getElementById("profile-class")
            .textContent = student.className;

        document.getElementById("profile-batch")
            .textContent = student.batch;

        document.getElementById("profile-enrollment")
            .textContent = student.enrollment;

        document.getElementById("profile-phone")
            .textContent = student.phone;

        document.getElementById("profile-parent")
            .textContent = student.parent;

        document.getElementById("profile-parent-phone")
            .textContent = student.parentPhone;

        document.querySelector(".profile-note")
            .textContent = student.note;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        modal.setAttribute("data-student", name);
    }

    function closeStudentProfile() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "";
    }

    /* =========================
       CLICK STUDENT ROW
    ========================= */

    document.querySelectorAll(
        "#students-page tbody tr"
    ).forEach(function (row) {

        row.style.cursor = "pointer";

        row.addEventListener("click", function () {

            const nameCell =
                row.querySelector("td");

            if (!nameCell) return;

            const name =
                nameCell.textContent.trim();

            if (students[name]) {

                openStudentProfile(name);

            }

        });

    });

    /* =========================
       CLOSE PROFILE
    ========================= */

    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeStudentProfile
        );

    }

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeStudentProfile
        );

    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeStudentProfile();
            }

        }
    );

    /* =========================
       NOTIFICATION
    ========================= */

    const notificationButton =
        document.querySelector(".icon-button");

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                showNotification(
                    "Notifications",
                    "You have 5 follow-ups requiring attention."
                );

            }
        );

    }

    /* =========================
       ADD STUDENT
    ========================= */

    const addStudentButton =
        document.getElementById("add-student-btn");

    if (addStudentButton) {

        addStudentButton.addEventListener(
            "click",
            function () {

                showNotification(
                    "Demo Mode",
                    "Add Student form will open here."
                );

            }
        );

    }

    /* =========================
       SEARCH
    ========================= */

    const searchInput =
        document.getElementById("student-search");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchTerm =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                document.querySelectorAll(
                    "#students-page tbody tr"
                ).forEach(function (row) {

                    row.style.display =
                        row.textContent
                            .toLowerCase()
                            .includes(searchTerm)
                            ? ""
                            : "none";

                });

            }
        );

    }

    /* =========================
       DEMO BUTTONS
    ========================= */

    document.querySelectorAll(
        "#enquiries-page .primary-button"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                showNotification(
                    "Demo Mode",
                    "Add Enquiry form will open here."
                );

            }
        );

    });

    document.querySelectorAll(
        "#attendance-page .primary-button"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                showNotification(
                    "Demo Mode",
                    "Attendance marking will open here."
                );

            }
        );

    });

    /* =========================
       PROFILE ACTIONS
    ========================= */

    const editStudentButton =
        document.getElementById("edit-student-btn");

    if (editStudentButton) {

        editStudentButton.addEventListener(
            "click",
            function () {

                showNotification(
                    "Demo Mode",
                    "Student editing will be available here."
                );

            }
        );

    }

    const profileFeeButton =
        document.getElementById("profile-fee-btn");

    if (profileFeeButton) {

        profileFeeButton.addEventListener(
            "click",
            function () {

                showNotification(
                    "Demo Mode",
                    "Payment recording will be available here."
                );

            }
        );

    }

    /* =========================
       NOTIFICATION FUNCTION
    ========================= */

    function showNotification(title, message) {

        const existing =
            document.querySelector(
                ".demo-notification"
            );

        if (existing) {
            existing.remove();
        }

        const notification =
            document.createElement("div");

        notification.className =
            "demo-notification";

        notification.innerHTML = `
            <div class="notification-symbol">✓</div>

            <div>
                <strong>${title}</strong>
                <span>${message}</span>
            </div>

            <button class="notification-close">
                ×
            </button>
        `;

        document.body.appendChild(notification);

        notification
            .querySelector(".notification-close")
            .addEventListener(
                "click",
                function () {
                    notification.remove();
                }
            );

        setTimeout(function () {

            if (document.body.contains(notification)) {
                notification.remove();
            }

        }, 4000);
    }

    /* =========================
       KEYBOARD SEARCH
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "/" &&
                document.activeElement.tagName !== "INPUT" &&
                document.activeElement.tagName !== "TEXTAREA"
            ) {

                event.preventDefault();

                showPage("students");

                if (searchInput) {
                    searchInput.focus();
                }

            }

        }
    );

    /* =========================
       START DASHBOARD
    ========================= */

    showPage("dashboard");

});
