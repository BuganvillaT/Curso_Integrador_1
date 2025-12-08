import { Modal, Button } from 'react-bootstrap'
import { formatCurrency, formatDate } from '../../utils/formatters'

function ConfirmationModal({ show, onHide, reservationData }) {
  if (!reservationData) return null

  const reservationId = reservationData.codigoReserva || 'BT' + Date.now().toString().slice(-6)

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton className="bg-success text-white">
        <Modal.Title>
          <i className="fas fa-check-circle me-2"></i>¡Reserva Confirmada!
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="text-center mb-4">
          <i className="fas fa-check-circle fa-4x text-success mb-3"></i>
          <h4>¡Gracias por tu reserva!</h4>
          <p className="lead">Tu reserva ha sido confirmada exitosamente.</p>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <h6>Datos de la Reserva</h6>
            <p><strong>Código de Reserva:</strong> {reservationId}</p>
            <p><strong>Cliente:</strong> {reservationData.fullName}</p>
            <p><strong>Email:</strong> {reservationData.email}</p>
            <p><strong>Teléfono:</strong> {reservationData.phone}</p>
          </div>
          <div className="col-md-6">
            <h6>Detalles del Tour</h6>
            <p><strong>Paquete:</strong> {reservationData.package.nombrePaquete}</p>
            <p><strong>Fecha:</strong> {formatDate(reservationData.travelDate)}</p>
            <p><strong>Personas:</strong> {reservationData.passengers}</p>
            <p><strong>Total:</strong> 
              <span className="text-success fw-bold ms-2">
                {formatCurrency(reservationData.total)}
              </span>
            </p>
          </div>
        </div>
        
        <div className="alert alert-info mt-3">
          <i className="fas fa-info-circle me-2"></i>
          <strong>Próximos pasos:</strong>
          <ul className="mb-0 mt-2">
            <li>Recibirás un email de confirmación en los próximos minutos</li>
            <li>Nuestro equipo se contactará contigo para coordinar detalles</li>
            <li>Revisa nuestras políticas de cancelación</li>
          </ul>
        </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary-custom" onClick={() => window.print()}>
          <i className="fas fa-print me-2"></i>Imprimir Voucher
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal