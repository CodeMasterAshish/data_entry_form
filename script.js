document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const idNumber = document.getElementById('idNumber').value;
    const pictureInput = document.getElementById('picture');
    const picture = pictureInput.files[0];
    
    if (!name || !phone || !idNumber) {
        alert("Please fill out all fields.");
        return;
    }

    // Create table row
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Add cells with the data
    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);
    const idCell = newRow.insertCell(2);
    const pictureCell = newRow.insertCell(3);
    const actionsCell = newRow.insertCell(4);

    nameCell.textContent = name;
    phoneCell.textContent = phone;
    idCell.textContent = idNumber;

    // Display image preview if exists
    if (picture) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(picture);
        img.alt = "Picture Preview";
        img.width = 50;
        img.height = 50;
        pictureCell.appendChild(img);
    }

    // Add edit and delete buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.onclick = function() {
        editEntry(newRow, name, phone, idNumber, picture);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = function() {
        deleteEntry(newRow);
    };

    actionsCell.classList.add('actions');
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    // Reset form
    document.getElementById('dataForm').reset();
});

// Function to edit an entry
function editEntry(row, name, phone, idNumber, picture) {
    document.getElementById('name').value = name;
    document.getElementById('phone').value = phone;
    document.getElementById('idNumber').value = idNumber;

    // Clear previous picture
    document.getElementById('picture').value = "";

    // Remove the row (we'll re-add it after updating)
    row.remove();

    // Change the button text to 'Save Changes'
    const saveButton = document.querySelector('button[type="submit"]');
    saveButton.textContent = 'Save Changes';

    // Change form submission to update
    saveButton.onclick = function() {
        // Replace the row data with the updated values
        row.cells[0].textContent = document.getElementById('name').value;
        row.cells[1].textContent = document.getElementById('phone').value;
        row.cells[2].textContent = document.getElementById('idNumber').value;

        if (picture) {
            const img = row.cells[3].getElementsByTagName('img')[0];
            img.src = URL.createObjectURL(picture);
        }

        // Reset button text and functionality
        saveButton.textContent = 'Save';
        saveButton.onclick = function() {
            document.getElementById('dataForm').submit();
        };

        document.getElementById('dataForm').reset();
    };
}

// Function to delete an entry
function deleteEntry(row) {
    if (confirm("Are you sure you want to delete this entry?")) {
        row.remove();
    }
}