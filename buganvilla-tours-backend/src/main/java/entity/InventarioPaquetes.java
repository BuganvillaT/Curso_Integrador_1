package entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import model.Paquete;

@Entity
@Table(name = "Inventario_Paquetes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventarioPaquetes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInventario;
    
    @Column(nullable = false)
    private Integer cupoTotal;
    
    @Column(nullable = false)
    private Integer cupoDisponible;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_paquete")
    private Paquete paquete;

}
