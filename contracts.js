// contracts.js

// Data storage
let contracts = JSON.parse(localStorage.getItem('contracts')) || [];

// Load contracts
function loadContracts() {
    const tbody = document.querySelector('#contractTable tbody');
    tbody.innerHTML = '';
    contracts.forEach(contract => {
        const tenant = tenants.find(t => t.id == contract.tenantId);
        const room = rooms.find(r => r.id == contract.roomId);
        const row = `<tr>
            <td>${contract.code}</td>
            <td>${tenant ? tenant.name : 'N/A'}</td>
            <td>${room ? room.name : 'N/A'}</td>
            <td>${contract.startDate}</td>
            <td>${contract.endDate || 'Chưa kết thúc'}</td>
            <td>
                <button onclick="editContract(${contract.id})">Sửa</button>
                <button class="delete" onclick="deleteContract(${contract.id})">Xóa</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
    loadContractOptions();
}

// Load contract options for dropdowns
function loadContractOptions() {
    const tenantSelect = document.getElementById('contractTenant');
    const roomSelect = document.getElementById('contractRoom');
    tenantSelect.innerHTML = '<option value="">Chọn người thuê</option>';
    tenants.forEach(t => tenantSelect.innerHTML += `<option value="${t.id}">${t.name}</option>`);
    roomSelect.innerHTML = '<option value="">Chọn phòng</option>';
    rooms.forEach(r => roomSelect.innerHTML += `<option value="${r.id}">${r.name}</option>`);
}

// Add event listener for contract form submission
document.getElementById('contractForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('contractId').value;
    const contract = {
        id: id ? parseInt(id) : Date.now(),
        code: document.getElementById('contractCode').value,
        tenantId: parseInt(document.getElementById('contractTenant').value),
        roomId: parseInt(document.getElementById('contractRoom').value),
        startDate: document.getElementById('contractStart').value,
        endDate: document.getElementById('contractEnd').value || null
    };
    if (id) {
        const index = contracts.findIndex(c => c.id == id);
        contracts[index] = contract;
    } else {
        contracts.push(contract);
    }
    saveContracts();
    loadContracts();
    resetContractForm();
});

// Edit contract
function editContract(id) {
    const contract = contracts.find(c => c.id == id);
    document.getElementById('contractId').value = contract.id;
    document.getElementById('contractCode').value = contract.code;
    document.getElementById('contractTenant').value = contract.tenantId;
    document.getElementById('contractRoom').value = contract.roomId;
    document.getElementById('contractStart').value = contract.startDate;
    document.getElementById('contractEnd').value = contract.endDate;
}

// Delete contract
function deleteContract(id) {
    contracts = contracts.filter(c => c.id != id);
    saveContracts();
    loadContracts();
}

// Reset contract form
function resetContractForm() {
    document.getElementById('contractForm').reset();
    document.getElementById('contractId').value = '';
}

// Save contracts to local storage
function saveContracts() {
    localStorage.setItem('contracts', JSON.stringify(contracts));
}

// Initial load
loadContracts();