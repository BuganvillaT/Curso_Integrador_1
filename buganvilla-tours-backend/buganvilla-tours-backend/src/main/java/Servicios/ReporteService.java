package Servicios;

import com.buganvillatours.Entidades_JPA.Reserva;
import com.buganvillatours.Utilidades.ReporteExcelUtil;
import com.buganvillatours.DAO.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReporteService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ReporteExcelUtil reporteExcelUtil;

    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }

    public ByteArrayInputStream generarReporteReservas() {
        List<Reserva> reservas = obtenerTodasLasReservas();
        return reporteExcelUtil.generarReporteReservas(reservas);
    }
}
