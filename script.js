// script.js

// Initialize Scrollama
const scroller = scrollama();

// Handle scrolling events
function handleStepEnter(response) {
    const element = response.element;

    // Add 'active' class to the element in view
    element.classList.add('active');

    // Remove 'hidden' class to reveal the element
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }

    // Load visualizations when entering their sections
    if (element.id === 'visualization-1') {
        loadPlot('plot1', 'assets/percentage_bookings_status.html');
    }
    if (element.id === 'visualization-2') {
        loadPlot('plot2', 'assets/correlation_cancellation_variables.html');
    }
    if (element.id === 'visualization-3') {
        loadPlot('plot3', 'assets/cancellation_by_lead_time.html');
    }
    if (element.id === 'visualization-4') {
        loadPlot('plot4', 'assets/cancellation_by_special_request.html');
    }
    if (element.id === 'visualization-5') {
        loadPlot('plot5', 'assets/cancellation_by_country_map.html');
    }
    if (element.id === 'visualization-6') {
        loadPlot('plot6', 'assets/clustering.html');
    }
}

// Load Plotly visualizations
function loadPlot(containerId, filePath) {
    const container = document.getElementById(containerId);

    // Check if the plot is already loaded
    if (!container.dataset.loaded) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                container.dataset.loaded = true;
            });
    }
}

// Setup the scroller
scroller
    .setup({
        step: '.section',
        offset: 0.5,
        debug: false,
    })
    .onStepEnter(handleStepEnter);

// Resize handling
window.addEventListener('resize', scroller.resize);