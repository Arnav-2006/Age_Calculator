// Initialize Flatpickr
flatpickr("#birthdate", {
    enableTime: true,
    dateFormat: "F j, Y h:i K",
    altInput: true,
    altFormat: "Y-m-d H:i",
    time_24hr: false,
    defaultDate: new Date(),
});

function calculateAge() {
    let birthdateInput = document.getElementById("birthdate").value;
    
    if (birthdateInput === "") {
        document.getElementById("age-display").innerText = "Please enter your birthdate!";
        return;
    }

    let birthDate = new Date(birthdateInput);

    function updateAge() {
        let now = new Date();
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
        if (months < 0) { months += 12; years--; }

        let totalDaysLived = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
        let dayOfWeek = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

        document.getElementById("age-display").innerText = 
            `${years} Years, ${months} Months, ${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
        
        document.getElementById("day-display").innerText = `You were born on: ${dayOfWeek}`;
        document.getElementById("total-days-display").innerText = `Total Days Lived: ${totalDaysLived}`;
    }

    updateAge();
    setInterval(updateAge, 1000);
}
