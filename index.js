const SERVER_URL =
    "https://healthinsurancenode-fuh2c9fja5a8heb3.centralus-01.azurewebsites.net";

// Check that the server is awake when the page loads.
window.addEventListener("load", async function() {
    console.log("Calling Ping API.");

    try {
        const response = await fetch(SERVER_URL + "/api/ping");
        const data = await response.json();

        console.log("Received Ping API response:", data);

        document.getElementById("result").textContent = data.message;
    } catch (error) {
        console.error("Ping API error:", error);

        document.getElementById("result").textContent =
            "Could not connect to the server.";
    }
});

// Collect and submit the user's information.
async function submitAnswer() {
    const result = document.getElementById("result");
    const bmiResult = document.getElementById("bmi-result");
    const riskResult = document.getElementById("risk-result");

    const ageError = document.getElementById("age-error");
    const weightError = document.getElementById("weight-error");
    const historyError = document.getElementById("family-history-error");

    // Clear previous messages and results.
    result.textContent = "";
    bmiResult.textContent = "";
    riskResult.textContent = "";

    ageError.textContent = "";
    weightError.textContent = "";
    historyError.textContent = "";

    // Read the form values.
    const bloodPressure = document.getElementById("blood-pressure").value;
    const ageValue = document.getElementById("age").value;
    const feetValue = document.getElementById("height-feet").value;
    const inchesValue = document.getElementById("height-inches").value;
    const weightValue = document.getElementById("weight").value;

    const age = Number(ageValue);
    const heightFeet = Number(feetValue);
    const heightInches = Number(inchesValue);
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
    const selectedHistory = [];

    document.querySelectorAll(
        'input[name="family-history"]:checked'
    ).forEach(function(checkbox) {
        selectedHistory.push(checkbox.value);
    });

    // Require at least one family history selection.
    if (selectedHistory.length === 0) {
        historyError.textContent =
            "Please select None or at least one family history condition.";
        return;
    }

    // None cannot be selected with another condition.
    if (
        selectedHistory.includes("none") &&
        selectedHistory.length > 1
    ) {
        historyError.textContent =
            "Select None or choose one or more conditions, not both.";
        return;
    }

    // The server expects an empty array when None is selected.
    let familyHistory = selectedHistory;

    if (selectedHistory.includes("none")) {
        familyHistory = [];
    }

    try {
        result.textContent = "Calculating your risk...";

        // API 1: Validate the blood pressure category.
        console.log("Calling Blood Pressure Category API.");

        const bpResponse = await fetch(
            SERVER_URL + "/api/bp-category",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bloodPressure: bloodPressure
                })
            }
        );

        const bpData = await bpResponse.json();

        console.log("Received Blood Pressure API response:", bpData);

        if (!bpResponse.ok) {
            throw new Error(
                bpData.message || "Blood pressure request failed."
            );
        }

        // API 2: Calculate BMI on the server.
        console.log("Calling BMI API.");

        const bmiResponse = await fetch(
            SERVER_URL + "/api/bmi",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    heightFeet: heightFeet,
                    heightInches: heightInches,
                    weight: weight
                })
            }
        );

        const bmiData = await bmiResponse.json();

        console.log("Received BMI API response:", bmiData);

        if (!bmiResponse.ok) {
            throw new Error(
                bmiData.message || "BMI calculation failed."
            );
        }

        // Display the BMI returned by the server.
        bmiResult.textContent =
            "Your BMI: " + bmiData.bmi +
            " | BMI Category: " + bmiData.category;

        // API 3: Calculate the overall risk on the server.
        console.log("Calling Risk Category API.");

        const riskResponse = await fetch(
            SERVER_URL + "/api/risk-category",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    age: age,
                    bmiCategory: bmiData.category,
                    bpCategory: bpData.category,
                    familyHistory: familyHistory
                })
            }
        );

        const riskData = await riskResponse.json();

        console.log("Received Risk Category API response:", riskData);

        if (!riskResponse.ok) {
            throw new Error(
                riskData.message || "Risk calculation failed."
            );
        }

        // Prepare readable input labels for the results.
        const bloodPressureNames = {
            "normal": "Normal",
            "elevated": "Elevated",
            "high-stage-1": "Hypertension: Stage 1",
            "high-stage-2": "Hypertension: Stage 2",
            "crisis": "Hypertensive Crisis"
        };

        let familyHistoryText = "None";

        if (familyHistory.length > 0) {
            familyHistoryText = familyHistory.join(", ");
        }

        // Display the inputs and server-calculated risk results.
        riskResult.textContent =
            "Inputs used: Age: " + age +
            "; Height: " + heightFeet + " feet " + heightInches + " inches" +
            "; Weight: " + weight + " lbs" +
            "; Blood Pressure: " + bloodPressureNames[bpData.category] +
            "; Family History: " + familyHistoryText +
            ". Total Risk Score: " + riskData.score +
            ". Final Risk Category: " + riskData.category + ".";

        result.textContent = "Risk calculation completed.";

    } catch (error) {
        console.error("Error communicating with server:", error);

        result.textContent =
            "Unable to calculate your risk: " + error.message;
    }
}