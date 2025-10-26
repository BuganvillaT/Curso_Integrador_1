package model;

import jakarta.persistence.*;

@Entity
@Table(name = "paquete")
public class Paquete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPaquete;

    @Column(name = "nombre_paquete", nullable = false, length = 100)
    private String nombrePaquete;

    // Otros campos relevantes para un paquete turístico

    // Getters y Setters
    public Integer getIdPaquete() {
        return idPaquete;
    }

    public void setIdPaquete(Integer idPaquete) {
        this.idPaquete = idPaquete;
    }

    public String getNombrePaquete() {
        return nombrePaquete;
    }

    public void setNombrePaquete(String nombrePaquete) {
        this.nombrePaquete = nombrePaquete;
    }
}