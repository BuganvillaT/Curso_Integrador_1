package entity;
import jakarta.persistence.*;
import java.util.List;
@Entity
@Table(name = "Lugares")
public class Lugares {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lugar")
    private Integer idLugar;

    private String nombreLugar;
    private String ciudad;
    private String descripcion;

    @OneToMany(mappedBy = "lugar")
    private List<Paquetes> paquetes;

    public Lugares(Integer idLugar, String nombreLugar, String ciudad, String descripcion, List<Paquetes> paquetes) {
        this.idLugar = idLugar;
        this.nombreLugar = nombreLugar;
        this.ciudad = ciudad;
        this.descripcion = descripcion;
        this.paquetes = paquetes;
    }

    public Integer getIdLugar() {
        return idLugar;
    }

    public void setIdLugar(Integer idLugar) {
        this.idLugar = idLugar;
    }

    public String getNombreLugar() {
        return nombreLugar;
    }

    public void setNombreLugar(String nombreLugar) {
        this.nombreLugar = nombreLugar;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Paquetes> getPaquetes() {
        return paquetes;
    }

    public void setPaquetes(List<Paquetes> paquetes) {
        this.paquetes = paquetes;
    }
}

