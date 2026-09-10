const display = document.querySelector("h1");
const errorIcon = document.getElementById("error-icon");
let current = "";

// symbols the calculator accepts
const validKeys = "0123456789+-x/%.=";

const showError = () => {
    errorIcon.classList.remove("opacity-0");
    setTimeout(() => errorIcon.classList.add("opacity-0"), 1000);
};

const press = (value) => {
    if (value === "=") {
        try {
            const expression = current.replace(/x/g, "*").replace(/%/g, "/100*");
            const result = eval(expression);
            if (result === undefined || Number.isNaN(result)) throw new Error();
            current = String(result);
        } catch {
            current = "Error";
            showError();
        }
    } else {
        if (current === "Error") current = "";
        current += value;
    }
    display.textContent = current === "" ? "0" : current;
};

const button_display_change = (event) => {
    press(event.target.textContent);
};

const clearDisplay = () => {
    current = "";
    display.textContent = "0";
    errorIcon.classList.add("opacity-0");
};

// briefly highlight the matching on-screen button when a key is pressed
const flashButton = (key) => {
    document.querySelectorAll("button").forEach(btn => {
        if (btn.textContent === key) {
            btn.classList.add("scale-95", "ring-2", "ring-sky-400");
            setTimeout(() => btn.classList.remove("scale-95", "ring-2", "ring-sky-400"), 120);
        }
    });
};

// keyboard support
document.addEventListener("keydown", (event) => {
    let key = event.key;

    // ignore standalone modifier keys
    if (["Shift", "Control", "Alt", "Meta"].includes(key)) return;

    // map keyboard keys to button symbols
    if (key === "*") key = "x";
    if (key === "Enter" || key === "=") { press("="); return; }
    if (key === "Escape" || key === "c" || key === "C") { clearDisplay(); return; }
    if (key === "Backspace") {
        if (current === "Error") current = "";
        current = current.slice(0, -1);
        display.textContent = current === "" ? "0" : current;
        return;
    }

    if (validKeys.includes(key)) {
        press(key);
        flashButton(key);
    } else {
        showError();
    }
});