package dao;

import com.buganvillatours.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservaDAO extends JpaRepository<Reserva, Integer> {
    List<Reserva> findByUsuarioIdUsuario(int idUsuario); // Ejemplo de consulta personalizada
}
