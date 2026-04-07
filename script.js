/**
 * SWIFT (Smart Wallet for Instant Fund Transfers) - Core Logic
 * Clean, modular Vanilla JS for Admin Dashboards
 */

// --- DUMMY DATA ---
const INITIAL_DATA = {
    users: [
        { id: 1, email: 'admin@swift.com', password: 'admin', role: 'super_admin', name: 'Super Admin', avatar: '👨‍💼' },
        { id: 2, email: 'cafe@swift.com', password: 'cafe', role: 'vendor_admin', name: 'REC CAFE', avatar: '☕', vendorId: 101 },
        { id: 3, email: 'hut@swift.com', password: 'hut', role: 'vendor_admin', name: 'HUT CAFE', avatar: '🛖', vendorId: 102 },
        { id: 4, email: 'garden@swift.com', password: 'garden', role: 'vendor_admin', name: 'SIXTH SENSE GARDEN', avatar: '⛲', vendorId: 103 },
        { id: 5, email: 'mart@swift.com', password: 'mart', role: 'vendor_admin', name: 'REC MART', avatar: '🛒', vendorId: 104 },
        { id: 6, email: 'fresh@swift.com', password: 'fresh', role: 'vendor_admin', name: 'Fresh Crush', avatar: '🥤', vendorId: 105 }
    ],
    students: [
        { id: 'S1001', name: 'Adharsh Kumar', rollNo: 'REC2024001', email: 'adharsh@example.com', balance: 1250.50, status: 'active' },
        { id: 'S1002', name: 'Priya Sharma', rollNo: 'REC2024002', email: 'priya@example.com', balance: 450.00, status: 'active' },
        { id: 'S1003', name: 'Rahul Varma', rollNo: 'REC2024003', email: 'rahul@example.com', balance: 80.00, status: 'blocked' },
        { id: 'S1004', name: 'Sanya Iyer', rollNo: 'REC2024004', email: 'sanya@example.com', balance: 2100.25, status: 'active' },
        { id: 'S1005', name: 'Amit Patel', rollNo: 'REC2024005', email: 'amit@example.com', balance: 500.00, status: 'active' },
        { id: 'S1006', name: 'Sneha Reddy', rollNo: 'REC2024006', email: 'sneha@example.com', balance: 750.00, status: 'active' },
        { id: 'S1007', name: 'Vikram Singh', rollNo: 'REC2024007', email: 'vikram@example.com', balance: 120.00, status: 'active' },
        { id: 'S1008', name: 'Anjali Gupta', rollNo: 'REC2024008', email: 'anjali@example.com', balance: 3000.00, status: 'active' },
        { id: 'S1009', name: 'Karthik Raja', rollNo: 'REC2024009', email: 'karthik@example.com', balance: 25.00, status: 'active' },
        { id: 'S1010', name: 'Megha Nair', rollNo: 'REC2024010', email: 'megha@example.com', balance: 1540.75, status: 'active' }
    ],
    vendors: [
        { id: 101, name: 'REC CAFE', owner: 'John Doe', email: 'cafe@swift.com', status: 'enabled', revenue: 5420.00, joinDate: '2025-01-15' },
        { id: 102, name: 'HUT CAFE', owner: 'Jane Smith', email: 'hut@swift.com', status: 'enabled', revenue: 12450.50, joinDate: '2025-01-20' },
        { id: 103, name: 'SIXTH SENSE GARDEN', owner: 'Alice Wonder', email: 'garden@swift.com', status: 'enabled', revenue: 3200.00, joinDate: '2025-02-10' },
        { id: 104, name: 'REC MART', owner: 'Mike Ross', email: 'mart@swift.com', status: 'enabled', revenue: 8600.00, joinDate: '2025-01-05' },
        { id: 105, name: 'Fresh Crush', owner: 'Bob Juice', email: 'fresh@swift.com', status: 'enabled', revenue: 1200.00, joinDate: '2025-03-01' }
    ],
        products: [
            // Vendor 101 & 102 (REC CAFE & HUT CAFE)
            ...[101, 102].flatMap(vId => [
                { id: `P${vId}-c1`, vendorId: vId, name: 'Dairy Milk', price: 20, stock: 100, active: true, category: 'Chocolates', image: 'product_dairymilk_1775389704475.png' },
                { id: `P${vId}-c2`, vendorId: vId, name: 'KitKat', price: 25, stock: 80, active: true, category: 'Chocolates', image: 'product_kitkat_1773157062457.png' },
                { id: `P${vId}-c3`, vendorId: vId, name: 'Munch', price: 10, stock: 150, active: true, category: 'Chocolates', image: 'product_munch_1775389746154.png' },
                { id: `P${vId}-c4`, vendorId: vId, name: 'Snickers', price: 40, stock: 60, active: true, category: 'Chocolates', image: 'product_snickers_1775389872144.png' },
                { id: `P${vId}-c5`, vendorId: vId, name: 'Fuse', price: 35, stock: 70, active: true, category: 'Chocolates', image: 'product_snickers_1775389872144.png' }, // Fallback
                { id: `P${vId}-b1`, vendorId: vId, name: 'Lemonade', price: 15, stock: 100, active: true, category: 'Cold Beverages', image: 'rec_cafe_image_1773156781463.png' },
                { id: `P${vId}-b2`, vendorId: vId, name: 'Rose Milk', price: 25, stock: 50, active: true, category: 'Cold Beverages', image: 'rec_cafe_image_1773156781463.png' },
                { id: `P${vId}-b3`, vendorId: vId, name: 'Badam Milk', price: 30, stock: 40, active: true, category: 'Cold Beverages', image: 'rec_cafe_image_1773156781463.png' },
                { id: `P${vId}-b4`, vendorId: vId, name: 'Sweet Lassi', price: 35, stock: 30, active: true, category: 'Cold Beverages', image: 'rec_cafe_image_1773156781463.png' },
                { id: `P${vId}-b5`, vendorId: vId, name: 'Double Choco Milkshake', price: 60, stock: 20, active: true, category: 'Cold Beverages', image: 'rec_cafe_image_1773156781463.png' },
                { id: `P${vId}-bi1`, vendorId: vId, name: 'Hide & Seek', price: 30, stock: 100, active: true, category: 'Biscuits', image: 'product_lays_1773157127641.png' },
                { id: `P${vId}-bi2`, vendorId: vId, name: 'GoodDay', price: 20, stock: 200, active: true, category: 'Biscuits', image: 'product_lays_1773157127641.png' },
                { id: `P${vId}-ca1`, vendorId: vId, name: 'Brownie', price: 45, stock: 30, active: true, category: 'Cakes', image: 'media__1773155894023.png' },
                { id: `P${vId}-ca2`, vendorId: vId, name: 'Muffin', price: 35, stock: 25, active: true, category: 'Cakes', image: 'media__1773155894023.png' },
                { id: `P${vId}-ch1`, vendorId: vId, name: 'Lays', price: 20, stock: 150, active: true, category: 'Chips', image: 'product_lays_1773157127641.png' },
                { id: `P${vId}-bf1`, vendorId: vId, name: 'Plain Dosa', price: 35, stock: 50, active: true, category: 'Breakfast', image: 'media__1773155894023.png' },
                { id: `P${vId}-bf2`, vendorId: vId, name: 'Egg Dosa', price: 50, stock: 40, active: true, category: 'Breakfast', image: 'media__1773155894023.png' },
                { id: `P${vId}-sk1`, vendorId: vId, name: 'Veg Puff', price: 15, stock: 60, active: true, category: 'Snacks', image: 'product_vegpuff_1775389943136.png' },
                { id: `P${vId}-sk2`, vendorId: vId, name: 'Samosa', price: 10, stock: 100, active: true, category: 'Snacks', image: 'product_vegpuff_1775389943136.png' }, // Fallback
                { id: `P${vId}-ln1`, vendorId: vId, name: 'Veg Biryani', price: 120, stock: 40, active: true, category: 'Lunch', image: 'rec_cafe_image_1773156781463.png' },
                { id: `P${vId}-ln2`, vendorId: vId, name: 'Fried Rice', price: 90, stock: 45, active: true, category: 'Lunch', image: 'rec_cafe_image_1773156781463.png' }
            ]),
            
            // Vendor 103 (SIXTH SENSE GARDEN)
            { id: 'P103-h1', vendorId: 103, name: 'Bhel Puri', price: 35, stock: 100, active: true, category: 'Chats', image: 'media__1773155894023.png' },
            { id: 'P103-h2', vendorId: 103, name: 'Pani Puri', price: 30, stock: 100, active: true, category: 'Chats', image: 'media__1773155894023.png' },
            { id: 'P103-h3', vendorId: 103, name: 'Pav Bhaji', price: 60, stock: 50, active: true, category: 'Chats', image: 'media__1773155894023.png' },
            { id: 'P103-m1', vendorId: 103, name: 'Oreo Milkshake', price: 80, stock: 30, active: true, category: 'Milkshakes/Juices', image: 'rec_cafe_image_1773156781463.png' },
            { id: 'P103-m2', vendorId: 103, name: 'Mango Juice', price: 45, stock: 40, active: true, category: 'Milkshakes/Juices', image: 'rec_cafe_image_1773156781463.png' },
    
            // Vendor 104 (REC MART)
            { id: 'P104-c1', vendorId: 104, name: 'Dairy Milk', price: 20, stock: 100, active: true, category: 'Chocolates', image: 'product_dairymilk_1775389704475.png' },
            { id: 'P104-b1', vendorId: 104, name: 'Buttermilk', price: 15, stock: 50, active: true, category: 'Cold Beverages', image: 'rec_cafe_image_1773156781463.png' },
            { id: 'P104-b2', vendorId: 104, name: 'Coke', price: 20, stock: 100, active: true, category: 'Cold Beverages', image: 'product_coke_1773157090311.png' },
            { id: 'P104-st1', vendorId: 104, name: 'Pen', price: 10, stock: 500, active: true, category: 'Stationary', image: 'media__1773155894023.png' },
            { id: 'P104-st2', vendorId: 104, name: 'Calculator', price: 450, stock: 15, active: true, category: 'Stationary', image: 'media__1773155894023.png' },
            { id: 'P104-st3', vendorId: 104, name: 'A4 Sheets (Bundle)', price: 180, stock: 20, active: true, category: 'Stationary', image: 'media__1773155894023.png' },
            { id: 'P104-gr1', vendorId: 104, name: 'Shampoo', price: 5, stock: 200, active: true, category: 'Grocery', image: 'media__1773155894023.png' },
            { id: 'P104-gr2', vendorId: 104, name: 'Battery', price: 30, stock: 100, active: true, category: 'Grocery', image: 'media__1773155894023.png' },
            { id: 'P104-gr3', vendorId: 104, name: 'Oil (1L)', price: 120, stock: 30, active: true, category: 'Grocery', image: 'media__1773155894023.png' },
    
            // Vendor 105 (Fresh Crush)
            { id: 'P105-j1', vendorId: 105, name: 'Sugarcane Juice', price: 25, stock: 200, active: true, category: 'Juices', image: 'rec_cafe_image_1773156781463.png' },
            { id: 'P105-j2', vendorId: 105, name: 'Lemon Juice', price: 30, stock: 200, active: true, category: 'Juices', image: 'rec_cafe_image_1773156781463.png' }
        ],
    transactions: [
        { id: 'TXN001', studentId: 'S1001', vendorId: 101, amount: 45, date: '2026-03-29T10:30:00', status: 'completed', type: 'purchase', product: 'Sandwich' },
        { id: 'TXN002', studentId: 'S1002', vendorId: 102, amount: 120, date: '2026-03-29T11:15:00', status: 'completed', type: 'purchase', product: 'Pen Set' },
        { id: 'TXN003', studentId: 'S1004', vendorId: 101, amount: 20, date: '2026-03-29T12:00:00', status: 'completed', type: 'purchase', product: 'Coffee' },
        { id: 'TXN004', studentId: 'S1001', vendorId: 101, amount: 15, date: '2026-03-28T15:45:00', status: 'completed', type: 'purchase', product: 'Samosa' },
        { id: 'TXN005', studentId: 'S1005', vendorId: 103, amount: 35, date: '2026-04-01T09:10:00', status: 'completed', type: 'purchase', product: 'Bhel Puri' },
        { id: 'TXN006', studentId: 'S1006', vendorId: 104, amount: 20, date: '2026-04-01T13:45:00', status: 'completed', type: 'purchase', product: 'Coke' },
        { id: 'TXN007', studentId: 'S1008', vendorId: 105, amount: 30, date: '2026-04-02T10:20:00', status: 'completed', type: 'purchase', product: 'Lemon Sugarcane Juice' },
        { id: 'TXN008', studentId: 'S1010', vendorId: 102, amount: 90, date: '2026-04-02T12:30:00', status: 'completed', type: 'purchase', product: 'Fried Rice' },
        { id: 'TXN009', studentId: 'S1001', vendorId: 104, amount: 450, date: '2026-04-03T15:00:00', status: 'completed', type: 'purchase', product: 'Calculator' },
        { id: 'TXN010', studentId: 'S1004', vendorId: 101, amount: 120, date: '2026-04-03T17:15:00', status: 'completed', type: 'purchase', product: 'Veg Biryani' },
        { id: 'TXN011', studentId: 'S1005', vendorId: 102, amount: 35, date: '2026-04-04T08:30:00', status: 'completed', type: 'purchase', product: 'Muffin' },
        { id: 'TXN012', studentId: 'S1006', vendorId: 103, amount: 60, date: '2026-04-04T12:45:00', status: 'completed', type: 'purchase', product: 'Pav Bhaji' },
        { id: 'TXN013', studentId: 'S1008', vendorId: 101, amount: 20, date: '2026-04-05T10:00:00', status: 'completed', type: 'purchase', product: 'Lays' },
        { id: 'TXN014', studentId: 'S1010', vendorId: 104, amount: 10, date: '2026-04-05T14:20:00', status: 'completed', type: 'purchase', product: 'Pen' }
    ],
    settlements: [
        { id: 'SET001', date: '2026-03-28', vendorId: 101, amount: 1250, status: 'processed' },
        { id: 'SET002', date: '2026-03-28', vendorId: 102, amount: 3400, status: 'processed' }
    ]
};

