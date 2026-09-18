const fileInput = document.querySelector('#fileInput');

const trainingRatio = document.querySelector('#trainingRatio');
const testingRatio = document.querySelector('#testingRatio');

const featuresInput = document.querySelector('#features');
const targetInput = document.querySelector('#target');
const taskTypeInput = document.querySelector('#taskType');

const button = document.querySelector('#uploadButton');
const msg = document.querySelector('#message');


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

        console.log("Server response:", data);


    } catch (error) {

        console.error("Error:", error);

        msg.textContent =
            "Could not communicate with the server.";
    }

});