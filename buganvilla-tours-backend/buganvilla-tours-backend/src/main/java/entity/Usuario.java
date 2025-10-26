package entity;

import jakarta.persistence.*;
import lombok.Data; // Opcional: usa Lombok si lo agregas al pom.xml

@Entity
@Table(name = "Usuario")
@Data // Genera getters/setters automáticamente
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUsuario;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    // Si usas Lombok, no necesitas getters/setters manuales
}