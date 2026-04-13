const countrySelect = document.getElementById('country');
const customCountryInput = document.getElementById('customCountry');
const clientForm = document.getElementById('clientForm');
const vehicleForm = document.getElementById('vehicleForm');
const recordsTable = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
let editIndex = -1;

countrySelect.addEventListener('change', function () {
  if (this.value === 'Other') {
    customCountryInput.style.display = 'block';
    customCountryInput.required = true; 
  } else {
    customCountryInput.style.display = 'none';
    customCountryInput.required = false; 
    customCountryInput.value = ''; 
  }
});

vehicleForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const clientName = document.getElementById('clientName').value;
  const clientPhone = document.getElementById('clientPhone').value;
  const nationalID = document.getElementById('nationalID').value;
  let country = countrySelect.value;

  if (country === 'Other') {
    country = customCountryInput.value; 
  }

  const vehicleID = document.getElementById('vehicleID').value;
  const vehicleType = document.getElementById('vehicleType').value;
  const rentalTime = document.getElementById('rentalTime').value;
  const costPerHour = document.getElementById('costPerHour').value;

  const totalCost = rentalTime * costPerHour;

  if (editIndex === -1) {
    addRecord(clientName, clientPhone, nationalID, country, vehicleID, vehicleType, rentalTime, totalCost);
  } else {
    updateRecord(clientName, clientPhone, nationalID, country, vehicleID, vehicleType, rentalTime, totalCost);
  }

  clientForm.reset();
  vehicleForm.reset();
});

function addRecord(clientName, clientPhone, nationalID, country, vehicleID, vehicleType, rentalTime, totalCost) {
  const newRow = recordsTable.insertRow();
  newRow.innerHTML = `
    <td>${clientName}</td>
    <td>${clientPhone}</td>
    <td>${nationalID}</td>
    <td>${country}</td>
    <td>${vehicleID}</td>
    <td>${vehicleType}</td>
    <td>${rentalTime} h</td>
    <td>${totalCost} $</td>
    <td>
      <button onclick="editRecord(this)" class="edit"><i class="fas fa-edit"></i></button>
      <button onclick="deleteRecord(this)" class="delete"><i class="fas fa-trash"></i></button>
    </td>`;
}

function editRecord(button) {
  const row = button.parentElement.parentElement;
  editIndex = row.rowIndex - 1;

  document.getElementById('clientName').value = row.cells[0].innerText;
  document.getElementById('clientPhone').value = row.cells[1].innerText;
  document.getElementById('nationalID').value = row.cells[2].innerText;
  document.getElementById('country').value = row.cells[3].innerText;
  document.getElementById('vehicleID').value = row.cells[4].innerText;
  document.getElementById('vehicleType').value = row.cells[5].innerText;
  document.getElementById('rentalTime').value = row.cells[6].innerText.replace(' h', '');
  document.getElementById('costPerHour').value = parseFloat(row.cells[7].innerText.replace(' $', '')) / parseFloat(row.cells[6].innerText.replace(' h', ''));
}

function deleteRecord(button) {
  const row = button.parentElement.parentElement;
  recordsTable.deleteRow(row.rowIndex - 1);
}

function updateRecord(clientName, clientPhone, nationalID, country, vehicleID, vehicleType, rentalTime, totalCost) {
  const row = recordsTable.rows[editIndex];
  row.cells[0].innerText = clientName;
  row.cells[1].innerText = clientPhone;
  row.cells[2].innerText = nationalID;
  row.cells[3].innerText = country;
  row.cells[4].innerText = vehicleID;
  row.cells[5].innerText = vehicleType;
  row.cells[6].innerText = `${rentalTime} h`;
  row.cells[7].innerText = `${totalCost} $`;
  editIndex = -1;
}
