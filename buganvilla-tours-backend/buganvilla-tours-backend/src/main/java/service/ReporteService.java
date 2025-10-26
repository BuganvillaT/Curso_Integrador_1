package service;

import java.io.IOException;

public interface ReporteService {
    byte[] generarReporteReservas() throws IOException;
    byte[] generarReporteInventario() throws IOException;
}
