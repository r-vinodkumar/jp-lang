document.addEventListener("DOMContentLoaded", function () {
    // Function to toggle menu
    function toggleMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('show');
    }

    // Function to fetch and display Kanji data
    async function loadKanjiData(level) {
        try {
            const response = await fetch(`kanji-${level}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const kanjiData = await response.json();
            const kanjiContainer = document.getElementById('kanji-container');
            kanjiContainer.innerHTML = ''; // Clear any existing content

            for (const [kanji, readings] of Object.entries(kanjiData)) {
                const kanjiElement = document.createElement('div');
                kanjiElement.classList.add('kanji-item', level);
                const kanjiSymbol = document.createElement('h2');
                kanjiSymbol.textContent = kanji;
                const readingsElement = document.createElement('p');
                readingsElement.textContent = readings.join(', ');
                kanjiElement.appendChild(kanjiSymbol);
                kanjiElement.appendChild(readingsElement);
                kanjiContainer.appendChild(kanjiElement);
            }
        } catch (error) {
            console.error('Error loading Kanji data:', error);
        }
    }

    // Function to highlight Kanji characters
    function highlightKanji(node, kanjiList, data) {
        if (node.nodeType === 3) { // Text node
            const regex = new RegExp(`(${kanjiList.join('|')})`, 'g');
            const span = document.createElement('span');
            span.innerHTML = node.textContent.replace(regex, (match) => {
                const readings = data[match].join(', ');
                return `<a href="https://jisho.org/search/${match}%20%23kanji" class="highlight-kanji" target="_blank">${match}<span class="tooltip">${readings}</span></a>`;
            });
            node.replaceWith(span);
        } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') { // Element node
            for (let i = 0; i < node.childNodes.length; i++) {
                highlightKanji(node.childNodes[i], kanjiList, data);
            }
        }
    }

    // Fetch the Kanji readings from the JSON file
    fetch('kanji-n5.json')
        .then(response => response.json())
        .then(data => {
            const kanjiList = Object.keys(data);

            // Start highlighting from the main element
            const mainElement = document.querySelector('main');
            if (mainElement) {
                highlightKanji(mainElement, kanjiList, data);
            }

            // Add event listeners for mobile tooltips
            document.querySelectorAll('.highlight-kanji').forEach(item => {
                item.addEventListener('click', (event) => {
                    event.preventDefault();
                    const tooltip = item.querySelector('.tooltip');
                    if (tooltip.style.display === 'block') {
                        tooltip.style.display = 'none';
                    } else {
                        document.querySelectorAll('.tooltip').forEach(tip => tip.style.display = 'none');
                        tooltip.style.display = 'block';
                    }
                });
            });

            // Close tooltips if clicked outside
            document.addEventListener('click', (event) => {
                if (!event.target.closest('.highlight-kanji')) {
                    document.querySelectorAll('.tooltip').forEach(tip => tip.style.display = 'none');
                }
            });
        })
        .catch(error => console.error('Error fetching the Kanji readings:', error));

    // Load the default Kanji data for N5 level
    loadKanjiData('n5');

    // Header related functionality (initialized once header is loaded)
    initializeHeaderScripts();
});