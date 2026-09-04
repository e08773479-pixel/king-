"use strict";

/*
 * ========================================
 * MALEK - AUTHENTICATION
 * ========================================
 *
 * ملاحظة:
 * هذا الملف مجهز للتعامل مع API حقيقي.
 * لن يتم اعتبار تسجيل الدخول أو التسجيل
 * ناجحًا إلا إذا رجع السيرفر باستجابة ناجحة.
 */

const MalekAuth = (() => {

    const API = {
        login: "/api/auth/login",
        register: "/api/auth/register",
        forgotPassword: "/api/auth/forgot-password"
    };

    /* ======================================
       أدوات عامة
       ====================================== */

    function getElement(id) {
        return document.getElementById(id);
    }

    function getErrorElement(fieldId) {
        return document.querySelector(
            `[data-error-for="${fieldId}"]`
        );
    }

    function showFieldError(fieldId, message) {

        const field = getElement(fieldId);
        const error = getErrorElement(fieldId);

        if (!field) return;

        const group = field.closest(".form-group");

        if (group) {
            group.classList.add("has-error");
            group.classList.remove("has-success");
        }

        if (error) {
            error.textContent = message || "";
        }
    }

    function clearFieldError(fieldId) {

        const field = getElement(fieldId);
        const error = getErrorElement(fieldId);

        if (!field) return;

        const group = field.closest(".form-group");

        if (group) {
            group.classList.remove("has-error");
        }

        if (error) {
            error.textContent = "";
        }
    }

    function clearAllErrors(form) {

        if (!form) return;

        form.querySelectorAll(".form-error")
            .forEach(error => {
                error.textContent = "";
            });

        form.querySelectorAll(".form-group")
            .forEach(group => {
                group.classList.remove("has-error");
                group.classList.remove("has-success");
            });
    }


    /* ======================================
       رسالة الصفحة
       ====================================== */

    function showMessage(
        element,
        message,
        type = "info"
    ) {

        if (!element) return;

        element.textContent = message;

        element.className =
            `auth-message ${type}`;

        element.hidden = false;
    }

    function hideMessage(element) {

        if (!element) return;

        element.hidden = true;
        element.textContent = "";
        element.className = "auth-message";
    }


    /* ======================================
       حالة الزر
       ====================================== */

    function setButtonLoading(
        button,
        loading,
        loadingText
    ) {

        if (!button) return;

        if (loading) {

            if (!button.dataset.originalText) {
                button.dataset.originalText =
                    button.textContent;
            }

            button.disabled = true;
            button.textContent =
                loadingText || "جاري التنفيذ...";

        } else {

            button.disabled = false;

            button.textContent =
                button.dataset.originalText ||
                button.textContent;

        }
    }


    /* ======================================
       طلب API
       ====================================== */

    async function request(
        url,
        options = {}
    ) {

        const config = {
            credentials: "include",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        };

        const response =
            await fetch(url, config);

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
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {

            let message =
                "حدث خطأ أثناء الاتصال بالخادم.";

            if (
                data &&
                typeof data === "object" &&
                data.message
            ) {
                message = data.message;
            }

            throw new Error(message);
        }

        return data;
    }


    /* ======================================
       إظهار / إخفاء كلمة المرور
       ====================================== */

    function initializePasswordToggles() {

        document
            .querySelectorAll(
                "[data-password-toggle]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const inputId =
                            button.getAttribute(
                                "data-password-toggle"
                            );

                        const input =
                            getElement(inputId);

                        if (!input) return;

                        const isPassword =
                            input.type === "password";

                        input.type =
                            isPassword
                                ? "text"
                                : "password";

                        button.textContent =
                            isPassword
                                ? "🙈"
                                : "👁";

                        button.setAttribute(
                            "aria-label",
                            isPassword
                                ? "إخفاء كلمة المرور"
                                : "إظهار كلمة المرور"
                        );
                    }
                );

            });
    }


    /* ======================================
       التحقق من تسجيل الدخول
       ====================================== */

    function validateLogin() {

        const identifier =
            getElement("loginIdentifier");

        const password =
            getElement("loginPassword");

        let valid = true;

        clearFieldError(
            "loginIdentifier"
        );

        clearFieldError(
            "loginPassword"
        );


        if (
            !identifier ||
            !identifier.value.trim()
        ) {

            showFieldError(
                "loginIdentifier",
                "اكتب البريد الإلكتروني أو رقم الهاتف."
            );

            valid = false;
        }


        if (
            !password ||
            !password.value
        ) {

            showFieldError(
                "loginPassword",
                "اكتب كلمة المرور."
            );

            valid = false;

        } else if (
            password.value.length < 8
        ) {

            showFieldError(
                "loginPassword",
                "كلمة المرور يجب أن تكون 8 أحرف على الأقل."
            );

            valid = false;
        }

        return valid;
    }


    /* ======================================
       تسجيل الدخول
       ====================================== */

    async function handleLogin(
        event
    ) {

        event.preventDefault();

        const form =
            event.currentTarget;

        const message =
            getElement("loginMessage");

        const submit =
            getElement("loginSubmit");

        hideMessage(message);

        clearAllErrors(form);

        if (!validateLogin()) {
            return;
        }


        const identifier =
            getElement(
                "loginIdentifier"
            ).value.trim();

        const password =
            getElement(
                "loginPassword"
            ).value;

        const remember =
            getElement(
                "rememberMe"
            )?.checked || false;


        const payload = {
            identifier,
            password,
            remember
        };


        setButtonLoading(
            submit,
            true,
            "جاري تسجيل الدخول..."
        );


        try {

            const result =
                await request(
                    API.login,
                    {
                        method: "POST",
                        body: JSON.stringify(
                            payload
                        )
                    }
                );


            /*
             * يتم التحويل فقط إذا أكد السيرفر
             * نجاح تسجيل الدخول.
             */

            if (
                result &&
                (
                    result.success === true ||
                    result.authenticated === true
                )
            ) {

                showMessage(
                    message,
                    "تم تسجيل الدخول بنجاح.",
                    "success"
                );

                setTimeout(() => {

                    window.location.href =
                        result.redirect ||
                        "pages/home.html";

                }, 500);

                return;
            }


            throw new Error(
                result?.message ||
                "تعذر تسجيل الدخول."
            );


        } catch (error) {

            showMessage(
                message,
                error.message ||
                "تعذر الاتصال بالخادم.",
                "error"
            );

        } finally {

            setButtonLoading(
                submit,
                false
            );
        }
    }


    /* ======================================
       التحقق من التسجيل
       ====================================== */

    function validateRegister() {

        const firstName =
            getElement("firstName");

        const lastName =
            getElement("lastName");

        const email =
            getElement("registerEmail");

        const phone =
            getElement("registerPhone");

        const birthDate =
            getElement("birthDate");

        const gender =
            getElement("gender");

        const password =
            getElement("registerPassword");

        const confirmPassword =
            getElement("confirmPassword");

        const terms =
            getElement("acceptTerms");


        let valid = true;


        if (
            !firstName?.value.trim()
        ) {

            showFieldError(
                "firstName",
                "اكتب الاسم الأول."
            );

            valid = false;
        }


        if (
            !lastName?.value.trim()
        ) {

            showFieldError(
                "lastName",
                "اكتب اسم العائلة."
            );

            valid = false;
        }


        if (
            !email?.value.trim()
        ) {

            showFieldError(
                "registerEmail",
                "اكتب البريد الإلكتروني."
            );

            valid = false;

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email.value.trim())
        ) {

            showFieldError(
                "registerEmail",
                "البريد الإلكتروني غير صحيح."
            );

            valid = false;
        }


        if (
            phone?.value.trim()
        ) {

            const cleanPhone =
                phone.value
                    .replace(/\s+/g, "")
                    .replace(/-/g, "");

            if (
                !/^[+]?[0-9]{8,15}$/
                    .test(cleanPhone)
            ) {

                showFieldError(
                    "registerPhone",
                    "رقم الهاتف غير صحيح."
                );

                valid = false;
            }
        }


        if (
            !birthDate?.value
        ) {

            showFieldError(
                "birthDate",
                "اختر تاريخ الميلاد."
            );

            valid = false;
        }


        if (
            !gender?.value
        ) {

            showFieldError(
                "gender",
                "اختر الجنس."
            );

            valid = false;
        }


        if (
            !password?.value
        ) {

            showFieldError(
                "registerPassword",
                "اكتب كلمة مرور."
            );

            valid = false;

        } else if (
            password.value.length < 8
        ) {

            showFieldError(
                "registerPassword",
                "كلمة المرور يجب أن تكون 8 أحرف على الأقل."
            );

            valid = false;
        }


        if (
            !confirmPassword?.value
        ) {

            showFieldError(
                "confirmPassword",
                "أكد كلمة المرور."
            );

            valid = false;

        } else if (
            confirmPassword.value !==
            password.value
        ) {

            showFieldError(
                "confirmPassword",
                "كلمتا المرور غير متطابقتين."
            );

            valid = false;
        }


        if (
            !terms?.checked
        ) {

            showFieldError(
                "acceptTerms",
                "يجب الموافقة على الشروط."
            );

            valid = false;
        }


        return valid;
    }


    /* ======================================
       قوة كلمة المرور
       ====================================== */

    function updatePasswordStrength() {

        const password =
            getElement(
                "registerPassword"
            );

        const bar =
            getElement(
                "passwordStrengthBar"
            );

        const text =
            getElement(
                "passwordStrengthText"
            );

        if (!password || !bar || !text) {
            return;
        }


        const value =
            password.value;

        let score = 0;


        if (value.length >= 8) {
            score++;
        }

        if (/[a-z]/.test(value)) {
            score++;
        }

        if (/[A-Z]/.test(value)) {
            score++;
        }

        if (/[0-9]/.test(value)) {
            score++;
        }

        if (
            /[^A-Za-z0-9]/.test(value)
        ) {
            score++;
        }


        const widths = [
            "0%",
            "20%",
            "40%",
            "60%",
            "80%",
            "100%"
        ];


        bar.style.width =
            widths[score];


        if (!value) {

            text.textContent =
                "استخدم 8 أحرف على الأقل.";

        } else if (score <= 2) {

            text.textContent =
                "كلمة المرور ضعيفة.";

        } else if (score <= 3) {

            text.textContent =
                "كلمة المرور متوسطة.";

        } else if (score === 4) {

            text.textContent =
                "كلمة المرور جيدة.";

        } else {

            text.textContent =
                "كلمة المرور قوية.";
        }
    }


    /* ======================================
       التسجيل
       ====================================== */

    async function handleRegister(
        event
    ) {

        event.preventDefault();

        const form =
            event.currentTarget;

        const message =
            getElement(
                "registerMessage"
            );

        const submit =
            getElement(
                "registerSubmit"
            );

        hideMessage(message);

        clearAllErrors(form);


        if (!validateRegister()) {
            return;
        }


        const phone =
            getElement(
                "registerPhone"
            )?.value.trim() || "";


        const payload = {

            first_name:
                getElement(
                    "firstName"
                ).value.trim(),

            last_name:
                getElement(
                    "lastName"
                ).value.trim(),

            email:
                getElement(
                    "registerEmail"
                ).value.trim(),

            phone,

            birth_date:
                getElement(
                    "birthDate"
                ).value,

            gender:
                getElement(
                    "gender"
                ).value,

            password:
                getElement(
                    "registerPassword"
                ).value,

            password_confirmation:
                getElement(
                    "confirmPassword"
                ).value
        };


        setButtonLoading(
            submit,
            true,
            "جاري إنشاء الحساب..."
        );


        try {

            const result =
                await request(
                    API.register,
                    {
                        method: "POST",
                        body: JSON.stringify(
                            payload
                        )
                    }
                );


            if (
                result &&
                result.success === true
            ) {

                showMessage(
                    message,
                    "تم إنشاء الحساب بنجاح.",
                    "success"
                );


                setTimeout(() => {

                    window.location.href =
                        result.redirect ||
                        "pages/home.html";

                }, 700);

                return;
            }


            throw new Error(
                result?.message ||
                "تعذر إنشاء الحساب."
            );


        } catch (error) {

            showMessage(
                message,
                error.message ||
                "تعذر الاتصال بالخادم.",
                "error"
            );

        } finally {

            setButtonLoading(
                submit,
                false
            );
        }
    }


    /* ======================================
       نسيت كلمة المرور
       ====================================== */

    async function handleForgotPassword(
        event
    ) {

        event.preventDefault();

        const identifier =
            getElement(
                "loginIdentifier"
            );

        const message =
            getElement(
                "loginMessage"
            );

        if (
            !identifier ||
            !identifier.value.trim()
        ) {

            showFieldError(
                "loginIdentifier",
                "اكتب البريد أو رقم الهاتف أولاً."
            );

            identifier?.focus();

            return;
        }


        try {

            await request(
                API.forgotPassword,
                {
                    method: "POST",
                    body: JSON.stringify({
                        identifier:
                            identifier.value.trim()
                    })
                }
            );


            showMessage(
                message,
                "إذا كانت البيانات مرتبطة بحساب، سيتم إرسال تعليمات الاسترداد.",
                "success"
            );


        } catch (error) {

            showMessage(
                message,
                error.message ||
                "تعذر تنفيذ الطلب.",
                "error"
            );
        }
    }


    /* ======================================
       التشغيل
       ====================================== */

    function initialize() {

        initializePasswordToggles();


        const loginForm =
            getElement(
                "loginForm"
            );

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                handleLogin
            );
        }


        const registerForm =
            getElement(
                "registerForm"
            );

        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                handleRegister
            );
        }


        const forgotPassword =
            getElement(
                "forgotPassword"
            );

        if (forgotPassword) {

            forgotPassword.addEventListener(
                "click",
                handleForgotPassword
            );
        }


        const password =
            getElement(
                "registerPassword"
            );

        if (password) {

            password.addEventListener(
                "input",
                updatePasswordStrength
            );
        }

    }


    return {
        initialize,
        handleLogin,
        handleRegister
    };

})();


document.addEventListener(
    "DOMContentLoaded",
    () => {
        MalekAuth.initialize();
    }
);
