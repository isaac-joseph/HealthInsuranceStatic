const SERVER_URL =
    "https://healthinsurancenode-fuh2c9fja5a8heb3.centralus-01.azurewebsites.net";

// Collect and submit the user's information.
async function submitAnswer() {
    const result = document.getElementById("result");
    const ageError = document.getElementById("age-error");
    const weightError = document.getElementById("weight-error");
    const historyError = document.getElementById("family-history-error");

    // Clear previous messages.
    result.textContent = "";
    ageError.textContent = "";
    weightError.textContent = "";
    historyError.textContent = "";

    // Read the form values.
    const answer = document.getElementById("blood-pressure").value;
    const ageValue = document.getElementById("age").value;
    const feetValue = document.getElementById("height-feet").value;
    const inchesValue = document.getElementById("height-inches").value;
    const weightValue = document.getElementById("weight").value;

    const age = Number(ageValue);
    const feet = Number(feetValue);
    const inches = Number(inchesValue);
    const weight = Number(weightValue);

    // Validate age.
    if (
        ageValue === "" ||
        !Number.isInteger(age) ||
        age < 18 ||
        age > 100
    ) {
        ageError.textContent =
            "Please enter a whole-number age between 18 and 100.";
        return;
    }

    // Validate weight.
    if (
        weightValue === "" ||
        !Number.isInteger(weight) ||
        weight < 1 ||
        weight > 1000
    ) {
        weightError.textContent =
            "Please enter a whole-number weight between 1 and 1000 lbs.";
        return;
    }

    // Collect selected family history options.
    const familyHistory = [];

    document.querySelectorAll(
        'input[name="family-history"]:checked'
    ).forEach(function(checkbox) {
        familyHistory.push(checkbox.value);
    });

    // Require at least one family history selection.
    if (familyHistory.length === 0) {
        historyError.textContent =
            "Please select at least one family history option.";
        return;
    }

    // None cannot be selected with another condition.
    if (
        familyHistory.includes("none") &&
        familyHistory.length > 1
    ) {
        historyError.textContent =
            "Select None or choose one or more conditions, not both.";
        return;
    }

    // Send the information to the server.
    try {
        result.textContent = "Sending your information...";

        const response = await fetch(SERVER_URL + "/api/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                answer: answer,
                age: age,
                feet: feet,
                inches: inches,
                weight: weight,
                familyHistory: familyHistory
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "The server rejected the information.");
        }

        result.textContent = data.message;

    } catch (error) {
        console.error("Error communicating with server:", error);

        result.textContent =
            "Unable to submit your information. Please try again.";
    }
}