package com.akash.portfolio.contact;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {
    private final ContactRepository repository;

    public ContactController(ContactRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "service", "portfolio-backend");
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContact(@Valid @RequestBody ContactRequest request) {
        ContactMessage saved = repository.save(
                new ContactMessage(request.name().trim(), request.email().trim(),
                        request.subject() == null ? "" : request.subject().trim(),
                        request.message().trim())
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Contact message saved successfully",
                "id", saved.getId().toString()
        ));
    }
}
