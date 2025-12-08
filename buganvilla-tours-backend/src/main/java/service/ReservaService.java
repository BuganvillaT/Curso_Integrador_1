package service;

import dao.ReservaDAO;
import dao.InventarioPaquetesDAO;
import entity.Reserva;
import entity.InventarioPaquetes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReservaService {
    @Autowired
    private ReservaDAO reservaDAO;
    
    @Autowired
    private InventarioPaquetesDAO inventarioDAO;
    
    public Reserva crearReserva(Reserva reserva) {
        InventarioPaquetes inventario = inventarioDAO.findById(reserva.getIdInventario())
            .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));
        if (inventario.getCupoDisponible() >= reserva.getCantidadPersonas()) {
            inventario.setCupoDisponible(inventario.getCupoDisponible() - reserva.getCantidadPersonas());
            inventarioDAO.save(inventario);
            
            // Establecer fecha de reserva automáticamente
            reserva.setFechaReserva(LocalDateTime.now());
            
            return reservaDAO.save(reserva);
        }
        throw new RuntimeException("No hay cupos disponibles");
    }
}