package com.buganvilla.buganvillatours.config;

import com.buganvilla.buganvillatours.model.entity.Usuario;
import com.buganvilla.buganvillatours.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            log.info("Iniciando verificación de usuarios iniciales...");
            updatePasswordIfPlain("admin@buganvilla.com", "admin123");
            updatePasswordIfPlain("cliente@buganvilla.com", "cliente123");
        };
    }

    private void updatePasswordIfPlain(String email, String rawPassword) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Verificamos si la contraseña NO parece estar encriptada (BCrypt empieza con $2a$)
            // O si coincide exactamente con el texto plano (por si acaso)
            if (!usuario.getPassword().startsWith("$2a$") || usuario.getPassword().equals(rawPassword)) {
                log.info("Detectada contraseña no encriptada para usuario: {}", email);
                usuario.setPassword(passwordEncoder.encode(rawPassword));
                usuarioRepository.save(usuario);
                log.info("Contraseña encriptada y actualizada exitosamente para: {}", email);
            } else {
                log.info("El usuario {} ya tiene una contraseña encriptada.", email);
            }
        } else {
            log.warn("Usuario {} no encontrado en la base de datos.", email);
        }
    }
}
