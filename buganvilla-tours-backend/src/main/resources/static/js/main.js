// Buganvilla Tours - Main JavaScript File

// API Configuration
const API_BASE_URL = '/api';

// Utility Functions
const utils = {
    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(amount);
    },

    // Format date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Show loading spinner
    showLoading: (element) => {
        element.innerHTML = '<div class="text-center py-4"><div class="loading-spinner"></div><p class="mt-3">Cargando...</p></div>';
    },

    // Show error message
    showError: (element, message) => {
        element.innerHTML = `
            <div class="alert alert-error-custom">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ${message}
            </div>
        `;
    },

    // Show success message
    showSuccess: (element, message) => {
        element.innerHTML = `
            <div class="alert alert-success-custom">
                <i class="fas fa-check-circle me-2"></i>
                ${message}
            </div>
        `;
    },

    // Validate email
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone
    validatePhone: (phone) => {
        const phoneRegex = /^(\+51|51)?[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
};

// API Service
const api = {
    // Generic API call
    call: async (endpoint, options = {}) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    },

    // Get packages
    getPackages: () => api.call('/paquetes'),

    // Get package by ID
    getPackage: (id) => api.call(`/paquetes/${id}`),

    // Create reservation
    createReservation: (reservationData) => api.call('/reservas', {
        method: 'POST',
        body: JSON.stringify(reservationData)
    }),

    // Get reservations
    getReservations: () => api.call('/reservas'),

    // Get inventory
    getInventory: () => api.call('/inventario'),

    // Generate report
    generateReport: (type) => api.call(`/reportes/${type}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    })
};

// Mock data for development (remove when backend is ready)
const mockData = {
    packages: [
        {
            id: 1,
            nombrePaquete: "Líneas de Nazca - Vuelo Panorámico",
            descripcion: "Sobrevuela las misteriosas Líneas de Nazca y descubre los geoglifos más famosos del mundo. Incluye transporte desde Ica y almuerzo.",
            precio: 250,
            duracion: "1 día",
            categoria: "cultura",
            imagen: "/images/nazcaLineas.png",
            incluye: ["Transporte", "Vuelo panorámico", "Almuerzo", "Guía especializado"],
            cupoDisponible: 8,
            cupoTotal: 12
        },
        {
            id: 2,
            nombrePaquete: "Islas Ballestas y Paracas",
            descripcion: "Conoce la fauna marina del Perú en las Islas Ballestas, llamadas las 'Galápagos Peruanas'. Tour en lancha y visita a la Reserva Nacional de Paracas.",
            precio: 180,
            duracion: "1 día",
            categoria: "naturaleza",
            imagen: "/images/islas-ballestas.png",
            incluye: ["Transporte", "Tour en lancha", "Entrada a la reserva", "Almuerzo"],
            cupoDisponible: 5,
            cupoTotal: 15
        },
        {
            id: 3,
            nombrePaquete: "Oasis de Huacachina y Sandboard",
            descripcion: "Aventura en el único oasis natural de América. Practica sandboard en las dunas más altas y disfruta de un atardecer único.",
            precio: 120,
            duracion: "Medio día",
            categoria: "aventura",
            imagen: "/images/huacachina.png",
            incluye: ["Transporte", "Buggy por las dunas", "Sandboard", "Snack"],
            cupoDisponible: 12,
            cupoTotal: 20
        },
        {
            id: 4,
            nombrePaquete: "Tour de Bodegas y Degustación",
            descripcion: "Descubre el proceso de elaboración del pisco peruano visitando las mejores bodegas de Ica. Incluye degustación de piscos y vinos.",
            precio: 85,
            duracion: "Medio día",
            categoria: "gastronomia",
            imagen: "/images/bodegas-ica.jpg",
            incluye: ["Transporte", "Visita a 3 bodegas", "Degustación", "Guía especializado"],
            cupoDisponible: 6,
            cupoTotal: 10
        },
        {
            id: 5,
            nombrePaquete: "Candelabro y Tambo Colorado",
            descripcion: "Visita el misterioso Candelabro de Paracas y las ruinas de Tambo Colorado, importante centro administrativo inca.",
            precio: 150,
            duracion: "1 día",
            categoria: "cultura",
            imagen: "/images/candelabro.jpg",
            incluye: ["Transporte", "Entradas", "Almuerzo", "Guía arqueólogo"],
            cupoDisponible: 0,
            cupoTotal: 8
        },
        {
            id: 6,
            nombrePaquete: "Experiencia Completa Ica-Paracas",
            descripcion: "Tour completo de 2 días incluyendo Huacachina, Islas Ballestas, bodegas y Líneas de Nazca. La experiencia más completa.",
            precio: 450,
            duracion: "2 días",
            categoria: "aventura",
            imagen: "/images/tour-completo.jpg",
            incluye: ["Hospedaje", "Todas las comidas", "Todos los tours", "Transporte privado"],
            cupoDisponible: 3,
            cupoTotal: 6
        }
    ]
};

// Load featured packages on homepage
async function loadFeaturedPackages() {
    const container = document.getElementById('featured-packages');
    if (!container) return;

    try {
        utils.showLoading(container);
        
        // Use mock data for now (replace with API call when ready)
        const packages = mockData.packages.slice(0, 3);
        
        container.innerHTML = packages.map(pkg => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card card-custom package-card h-100">
                    ${pkg.cupoDisponible === 0 ? '<div class="package-badge bg-danger">Agotado</div>' : 
                      pkg.cupoDisponible <= 3 ? '<div class="package-badge">Últimos cupos</div>' : ''}
                    <img src="${pkg.imagen}" class="card-img-top" alt="${pkg.nombrePaquete}" onerror="this.src='/images/placeholder.jpg'">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${pkg.nombrePaquete}</h5>
                        <p class="card-text">${pkg.descripcion.substring(0, 100)}...</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="price-tag">${utils.formatCurrency(pkg.precio)}</span>
                                <small class="text-muted"><i class="fas fa-clock me-1"></i>${pkg.duracion}</small>
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary-custom" onclick="viewPackageDetails(${pkg.id})">
                                    <i class="fas fa-eye me-2"></i>Ver Detalles
                                </button>
                                <a href="reservas.html?package=${pkg.id}" class="btn btn-secondary-custom">
                                    <i class="fas fa-calendar-plus me-2"></i>Reservar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        utils.showError(container, 'Error al cargar los paquetes destacados');
    }
}

// View package details in modal
function viewPackageDetails(packageId) {
    const pkg = mockData.packages.find(p => p.id === packageId);
    if (!pkg) return;

    const modal = new bootstrap.Modal(document.getElementById('packageModal'));
    document.getElementById('packageModalTitle').textContent = pkg.nombrePaquete;
    document.getElementById('packageModalContent').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${pkg.imagen}" class="img-fluid rounded mb-3" alt="${pkg.nombrePaquete}" onerror="this.src='/images/placeholder.jpg'">
            </div>
            <div class="col-md-6">
                <h6><i class="fas fa-tag text-primary-custom me-2"></i>Precio</h6>
                <p class="fs-4 text-primary-custom fw-bold">${utils.formatCurrency(pkg.precio)} por persona</p>
                
                <h6><i class="fas fa-clock text-primary-custom me-2"></i>Duración</h6>
                <p>${pkg.duracion}</p>
                
                <h6><i class="fas fa-users text-primary-custom me-2"></i>Disponibilidad</h6>
                <p>${pkg.cupoDisponible} de ${pkg.cupoTotal} cupos disponibles</p>
                
                <h6><i class="fas fa-list text-primary-custom me-2"></i>Incluye</h6>
                <ul>
                    ${pkg.incluye.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <h6><i class="fas fa-info-circle text-primary-custom me-2"></i>Descripción</h6>
                <p>${pkg.descripcion}</p>
            </div>
        </div>
    `;
    
    document.getElementById('reservePackageBtn').href = `reservas.html?package=${packageId}`;
    modal.show();
}

// Animate counters on homepage
function animateCounters() {
    const counters = document.querySelectorAll('[id^="counter-"]');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<div class="loading-spinner me-2"></div>Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            const alert = document.createElement('div');
            alert.className = 'alert alert-success-custom mt-3';
            alert.innerHTML = '<i class="fas fa-check-circle me-2"></i>¡Mensaje enviado exitosamente! Te contactaremos pronto.';
            form.appendChild(alert);
            
            form.reset();
            
            setTimeout(() => {
                alert.remove();
            }, 5000);
            
        } catch (error) {
            // Show error message
            const alert = document.createElement('div');
            alert.className = 'alert alert-error-custom mt-3';
            alert.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Error al enviar el mensaje. Inténtalo de nuevo.';
            form.appendChild(alert);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load featured packages
    loadFeaturedPackages();
    
    // Animate counters when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'counter-clients') {
                animateCounters();
                observer.disconnect();
            }
        });
    });
    
    const counterElement = document.getElementById('counter-clients');
    if (counterElement) {
        observer.observe(counterElement);
    }
    
    // Handle contact form
    handleContactForm();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export for global access
window.BuganvillaTours = {
    utils,
    api,
    mockData,
    viewPackageDetails
};