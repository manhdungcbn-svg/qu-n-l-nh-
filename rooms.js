let rooms = JSON.parse(localStorage.getItem('rooms')) || [];

function loadRooms() {
    const tbody = document.querySelector('#roomTable tbody');
    tbody.innerHTML = '';
    rooms.forEach(room => {
        const row = `<tr>
            <td>${room.code}</td>
            <td>${room.name}</td>
            <td>${room.price}</td>
            <td>${room.area}</td>
            <td>${room.status}</td>
            <td>
                <button onclick="editRoom(${room.id})">Sửa</button>
                <button class="delete" onclick="deleteRoom(${room.id})">Xóa</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

document.getElementById('roomForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('roomId').value;
    const room = {
        id: id ? parseInt(id) : Date.now(),
        code: document.getElementById('roomCode').value,
        name: document.getElementById('roomName').value,
        price: parseFloat(document.getElementById('roomPrice').value),
        area: parseFloat(document.getElementById('roomArea').value),
        status: document.getElementById('roomStatus').value
    };
    if (id) {
        const index = rooms.findIndex(r => r.id == id);
        rooms[index] = room;
    } else {
        rooms.push(room);
    }
    saveRooms();
    loadRooms();
    resetRoomForm();
});

function editRoom(id) {
    const room = rooms.find(r => r.id == id);
    document.getElementById('roomId').value = room.id;
    document.getElementById('roomCode').value = room.code;
    document.getElementById('roomName').value = room.name;
    document.getElementById('roomPrice').value = room.price;
    document.getElementById('roomArea').value = room.area;
    document.getElementById('roomStatus').value = room.status;
}

function deleteRoom(id) {
    rooms = rooms.filter(r => r.id != id);
    saveRooms();
    loadRooms();
}

function resetRoomForm() {
    document.getElementById('roomForm').reset();
    document.getElementById('roomId').value = '';
}

function saveRooms() {
    localStorage.setItem('rooms', JSON.stringify(rooms));
}

loadRooms();