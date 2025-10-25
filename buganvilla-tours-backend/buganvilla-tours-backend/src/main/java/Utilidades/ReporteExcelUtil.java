package com.buganvillatours.Utilidades;

import com.buganvillatours.Entidades_JPA.Reserva;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component // Esto permite que Spring lo gestione e inyecte dependencias si es necesario
public class ReporteExcelUtil {

    public ByteArrayInputStream generarReporteReservas(List<Reserva> reservas) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Reservas");

            // Estilo para encabezados
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);

            // Cabeceras
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Cliente", "Paquete", "Fecha Reserva", "Estado"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdx = 1;
            for (Reserva r : reservas) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(r.getId_reserva());
                row.createCell(1).setCellValue(r.getUsuario().getNombre());
                row.createCell(2).setCellValue(r.getInventarioPaquetes().getPaquete().getNombre_paquete());
                row.createCell(3).setCellValue(r.getFecha_reserva().toString());
                row.createCell(4).setCellValue(r.getEstado());
            }

            // Ajustar ancho de columnas automáticamente
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Error al generar el reporte Excel", e);
        }
    }
}
