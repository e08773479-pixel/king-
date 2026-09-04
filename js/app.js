/* ========================================
   MALEK - APP CORE
   ======================================== */

"use strict";

const MalekApp = (() => {

    const STORAGE_KEYS = {
        theme: "malek_theme",
        language: "malek_language"
    };

    /* ======================================
       الأدوات العامة
       ====================================== */

    function $(selector, parent = document) {
        return parent.querySelector(selector);
    }

    function $$(selector, parent = document) {
        return [...parent.querySelectorAll(selector)];
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    /* ======================================
       المظهر
       ====================================== */

    function getSavedTheme() {
        return localStorage.getItem(
            STORAGE_KEYS.theme
        );
    }

    function getSystemTheme() {
        return window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
            ? "dark"
            : "light";
    }

    function applyTheme(theme) {

        const finalTheme =
            theme === "dark"
                ? "dark"
                : "light";

        document.documentElement
            .setAttribute(
                "data-theme",
                finalTheme
            );

        localStorage.setItem(
            STORAGE_KEYS.theme,
            finalTheme
        );

        updateThemeButtons(finalTheme);
    }

    function updateThemeButtons(theme) {

        const buttons = $$(
            "#themeToggle, [data-theme-toggle]"
        );

        buttons.forEach(button => {

            button.textContent =
                theme === "dark"
                    ? "☀️"
                    : "🌙";

            button.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "تفعيل الوضع الفاتح"
                    : "تفعيل الوضع الداكن"
            );
        });
    }

    function initializeTheme() {

        const saved =
            getSavedTheme();

        applyTheme(
            saved || getSystemTheme()
        );

        document.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "#themeToggle, [data-theme-toggle]"
                    );

                if (!button) return;

                const current =
                    document.documentElement
                        .getAttribute(
                            "data-theme"
                        );

                applyTheme(
                    current === "dark"
                        ? "light"
                        : "dark"
                );
            }
        );
    }

    /* ======================================
       اللغة
       ====================================== */

    function getLanguage() {

        return localStorage.getItem(
            STORAGE_KEYS.language
        ) || "ar";
    }

    function setLanguage(language) {

        const allowed = [
            "ar",
            "en"
        ];

        if (!allowed.includes(language)) {
            return;
        }

        localStorage.setItem(
            STORAGE_KEYS.language,
            language
        );

        document.documentElement
            .setAttribute(
                "lang",
                language
            );

        document.documentElement
            .setAttribute(
                "dir",
                language === "ar"
                    ? "rtl"
                    : "ltr"
            );
    }

    /* ======================================
       التنبيهات
       ====================================== */

    function toast(
        message,
        type = "info",
        duration = 3000
    ) {

        let container =
            $("#malekToastContainer");

        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.id =
                "malekToastContainer";

            container.style.position =
                "fixed";

            container.style.bottom =
                "25px";

            container.style.right =
                "25px";

            container.style.zIndex =
                "2000";

            container.style.display =
                "flex";

            container.style.flexDirection =
                "column";

            container.style.gap =
                "10px";

            document.body.appendChild(
                container
            );
        }


        const item =
            document.createElement(
                "div"
            );

        item.textContent =
            message;

        item.dataset.type =
            type;

        item.style.padding =
            "12px 16px";

        item.style.borderRadius =
            "12px";

        item.style.background =
            "var(--surface)";

        item.style.color =
            "var(--text)";

        item.style.border =
            "1px solid var(--border)";

        item.style.boxShadow =
            "var(--shadow-md)";

        item.style.maxWidth =
            "320px";

        item.style.fontSize =
            "14px";

        container.appendChild(
            item
        );


        setTimeout(() => {

            item.style.opacity = "0";
            item.style.transform =
                "translateY(8px)";
            item.style.transition =
                "0.2s ease";

            setTimeout(
                () => item.remove(),
                220
            );

        }, duration);
    }

    /* ======================================
       تأكيد
       ====================================== */

    function confirmAction(
        message
    ) {

        return window.confirm(
            message
        );
    }

    /* ======================================
       الطلبات
       ====================================== */

    async function request(
        url,
        options = {}
    ) {

        const config = {
            credentials: "include",
            ...options,
            headers: {
                ...(options.body instanceof FormData
                    ? {}
                    : {
                        "Content-Type":
                            "application/json"
                    }),
                ...(options.headers || {})
            }
        };


        const response =
            await fetch(
                url,
                config
            );


        let data = null;

        const contentType =
            response.headers.get(
                "content-type"
            ) || "";


        if (
            contentType.includes(
                "application/json"
            )
        ) {

            data =
                await response.json();

        } else {

            data =
                await response.text();
        }


        if (!response.ok) {

            const message =
                typeof data === "object"
                    ? data?.message
                    : data;

            throw new Error(
                message ||
                `Request failed: ${response.status}`
            );
        }


        return data;
    }

    /* ======================================
       تنسيق البيانات
       ====================================== */

    function formatNumber(
        number
    ) {

        const value =
            Number(number);

        if (Number.isNaN(value)) {
            return "0";
        }

        return new Intl.NumberFormat(
            "ar-EG"
        ).format(value);
    }


    function formatDate(
        date
    ) {

        if (!date) return "";

        const parsed =
            new Date(date);

        if (
            Number.isNaN(
                parsed.getTime()
            )
        ) {
            return "";
        }

        return new Intl.DateTimeFormat(
            "ar-EG",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        ).format(parsed);
    }


    function formatTime(
        date
    ) {

        if (!date) return "";

        const parsed =
            new Date(date);

        if (
            Number.isNaN(
                parsed.getTime()
            )
        ) {
            return "";
        }

        return new Intl.DateTimeFormat(
            "ar-EG",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        ).format(parsed);
    }


    /* ======================================
       الصور
       ====================================== */

    function getInitial(
        name
    ) {

        return (
            String(name || "م")
                .trim()
                .charAt(0)
                .toUpperCase() || "م"
        );
    }


    function avatarMarkup(
        user,
        className = ""
    ) {

        const name =
            user?.name ||
            "مستخدم";

        if (user?.avatar_url) {

            return `
                <img
                    class="${escapeHTML(className)}"
                    src="${escapeHTML(
                        user.avatar_url
                    )}"
                    alt="${escapeHTML(
                        name
                    )}"
                    loading="lazy"
                >
            `;
        }

        return `
            <span
                class="${escapeHTML(className)}"
                aria-hidden="true"
            >
                ${escapeHTML(
                    getInitial(name)
                )}
            </span>
        `;
    }


    /* ======================================
       حماية الروابط
       ====================================== */

    function safeURL(
        url
    ) {

        if (!url) {
            return "";
        }

        try {

            const parsed =
                new URL(
                    url,
                    window.location.origin
                );

            const allowed =
                [
                    "http:",
                    "https:"
                ];

            if (
                !allowed.includes(
                    parsed.protocol
                )
            ) {
                return "";
            }

            return parsed.href;

        } catch {

            return "";
        }
    }


    /* ======================================
       تشغيل التطبيق
       ====================================== */

    function initialize() {

        initializeTheme();

        setLanguage(
            getLanguage()
        );

        document.body.classList.add(
            "malek-ready"
        );
    }


    return {

        $,
        $$,

        escapeHTML,

        applyTheme,
        getSavedTheme,

        getLanguage,
        setLanguage,

        toast,
        confirmAction,

        request,

        formatNumber,
        formatDate,
        formatTime,

        getInitial,
        avatarMarkup,

        safeURL,

        initialize
    };

})();


/* تشغيل النظام الأساسي */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        MalekApp.initialize();
    }
);
