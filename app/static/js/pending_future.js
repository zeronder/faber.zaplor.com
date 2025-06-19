let tickets = [];

function renderTickets() {
  const tbody = document.getElementById('ticketTableBody');
  tbody.innerHTML = '';
  tickets.forEach((t, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.number}</td>
        <td>${t.address || ''}</td>
        <td>${t.appliance || ''}</td>
        <td>${t.time || ''}</td>
        <td contenteditable='true' onblur='updateNotes(${idx}, this.innerText)'>${t.notes || ''}</td>
      </tr>
    `;
  });
}

function updateNotes(idx, notes) {
  tickets[idx].notes = notes;
  saveTickets();
}

document.getElementById('addTicketForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const ticket = {
    name: document.getElementById('name').value,
    number: document.getElementById('number').value,
    address: document.getElementById('address').value,
    appliance: document.getElementById('appliance').value,
    time: document.getElementById('time').value,
    notes: document.getElementById('notes').value
  };
  tickets.push(ticket);
  saveTickets();
  renderTickets();
  this.reset();
  var modal = bootstrap.Modal.getInstance(document.getElementById('addTicketModal'));
  modal.hide();
});

document.getElementById('exportExcelBtn').addEventListener('click', function() {
  const ws = XLSX.utils.json_to_sheet(tickets);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Pending Future');
  XLSX.writeFile(wb, 'pending_future.xlsx');
});

function saveTickets() {
  fetch('/api/pending_future', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tickets)
  });
}

function loadTickets() {
  fetch('/api/pending_future')
    .then(res => res.json())
    .then(data => {
      tickets = data;
      renderTickets();
    });
}

loadTickets();