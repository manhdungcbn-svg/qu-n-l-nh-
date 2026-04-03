let payments = JSON.parse(localStorage.getItem('payments')) || [];

function loadPayments() {
    const tbody = document.querySelector('#paymentTable tbody');
    tbody.innerHTML = '';
    payments.forEach(payment => {
        const contract = contracts.find(c => c.id === payment.contractId);
        const total = payment.rent + payment.electricity + payment.water + payment.other;
        const row = `<tr>
            <td>${contract ? contract.code : 'N/A'}</td>
            <td>${payment.month}/${payment.year}</td>
            <td>${payment.rent}</td>
            <td>${payment.electricity}</td>
            <td>${payment.water}</td>
            <td>${payment.other}</td>
            <td>${total}</td>
            <td>${payment.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
            <td>
                <button onclick="editPayment(${payment.id})">Sửa</button>
                <button class="delete" onclick="deletePayment(${payment.id})">Xóa</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
    loadPaymentOptions();
}

function loadPaymentOptions() {
    const contractSelect = document.getElementById('paymentContract');
    contractSelect.innerHTML = '<option value="">Chọn hợp đồng</option>';
    contracts.forEach(c => contractSelect.innerHTML += `<option value="${c.id}">${c.code}</option>`);
}

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('paymentId').value;
    const payment = {
        id: id ? parseInt(id) : Date.now(),
        contractId: parseInt(document.getElementById('paymentContract').value),
        month: parseInt(document.getElementById('paymentMonth').value),
        year: parseInt(document.getElementById('paymentYear').value),
        rent: parseFloat(document.getElementById('paymentRent').value),
        electricity: parseFloat(document.getElementById('paymentElectricity').value),
        water: parseFloat(document.getElementById('paymentWater').value),
        other: parseFloat(document.getElementById('paymentOther').value),
        paid: document.getElementById('paymentPaid').checked
    };
    if (id) {
        const index = payments.findIndex(p => p.id === id);
        payments[index] = payment;
    } else {
        payments.push(payment);
    }
    savePayments();
    loadPayments();
    resetPaymentForm();
});

function editPayment(id) {
    const payment = payments.find(p => p.id === id);
    document.getElementById('paymentId').value = payment.id;
    document.getElementById('paymentContract').value = payment.contractId;
    document.getElementById('paymentMonth').value = payment.month;
    document.getElementById('paymentYear').value = payment.year;
    document.getElementById('paymentRent').value = payment.rent;
    document.getElementById('paymentElectricity').value = payment.electricity;
    document.getElementById('paymentWater').value = payment.water;
    document.getElementById('paymentOther').value = payment.other;
    document.getElementById('paymentPaid').checked = payment.paid;
}

function deletePayment(id) {
    payments = payments.filter(p => p.id !== id);
    savePayments();
    loadPayments();
}

function resetPaymentForm() {
    document.getElementById('paymentForm').reset();
    document.getElementById('paymentId').value = '';
}

function savePayments() {
    localStorage.setItem('payments', JSON.stringify(payments));
}