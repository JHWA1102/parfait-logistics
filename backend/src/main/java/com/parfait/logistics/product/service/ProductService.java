package com.parfait.logistics.product.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.parfait.logistics.common.exception.BusinessException;
import com.parfait.logistics.common.exception.ErrorCode;
import com.parfait.logistics.company.entity.Company;
import com.parfait.logistics.product.dto.CreateProductRequest;
import com.parfait.logistics.product.dto.ProductResponse;
import com.parfait.logistics.product.dto.UpdateProductRequest;
import com.parfait.logistics.product.entity.Product;
import com.parfait.logistics.product.repository.ProductRepository;
import com.parfait.logistics.user.entity.User;
import com.parfait.logistics.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductResponse createProduct(Long userId, CreateProductRequest request) {
        User user = findUser(userId);
        Company company = user.getCompany();

        if (productRepository.existsByCompanyAndCode(company, request.getCode())) {
            throw new BusinessException(ErrorCode.PRODUCT_CODE_ALREADY_EXISTS);
        }

        Product product = Product.builder()
                .company(company)
                .code(request.getCode())
                .name(request.getName())
                .unit(request.getUnit())
                .active(true)
                .build();

        productRepository.save(product);
        return ProductResponse.from(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProducts(Long userId) {
        User user = findUser(userId);

        return productRepository.findAllByCompanyOrderByCodeAsc(user.getCompany())
                .stream()
                .map(ProductResponse::from)
                .toList();
    }

    public ProductResponse updateProduct(Long userId, Long productId, UpdateProductRequest request) {
        Product product = findProduct(productId, findUser(userId).getCompany());
        product.update(request.getName(), request.getUnit(), request.getActive());
        return ProductResponse.from(product);
    }

    public void deleteProduct(Long userId, Long productId) {
        Product product = findProduct(productId, findUser(userId).getCompany());
        productRepository.delete(product);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    private Product findProduct(Long productId, Company company) {
        return productRepository.findByIdAndCompany(productId, company)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
    }
}
