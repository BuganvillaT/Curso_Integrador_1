// Buganvilla Tours - Reservations Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservation-form');
    const packageSelect = document.getElementById('package-select');
    const passengersSelect = document.getElementById('passengers');
    const reservationSummary = document.getElementById('reservation-summary');
    const priceBreakdown = document.getElementById('price-breakdown');
    const travelDateInput = document.getElementById('travel-date');
    
    let selectedPackage = null;
    let basePrice = 0;
    let additionalServicesPrice = 0;

    // Load packages into select dropdown
    async function loadPackageOptions() {
        try {
            const packages = window.BuganvillaTours.mockData.packages;
            
            packageSelect.innerHTML = '<option value="">Selecciona un paquete...</option>' +
                packages.filter(pkg => pkg.cupoDisponible > 0).map(pkg => 
                    `<option value="${pkg.id}" data-price="${pkg.precio}">${pkg.nombrePaquete} - ${window.BuganvillaTours.utils.formatCurrency(pkg.precio)}</option>`
                ).join('');
            
            // Check URL parameters for pre-selected package
            const urlParams = new URLSearchParams(window.location.search);
            const packageId = urlParams.get('package');
            if (packageId) {
                packageSelect.value = packageId;
                handlePackageSelection();
            }
        } catch (error) {
            console.error('Error loading packages:', error);
        }
    }

    // Handle package selection
    function handlePackageSelection() {
        const selectedOption = packageSelect.selectedOptions[0];
        if (!selectedOption || !selectedOption.value) {
            selectedPackage = null;
            updateReservationSummary();
            return;
        }

        const packageId = parseInt(selectedOption.value);
        selectedPackage = window.BuganvillaTours.mockData.packages.find(pkg => pkg.id === packageId);
        basePrice = selectedPackage.precio;
        
        updateReservationSummary();
        calculateTotal();
    }

    // Update reservation summary
    function updateReservationSummary() {
        if (!selectedPackage) {
            reservationSummary.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-clipboard-list fa-2x mb-3"></i>
                    <p>Selecciona un paquete para ver el resumen</p>
                </div>
            `;
            priceBreakdown.style.display = 'none';
            return;
        }

        const passengers = parseInt(passengersSelect.value) || 1;
        
        reservationSummary.innerHTML = `
            <div class="mb-3">
                <img src="${selectedPackage.imagen}" class="img-fluid rounded mb-2" alt="${selectedPackage.nombrePaquete}" onerror="this.src='/images/placeholder.jpg'">
                <h6 class="mb-2">${selectedPackage.nombrePaquete}</h6>
                <small class="text-muted">
                    <i class="fas fa-clock me-1"></i>${selectedPackage.duracion}
                </small>
            </div>
            
            <div class="mb-3">
                <strong>Detalles de la reserva:</strong>
                <ul class="list-unstyled mt-2 small">
                    <li><i class="fas fa-users me-2 text-primary-custom"></i>${passengers} persona${passengers > 1 ? 's' : ''}</li>
                    <li><i class="fas fa-calendar me-2 text-primary-custom"></i>${getTravelDateFormatted()}</li>
                </ul>
            </div>
            
            <div class="mb-3">
                <strong>Incluye:</strong>
                <ul class="list-unstyled mt-2 small">
                    ${selectedPackage.incluye.map(item => `<li><i class="fas fa-check me-2 text-success"></i>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        
        priceBreakdown.style.display = 'block';
    }

    // Get formatted travel date
    function getTravelDateFormatted() {
        const date = travelDateInput.value;
        if (!date) return 'Por seleccionar';
        return window.BuganvillaTours.utils.formatDate(date);
    }

    // Calculate additional services price
    function calculateAdditionalServices() {
        const hotelPickup = document.getElementById('hotel-pickup').checked ? 20 : 0;
        const lunchIncluded = document.getElementById('lunch-included').checked ? 35 : 0;
        const guideEnglish = document.getElementById('guide-english').checked ? 50 : 0;
        const insurance = document.getElementById('insurance').checked ? 15 : 0;
        
        return hotelPickup + lunchIncluded + guideEnglish + insurance;
    }

    // Calculate total price
    function calculateTotal() {
        if (!selectedPackage) return;
        
        const passengers = parseInt(passengersSelect.value) || 1;
        const subtotal = basePrice * passengers;
        additionalServicesPrice = calculateAdditionalServices() * passengers;
        const total = subtotal + additionalServicesPrice;
        
        document.getElementById('subtotal').textContent = window.BuganvillaTours.utils.formatCurrency(subtotal);
        document.getElementById('additional-services').textContent = window.BuganvillaTours.utils.formatCurrency(additionalServicesPrice);
        document.getElementById('total-price').textContent = window.BuganvillaTours.utils.formatCurrency(total);
    }

    // Set minimum date to today
    function setMinimumDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        travelDateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Validate form
    function validateForm() {
        const requiredFields = [
            'package-select',
            'full-name',
            'email',
            'phone',
            'travel-date',
            'passengers'
        ];

        const errors = [];

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                errors.push(`${field.previousElementSibling.textContent.replace('*', '')} es requerido`);
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Validate email
        const email = document.getElementById('email').value;
        if (email && !window.BuganvillaTours.utils.validateEmail(email)) {
            errors.push('El formato del email no es válido');
            document.getElementById('email').classList.add('is-invalid');
        }

        // Validate phone
        const phone = document.getElementById('phone').value;
        if (phone && !window.BuganvillaTours.utils.validatePhone(phone)) {
            errors.push('El formato del teléfono no es válido');
            document.getElementById('phone').classList.add('is-invalid');
        }

        // Validate travel date
        const travelDate = new Date(travelDateInput.value);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (travelDate < tomorrow) {
            errors.push('La fecha de viaje debe ser al menos mañana');
            travelDateInput.classList.add('is-invalid');
        }

        // Check terms and conditions
        if (!document.getElementById('terms-conditions').checked) {
            errors.push('Debes aceptar los términos y condiciones');
        }

        if (!document.getElementById('privacy-policy').checked) {
            errors.push('Debes aceptar las políticas de privacidad');
        }

        return errors;
    }

    // Show validation errors
    function showValidationErrors(errors) {
        // Remove existing error alerts
        const existingAlerts = reservationForm.querySelectorAll('.alert-danger');
        existingAlerts.forEach(alert => alert.remove());

        if (errors.length > 0) {
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger';
            errorAlert.innerHTML = `
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Por favor corrige los siguientes errores:</strong>
                <ul class="mb-0 mt-2">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            `;
            reservationForm.insertBefore(errorAlert, reservationForm.firstChild);
            errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Handle form submission
    async function handleFormSubmission(e) {
        e.preventDefault();
        
        const errors = validateForm();
        if (errors.length > 0) {
            showValidationErrors(errors);
            return;
        }

        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<div class="loading-spinner me-2"></div>Procesando...';
            submitBtn.disabled = true;

            // Gather form data
            const reservationData = {
                idInventario: parseInt(packageSelect.value),
                cantidadPersonas: parseInt(passengersSelect.value),
                usuario: {
                    nombre: document.getElementById('full-name').value,
                    email: document.getElementById('email').value
                },
                fechaViaje: travelDateInput.value,
                telefono: document.getElementById('phone').value,
                documento: document.getElementById('document').value,
                serviciosAdicionales: {
                    recojoHotel: document.getElementById('hotel-pickup').checked,
                    almuerzoIncluido: document.getElementById('lunch-included').checked,
                    guiaIngles: document.getElementById('guide-english').checked,
                    seguroViaje: document.getElementById('insurance').checked
                },
                solicitudesEspeciales: document.getElementById('special-requests').value,
                precioTotal: basePrice * parseInt(passengersSelect.value) + additionalServicesPrice
            };

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show confirmation modal
            showConfirmationModal(reservationData);
            
        } catch (error) {
            console.error('Error creating reservation:', error);
            showValidationErrors(['Error al procesar la reserva. Por favor, inténtalo de nuevo.']);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Show confirmation modal
    function showConfirmationModal(reservationData) {
        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        const confirmationDetails = document.getElementById('confirmation-details');
        
        const reservationId = 'BT' + Date.now().toString().slice(-6);
        
        confirmationDetails.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Datos de la Reserva</h6>
                    <p><strong>Código de Reserva:</strong> ${reservationId}</p>
                    <p><strong>Cliente:</strong> ${reservationData.usuario.nombre}</p>
                    <p><strong>Email:</strong> ${reservationData.usuario.email}</p>
                    <p><strong>Teléfono:</strong> ${reservationData.telefono}</p>
                </div>
                <div class="col-md-6">
                    <h6>Detalles del Tour</h6>
                    <p><strong>Paquete:</strong> ${selectedPackage.nombrePaquete}</p>
                    <p><strong>Fecha:</strong> ${getTravelDateFormatted()}</p>
                    <p><strong>Personas:</strong> ${reservationData.cantidadPersonas}</p>
                    <p><strong>Total:</strong> <span class="text-success fw-bold">${window.BuganvillaTours.utils.formatCurrency(reservationData.precioTotal)}</span></p>
                </div>
            </div>
        `;
        
        modal.show();
        
        // Reset form after showing modal
        setTimeout(() => {
            reservationForm.reset();
            selectedPackage = null;
            updateReservationSummary();
        }, 1000);
    }

    // Event listeners
    packageSelect.addEventListener('change', handlePackageSelection);
    passengersSelect.addEventListener('change', () => {
        updateReservationSummary();
        calculateTotal();
    });
    travelDateInput.addEventListener('change', updateReservationSummary);
    
    // Add event listeners to additional services checkboxes
    ['hotel-pickup', 'lunch-included', 'guide-english', 'insurance'].forEach(id => {
        document.getElementById(id).addEventListener('change', calculateTotal);
    });
    
    reservationForm.addEventListener('submit', handleFormSubmission);

    // Initialize
    loadPackageOptions();
    setMinimumDate();
});