// --- DATA SERVICE ---
const DataService = {
    init() {
        const stored = localStorage.getItem('swift_data');
        const data = stored ? JSON.parse(stored) : null;
        
        // Force update if schema changed or missing products/images
        const needsUpdate = !stored || 
                           data.vendors.length < INITIAL_DATA.vendors.length ||
                           (data.products.length > 0 && !data.products[0].image);

        if (needsUpdate) {
            localStorage.setItem('swift_data', JSON.stringify(INITIAL_DATA));
        }
    },

    getData() {
        return JSON.parse(localStorage.getItem('swift_data'));
    },

    saveData(data) {
        localStorage.setItem('swift_data', JSON.stringify(data));
        // Dispatch event for UI updates if needed
        window.dispatchEvent(new Event('dataUpdated'));
    },

    // Generic CRUD helpers
    getAll(collection) {
        return this.getData()[collection];
    },

    getById(collection, id) {
        return this.getAll(collection).find(item => item.id === id);
    },

    add(collection, item) {
        const data = this.getData();
        data[collection].push(item);
        this.saveData(data);
    },

    update(collection, id, updates) {
        const data = this.getData();
        const index = data[collection].findIndex(item => item.id === id);
        if (index !== -1) {
            data[collection][index] = { ...data[collection][index], ...updates };
            this.saveData(data);
        }
    },

    delete(collection, id) {
        const data = this.getData();
        data[collection] = data[collection].filter(item => item.id !== id);
        this.saveData(data);
    }
};

