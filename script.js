// Initialize Scrollama
const scroller = scrollama();

// Handle step enter events
function handleStepEnter(response) {
    const element = response.element;

    // Highlight the active step
    element.classList.add('active');

    // Get the current section ID
    const section = element.closest('section').id;

    // Update visualization if needed based on step index
    const steps = Array.from(document.querySelectorAll(`#${section} .step`));
    const stepIndex = steps.indexOf(element);

    if (section === 'visualization-2') {
        updateVisualization2(stepIndex);
    } else {
        // For other sections, load the visualization if not already loaded
        const plotContainer = document.querySelector(`#${section} .plot-container`);
        if (plotContainer && !plotContainer.dataset.loaded) {
            const plotId = plotContainer.id;
            const filePath = `assets/${plotId}.html`;
            loadPlotContent(plotContainer, filePath); // Corrected function name
            plotContainer.dataset.loaded = true;
        }
    }
}

// Handle step exit events
function handleStepExit(response) {
    response.element.classList.remove('active');
}

// Function to load and display plot content
function loadPlotContent(plotContainer, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            // Parse the HTML string to a document
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract the script content
            const scriptContent = [];
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                scriptContent.push(script.textContent);
            });

            // Remove scripts from the document
            scripts.forEach(script => script.parentNode.removeChild(script));

            // Insert the remaining HTML content into the container
            plotContainer.innerHTML = doc.body.innerHTML;

            // Execute the scripts in order
            scriptContent.forEach(content => {
                const script = document.createElement('script');
                script.textContent = content;
                document.body.appendChild(script);
            });
        })
        .catch(error => {
            console.error(`Error loading plot: ${plotContainer.id}`, error);
        });
}

// Function to update Visualization 2 based on the step index
function updateVisualization2(stepIndex) {
    const plotContainer = document.getElementById('correlation_cancellation_variables');

    if (stepIndex === 0) {
        // Load correlation_cancellation_variables.html
        loadPlotContent(plotContainer, 'assets/correlation_cancellation_variables.html');
    } else if (stepIndex === 1) {
        // Load cancellation_by_lead_time.html
        loadPlotContent(plotContainer, 'assets/cancellation_by_lead_time.html');
    } else if (stepIndex === 2) {
        // Load cancellation_by_special_request.html
        loadPlotContent(plotContainer, 'assets/cancellation_by_special_request.html');
    } else if (stepIndex === 3) {
        // Load cancellation_by_country_map.html
        loadPlotContent(plotContainer, 'assets/cancellation_by_country_map.html');
    }
}

// Function to update Clustering Visualization (Placeholder)
function updateClusteringVisualization(stepIndex) {
    // Implement logic to update clustering visualization based on stepIndex
}

// Setup Scrollama
scroller
    .setup({
        step: '.step',
        offset: 0.7,
        debug: false,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

// Handle window resizing
window.addEventListener('resize', scroller.resize);