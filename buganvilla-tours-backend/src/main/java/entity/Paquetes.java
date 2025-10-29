package entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "Paquetes")
public class Paquetes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paquete")
    private Integer idPaquete;

    private String nombrePaquete;

    @Column(columnDefinition = "text")
    private String descripcion;

    @Column(name = "precio_base")
    private BigDecimal precioBase;

    @Column(name = "duracion_dias")
    private Integer duracionDias;

    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_lugar")
    private Lugares lugar;

    @OneToMany(mappedBy = "paquete")
    private List<InventarioPaquetes> inventarios;

}
