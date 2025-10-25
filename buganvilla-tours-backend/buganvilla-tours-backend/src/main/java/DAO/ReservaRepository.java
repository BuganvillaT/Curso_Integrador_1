package DAO;

import com.buganvillatours.Entidades_JPA.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Puedes agregar métodos personalizados aquí si los necesitas
}
