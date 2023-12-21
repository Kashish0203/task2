let productsData = [];

function importData() 
{
  const input = document.getElementById('jsonFile');
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      productsData = JSON.parse(e.target.result);
      renderTable();
      renderDisplayOptions();
    };
    reader.readAsText(file);
  }
}

function renderTable() {
  const table = document.getElementById('productTable');
  table.innerHTML = ''; 

  productsData.sort((a, b) => b.Popularity - a.Popularity);

  
  const headers = ['Title', 'Price'];
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  
  const tbody = document.createElement('tbody');
  productsData.forEach(product => {
    const row = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = product[header];
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
}

function renderDisplayOptions() {
  const availableFields = document.getElementById('availableFields');
  const displayFields = document.getElementById('displayFields');

  
  availableFields.innerHTML = '';
  displayFields.innerHTML = '';

  
  Object.keys(productsData[0]).forEach(field => {
    const option = document.createElement('option');
    option.value = field;
    option.textContent = field;
    availableFields.appendChild(option);
  });
}

function addSelected() {
  moveOptions('availableFields', 'displayFields');
}

function removeSelected() {
  moveOptions('displayFields', 'availableFields');
}

function moveOptions(sourceId, targetId) {
  const source = document.getElementById(sourceId);
  const target = document.getElementById(targetId);

  for (let i = 0; i < source.options.length; i++) {
    const option = source.options[i];

    if (option.selected) {
      target.appendChild(option);
      i--; 
    }
  }
}
