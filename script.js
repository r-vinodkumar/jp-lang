document.addEventListener("DOMContentLoaded", function() {
    // Fetch the Kanji readings from the JSON file
    fetch('kanji-readings.json')
        .then(response => response.json())
        .then(data => {
            const kanjiList = Object.keys(data);

            // Function to wrap Kanji characters with a span and anchor
            function highlightKanji(node) {
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
                        highlightKanji(node.childNodes[i]);
                    }
                }
            }

            // Start highlighting from the main element
            const mainElement = document.querySelector('main');
            if (mainElement) {
                highlightKanji(mainElement);
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
});