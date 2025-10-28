// Buganvilla Tours - Packages Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const packagesGrid = document.getElementById('packages-grid');
    const searchInput = document.getElementById('search-packages');
    const categoryFilter = document.getElementById('filter-category');
    const loadingSpinner = document.getElementById('loading-spinner');
    const noResults = document.getElementById('no-results');
    
    let allPackages = [];
    let filteredPackages = [];

    // Load all packages
    async function loadPackages() {
        try {
            loadingSpinner.style.display = 'block';
            packagesGrid.innerHTML = '';
            noResults.style.display = 'none';
            
            // Use mock data for now (replace with API call when ready)
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
            allPackages = window.BuganvillaTours.mockData.packages;
            filteredPackages = [...allPackages];
            
            renderPackages(filteredPackages);
            
        } catch (error) {
            packagesGrid.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-error-custom">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error al cargar los paquetes. Por favor, recarga la página.
                    </div>
                </div>
            `;
        } finally {
            loadingSpinner.style.display = 'none';
        }
    }

    // Render packages
    function renderPackages(packages) {
        if (packages.length === 0) {
            packagesGrid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        packagesGrid.innerHTML = packages.map(pkg => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card card-custom package-card h-100">
                    ${getPackageBadge(pkg)}
                    <img src="${pkg.imagen}" class="card-img-top" alt="${pkg.nombrePaquete}" onerror="this.src='/images/placeholder.jpg'">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title">${pkg.nombrePaquete}</h5>
                            <span class="badge bg-secondary">${getCategoryLabel(pkg.categoria)}</span>
                        </div>
                        <p class="card-text">${pkg.descripcion}</p>
                        
                        <div class="mb-3">
                            <small class="text-muted">
                                <i class="fas fa-clock me-1"></i>Duración: ${pkg.duracion}
                            </small>
                        </div>
                        
                        <div class="mb-3">
                            <small class="text-muted">
                                <i class="fas fa-users me-1"></i>Disponible: ${pkg.cupoDisponible}/${pkg.cupoTotal} cupos
                            </small>
                            <div class="progress mt-1" style="height: 4px;">
                                <div class="progress-bar ${getProgressBarClass(pkg)}" 
                                     style="width: ${(pkg.cupoDisponible / pkg.cupoTotal) * 100}%"></div>
                            </div>
                        </div>
                        
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <span class="price-tag">${window.BuganvillaTours.utils.formatCurrency(pkg.precio)}</span>
                                    <small class="text-muted d-block">por persona</small>
                                </div>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-outline-primary" onclick="viewPackageDetails(${pkg.id})" data-bs-toggle="modal" data-bs-target="#packageModal">
                                    <i class="fas fa-eye me-2"></i>Ver Detalles
                                </button>
                                <a href="reservas.html?package=${pkg.id}" class="btn btn-primary-custom ${pkg.cupoDisponible === 0 ? 'disabled' : ''}">
                                    <i class="fas fa-calendar-plus me-2"></i>
                                    ${pkg.cupoDisponible === 0 ? 'Agotado' : 'Reservar Ahora'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Get package badge based on availability
    function getPackageBadge(pkg) {
        if (pkg.cupoDisponible === 0) {
            return '<div class="package-badge bg-danger">Agotado</div>';
        } else if (pkg.cupoDisponible <= 3) {
            return '<div class="package-badge bg-warning">Últimos cupos</div>';
        } else if (pkg.categoria === 'aventura') {
            return '<div class="package-badge bg-success">Aventura</div>';
        }
        return '';
    }

    // Get category label
    function getCategoryLabel(category) {
        const labels = {
            'aventura': 'Aventura',
            'cultura': 'Cultura',
            'gastronomia': 'Gastronomía',
            'naturaleza': 'Naturaleza'
        };
        return labels[category] || 'General';
    }

    // Get progress bar class based on availability
    function getProgressBarClass(pkg) {
        const percentage = (pkg.cupoDisponible / pkg.cupoTotal) * 100;
        if (percentage === 0) return 'bg-danger';
        if (percentage <= 25) return 'bg-warning';
        return 'bg-success';
    }

    // Filter packages
    function filterPackages() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;

        filteredPackages = allPackages.filter(pkg => {
            const matchesSearch = !searchTerm || 
                pkg.nombrePaquete.toLowerCase().includes(searchTerm) ||
                pkg.descripcion.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !selectedCategory || pkg.categoria === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });

        renderPackages(filteredPackages);
    }

    // Event listeners
    searchInput.addEventListener('input', debounce(filterPackages, 300));
    categoryFilter.addEventListener('change', filterPackages);

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // View package details (reuse from main.js)
    window.viewPackageDetails = function(packageId) {
        const pkg = allPackages.find(p => p.id === packageId);
        if (!pkg) return;

        const modal = document.getElementById('packageModal');
        const modalTitle = document.getElementById('packageModalTitle');
        const modalContent = document.getElementById('packageModalContent');
        const reserveBtn = document.getElementById('reservePackageBtn');

        if (modalTitle) modalTitle.textContent = pkg.nombrePaquete;
        
        if (modalContent) {
            modalContent.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${pkg.imagen}" class="img-fluid rounded mb-3" alt="${pkg.nombrePaquete}" onerror="this.src='/images/placeholder.jpg'">
                        <div class="d-flex gap-2 mb-3">
                            <span class="badge bg-primary">${getCategoryLabel(pkg.categoria)}</span>
                            <span class="badge ${pkg.cupoDisponible === 0 ? 'bg-danger' : pkg.cupoDisponible <= 3 ? 'bg-warning' : 'bg-success'}">
                                ${pkg.cupoDisponible === 0 ? 'Agotado' : pkg.cupoDisponible <= 3 ? 'Últimos cupos' : 'Disponible'}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6><i class="fas fa-tag text-primary-custom me-2"></i>Precio</h6>
                        <p class="fs-4 text-primary-custom fw-bold">${window.BuganvillaTours.utils.formatCurrency(pkg.precio)} por persona</p>
                        
                        <h6><i class="fas fa-clock text-primary-custom me-2"></i>Duración</h6>
                        <p>${pkg.duracion}</p>
                        
                        <h6><i class="fas fa-users text-primary-custom me-2"></i>Disponibilidad</h6>
                        <p>${pkg.cupoDisponible} de ${pkg.cupoTotal} cupos disponibles</p>
                        <div class="progress mb-3" style="height: 8px;">
                            <div class="progress-bar ${getProgressBarClass(pkg)}" 
                                 style="width: ${(pkg.cupoDisponible / pkg.cupoTotal) * 100}%"></div>
                        </div>
                        
                        <h6><i class="fas fa-list text-primary-custom me-2"></i>Incluye</h6>
                        <ul class="list-unstyled">
                            ${pkg.incluye.map(item => `<li><i class="fas fa-check text-success me-2"></i>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h6><i class="fas fa-info-circle text-primary-custom me-2"></i>Descripción Completa</h6>
                        <p>${pkg.descripcion}</p>
                        
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Importante:</strong> Los precios pueden variar según la temporada. Consulta por descuentos grupales.
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (reserveBtn) {
            if (pkg.cupoDisponible === 0) {
                reserveBtn.className = 'btn btn-secondary disabled';
                reserveBtn.innerHTML = '<i class="fas fa-times me-2"></i>Agotado';
                reserveBtn.href = '#';
            } else {
                reserveBtn.className = 'btn btn-primary-custom';
                reserveBtn.innerHTML = '<i class="fas fa-calendar-plus me-2"></i>Reservar Ahora';
                reserveBtn.href = `reservas.html?package=${packageId}`;
            }
        }
    };

    // Sort packages
    function sortPackages(criteria) {
        switch (criteria) {
            case 'price-low':
                filteredPackages.sort((a, b) => a.precio - b.precio);
                break;
            case 'price-high':
                filteredPackages.sort((a, b) => b.precio - a.precio);
                break;
            case 'name':
                filteredPackages.sort((a, b) => a.nombrePaquete.localeCompare(b.nombrePaquete));
                break;
            case 'availability':
                filteredPackages.sort((a, b) => b.cupoDisponible - a.cupoDisponible);
                break;
            default:
                filteredPackages = [...allPackages];
        }
        renderPackages(filteredPackages);
    }

    // Add sort dropdown to the page
    function addSortDropdown() {
        const filtersSection = document.querySelector('.py-4');
        if (filtersSection) {
            const sortHTML = `
                <div class="col-md-3">
                    <div class="d-flex align-items-center gap-3">
                        <label for="sort-packages" class="form-label mb-0 fw-bold">Ordenar:</label>
                        <select id="sort-packages" class="form-select form-control-custom">
                            <option value="default">Por defecto</option>
                            <option value="price-low">Precio: Menor a mayor</option>
                            <option value="price-high">Precio: Mayor a menor</option>
                            <option value="name">Nombre A-Z</option>
                            <option value="availability">Disponibilidad</option>
                        </select>
                    </div>
                </div>
            `;
            
            const row = filtersSection.querySelector('.row');
            row.className = 'row align-items-center';
            row.children[0].className = 'col-md-4';
            row.children[1].className = 'col-md-5';
            row.insertAdjacentHTML('beforeend', sortHTML);
            
            // Add event listener
            document.getElementById('sort-packages').addEventListener('change', (e) => {
                sortPackages(e.target.value);
            });
        }
    }

    // Initialize page
    loadPackages();
    addSortDropdown();
    
    // Handle URL parameters (if coming from a specific package link)
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('package');
    if (packageId) {
        setTimeout(() => {
            viewPackageDetails(parseInt(packageId));
        }, 1500);
    }
});