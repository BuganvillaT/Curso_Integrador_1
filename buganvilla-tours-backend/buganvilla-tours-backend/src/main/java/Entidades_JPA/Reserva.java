package Entidades_JPA;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_reserva;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_inventario", nullable = false)
    private InventarioPaquetes inventarioPaquetes;

    private Integer cantidad_personas;
    private LocalDateTime fecha_reserva;
    private String estado = "pendiente";

    // Getters y Setters
    public Long getId_reserva() { return id_reserva; }
    public void setId_reserva(Long id_reserva) { this.id_reserva = id_reserva; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public InventarioPaquetes getInventarioPaquetes() { return inventarioPaquetes; }
    public void setInventarioPaquetes(InventarioPaquetes inventarioPaquetes) { this.inventarioPaquetes = inventarioPaquetes; }

    public Integer getCantidad_personas() { return cantidad_personas; }
    public void setCantidad_personas(Integer cantidad_personas) { this.cantidad_personas = cantidad_personas; }

    public LocalDateTime getFecha_reserva() { return fecha_reserva; }
    public void setFecha_reserva(LocalDateTime fecha_reserva) { this.fecha_reserva = fecha_reserva; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
