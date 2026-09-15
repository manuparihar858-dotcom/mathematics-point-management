/* =========================================================
   DEMO NOTIFICATION
   ========================================================= */

.demo-notification {
    position: fixed;

    right: 25px;
    bottom: 25px;

    width: 330px;

    display: flex;
    align-items: center;

    gap: 12px;

    padding: 15px;

    background: #ffffff;

    border: 1px solid #e3e8ef;

    border-radius: 13px;

    box-shadow: 0 15px 40px rgba(7, 17, 31, 0.15);

    z-index: 9999;

    animation: notificationIn 0.3s ease;
}

.notification-symbol {
    width: 32px;
    height: 32px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 9px;

    background: #e7f7ef;

    color: #16845b;

    font-weight: 700;
}

.demo-notification strong {
    display: block;

    font-size: 11px;
}

.demo-notification span {
    display: block;

    margin-top: 3px;

    color: #687386;

    font-size: 10px;
}

.notification-close {
    margin-left: auto;

    border: 0;

    background: transparent;

    color: #687386;

    font-size: 20px;

    cursor: pointer;
}

@keyframes notificationIn {

    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}

.selected-row {
    background: #f3f7ff !important;
}

@media (max-width: 480px) {

    .demo-notification {
        left: 12px;
        right: 12px;
        bottom: 12px;
        width: auto;
    }

}
