// Helper to create action icons for number
function createActionIcons(number) {
  const call = `<a href='tel:${number}' class='me-2' title='Call'><i class='fa fa-phone text-success fa-lg' style='font-size: 1.7em;'></i></a>`;
const wa = `<a href='https://wa.me/91${number}' target='_blank' class='me-2' title='WhatsApp'><i class='fab fa-whatsapp text-success fa-lg' style='font-size: 1.7em;'></i></a>`;
  // Only two icons, horizontal
  return `<div class='d-flex flex-row justify-content-center mt-1'>${call}${wa}</div>`;
}

// Ticket storage (in-memory for now)
let tickets = [];

function renderTickets() {
  const tbody = document.getElementById('ticketTableBody');
  tbody.innerHTML = '';
  tickets.forEach((t, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.number}${createActionIcons(t.number)}</td>
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
  renderTickets();
  this.reset();
  var modal = bootstrap.Modal.getInstance(document.getElementById('addTicketModal'));
  modal.hide();
});
// Initial render
renderTickets();