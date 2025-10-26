package service;

import com.buganvillatours.dao.ReservaDAO;
import com.buganvillatours.dao.InventarioPaquetesDAO;
import com.buganvillatours.entity.Reserva;
import com.buganvillatours.entity.InventarioPaquetes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservaService {

    @Autowired
    private ReservaDAO reservaDAO;

    @Autowired
    private InventarioPaquetesDAO inventarioDAO;

    public Reserva crearReserva(Reserva reserva) {
        InventarioPaquetes inventario = inventarioDAO.findById(reserva.getInventario().getIdInventario())
            .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));

        if (inventario.getCupoDisponible() >= reserva.getCantidadPersonas()) {
            inventario.setCupoDisponible(inventario.getCupoDisponible() - reserva.getCantidadPersonas());
            inventarioDAO.save(inventario);
            return reservaDAO.save(reserva);
        }
        throw new RuntimeException("No hay cupos disponibles");
    }
}
