// Wait for DOM to be fully loaded before running script
document.addEventListener("DOMContentLoaded", function() {
    // DOM Selections
    // Select form and inputs
    const form = document.getElementById("signup-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const termsCheckbox = document.getElementById("terms");

    // Select error message spans
    const errorUsername = document.getElementById("error-username");
    const errorEmail = document.getElementById("error-email");
    const errorPassword = document.getElementById("error-password");
    const errorTerms = document.getElementById("error-terms");

    // Select gallery elements
    const thumbnails = document.querySelectorAll(".thumb");
    const imageCaption = document.getElementById("image-caption");

    // Focus / Blur effects
    // Select all text inputs with one querySelectorAll call
    const textInputs = document.querySelectorAll("#username, #email, #password");

    // Add focus and blur to each input depending on if it was selected or not
    textInputs.forEach(function(input) {
        // On focus: change background to light yellow
        input.addEventListener("focus", function() {
            input.style.backgroundColor = "#fffae0";
        });
        
        // On blur: return background to white
        input.addEventListener("blur", function() {
                input.style.backgroundColor = "white";
            });
    });

    // Form Validation
    // Helper function to show error
    function showError(input, errorSpan, message) {
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
        input.classList.add("error-border");
    }

  // Helper function to clear error
    function clearError(input, errorSpan) {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
        input.classList.remove("error-border");
    }

  // Form error checking
    form.addEventListener("submit", function(event) {
        // Prevent page reload
        event.preventDefault();
        
        // Track if form is valid using a flag
        let isValid = true;
        
        // Validate username
        const usernameValue = usernameInput.value.trim();
        if (usernameValue === "") {
            showError(usernameInput, errorUsername, "Username is required");
            isValid = false;
        } else {
            clearError(usernameInput, errorUsername);
        }
        
        // Validate email
        const emailValue = emailInput.value.trim();
        
        // Validation: must contain @ and a dot after @
        const atSignIndex = emailValue.indexOf("@");
        const dotIndex = emailValue.indexOf(".");

        // Check if the index of the @ < .
        const hasDotAfterAt = atSignIndex < dotIndex;
        
        // Empty email
        if (emailValue === "") {
            showError(emailInput, errorEmail, "Enter a valid email address");
            isValid = false;

        // No @
        } else if (atSignIndex === -1) {
            showError(emailInput, errorEmail, "Enter a valid email address");
            isValid = false;

        // If the . is after the @
        } else if (!hasDotAfterAt) {
            showError(emailInput, errorEmail, "Enter a valid email address");
            isValid = false;
        
        } else {
            clearError(emailInput, errorEmail);
        }
        
        // Validate password
        const passwordValue = passwordInput.value;
        if (passwordValue.length < 8) {
            showError(passwordInput, errorPassword, "Password must be at least 8 characters");
            isValid = false;
        } else {
            clearError(passwordInput, errorPassword);
        }
        
        // Validate terms checkbox
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, errorTerms, "You must accept the terms");
            isValid = false;
        } else {
            clearError(termsCheckbox, errorTerms);
        }
        
        // If all fields are valid, show success message
        if (isValid) {
            alert("Registration successful! Welcome to the Travel Photo Club!");
            
            // Reset the form
            form.reset();
        }
    });

    // Gallery Interaction
    // Function to handle tile selection
    function selectTile(tile) {
        // Remove expanded class from all thumbnails
        thumbnails.forEach(function(thumb) {
            thumb.classList.remove("expanded");
        });
    
        // Add expanded class to the clicked tile
        tile.classList.add("expanded");
        
        // Update caption with city name from data-city attribute
        const cityName = tile.getAttribute("data-city");
        imageCaption.textContent = "You selected: " + cityName;
    }

    // Add click listener to each thumbnail
    thumbnails.forEach(function(thumb) {
        // Handle click
            thumb.addEventListener("click", function() {
            selectTile(thumb);
        });
        
        // Handle keyboard Enter key
        thumb.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                selectTile(thumb);
            }
        });
    });
});