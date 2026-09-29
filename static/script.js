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


        // ==========================================
        // SUBMISSION PREVIEW
        // ==========================================

        let submissionPreview = "";

        if (
            data.submission_preview &&
            data.submission_preview.length > 0
        ) {

            const columns = Object.keys(
                data.submission_preview[0]
            );


            submissionPreview = `
                <div class="result-section">

                    <h3>Submission Preview</h3>

                    <div class="table-container">

                        <table class="submission-table">

                            <thead>
                                <tr>

                                    ${columns.map(column => `
                                        <th>${column}</th>
                                    `).join('')}

                                </tr>
                            </thead>


                            <tbody>

                                ${data.submission_preview.map(row => `
                                    <tr>

                                        ${columns.map(column => `
                                            <td>${row[column]}</td>
                                        `).join('')}

                                    </tr>
                                `).join('')}

                            </tbody>

                        </table>

                    </div>

                </div>
            `;

        } else {

            submissionPreview = `
                <div class="result-section">

                    <h3>Submission Preview</h3>

                    <p>No submission preview available.</p>

                </div>
            `;
        }


        // ==========================================
        // AFFICHAGE DES RÉSULTATS
        // ==========================================

        results.innerHTML = `

            <div class="results-card">

                <h2>Model Results</h2>


                <!-- DATASET -->

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


                <!-- TRAINING CONFIGURATION -->

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


                <!-- METRICS -->

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
                                ${
                                    data.metrics.mse !== null
                                    ? data.metrics.mse.toFixed(4)
                                    : "Not available"
                                }
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


                <!-- SUBMISSION PREVIEW -->

                ${submissionPreview}


            </div>

        `;


        console.log("Server response:", data);


    } catch (error) {

        console.error("Error:", error);

        msg.textContent =
            "Could not communicate with the server.";
    }

});