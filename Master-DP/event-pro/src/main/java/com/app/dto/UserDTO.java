package com.app.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UserDTO {

  @Schema(example = "0")
  private Integer id;

  @Schema(example = "Гери")
  private String name;

  @Schema(example = "ivan.p@abv.bg")
  private String email;

  @Schema(example = "123")
  private String password;

  @Schema(example = "София")
  private String city;

  @Schema(example = "admin")
  private String type;

  @Schema(example = "")
  private String sessionToken;
}
