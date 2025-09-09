
package com.penny.services;

import com.penny.dto.CategoryCreateUpdateDTO;
import com.penny.dto.CategoryDTO;
import com.penny.models.Category;
import com.penny.repositories.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Page<CategoryDTO> getCategories(Pageable pageable) {
        return categoryRepository.findAll(pageable).map(this::convertToDTO);
    }

    public Optional<CategoryDTO> getCategoryById(Long id) {
        return categoryRepository.findById(id).map(this::convertToDTO);
    }

    public CategoryDTO createCategory(CategoryCreateUpdateDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setSlug(categoryDTO.getSlug());

        return convertToDTO(categoryRepository.save(category));
    }

    public Optional<CategoryDTO> updateCategory(Long id, CategoryCreateUpdateDTO categoryDetails) {
        return categoryRepository.findById(id)
                .map(category -> {
                    if (categoryDetails.getName() != null) {
                        category.setName(categoryDetails.getName());
                    }
                    if (categoryDetails.getDescription() != null) {
                        category.setDescription(categoryDetails.getDescription());
                    }
                    if (categoryDetails.getSlug() != null) {
                        category.setSlug(categoryDetails.getSlug());
                    }
                    return convertToDTO(categoryRepository.save(category));
                });
    }

    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setSlug(category.getSlug());
        return dto;
    }
}
