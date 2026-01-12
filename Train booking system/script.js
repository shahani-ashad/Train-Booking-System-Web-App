document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       GLOBAL: Sign In Button Logic (Mock)
       ========================================= */
    const signInButtons = document.querySelectorAll('button');
    
    // We look for buttons that specifically say "Sign in"
    signInButtons.forEach(btn => {
        if (btn.textContent.trim() === "Sign in") {
            btn.addEventListener('click', () => {
                const email = prompt("Enter your email to sign in:");
                if (email) {
                    alert(`Welcome back, ${email}!`);
                    btn.textContent = "My Account"; // Change button text after "login"
                }
            });
        }
    });

    /* =========================================
       PAGE: Booking.html / Bookings.html
       ========================================= */
    const bookingButton = document.querySelector('.booking-form .submit');
    
    if (bookingButton) {
        bookingButton.addEventListener('click', (e) => {
            e.preventDefault(); // Stop page from reloading

            // Get values from the form inputs
            const fromStation = document.getElementById('from').value;
            const toStation = document.getElementById('to').value;
            const date = document.getElementById('date').value;
            const passengers = document.getElementById('passengers').value;
            const trainClass = document.getElementById('train-class').value;

            // --- Validation Logic ---
            
            // 1. Check if fields are empty
            if (!date || !passengers) {
                alert("Please fill in all fields, including Date and Passengers.");
                return;
            }

            // 2. Check if Start and End stations are the same
            if (fromStation === toStation) {
                alert("Error: 'From' and 'To' stations cannot be the same!");
                return;
            }

            // 3. Check if date is in the past
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0,0,0,0); // Reset time to compare dates only

            if (selectedDate < today) {
                alert("You cannot book a train for a past date!");
                return;
            }

            // --- Success Simulation ---
            alert(`✅ Booking Successful!\n\nTrain: ${fromStation.toUpperCase()} to ${toStation.toUpperCase()}\nDate: ${date}\nPassengers: ${passengers}\nClass: ${trainClass}\n\nYour ticket has been emailed to you.`);
            
            // Optional: Reset form
            // document.querySelector('.booking-form').reset();
        });
    }

    /* =========================================
       PAGE: Schedule.html
       ========================================= */
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const startStation = document.getElementById('start-station').value.toLowerCase();
            const endStation = document.getElementById('end-station').value.toLowerCase();
            
            // Get all rows from the table body
            const rows = document.querySelectorAll('table tbody tr');
            let found = false;

            rows.forEach(row => {
                // Get the text from the first two columns (Start and End)
                const rowStart = row.cells[0].textContent.toLowerCase();
                const rowEnd = row.cells[1].textContent.toLowerCase();

                // Simple filter logic
                if (startStation === "" && endStation === "") {
                    row.style.display = ""; // Show all if search is empty
                } else if (rowStart.includes(startStation) && rowEnd.includes(endStation)) {
                    row.style.display = ""; // Show match
                    found = true;
                } else {
                    row.style.display = "none"; // Hide non-match
                }
            });

            if (!found && (startStation !== "" || endStation !== "")) {
                alert("No trains found for this route.");
            }
        });
    }

    /* =========================================
       PAGE: Customer care.html
       ========================================= */
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;

            if(name && message) {
                alert(`Thank you, ${name}! We have received your message: "${message}". Our team will contact you shortly.`);
                contactForm.reset(); // Clear the form
            } else {
                alert("Please fill in your name and message.");
            }
        });
    }
});