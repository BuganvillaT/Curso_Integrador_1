package Utilidades;

import entity.Reserva;
import entity.InventarioPaquetes;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ReporteExcelUtil {
    public static byte[] generarExcelReservas(List<Reserva> reservas) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Reservas");
        
        // Encabezados
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("ID Reserva");
        header.createCell(1).setCellValue("Usuario");
        header.createCell(2).setCellValue("Paquete");
        header.createCell(3).setCellValue("Fecha Reserva");
        
        // Datos
        int rowNum = 1;
        for (Reserva r : reservas) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(r.getIdReserva());
            row.createCell(1).setCellValue(r.getUsuario().getNombre());
            row.createCell(2).setCellValue(r.getInventario().getPaquete().getNombrePaquete());
            row.createCell(3).setCellValue(r.getFechaReserva().toString());
        }
        
        // Convertir a bytes
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        return outputStream.toByteArray();
    }

    public static byte[] generarExcelInventario(List<InventarioPaquetes> inventarios) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Inventario");
        
        // Encabezados
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("ID Inventario");
        header.createCell(1).setCellValue("Paquete");
        header.createCell(2).setCellValue("Cupo Total");
        header.createCell(3).setCellValue("Cupo Disponible");
        
        // Datos
        int rowNum = 1;
        for (InventarioPaquetes i : inventarios) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(i.getIdInventario());
            row.createCell(1).setCellValue(i.getPaquete().getNombrePaquete());
            row.createCell(2).setCellValue(i.getCupoTotal());
            row.createCell(3).setCellValue(i.getCupoDisponible());
        }
        
        // Convertir a bytes
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        return outputStream.toByteArray();
    }
}