package controller;

import service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {
    @Autowired
    private ReporteService reporteService;

    @GetMapping("/reservas")
    public ResponseEntity<byte[]> descargarReporteReservas() throws IOException {
        byte[] excelBytes = reporteService.generarReporteReservas();
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reporte_reservas.xlsx")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(excelBytes);
    }

    @GetMapping("/inventario")
    public ResponseEntity<byte[]> descargarReporteInventario() throws IOException {
        byte[] excelBytes = reporteService.generarReporteInventario();
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reporte_inventario.xlsx")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(excelBytes);
    }
}
