// This file generates reports based on the data collected from rooms, tenants, contracts, and payments.
// It provides statistical insights and summaries for the dormitory management system.

function updateReports(rooms, payments) {
    const available = rooms.filter(r => r.status === 'Trống').length;
    const occupied = rooms.filter(r => r.status === 'Đã thuê').length;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const monthlyPayments = payments.filter(p => p.month === currentMonth && p.year === currentYear && p.paid);
    const revenue = monthlyPayments.reduce((sum, p) => sum + p.rent + p.electricity + p.water + p.other, 0);

    return {
        availableRooms: available,
        occupiedRooms: occupied,
        monthlyRevenue: revenue
    };
}

function generateReport(rooms, tenants, contracts, payments) {
    const report = {
        availableRooms: rooms.filter(r => r.status === 'Trống').map(r => r.name),
        occupiedRooms: rooms.filter(r => r.status === 'Đã thuê').map(r => r.name),
        paymentHistory: payments.map(p => ({
            contractCode: contracts.find(c => c.id === p.contractId)?.code,
            date: `${p.month}/${p.year}`,
            status: p.paid ? 'Đã thanh toán' : 'Chưa thanh toán'
        }))
    };

    return report;
}

function displayReport(report) {
    let reportOutput = `<h3>Báo cáo chi tiết</h3>`;
    reportOutput += `<p>Danh sách phòng trống:</p><ul>${report.availableRooms.map(r => `<li>${r}</li>`).join('')}</ul>`;
    reportOutput += `<p>Danh sách phòng đã thuê:</p><ul>${report.occupiedRooms.map(r => `<li>${r}</li>`).join('')}</ul>`;
    reportOutput += `<p>Lịch sử thanh toán:</p><ul>${report.paymentHistory.map(p => `<li>Hợp đồng ${p.contractCode}: ${p.date} - ${p.status}</li>`).join('')}</ul>`;
    
    document.getElementById('reportOutput').innerHTML = reportOutput;
}