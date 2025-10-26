package dao;

import entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservaDAO extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuarioIdUsuario(int idUsuario);
}
