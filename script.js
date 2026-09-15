document.addEventListener("DOMContentLoaded", function () {

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("page-title");
    const currentDate = document.getElementById("current-date");

    // Update date
    function updateDate() {
        if (!currentDate) return;

        const today = new Date();

        currentDate.textContent = today.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    updateDate();

    // Page navigation
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

    // Sidebar navigation
    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const pageName =
                item.getAttribute("data-page");

            showPage(pageName);
        });

    });

    // View all buttons
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

    // Notification
    const notificationButton =
        document.querySelector(".icon-button");

    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            showNotification(
                "Notifications",
                "You have 5 follow-ups requiring attention."
            );

        });
    }

    // Add student
    const addStudentButton =
        document.getElementById("add-student-btn");

    if (addStudentButton) {

        addStudentButton.addEventListener("click", function () {

            showNotification(
                "Demo Mode",
                "Add Student form will open here."
            );

        });
    }

    // Student search
    const searchInput =
        document.getElementById("student-search");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchTerm =
                searchInput.value.toLowerCase().trim();

            const rows =
                document.querySelectorAll(
                    "#students-page tbody tr"
                );

            rows.forEach(function (row) {

                const rowText =
                    row.textContent.toLowerCase();

                row.style.display =
                    rowText.includes(searchTerm)
                        ? ""
                        : "none";
            });

        });
    }

    // Table row selection
    document.querySelectorAll("tbody tr").forEach(function (row) {

        row.addEventListener("click", function () {

            row.parentElement
                .querySelectorAll("tr")
                .forEach(function (item) {
                    item.classList.remove("selected-row");
                });

            row.classList.add("selected-row");
        });

    });

    // Add enquiry buttons
    document.querySelectorAll(
        "#enquiries-page .primary-button"
    ).forEach(function (button) {

        button.addEventListener("click", function () {

            showNotification(
                "Demo Mode",
                "Add Enquiry form will open here."
            );

        });

    });

    // Attendance buttons
    document.querySelectorAll(
        "#attendance-page .primary-button"
    ).forEach(function (button) {

        button.addEventListener("click", function () {

            showNotification(
                "Demo Mode",
                "Attendance marking will open here."
            );

        });

    });

    // Notification popup
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
            >×</button>
        `;

        document.body.appendChild(notification);

        const closeButton =
            notification.querySelector(".notification-close");

        if (closeButton) {

            closeButton.addEventListener("click", function () {
                notification.remove();
            });

        }

        setTimeout(function () {

            if (document.body.contains(notification)) {
                notification.remove();
            }

        }, 4000);
    }

    // Keyboard shortcut: /
    document.addEventListener("keydown", function (event) {

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

        // Escape closes notification
        if (event.key === "Escape") {

            const notification =
                document.querySelector(".demo-notification");

            if (notification) {
                notification.remove();
            }
        }

    });

    // Start on dashboard
    showPage("dashboard");

});
