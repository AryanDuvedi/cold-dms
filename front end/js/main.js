// TwitterDMTool - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Step 1: Connect to Twitter (Auth Token Validation)
    document.getElementById('connect-btn').addEventListener('click', function () {
        const authToken = document.getElementById('auth-token').value.trim(); // Trim to remove extra spaces

        console.log('Entered Auth Token:', authToken); // Debugging output

        if (!authToken) {
            alert('Please enter your Auth Token.');
        } else {
            // Call the backend to validate the Auth Token
            fetch('/validateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ authToken })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    document.getElementById('step-1').style.display = 'none';
                    document.getElementById('step-2').style.display = 'block';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        }
    });

    // Step 2: Get Google Sheet Link
    document.getElementById('sheet-btn').addEventListener('click', function () {
        const sheetLink = document.getElementById('google-sheet-url').value.trim();
        if (!sheetLink) {
            alert('Please enter the Google Sheet link.');
        } else {
            alert('Google Sheet link accepted! Proceed to DM settings.');
            document.getElementById('step-2').style.display = 'none';
            document.getElementById('step-3').style.display = 'block';
        }
    });

    // Step 3: DM Settings
    document.getElementById('dm-mode').addEventListener('change', function () {
        const dmMode = document.getElementById('dm-mode').value;
        const timeFrameSection = document.getElementById('time-frame-section');

        if (dmMode === 'automatic') {
            timeFrameSection.style.display = 'block';
        } else {
            timeFrameSection.style.display = 'none';
        }
    });

    document.getElementById('launch-btn').addEventListener('click', function () {
        const dmMode = document.getElementById('dm-mode').value;
        const dmsPerDay = document.getElementById('dms-per-day').value;

        // Show result section
        const resultSection = document.getElementById('result-section');
        const resultMessage = document.getElementById('result');

        if (dmMode && dmsPerDay) {
            // Call the backend to send DMs
            fetch('/sendDMs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mode: dmMode, dmsPerDay })
            })
            .then(response => response.json())
            .then(data => {
                resultMessage.innerText = data.message;
                resultSection.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while sending DMs. Please try again.');
            });
        } else {
            alert('Please select a DM mode and enter the number of DMs per day.');
        }
    });
});
