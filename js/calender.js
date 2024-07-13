document.addEventListener('DOMContentLoaded', function () {
    const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const monthNameElement = document.getElementById('month-name');
    const calendarBody = document.querySelector('.calendar-body');

    function updateCalendar() {
        // Update month name
        monthNameElement.textContent = `${currentYear}年 ${monthNames[currentMonth]}`;

        // Clear existing days
        calendarBody.innerHTML = '';

        // Fill in the day names
        for (let i = 0; i < dayNames.length; i++) {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.className = 'day-name';
            dayNameDiv.textContent = dayNames[i];
            calendarBody.appendChild(dayNameDiv);
        }

        // Fill empty slots for days of the week before the first day of the month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'day';
            calendarBody.appendChild(emptyDiv);
        }

        // Fill in the actual days of the month
        const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let day = 1; day <= lastDay; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            // Display Kanji directly
            dayDiv.textContent = convertToKanji(day);
            calendarBody.appendChild(dayDiv);
        }
    }

    // Initialize calendar
    updateCalendar();

    // Previous month button
    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    // Next month button
    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });

    // Function to convert numeric date to Kanji
    function convertToKanji(number) {
        const units = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        const tens = ["", "十", "二十", "三十"];
        
        if (number === 0) return "〇"; // Special case for zero

        let kanji = "";

        if (number >= 10) {
            kanji += tens[Math.floor(number / 10)];
            number %= 10;
        }

        kanji += units[number];

        return kanji;
    }
});