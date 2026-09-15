document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENTS
    ========================= */

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("page-title");
    const currentDate = document.getElementById("current-date");

    /* =========================
       DATE
    ========================= */

    function updateDate() {
        if (!currentDate) return;

        const today = new Date();

        const options = {
            day: "numeric",
            month: "long",
            year: "numeric"
        };

        currentDate.textContent = today.toLocaleDateString(
            "en-IN",
            options
        );
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

        const selectedPage = document.getElementById(
            pageName + "-page"
        );

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

        const selectedNav = document.querySelector(
            '.nav-item[data-page="' + pageName + '"]'
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

            const pageName =
                item.getAttribute("data-page");

            showPage(pageName);
        });

    });

    /* =========================
       VIEW ALL BUTTONS
    ========================= */

    const pageButtons =
        document.querySelectorAll("[data-page]");

    pageButtons.forEach(function (button) {

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
       SEARCH STUDENTS
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

                const studentRows =
                    document.querySelectorAll(
                        "#students-page tbody tr"
                    );

                studentRows.forEach(function (row) {

                    const rowText =
                        row.textContent.toLowerCase();

                    if (
                        rowText.includes(searchTerm)
                    ) {
                        row.style.display = "";
                    } else {
                        row.style.display = "none";
                    }

                });

            }
        );
    }

    /* =========================
       TABLE ROW SELECTION
    ========================= */

    const allRows =
        document.querySelectorAll("tbody tr");

    allRows.forEach(function (row) {

        row.addEventListener("click", function () {

            const tableRows =
                row.parentElement.querySelectorAll("tr");

            tableRows.forEach(function (item) {
                item.classList.remove("selected-row");
            });

            row.classList.add("selected-row");

        });

    });

    /* =========================
       NOTIFICATION BUTTON
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
       NOTIFICATION FUNCTION
    ========================= */

    function showNotification(title, message) {

        const existing =
            document.querySelector(".demo-notification");

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

            <button
                class="notification-close"
                aria-label="Close notification"
            >
                ×
            </button>
        `;

        document.body.appendChild(notification);

        const closeButton =
            notification.querySelector(
                ".notification-close"
            );

        closeButton.addEventListener(
            "click",
            function () {

                notification.remove();

            }
        );

        setTimeout(function () {

            if (notification) {
                notification.remove();
            }

        }, 4000);
    }

    /* =========================
       KEYBOARD SHORTCUT
       Press "/" to search
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

                if (searchInput) {
                    showPage("students");
                    searchInput.focus();
                }

            }

            if (event.key === "Escape") {

                const notification =
                    document.querySelector(
                        ".demo-notification"
                    );

                if (notification) {
                    notification.remove();
                }

            }

        }
    );

    /* =========================
       ADD ENQUIRY DEMO
    ========================= */

    const enquiryButtons =
        document.querySelectorAll(
            "#enquiries-page .primary-button"
        );

    enquiryButtons.forEach(function (button) {

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

    /* =========================
       ATTENDANCE DEMO
    ========================= */

    const attendanceButtons =
        document.querySelectorAll(
            "#attendance-page .primary-button"
        );

    attendanceButtons.forEach(function (button) {

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
       INITIAL PAGE
    ========================= */

    showPage("dashboard");

});
