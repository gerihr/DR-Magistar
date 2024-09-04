package com.app.service;

import com.app.model.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    private String formatDate(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        return formatter.format(date);
    }

    public void sendEmail(String toEmail, Long id, String name, Event event) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String formattedDate = formatDate(event.getDate());


        String htmlMsg = "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }" +
                ".container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
                ".header { background-color: #AF47D2; color: #fff; padding: 10px 0; text-align: center; border-radius: 8px 8px 0 0; }" +
                ".content { padding: 20px; }" +
                ".ticket-info { margin: 20px 0; }" +
                ".ticket-info h2 { color: #333; margin-bottom: 10px; }" +
                ".ticket-info p { margin: 5px 0; font-size: 16px; }" +
                ".code { font-size: 20px; font-weight: bold; color: #26355D; margin-top: 10px; }" +
                ".footer { margin-top: 20px; text-align: center; font-size: 12px; color: #777; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<h1>Вашият билет</h1>" +
                "</div>" +
                "<div class='content'>" +
                "<p>Здравейте, " + name + "!</p>" +
                "<p>Благодарим Ви за покупката! Ето подробностите за Вашето събитие:</p>" +
                "<div class='ticket-info'>" +
                "<h2>" + event.getHeader() + "</h2>" +
                "<p><strong>Адрес:</strong> " + event.getAddress() + "</p>" +
                "<p><strong>Дата:</strong> " + formattedDate + "</p>" +
                "<p><strong>Час:</strong> " + event.getTime() + "</p>" +
                "<p class='code'>Вашият номер на билет е:" + id + "</p>" +
                "</div>" +
                "</div>" +
                "<div class='footer'>" +
                "<p>Това е автоматично генерирано съобщение. Моля, не отговаряйте на него.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";

        helper.setText(htmlMsg, true);
        helper.setTo(toEmail);
        helper.setSubject("Твоят билет");
        helper.setFrom("test@gmail.com");

        mailSender.send(mimeMessage);
    }
}
