package service;

import com.buganvillatours.dao.ReservaDAO;
import com.buganvillatours.dao.InventarioPaquetesDAO;
import com.buganvillatours.Utilidades.ReporteExcelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ReporteServiceImpl implements ReporteService {

    @Autowired
    private ReservaDAO reservaDAO;

    @Autowired
    private InventarioPaquetesDAO inventarioDAO;

    @Override
    public byte[] generarReporteReservas() throws IOException {
        List<Reserva> reservas = reservaDAO.findAll();
        return ReporteExcelUtil.generarExcelReservas(reservas);
    }

    @Override
    public byte[] generarReporteInventario() throws IOException {
        List<InventarioPaquetes> inventarios = inventarioDAO.findAll();
        return ReporteExcelUtil.generarExcelInventario(inventarios);
    }
}
