// Buganvilla Tours - Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.admin-sidebar .nav-link[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    
    // Initialize charts
    let reservationsChart = null;
    let packagesChart = null;

    // Navigation between sections
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.dataset.section;
            showSection(sectionId);
            
            // Update page title
            pageTitle.textContent = link.textContent.trim();
        });
    });

    // Show specific section
    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Load section-specific data
            switch (sectionId) {
                case 'dashboard':
                    loadDashboardData();
                    break;
                case 'reservations':
                    loadReservationsData();
                    break;
                case 'packages':
                    loadPackagesData();
                    break;
                case 'inventory':
                    loadInventoryData();
                    break;
                case 'users':
                    loadUsersData();
                    break;
            }
        }
    }

    // Load dashboard data
    function loadDashboardData() {
        // Update stats cards with mock data
        updateStatsCards();
        
        // Initialize charts
        initializeCharts();
        
        // Load recent activity
        loadRecentActivity();
    }

    // Update stats cards
    function updateStatsCards() {
        // Simulate real-time data updates
        setTimeout(() => {
            document.getElementById('today-reservations').textContent = Math.floor(Math.random() * 20) + 5;
            document.getElementById('monthly-income').textContent = 'S/ ' + (Math.floor(Math.random() * 50000) + 20000).toLocaleString();
            document.getElementById('occupancy-rate').textContent = Math.floor(Math.random() * 30) + 70 + '%';
            document.getElementById('active-packages').textContent = window.BuganvillaTours.mockData.packages.length;
        }, 500);
    }

    // Initialize charts
    function initializeCharts() {
        // Reservations chart
        const reservationsCtx = document.getElementById('reservationsChart');
        if (reservationsCtx && !reservationsChart) {
            reservationsChart = new Chart(reservationsCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    datasets: [{
                        label: 'Reservas',
                        data: [120, 190, 300, 500, 200, 300, 450, 380, 420, 350, 280, 160],
                        borderColor: '#8B4513',
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Packages chart
        const packagesCtx = document.getElementById('packagesChart');
        if (packagesCtx && !packagesChart) {
            const packages = window.BuganvillaTours.mockData.packages;
            packagesChart = new Chart(packagesCtx, {
                type: 'doughnut',
                data: {
                    labels: packages.slice(0, 5).map(p => p.nombrePaquete.substring(0, 20) + '...'),
                    datasets: [{
                        data: packages.slice(0, 5).map(p => p.cupoTotal - p.cupoDisponible),
                        backgroundColor: [
                            '#8B4513',
                            '#D2691E',
                            '#228B22',
                            '#4682B4',
                            '#CD853F'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    // Load recent activity
    function loadRecentActivity() {
        const tableBody = document.querySelector('#recent-activity-table tbody');
        if (!tableBody) return;

        const activities = [
            { time: '10:30', activity: 'Nueva reserva creada', user: 'María González', status: 'success' },
            { time: '10:15', activity: 'Paquete actualizado', user: 'Admin', status: 'info' },
            { time: '09:45', activity: 'Reserva cancelada', user: 'Carlos Mendoza', status: 'warning' },
            { time: '09:20', activity: 'Nuevo usuario registrado', user: 'Ana López', status: 'success' },
            { time: '08:55', activity: 'Inventario actualizado', user: 'Admin', status: 'info' }
        ];

        tableBody.innerHTML = activities.map(activity => `
            <tr>
                <td>${activity.time}</td>
                <td>${activity.activity}</td>
                <td>${activity.user}</td>
                <td><span class="badge bg-${activity.status}">${activity.status}</span></td>
            </tr>
        `).join('');
    }

    // Load reservations data
    function loadReservationsData() {
        const tableBody = document.querySelector('#reservations-table tbody');
        if (!tableBody) return;

        // Mock reservations data
        const reservations = [
            {
                id: 'BT001',
                cliente: 'María González',
                paquete: 'Líneas de Nazca',
                fecha: '2025-01-15',
                personas: 2,
                estado: 'Confirmada',
                total: 500
            },
            {
                id: 'BT002',
                cliente: 'Carlos Mendoza',
                paquete: 'Islas Ballestas',
                fecha: '2025-01-18',
                personas: 4,
                estado: 'Pendiente',
                total: 720
            },
            {
                id: 'BT003',
                cliente: 'Ana López',
                paquete: 'Huacachina',
                fecha: '2025-01-20',
                personas: 3,
                estado: 'Confirmada',
                total: 360
            }
        ];

        tableBody.innerHTML = reservations.map(reserva => `
            <tr>
                <td>${reserva.id}</td>
                <td>${reserva.cliente}</td>
                <td>${reserva.paquete}</td>
                <td>${window.BuganvillaTours.utils.formatDate(reserva.fecha)}</td>
                <td>${reserva.personas}</td>
                <td><span class="badge bg-${reserva.estado === 'Confirmada' ? 'success' : 'warning'}">${reserva.estado}</span></td>
                <td>${window.BuganvillaTours.utils.formatCurrency(reserva.total)}</td>
                <td>
                    <button class="btn btn-sm btn-primary me-1" onclick="editReservation('${reserva.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="cancelReservation('${reserva.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Load packages data
    function loadPackagesData() {
        const packagesGrid = document.getElementById('packages-grid-admin');
        if (!packagesGrid) return;

        const packages = window.BuganvillaTours.mockData.packages;

        packagesGrid.innerHTML = packages.map(pkg => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <img src="${pkg.imagen}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${pkg.nombrePaquete}" onerror="this.src='/images/placeholder.jpg'">
                    <div class="card-body">
                        <h6 class="card-title">${pkg.nombrePaquete}</h6>
                        <p class="card-text small">${pkg.descripcion.substring(0, 100)}...</p>
                        <div class="row text-center">
                            <div class="col-4">
                                <small class="text-muted">Precio</small>
                                <div class="fw-bold">${window.BuganvillaTours.utils.formatCurrency(pkg.precio)}</div>
                            </div>
                            <div class="col-4">
                                <small class="text-muted">Disponible</small>
                                <div class="fw-bold text-${pkg.cupoDisponible > 0 ? 'success' : 'danger'}">${pkg.cupoDisponible}</div>
                            </div>
                            <div class="col-4">
                                <small class="text-muted">Total</small>
                                <div class="fw-bold">${pkg.cupoTotal}</div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="btn-group w-100">
                            <button class="btn btn-outline-primary btn-sm" onclick="editPackage(${pkg.id})">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deletePackage(${pkg.id})">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Load inventory data
    function loadInventoryData() {
        const tableBody = document.querySelector('#inventory-table tbody');
        if (!tableBody) return;

        const packages = window.BuganvillaTours.mockData.packages;

        tableBody.innerHTML = packages.map(pkg => {
            const ocupacion = ((pkg.cupoTotal - pkg.cupoDisponible) / pkg.cupoTotal) * 100;
            const estado = pkg.cupoDisponible === 0 ? 'Agotado' : pkg.cupoDisponible <= 3 ? 'Crítico' : 'Disponible';
            const estadoClass = pkg.cupoDisponible === 0 ? 'danger' : pkg.cupoDisponible <= 3 ? 'warning' : 'success';

            return `
                <tr>
                    <td>${pkg.nombrePaquete}</td>
                    <td>${pkg.cupoTotal}</td>
                    <td>${pkg.cupoDisponible}</td>
                    <td>${pkg.cupoTotal - pkg.cupoDisponible}</td>
                    <td>
                        <div class="progress" style="height: 20px;">
                            <div class="progress-bar bg-${estadoClass}" style="width: ${ocupacion}%">
                                ${Math.round(ocupacion)}%
                            </div>
                        </div>
                    </td>
                    <td><span class="badge bg-${estadoClass}">${estado}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="updateInventory(${pkg.id})">
                            <i class="fas fa-edit"></i> Actualizar
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Load users data
    function loadUsersData() {
        const tableBody = document.querySelector('#users-table tbody');
        if (!tableBody) return;

        // Mock users data
        const users = [
            {
                id: 1,
                nombre: 'María González',
                email: 'maria@email.com',
                reservas: 3,
                registro: '2024-06-15',
                estado: 'Activo'
            },
            {
                id: 2,
                nombre: 'Carlos Mendoza',
                email: 'carlos@email.com',
                reservas: 1,
                registro: '2024-08-22',
                estado: 'Activo'
            },
            {
                id: 3,
                nombre: 'Ana López',
                email: 'ana@email.com',
                reservas: 2,
                registro: '2024-09-10',
                estado: 'Activo'
            }
        ];

        tableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.reservas}</td>
                <td>${window.BuganvillaTours.utils.formatDate(user.registro)}</td>
                <td><span class="badge bg-success">${user.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary me-1" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Global functions for admin actions
    window.editReservation = function(id) {
        alert(`Editar reserva: ${id}`);
    };

    window.cancelReservation = function(id) {
        if (confirm(`¿Estás seguro de cancelar la reserva ${id}?`)) {
            alert(`Reserva ${id} cancelada`);
            loadReservationsData();
        }
    };

    window.editPackage = function(id) {
        alert(`Editar paquete: ${id}`);
    };

    window.deletePackage = function(id) {
        if (confirm('¿Estás seguro de eliminar este paquete?')) {
            alert(`Paquete ${id} eliminado`);
            loadPackagesData();
        }
    };

    window.updateInventory = function(id) {
        const newCount = prompt('Nuevo cupo disponible:');
        if (newCount !== null && !isNaN(newCount)) {
            alert(`Inventario actualizado para paquete ${id}`);
            loadInventoryData();
        }
    };

    window.editUser = function(id) {
        alert(`Editar usuario: ${id}`);
    };

    window.deleteUser = function(id) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            alert(`Usuario ${id} eliminado`);
            loadUsersData();
        }
    };

    window.logout = function() {
        if (confirm('¿Estás seguro de cerrar sesión?')) {
            window.location.href = 'index.html';
        }
    };

    // Generate reports
    window.generateReservationsReport = function() {
        alert('Generando reporte de reservas...');
        // Here you would call the API to generate and download the Excel report
    };

    window.generateInventoryReport = function() {
        alert('Generando reporte de inventario...');
        // Here you would call the API to generate and download the Excel report
    };

    // Initialize dashboard on load
    loadDashboardData();
});