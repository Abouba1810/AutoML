const fileInput = document.querySelector('#fileInput');

const trainingRatio = document.querySelector('#trainingRatio');
const testingRatio = document.querySelector('#testingRatio');

const featuresInput = document.querySelector('#features');
const targetInput = document.querySelector('#target');
const taskTypeInput = document.querySelector('#taskType');

const button = document.querySelector('#uploadButton');
const msg = document.querySelector('#message');

const results = document.querySelector('#results');
button.addEventListener('click', async function () {

    const file = fileInput.files[0];

    if (!file) {
        msg.textContent = "Please select a CSV file.";
        return;
    }


    const trainRatio = trainingRatio.value;
    const testRatio = testingRatio.value;

    const features = featuresInput.value;
    const target = targetInput.value;

    // IMPORTANT :
    // on récupère taskType au moment du clic
    const taskType = taskTypeInput.value.trim().toLowerCase();


    // Vérification des ratios

    if (Number(trainRatio) + Number(testRatio) !== 1) {

        msg.textContent =
            "Training and testing ratios must add up to 1.";

        return;
    }


    // Vérification du type de tâche

    if (
        taskType !== "classification" &&
        taskType !== "regression"
    ) {

        msg.textContent =
            "Task type must be classification or regression.";

        return;
    }


    // Création des données à envoyer à Flask

    const formData = new FormData();

    formData.append('file', file);

    formData.append(
        'trainingRatio',
        trainRatio
    );

    formData.append(
        'testingRatio',
        testRatio
    );

    formData.append(
        'features',
        features
    );

    formData.append(
        'target',
        target
    );

    formData.append(
        'taskType',
        taskType
    );


    msg.textContent = "Training model...";


    try {

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });


        const data = await response.json();


        if (!response.ok) {

            msg.textContent =
                data.message || "Server error.";

            console.error(data);

            return;
        }


        msg.textContent = data.message;

        results.innerHTML = `
            <div class="results-card">

                <h2>Model Results</h2>

                <div class="result-section">
                    <h3>Dataset</h3>

                    <p>
                        <strong>Rows:</strong>
                        ${data.rows}
                    </p>

                    <p>
                        <strong>Columns:</strong>
                        ${data.columns}
                    </p>

                    <p>
                        <strong>Features:</strong>
                        ${data.features.join(', ')}
                    </p>

                    <p>
                        <strong>Target:</strong>
                        ${data.target}
                    </p>
                </div>

                <div class="result-section">
                    <h3>Training Configuration</h3>

                    <p>
                        <strong>Task:</strong>
                        ${data.taskType}
                    </p>

                    <p>
                        <strong>Model:</strong>
                        ${data.model}
                    </p>

                    <p>
                        <strong>Training:</strong>
                        ${data.trainingRatio}
                    </p>

                    <p>
                        <strong>Testing:</strong>
                        ${data.testingRatio}
                    </p>
                </div>

                <div class="result-section">
                    <h3>Metrics</h3>

                    ${
                        data.taskType === "classification"
                        ?
                        `
                        <div class="metric">
                            <span>Accuracy</span>
                            <strong>
                                ${(data.metrics.accuracy * 100).toFixed(2)}%
                            </strong>
                        </div>
                        `
                        :
                        `
                        <div class="metric">
                            <span>MSE</span>
                            <strong>
                                ${data.metrics.mse.toFixed(4)}
                            </strong>
                        </div>

                        <div class="metric">
                            <span>R²</span>
                            <strong>
                                ${
                                    data.metrics.r2 !== null
                                    ? data.metrics.r2.toFixed(4)
                                    : "Not available"
                                }
                            </strong>
                        </div>
                        `
                    }

                </div>

            </div>
        `;

        console.log("Server response:", data);


    } catch (error) {

        console.error("Error:", error);

        msg.textContent =
            "Could not communicate with the server.";
    }

});