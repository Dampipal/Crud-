// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqDH5wyr8TJHQCZngvSTVKr9UNKG75U70",
  authDomain: "mayanpuri7star.firebaseapp.com",
  projectId: "mayanpuri7star",
  storageBucket: "mayanpuri7star.appspot.com",
  messagingSenderId: "1004587393764",
  appId: "1:1004587393764:web:b705bef0133bc8e65ac2f1",
  measurementId: "G-V0FEDTYE40"
};

firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();

// Function to create a record
function createRecord() {
  const defaultName = "Hari";
  const number = prompt("Enter number:");
  const time = prompt("Enter time:");

  if (number && time) {
    // Push data to Firebase
    database.ref('records').push({
      name: defaultName,
      number: number,
      time: time
    });
  }
}

// Function to display records
function displayRecords() {
  const tableBody = document.getElementById('table-body');

  // Clear existing table
  tableBody.innerHTML = '';

  // Retrieve data from Firebase
  database.ref('records').on('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const record = childSnapshot.val();
      const row = tableBody.insertRow();

      // Populate table cells
      for (const key in record) {
        const cell = row.insertCell();
        cell.textContent = record[key];
      }

      // Add an "Edit" button
      const editCell = row.insertCell();
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => editRecord(childSnapshot.key);
      editCell.appendChild(editButton);
    });
  });
}

// Function to edit a record
function editRecord(key) {
  const newName = prompt("Enter new name:");
  const newNumber = prompt("Enter new number:");
  const newTime = prompt("Enter new time:");

  if (newName && newNumber && newTime) {
    // Update the record in Firebase
    database.ref('records/' + key).update({
      name: newName,
      number: newNumber,
      time: newTime
    });
  }
}

// Display records on page load
displayRecords();
