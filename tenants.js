let tenants = JSON.parse(localStorage.getItem('tenants')) || [];

function loadTenants() {
    const tbody = document.querySelector('#tenantTable tbody');
    tbody.innerHTML = '';
    tenants.forEach(tenant => {
        const row = `<tr>
            <td>${tenant.name}</td>
            <td>${tenant.phone}</td>
            <td>${tenant.idCard}</td>
            <td>${tenant.address}</td>
            <td>
                <button onclick="editTenant(${tenant.id})">Sửa</button>
                <button class="delete" onclick="deleteTenant(${tenant.id})">Xóa</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

document.getElementById('tenantForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('tenantId').value;
    const tenant = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('tenantName').value,
        phone: document.getElementById('tenantPhone').value,
        idCard: document.getElementById('tenantIdCard').value,
        address: document.getElementById('tenantAddress').value
    };
    if (id) {
        const index = tenants.findIndex(t => t.id == id);
        tenants[index] = tenant;
    } else {
        tenants.push(tenant);
    }
    saveTenants();
    loadTenants();
    resetTenantForm();
});

function editTenant(id) {
    const tenant = tenants.find(t => t.id == id);
    document.getElementById('tenantId').value = tenant.id;
    document.getElementById('tenantName').value = tenant.name;
    document.getElementById('tenantPhone').value = tenant.phone;
    document.getElementById('tenantIdCard').value = tenant.idCard;
    document.getElementById('tenantAddress').value = tenant.address;
}

function deleteTenant(id) {
    tenants = tenants.filter(t => t.id != id);
    saveTenants();
    loadTenants();
}

function resetTenantForm() {
    document.getElementById('tenantForm').reset();
    document.getElementById('tenantId').value = '';
}

function saveTenants() {
    localStorage.setItem('tenants', JSON.stringify(tenants));
}

function searchTenants() {
    const query = document.getElementById('tenantSearch').value.toLowerCase();
    const filtered = tenants.filter(t => t.name.toLowerCase().includes(query) || t.phone.includes(query));
    const tbody = document.querySelector('#tenantTable tbody');
    tbody.innerHTML = '';
    filtered.forEach(tenant => {
        const row = `<tr>
            <td>${tenant.name}</td>
            <td>${tenant.phone}</td>
            <td>${tenant.idCard}</td>
            <td>${tenant.address}</td>
            <td>
                <button onclick="editTenant(${tenant.id})">Sửa</button>
                <button class="delete" onclick="deleteTenant(${tenant.id})">Xóa</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

loadTenants();