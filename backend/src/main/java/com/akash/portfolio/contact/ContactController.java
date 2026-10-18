
package com.akash.portfolio.contact;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactRepository repository;
    private final JavaMailSender mailSender;

    public ContactController(
            ContactRepository repository,
            JavaMailSender mailSender) {
        this.repository = repository;
        this.mailSender = mailSender;
    }

    // Check whether the backend is running
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "status", "UP",
                "service", "portfolio-backend"
        );
    }

    // Receive contact form and send both emails
    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContact(
            @Valid @RequestBody ContactRequest request) {

        // 1. Save the message in the database
        ContactMessage saved = repository.save(
                new ContactMessage(
                        request.name().trim(),
                        request.email().trim(),
                        request.subject() == null
                                ? "" : request.subject().trim(),
                        request.message().trim()
                )
        );

        try {
            String ownerEmail = System.getenv("MAIL_USERNAME");

            if (ownerEmail == null || ownerEmail.isBlank()) {
                throw new IllegalStateException(
                        "MAIL_USERNAME environment variable is missing");
            }

            // 2. Send customer enquiry to your email
            SimpleMailMessage ownerMail = new SimpleMailMessage();

            ownerMail.setTo(ownerEmail);
            ownerMail.setReplyTo(request.email().trim());
            ownerMail.setSubject(
                    "New Portfolio Enquiry: " +
                    (request.subject() == null ||
                     request.subject().isBlank()
                            ? "Contact Form"
                            : request.subject().trim())
            );

            ownerMail.setText(
                    "Hello Akash,\n\n" +
                    "You have received a new message through your portfolio.\n\n" +
                    "Customer Name: " + request.name() + "\n" +
                    "Customer Email: " + request.email() + "\n" +
                    "Subject: " + request.subject() + "\n\n" +
                    "Message:\n" + request.message() + "\n\n" +
                    "You can reply directly to this email to contact the customer."
            );

            mailSender.send(ownerMail);

            // 3. Send greeting email to the customer
            SimpleMailMessage customerMail = new SimpleMailMessage();

            customerMail.setTo(request.email().trim());
            customerMail.setSubject(
                    "Thank You for Contacting Akash!"
            );

            customerMail.setText(
                    "Hello " + request.name().trim() + ",\n\n" +
                    "Thank you for contacting me through my portfolio!\n\n" +
                    "I have received your message and appreciate your interest. " +
                    "I will review your enquiry and get back to you as soon as possible.\n\n" +
                    "Thank you for your time and consideration.\n\n" +
                    "Best regards,\n" +
                    "Akash Mallappa Hegadi\n" +
                    "Software Developer"
            );

            mailSender.send(customerMail);

            // 4. Return success to the React frontend
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of(
                            "message",
                            "Message saved and both emails sent successfully",
                            "id", saved.getId().toString()
                    )
            );

        } catch (Exception e) {
            // The database message remains saved even if email fails.
            System.err.println(
                    "Contact email error: " + e.getMessage()
            );

            return ResponseEntity.status(
                    HttpStatus.INTERNAL_SERVER_ERROR
            ).body(
                    Map.of(
                            "message",
                            "Your message was saved, but email delivery failed. Please check the backend email configuration."
                    )
            );
        }
    }
}
