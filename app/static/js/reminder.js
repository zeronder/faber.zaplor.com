let reminders = [];

function renderReminders() {
  const tbody = document.getElementById('remindTableBody');
  tbody.innerHTML = '';
  reminders.forEach((r, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${r.name}</td>
        <td>${r.number}</td>
        <td>${r.reason}</td>
        <td>${r.date}</td>
        <td>${r.notes || ''}</td>
      </tr>
    `;
  });
}

document.getElementById('addRemindForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const reminder = {
    name: document.getElementById('remindName').value,
    number: document.getElementById('remindNumber').value,
    reason: document.getElementById('remindReason').value,
    date: document.getElementById('remindDate').value,
    notes: document.getElementById('remindNotes').value
  };
  reminders.push(reminder);
  renderReminders();
  this.reset();
  var modal = bootstrap.Modal.getInstance(document.getElementById('addRemindModal'));
  modal.hide();
});

renderReminders();