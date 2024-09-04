package com.app.conroller;
import java.util.List;

import com.app.model.model.Category;
import com.app.model.model.Type;
import com.app.repository.CategoryRepository;
import com.app.repository.TypeRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.app.configuration.WebPath.API_VERSION_1;

@RestController
@RequestMapping(API_VERSION_1)
@CrossOrigin(origins = "localhost:4200")
@Tag(name = "Enums operations", description = "Basic CRUD operations related to enums")

public class EnumsController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TypeRepository typeRepository;

    // get all categories
    @GetMapping("/categories")
    public List<Category> getAllCategories(){
        return (List<Category>) categoryRepository.findAll();
    }

    // get all types
    @GetMapping("/types")
    public List<Type> getAllTypes(){
        return (List<Type>) typeRepository.findAll();
    }

}