// --- AUTH SERVICE ---
const AuthService = {
    login(email, password) {
        const users = DataService.getAll('users');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('swift_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    },

    logout() {
        localStorage.removeItem('swift_user');
        window.location.href = 'index.html';
    },

    getCurrentUser() {
        const user = localStorage.getItem('swift_user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!this.getCurrentUser();
    }
};

// --- UI NOTIFICATION SYSTEM ---
const Notification = {
    show(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} slide-in-right`;
        toast.innerHTML = `
            <div class="toast-icon">${type === 'success' ? '✅' : '❌'}</div>
            <div class="toast-content">${message}</div>
        `;
        const container = document.getElementById('toast-container') || this.createContainer();
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
};

// --- EXPORT TO CSV ---
function exportToCSV(filename, rows) {
    if (!rows || !rows.length) return;
    const processRow = row => {
        let finalVal = '';
        for (let j = 0; j < row.length; j++) {
            let innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            let result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    let csvFile = '';
    for (let i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// --- VIEW RENDERERS (SUPER ADMIN) ---
window.renderSuperDash = function() {
    const students = DataService.getAll('students');
    const vendors = DataService.getAll('vendors');
    const txns = DataService.getAll('transactions');
    const revenue = txns.reduce((sum, t) => sum + t.amount, 0);

    const container = document.getElementById('content-view');
    container.innerHTML = `
        <div class="stats-grid">
            ${renderStatCard('Total Students', students.length, '🎓', 'indigo')}
            ${renderStatCard('Total Vendors', vendors.length, '🏪', 'amber')}
            ${renderStatCard('Total Transactions', txns.length, '💸', 'emerald')}
            ${renderStatCard('Total Revenue', '₹' + revenue.toFixed(2), '💰', 'blue')}
        </div>
        <div class="charts-grid">
            <div class="card">
                <h3>Revenue Trends</h3>
                <div class="chart-container"><canvas id="revenueChart"></canvas></div>
            </div>
            <div class="card">
                <h3>Recent Transactions</h3>
                <div class="table-container mt-20">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Vendor</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${txns.slice(-5).map(t => `
                                <tr>
                                    <td>${t.studentId}</td>
                                    <td>${vendors.find(v => v.id === t.vendorId)?.name || t.vendorId}</td>
                                    <td>₹${t.amount}</td>
                                    <td><span class="badge ${t.status === 'completed' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Simple Chart
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Revenue',
                data: [400, 600, 350, 900, revenue],
                borderColor: '#6366f1',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.1)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
};

window.renderSuperStudents = function() {
    const students = DataService.getAll('students');
    const container = document.getElementById('content-view');
    
    container.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <input type="text" class="search-input" placeholder="Search students by name or roll..." id="student-search">
                <button class="btn btn-outline" onclick="exportToCSV('students.csv', [['ID', 'Name', 'Roll', 'Balance', 'Status'], ...students.map(s => [s.id, s.name, s.rollNo, s.balance, s.status])])">
                    <i class="fa fa-download"></i> Export
                </button>
            </div>
            <table id="students-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderStudentRows(students)}
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('student-search').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = students.filter(s => s.name.toLowerCase().includes(query) || s.rollNo.toLowerCase().includes(query));
        document.querySelector('#students-table tbody').innerHTML = renderStudentRows(filtered);
    });
};

function renderStudentRows(students) {
    return students.map(s => `
        <tr>
            <td>
                <div style="font-weight: 600;">${s.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${s.email}</div>
            </td>
            <td>${s.rollNo}</td>
            <td><b>₹${s.balance.toFixed(2)}</b></td>
            <td><span class="badge ${s.status === 'active' ? 'badge-success' : 'badge-danger'}">${s.status}</span></td>
            <td>
                <button class="btn btn-outline btn-icon" onclick="toggleStudentStatus('${s.id}')" title="${s.status === 'active' ? 'Block' : 'Unblock'}">
                    <i class="fa ${s.status === 'active' ? 'fa-user-slash' : 'fa-user-check'}"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

window.toggleStudentStatus = function(id) {
    const student = DataService.getById('students', id);
    const newStatus = student.status === 'active' ? 'blocked' : 'active';
    DataService.update('students', id, { status: newStatus });
    Notification.show(`Student ${student.name} ${newStatus === 'active' ? 'unblocked' : 'blocked'} successfully`);
    renderSuperStudents(); // Re-render
};

window.renderSuperTransactions = function() {
    const txns = DataService.getAll('transactions');
    const vendors = DataService.getAll('vendors');
    const container = document.getElementById('content-view');

    container.innerHTML = `
        <div class="table-container">
            <div class="table-header">
                <div style="display: flex; gap: 10px;">
                    <select class="search-input" id="txn-vendor-filter" style="min-width: 150px;">
                        <option value="all">All Vendors</option>
                        ${vendors.map(v => `<option value="${v.id}">${v.name}</option>`).join('')}
                    </select>
                </div>
                <button class="btn btn-outline" onclick="exportToCSV('transactions.csv', [['ID', 'Student', 'Vendor', 'Amount', 'Date', 'Status'], ...txns.map(t => [t.id, t.studentId, t.vendorId, t.amount, t.date, t.status])])">
                    <i class="fa fa-download"></i> Export
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Student</th>
                        <th>Vendor</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="txn-tbody">
                    ${renderTxnRows(txns, vendors)}
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('txn-vendor-filter').addEventListener('change', (e) => {
        const vendorId = e.target.value;
        const filtered = vendorId === 'all' ? txns : txns.filter(t => t.vendorId.toString() === vendorId);
        document.getElementById('txn-tbody').innerHTML = renderTxnRows(filtered, vendors);
    });
};

function renderTxnRows(txns, vendors) {
    return txns.map(t => `
        <tr>
            <td><code style="font-size: 0.8rem;">${t.id}</code></td>
            <td>${t.studentId}</td>
            <td>${vendors.find(v => v.id === t.vendorId)?.name || t.vendorId}</td>
            <td>₹${t.amount.toFixed(2)}</td>
            <td>${new Date(t.date).toLocaleDateString()}</td>
            <td><span class="badge badge-success">${t.status}</span></td>
        </tr>
    `).join('');
}

window.renderSuperSettlement = function() {
    const settlements = DataService.getAll('settlements');
    const vendors = DataService.getAll('vendors');
    const container = document.getElementById('content-view');

    container.innerHTML = `
        <div class="mb-20" style="display: flex; justify-content: space-between; align-items: center;">
            <p style="color: var(--text-muted);">Daily vendor payouts and reconciliation logs.</p>
            <button class="btn btn-primary" onclick="runSettlement()">
                <i class="fa fa-sync"></i> Run Daily Settlement
            </button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Settlement ID</th>
                        <th>Date</th>
                        <th>Vendor</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${settlements.map(s => `
                        <tr>
                            <td><code>${s.id}</code></td>
                            <td>${s.date}</td>
                            <td>${vendors.find(v => v.id === s.vendorId)?.name || s.vendorId}</td>
                            <td>₹${s.amount.toFixed(2)}</td>
                            <td><span class="badge badge-success">${s.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

window.runSettlement = function() {
    const vendors = DataService.getAll('vendors');
    const today = new Date().toISOString().split('T')[0];
    
    // In a real app, this would calculate today's un-settled transactions
    vendors.forEach(v => {
        if (v.revenue > 0) {
            const newSettlement = {
                id: 'SET' + Date.now() + v.id,
                date: today,
                vendorId: v.id,
                amount: v.revenue,
                status: 'processed'
            };
            DataService.add('settlements', newSettlement);
            // Reset revenue for next period in mock
            DataService.update('vendors', v.id, { revenue: 0 });
        }
    });

    Notification.show('Daily settlement processed for all vendors');
    renderSuperSettlement();
};

window.renderSuperAnalytics = function() {
    const container = document.getElementById('content-view');
    const vendors = DataService.getAll('vendors');
    const allTxns = DataService.getAll('transactions');
    
    container.innerHTML = `
        <div class="charts-grid">
            <div class="card">
                <h3>System-Wide Revenue Share</h3>
                <div class="chart-container"><canvas id="revenueShareChart"></canvas></div>
            </div>
            <div class="card">
                <h3>Vendor Sales Performance</h3>
                <div class="chart-container"><canvas id="vendorBarChart"></canvas></div>
            </div>
            <div class="card">
                <h3>Revenue by Category</h3>
                <div class="chart-container"><canvas id="categoryPieChart"></canvas></div>
            </div>
            <div class="card">
                <h3>Daily Transaction Volume</h3>
                <div class="chart-container"><canvas id="historyLineChart"></canvas></div>
            </div>
        </div>
    `;

    new Chart(document.getElementById('revenueShareChart'), {
        type: 'doughnut',
        data: {
            labels: vendors.map(v => v.name),
            datasets: [{
                data: vendors.map(v => v.revenue),
                backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6']
            }]
        },
        options: { plugins: { legend: { position: 'bottom' } } }
    });

    new Chart(document.getElementById('vendorBarChart'), {
        type: 'bar',
        data: {
            labels: vendors.map(v => v.name),
            datasets: [{
                label: 'Revenue (₹)',
                data: vendors.map(v => v.revenue),
                backgroundColor: '#6366f1'
            }]
        }
    });

    // Mock category data based on real vendors
    new Chart(document.getElementById('categoryPieChart'), {
        type: 'pie',
        data: {
            labels: ['Chocolates', 'Beverages', 'Grocery', 'Cakes', 'Stationary', 'Lunch/Breakfast'],
            datasets: [{
                data: [3500, 2800, 1500, 1200, 900, 5000],
                backgroundColor: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
            }]
        }
    });

    new Chart(document.getElementById('historyLineChart'), {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Transactions',
                data: [45, 78, 52, 91, 123, 105, 140],
                borderColor: '#10b981',
                tension: 0.3,
                fill: true,
                backgroundColor: 'rgba(16, 185, 129, 0.1)'
            }]
        }
    });
};

window.renderSuperSalesReport = function() {
    const txns = DataService.getAll('transactions');
    const vendors = DataService.getAll('vendors');
    const container = document.getElementById('content-view');

    // Calculate summaries
    const vendorSales = {};
    vendors.forEach(v => vendorSales[v.id] = { name: v.name, total: 0, count: 0 });
    
    txns.forEach(t => {
        if (vendorSales[t.vendorId]) {
            vendorSales[t.vendorId].total += t.amount;
            vendorSales[t.vendorId].count += 1;
        }
    });

    const totalRevenue = txns.reduce((sum, t) => sum + t.amount, 0);

    container.innerHTML = `
        <div class="stats-grid">
            ${renderStatCard('Total Sales', '₹' + totalRevenue.toFixed(2), '💰', 'emerald')}
            ${renderStatCard('Avg. Order Value', '₹' + (totalRevenue / txns.length).toFixed(2), '📊', 'indigo')}
            ${renderStatCard('Top Vendor', Object.values(vendorSales).sort((a, b) => b.total - a.total)[0].name, '🏆', 'amber')}
        </div>
        
        <div class="card mt-20">
            <div class="table-header">
                <h3>Sales by Vendor</h3>
                <button class="btn btn-outline" onclick="exportToCSV('sales_report.csv', [['Vendor', 'Sales Count', 'Total Revenue'], ...Object.values(vendorSales).map(v => [v.name, v.count, v.total])])">
                    <i class="fa fa-download"></i> Export Report
                </button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Vendor Name</th>
                            <th>Transaction Count</th>
                            <th>Total Revenue</th>
                            <th>Market Share</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.values(vendorSales).map(v => `
                            <tr>
                                <td><b>${v.name}</b></td>
                                <td>${v.count} orders</td>
                                <td>₹${v.total.toFixed(2)}</td>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="flex: 1; height: 8px; background: var(--bg-input); border-radius: 4px; overflow: hidden;">
                                            <div style="width: ${(v.total / totalRevenue * 100).toFixed(0)}%; height: 100%; background: var(--primary);"></div>
                                        </div>
                                        <span style="font-size: 0.8rem; font-weight: 600;">${(v.total / totalRevenue * 100).toFixed(1)}%</span>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="card mt-20">
            <h3>Daily Revenue Summary</h3>
            <div class="chart-container" style="height: 300px;">
                <canvas id="salesSummaryChart"></canvas>
            </div>
        </div>
    `;

    // Group transactions by date for the chart
    const dailyData = {};
    txns.forEach(t => {
        const date = t.date.split('T')[0];
        dailyData[date] = (dailyData[date] || 0) + t.amount;
    });

    const labels = Object.keys(dailyData).sort();
    const data = labels.map(l => dailyData[l]);

    new Chart(document.getElementById('salesSummaryChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily Revenue (₹)',
                data: data,
                backgroundColor: '#6366f1',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
};

// --- VIEW RENDERERS (VENDORS) ---
window.renderVendorDash = function() {
    const user = AuthService.getCurrentUser();
    const allTxns = DataService.getAll('transactions');
    const vendorTxns = allTxns.filter(t => t.vendorId === user.vendorId);
    
    const currentVendor = DataService.getById('vendors', user.vendorId);
    if (!currentVendor || user.role !== 'super_admin' && user.vendorId !== currentVendor.id) {
         AuthService.logout();
         return;
    }

    const revenue = vendorTxns.reduce((sum, t) => sum + t.amount, 0);
    const container = document.getElementById('content-view');
    
    // Get unique categories for this vendor for the chart
    const vendorProducts = DataService.getAll('products').filter(p => p.vendorId === user.vendorId);
    const catCounts = {};
    vendorProducts.forEach(p => {
        const cat = p.category || 'Uncategorized';
        catCounts[cat] = (catCounts[cat] || 0) + 1;
    });
    const chartLabels = Object.keys(catCounts).length > 0 ? Object.keys(catCounts) : ['No Products'];
    const chartData = Object.keys(catCounts).length > 0 ? Object.values(catCounts) : [1];

    container.innerHTML = `
        <div class="stats-grid">
            ${renderStatCard("Cumulative Sales", '₹' + revenue.toFixed(2), '📈', 'indigo')}
            ${renderStatCard('Wallet Balance', '₹' + currentVendor.revenue.toFixed(2), '💰', 'emerald')}
            ${renderStatCard('Total Transactions', vendorTxns.length, '🧾', 'blue')}
            ${renderStatCard('Active Products', vendorProducts.length, '📦', 'amber')}
        </div>
        <div class="charts-grid">
            <div class="card">
                <h3>Sales Performance</h3>
                <div class="chart-container"><canvas id="vendorSalesChart"></canvas></div>
            </div>
            <div class="card">
                <h3>Category Distribution</h3>
                <div class="chart-container"><canvas id="vendorProductChart"></canvas></div>
            </div>
            <div class="card" style="grid-column: span 2;">
                <h3>Recent Activity</h3>
                <div class="table-container mt-20">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vendorTxns.length > 0 ? vendorTxns.slice(-5).reverse().map(t => `
                                <tr>
                                    <td>${t.studentId}</td>
                                    <td>${t.product}</td>
                                    <td><b>₹${t.amount}</b></td>
                                    <td><span class="badge badge-success">Completed</span></td>
                                    <td>${new Date(t.date).toLocaleTimeString()}</td>
                                </tr>
                            `).join('') : '<tr><td colspan="5" style="text-align:center; padding: 20px;">No recent transactions</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    new Chart(document.getElementById('vendorSalesChart'), {
        type: 'bar',
        data: {
            labels: ['Morning', 'Afternoon', 'Evening'],
            datasets: [{
                label: 'Sales (₹)',
                data: [450, 890, 600],
                backgroundColor: '#6366f1'
            }]
        }
    });

    new Chart(document.getElementById('vendorProductChart'), {
        type: 'doughnut',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6']
            }]
        },
        options: { plugins: { legend: { position: 'bottom' } } }
    });
};

function renderProductRows(products) {
    if (!products || products.length === 0) {
        return '<tr><td colspan="6" style="text-align:center; padding: 20px;">No products found</td></tr>';
    }
    return products.map(p => `
        <tr>
            <td>
                <div style="font-weight: 600;">${p.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">ID: ${p.id}</div>
            </td>
            <td><span class="badge" style="background:var(--bg-input); color:var(--text-muted);">${p.category}</span></td>
            <td>₹${p.price.toFixed(2)}</td>
            <td>
                <span style="color: ${p.stock < 10 ? 'var(--danger)' : 'inherit'}">
                    ${p.stock} units
                </span>
            </td>
            <td><span class="badge ${p.active ? 'badge-success' : 'badge-warning'}">${p.active ? 'Active' : 'Inactive'}</span></td>
            <td>
                <div style="display: flex; gap: 5px;">
                    <button class="btn btn-outline btn-icon" onclick="showProductModal('${p.id}')">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-icon" onclick="deleteProduct('${p.id}')" style="color: var(--danger);">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.filterProductsByCategory = function(category) {
    const user = AuthService.getCurrentUser();
    const allProducts = DataService.getAll('products').filter(p => p.vendorId === user.vendorId);
    const filtered = category === 'All' ? allProducts : allProducts.filter(p => p.category === category);
    
    document.getElementById('product-tbody').innerHTML = renderProductRows(filtered);
    
    // Update active tab
    document.querySelectorAll('#category-tabs .btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
        if (btn.getAttribute('data-cat') === category) {
            btn.classList.add('btn-primary');
            btn.classList.remove('btn-outline');
        }
    });
};

window.renderVendorProducts = function() {
    const user = AuthService.getCurrentUser();
    const allProducts = DataService.getAll('products').filter(p => p.vendorId === user.vendorId);
    const container = document.getElementById('content-view');

    // Determine categories based on vendor name
    let categories = ['All'];
    const vName = user.name.toUpperCase();
    if (vName.includes('CAFE') || vName.includes('HUT')) {
        categories = ['All', 'Chocolates', 'Cold Beverages', 'Biscuits', 'Cakes', 'Chips', 'Breakfast', 'Snacks', 'Lunch'];
    } else if (vName.includes('GARDEN')) {
        categories = ['All', 'Chats', 'Milkshakes/Juices'];
    } else if (vName.includes('MART')) {
        categories = ['All', 'Chocolates', 'Cold Beverages', 'Chips', 'Stationary', 'Grocery'];
    } else if (vName.includes('CRUSH')) {
        categories = ['All', 'Juices'];
    } else {
        const existingCats = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
        categories = ['All', ...existingCats];
    }

    container.innerHTML = `
        <div class="mb-20" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
            <div class="category-tabs" id="category-tabs" style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; flex: 1; -webkit-overflow-scrolling: touch;">
                ${categories.map(cat => `
                    <button class="btn ${cat === 'All' ? 'btn-primary' : 'btn-outline'}" onclick="filterProductsByCategory('${cat}')" data-cat="${cat}" style="white-space:nowrap;">
                        ${cat}
                    </button>
                `).join('')}
            </div>
            <button class="btn btn-primary" onclick="showProductModal()">
                <i class="fa fa-plus"></i> Add Product
            </button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="product-tbody">
                    ${renderProductRows(allProducts)}
                </tbody>
            </table>
        </div>
    `;
};

window.showProductModal = function(id = null) {
    const user = AuthService.getCurrentUser();
    const product = id ? DataService.getById('products', id) : null;
    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    // Prepare category options based on vendor
    let catOptions = [];
    const vName = user.name.toUpperCase();
    if (vName.includes('CAFE') || vName.includes('HUT')) {
        catOptions = ['Chocolates', 'Cold Beverages', 'Biscuits', 'Cakes', 'Chips', 'Breakfast', 'Snacks', 'Lunch'];
    } else if (vName.includes('GARDEN')) {
        catOptions = ['Chats', 'Milkshakes/Juices'];
    } else if (vName.includes('MART')) {
        catOptions = ['Chocolates', 'Cold Beverages', 'Chips', 'Stationary', 'Grocery'];
    } else if (vName.includes('CRUSH')) {
        catOptions = ['Juices'];
    }
    
    content.innerHTML = `
        <div class="modal-header">
            <h3>${product ? 'Edit Product' : 'Add New Product'}</h3>
            <span class="modal-close" onclick="closeModal()">&times;</span>
        </div>
        <form id="product-form">
            <div class="form-group">
                <label>Product Name</label>
                <input type="text" id="p-name" value="${product ? product.name : ''}" required placeholder="e.g. Marie Biscuits">
            </div>
            <div class="form-group">
                <label>Category</label>
                <select id="p-category" required>
                    <option value="" disabled ${!product ? 'selected' : ''}>Select Category</option>
                    ${catOptions.map(cat => `<option value="${cat}" ${product && product.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                </select>
            </div>
            <div class="form-row" style="display: flex; gap: 15px;">
                <div class="form-group" style="flex: 1;">
                    <label>Price (₹)</label>
                    <input type="number" id="p-price" value="${product ? product.price : ''}" required>
                </div>
                <div class="form-group" style="flex: 1;">
                    <label>Stock</label>
                    <input type="number" id="p-stock" value="${product ? product.stock : ''}" required>
                </div>
            </div>
            <div class="form-group">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none;">
                    <input type="checkbox" id="p-active" ${product ? (product.active ? 'checked' : '') : 'checked'} style="width: auto;">
                    Active (Student visible)
                </label>
            </div>
            <button type="submit" class="btn btn-primary w-100">${product ? 'Update' : 'Create'} Product</button>
        </form>
    `;
    
    modal.style.display = 'flex';
    
    document.getElementById('product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const updates = {
            name: document.getElementById('p-name').value,
            category: document.getElementById('p-category').value,
            price: parseFloat(document.getElementById('p-price').value),
            stock: parseInt(document.getElementById('p-stock').value),
            active: document.getElementById('p-active').checked,
            vendorId: user.vendorId
        };
        
        if (product) {
            DataService.update('products', product.id, updates);
            Notification.show('Product updated successfully');
        } else {
            updates.id = 'P' + user.vendorId + '-' + Date.now();
            DataService.add('products', updates);
            Notification.show('New product added');
        }
        
        closeModal();
        renderVendorProducts();
    });
};

window.deleteProduct = function(id) {
    if (confirm('Delete this product?')) {
        DataService.delete('products', id);
        Notification.show('Product removed');
        renderVendorProducts();
    }
};

window.renderVendorTransactions = function() {
    const user = AuthService.getCurrentUser();
    const txns = DataService.getAll('transactions').filter(t => t.vendorId === user.vendorId);
    const container = document.getElementById('content-view');

    container.innerHTML = `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody id="txn-tbody">
                    ${txns.map(t => {
                        const student = DataService.getById('students', t.studentId);
                        return `
                            <tr>
                                <td><code>${t.id}</code></td>
                                <td>
                                    <div style="font-weight: 500;">${student ? student.name : (t.studentName || 'Unknown')}</div>
                                    <div style="font-size: 0.8rem; color: var(--text-muted);">${t.studentId}</div>
                                </td>
                                <td>${t.product}</td>
                                <td style="font-weight: 600;">₹${t.amount.toFixed(2)}</td>
                                <td>${new Date(t.date).toLocaleString()}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
};

window.renderVendorAnalytics = function() {
    const user = AuthService.getCurrentUser();
    const txns = DataService.getAll('transactions').filter(t => t.vendorId === user.vendorId);
    const container = document.getElementById('content-view');
    
    container.innerHTML = `
        <div class="charts-grid">
            <div class="card">
                <h3>Top Selling Products</h3>
                <div class="chart-container"><canvas id="topProductsChart"></canvas></div>
            </div>
            <div class="card">
                <h3>Daily Revenue</h3>
                <div class="chart-container"><canvas id="dailyRevChart"></canvas></div>
            </div>
        </div>
    `;

    // Mock analytical data
    new Chart(document.getElementById('topProductsChart'), {
        type: 'doughnut',
        data: {
            labels: ['Coffee', 'Sandwich', 'Samosa'],
            datasets: [{
                data: [40, 25, 35],
                backgroundColor: ['#6366f1', '#10b981', '#f59e0b']
            }]
        }
    });

    new Chart(document.getElementById('dailyRevChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Revenue',
                data: [300, 450, 200, 600, 800],
                borderColor: '#6366f1',
                tension: 0.3
            }]
        }
    });
};

window.renderVendorWallet = function() {
    const user = AuthService.getCurrentUser();
    const vendor = DataService.getById('vendors', user.vendorId);
    const settlements = DataService.getAll('settlements').filter(s => s.vendorId === user.vendorId);
    const container = document.getElementById('content-view');

    container.innerHTML = `
        <div class="card mb-20" style="background: linear-gradient(135deg, var(--primary) 0%, #4338ca 100%); color: white;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <p style="opacity: 0.8; font-size: 0.9rem;">Wallet Balance (Un-settled)</p>
                    <h1 style="font-size: 2.5rem;">₹${vendor.revenue.toFixed(2)}</h1>
                </div>
                <div style="font-size: 3rem; opacity: 0.3;"><i class="fa fa-wallet"></i></div>
            </div>
        </div>
        <h3>Settlement History</h3>
        <div class="table-container mt-20">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${settlements.map(s => `
                        <tr>
                            <td>${s.date}</td>
                            <td>₹${s.amount.toFixed(2)}</td>
                            <td><span class="badge badge-success">${s.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};
window.renderSuperVendors = function() {
    const vendors = DataService.getAll('vendors');
    const container = document.getElementById('content-view');
    
    container.innerHTML = `
        <div class="mb-20" style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary" onclick="showAddVendorModal()">
                <i class="fa fa-plus"></i> Add New Vendor
            </button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Owner</th>
                        <th>Revenue</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${vendors.map(v => `
                        <tr>
                            <td>
                                <div style="font-weight: 600;">${v.name}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">${v.email}</div>
                            </td>
                            <td>${v.owner}</td>
                            <td>₹${v.revenue.toFixed(2)}</td>
                            <td><span class="badge ${v.status === 'enabled' ? 'badge-success' : 'badge-danger'}">${v.status}</span></td>
                            <td>
                                <button class="btn btn-outline btn-icon" onclick="toggleVendorStatus(${v.id})" title="${v.status === 'enabled' ? 'Disable' : 'Enable'}">
                                    <i class="fa ${v.status === 'enabled' ? 'fa-ban' : 'fa-check'}"></i>
                                </button>
                                <button class="btn btn-outline btn-icon" onclick="deleteVendor(${v.id})" style="color: var(--danger);">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

window.toggleVendorStatus = function(id) {
    const vendor = DataService.getById('vendors', id);
    const newStatus = vendor.status === 'enabled' ? 'disabled' : 'enabled';
    DataService.update('vendors', id, { status: newStatus });
    Notification.show(`Vendor ${vendor.name} ${newStatus === 'enabled' ? 'enabled' : 'disabled'} successfully`);
    renderSuperVendors();
};

window.deleteVendor = function(id) {
    if (confirm('Are you sure you want to delete this vendor? This will remove all their products too.')) {
        DataService.delete('vendors', id);
        Notification.show('Vendor deleted successfully');
        renderSuperVendors();
    }
};

window.showAddVendorModal = function() {
    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <h3>Add New Vendor</h3>
            <span class="modal-close" onclick="closeModal()">&times;</span>
        </div>
        <form id="add-vendor-form">
            <div class="form-group">
                <label>Vendor Name</label>
                <input type="text" id="v-name" required>
            </div>
            <div class="form-group">
                <label>Owner Name</label>
                <input type="text" id="v-owner" required>
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="v-email" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Create Vendor</button>
        </form>
    `;
    
    modal.style.display = 'flex';
    
    document.getElementById('add-vendor-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newVendor = {
            id: Date.now(),
            name: document.getElementById('v-name').value,
            owner: document.getElementById('v-owner').value,
            email: document.getElementById('v-email').value,
            status: 'enabled',
            revenue: 0,
            joinDate: new Date().toISOString().split('T')[0]
        };
        DataService.add('vendors', newVendor);
        Notification.show('Vendor added successfully');
        closeModal();
        renderSuperVendors();
    });
};

window.closeModal = function() {
    document.getElementById('modal-overlay').style.display = 'none';
};

// --- HELPER COMPONENTS ---
function renderStatCard(label, value, icon, color) {
    const colorMap = {
        indigo: { bg: 'rgba(99, 102, 241, 0.1)', icon: '#6366f1' },
        amber: { bg: 'rgba(245, 158, 11, 0.1)', icon: '#f59e0b' },
        emerald: { bg: 'rgba(16, 185, 129, 0.1)', icon: '#10b981' },
        blue: { bg: 'rgba(59, 130, 246, 0.1)', icon: '#3b82f6' }
    };
    const c = colorMap[color] || colorMap.indigo;
    
    return `
        <div class="card stat-card">
            <div class="icon-box" style="background: ${c.bg}; color: ${c.icon};">
                ${icon}
            </div>
            <div class="stat-info">
                <h4>${label}</h4>
                <div class="value">${value}</div>
            </div>
        </div>
    `;
}

// --- ROUTER & INITIALIZATION ---
window.initRouter = function() {
    const user = AuthService.getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Update user info in navbar
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-role-label').textContent = user.role.replace('_', ' ').toUpperCase();
    document.getElementById('user-avatar').textContent = user.avatar || '👤';

    // Sidebar rendering based on role
    const sidebar = document.getElementById('sidebar-nav');
    if (user.role === 'super_admin') {
        sidebar.innerHTML = `
            <a href="#" class="nav-link active" data-view="superDash"><i class="fa fa-th-large"></i> Dashboard</a>
            <a href="#" class="nav-link" data-view="superStudents"><i class="fa fa-user-graduate"></i> Students</a>
            <a href="#" class="nav-link" data-view="superVendors"><i class="fa fa-store"></i> Vendors</a>
            <a href="#" class="nav-link" data-view="superTransactions"><i class="fa fa-exchange-alt"></i> Transactions</a>
            <a href="#" class="nav-link" data-view="superSettlement"><i class="fa fa-reconcile"></i> Settlements</a>
            <a href="#" class="nav-link" data-view="superAnalytics"><i class="fa fa-chart-line"></i> Analytics</a>
        `;
    } else {
        sidebar.innerHTML = `
            <a href="#" class="nav-link active" data-view="vendorDash"><i class="fa fa-th-large"></i> Dashboard</a>
            <a href="#" class="nav-link" data-view="vendorProducts"><i class="fa fa-box"></i> Products</a>
            <a href="#" class="nav-link" data-view="vendorTransactions"><i class="fa fa-history"></i> Transactions</a>
            <a href="#" class="nav-link" data-view="vendorAnalytics"><i class="fa fa-chart-pie"></i> Analytics</a>
            <a href="#" class="nav-link" data-view="vendorWallet"><i class="fa fa-wallet"></i> Wallet & Payouts</a>
        `;
    }

    // Default view
    const defaultView = user.role === 'super_admin' ? 'renderSuperDash' : 'renderVendorDash';
    window[defaultView]();

    // Nav click events
    sidebar.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');
        if (!link) return;
        e.preventDefault();

        const view = link.getAttribute('data-view');
        const renderFn = 'render' + view.charAt(0).toUpperCase() + view.slice(1);
        
        if (window[renderFn]) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            window[renderFn]();
        }
    });

    // Logout and profile actions
    document.getElementById('logout-btn').addEventListener('click', () => AuthService.logout());
    
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeBtn.querySelector('i');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    });
};

// Initial Data & Router on Load
document.addEventListener('DOMContentLoaded', () => {
    DataService.init();
    if (document.getElementById('sidebar-nav')) {
        initRouter();
    }
});
window.renderVendorProducts = function() {
    const user = AuthService.getCurrentUser();
    const products = DataService.getAll('products').filter(p => p.vendorId === user.vendorId);
    const container = document.getElementById('content-view');

    container.innerHTML = `
        <div class="card">
            <div class="table-header">
                <h3>Manage Products</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Changes reflect instantly on student kiosk</p>
            </div>
            <div class="table-container mt-20">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Kiosk Visibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(p => `
                            <tr>
                                <td><img src="${p.image || 'media__1773155894023.png'}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;"></td>
                                <td><b>${p.name}</b></td>
                                <td><span class="badge badge-indigo">${p.category}</span></td>
                                <td>₹${p.price.toFixed(2)}</td>
                                <td>
                                    <span class="badge ${p.active ? 'badge-success' : 'badge-danger'}">
                                        ${p.active ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn ${p.active ? 'btn-outline-danger' : 'btn-primary'}" style="padding: 5px 15px; font-size: 0.8rem;" onclick="toggleProductActive('${p.id}')">
                                        ${p.active ? 'Disable' : 'Enable'}
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

window.toggleProductActive = function(productId) {
    const product = DataService.getById('products', productId);
    DataService.update('products', productId, { active: !product.active });
    renderVendorProducts(); // Refresh view
};
