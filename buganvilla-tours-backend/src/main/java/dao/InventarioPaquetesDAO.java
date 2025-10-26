package dao;

import entity.InventarioPaquetes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventarioPaquetesDAO extends JpaRepository<InventarioPaquetes, Long> {
}
