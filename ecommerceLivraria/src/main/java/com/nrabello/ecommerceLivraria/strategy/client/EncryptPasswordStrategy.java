package com.nrabello.ecommerceLivraria.strategy.client;

import com.nrabello.ecommerceLivraria.model.Client;
import com.nrabello.ecommerceLivraria.strategy.IStrategy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class EncryptPasswordStrategy implements IStrategy<Client> {
    @Override
    public List<Client> process(Client model) {

        Pattern specialCharPattern = Pattern.compile("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*0-9]{8,}$");
        Matcher matcher = specialCharPattern.matcher(model.getPassword());

        if (!matcher.matches()) {
            throw new IllegalArgumentException("A Senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial");
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        model.setPassword(passwordEncoder.encode(model.getPassword()));

        return List.of(model);
    }
}
