// Initialize Scrollama
const scroller = scrollama();

// Handle scrolling events
function handleStepEnter(response) {
    console.log(`Entering step: ${response.element.id}`);
    const element = response.element;

    // Add 'active' class to the element in view
    element.classList.add('active');

    // Remove 'hidden' class to reveal the element
    const hiddenText = element.querySelector('.hidden');
    if (hiddenText) {
        hiddenText.classList.remove('hidden');
    }

    // Load visualizations when entering their sections
    const plotContainer = element.querySelector('.plot-container');
    if (plotContainer && !plotContainer.dataset.loaded) {
        const plotId = plotContainer.id;
        const filePath = `assets/${plotId}.html`;
        loadPlot(plotId, filePath);
        plotContainer.dataset.loaded = true;
    }
}

// Load Plotly visualizations
function loadPlot(containerId, filePath) {
    console.log(`Attempting to load plot for container: ${containerId}, from file: ${filePath}`);
    const container = document.getElementById(containerId);

    // Check if the plot is already loaded
    if (!container.dataset.loaded) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                container.dataset.loaded = true;
            })
            .catch(error => {
                console.error('Error loading plot:', error);
            });
    }
}

// Setup the scroller
scroller
    .setup({
        step: '.step',
        offset: 0.7, // Adjusted offset for better timing
        debug: false,
    })
    .onStepEnter(handleStepEnter);

// Resize handling
window.addEventListener('resize', scroller.resize);