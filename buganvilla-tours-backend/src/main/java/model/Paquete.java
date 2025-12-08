package model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "Paquete")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paquete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPaquete;
    
    @Column(nullable = false, length = 200)
    private String nombrePaquete;
}
