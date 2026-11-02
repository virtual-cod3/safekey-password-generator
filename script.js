
const passwordOutput = document.getElementById("passwordOutput");
const lengthSlider = document.getElementById("lengthSlider");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const excludeSimilar = document.getElementById("excludeSimilar");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");
const message = document.getElementById("message");

const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

const similarCharacters = "il1Lo0O";

// Generate a cryptographically secure random integer
function secureRandomInt(max) {
    if (!Number.isSafeInteger(max) || max < 1 || max > 4294967296) {
        throw new Error("Invalid random number range.");
    }

    const range = 4294967296;
    const limit = Math.floor(range / max) * max;
    const randomValues = new Uint32Array(1);

    do {
        crypto.getRandomValues(randomValues);
    } while (randomValues[0] >= limit);

    return randomValues[0] % max;
}

// Shuffle password characters securely
function secureShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = secureRandomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// Generate password
function generatePassword() {

    const length = Number(lengthSlider.value);

    // Validate password length
    if (
        lengthSlider.value.trim() === "" ||
        !Number.isInteger(length) ||
        length < 4 ||
        length > 64
    ) {
        showMessage(
            "Invalid password length! Please enter a whole number between 4 and 64.",
            true
        );

        lengthSlider.focus();
        return;
    }

    const selectedSets = [];

    if (uppercase.checked) {
        selectedSets.push(characterSets.uppercase);
    }

    if (lowercase.checked) {
        selectedSets.push(characterSets.lowercase);
    }

    if (numbers.checked) {
        selectedSets.push(characterSets.numbers);
    }

    if (symbols.checked) {
        selectedSets.push(characterSets.symbols);
    }

    if (selectedSets.length === 0) {
        showMessage("Please select at least one character type.", true);
        return;
    }

    let availableSets = selectedSets;

    if (excludeSimilar.checked) {
        availableSets = selectedSets.map(set =>
            [...set]
                .filter(char => !similarCharacters.includes(char))
                .join("")
        );
    }

    const validSets = availableSets.filter(set => set.length > 0);

    if (validSets.length === 0) {
        showMessage("No valid characters available.", true);
        return;
    }

    if (length < validSets.length) {
        showMessage(
            `Password length must be at least ${validSets.length} for the selected options.`,
            true
        );
        return;
    }

    try {
        const passwordCharacters = [];

        // Include at least one character from every selected category
        validSets.forEach(set => {
            passwordCharacters.push(
                set[secureRandomInt(set.length)]
            );
        });

        // Combine selected character sets
        const allCharacters = validSets.join("");

        // Fill remaining password positions
        while (passwordCharacters.length < length) {
            passwordCharacters.push(
                allCharacters[secureRandomInt(allCharacters.length)]
            );
        }

        // Randomize character positions
        secureShuffle(passwordCharacters);

        const password = passwordCharacters.join("");

        passwordOutput.value = password;

        calculateStrength(password, validSets.length);

        showMessage("Strong password generated successfully.");

        copyBtn.textContent = "Copy";

    } catch (error) {
        console.error(error);
        showMessage("Unable to generate password. Please try again.", true);
    }
}

// Calculate password strength
function calculateStrength(password, selectedTypes) {

    const length = password.length;
    let score = 0;

    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;

    if (selectedTypes >= 2) score++;
    if (selectedTypes >= 3) score++;
    if (selectedTypes === 4) score++;

    let strength;

    if (score <= 2) {
        strength = {
            text: "Weak",
            width: "25%",
            color: "#ff5b68"
        };
    } else if (score <= 4) {
        strength = {
            text: "Medium",
            width: "50%",
            color: "#ffb547"
        };
    } else if (score <= 5) {
        strength = {
            text: "Strong",
            width: "75%",
            color: "#6c9cff"
        };
    } else {
        strength = {
            text: "Very Strong",
            width: "100%",
            color: "#35d39a"
        };
    }

    strengthText.textContent = strength.text;
    strengthText.style.color = strength.color;

    strengthBar.style.width = strength.width;
    strengthBar.style.backgroundColor = strength.color;
}

// Display in-app messages
function showMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? "#ff6875" : "#35d39a";
}

// Copy password
async function copyPassword() {

    const password = passwordOutput.value;

    if (!password) {
        showMessage("Generate a password before copying.", true);
        return;
    }

    try {
        await navigator.clipboard.writeText(password);

        copyBtn.textContent = "Copied!";
        showMessage("Password copied to clipboard.");

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1800);

    } catch (error) {
        console.error(error);

        showMessage(
            "Clipboard access unavailable. Open the site in a secure context and try again.",
            true
        );
    }
}

// Button events
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

// Generate password when Enter is pressed in the length field
lengthSlider.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        generatePassword();
    }
});

// Generate initial password when the page loads
generatePassword();
