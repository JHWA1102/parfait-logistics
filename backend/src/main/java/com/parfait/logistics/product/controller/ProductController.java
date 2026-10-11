package com.parfait.logistics.product.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parfait.logistics.auth.security.CustomUserDetails;
import com.parfait.logistics.product.dto.CreateProductRequest;
import com.parfait.logistics.product.dto.ProductResponse;
import com.parfait.logistics.product.dto.UpdateProductRequest;
import com.parfait.logistics.product.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Validated
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductResponse createProduct(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CreateProductRequest request) {
        return productService.createProduct(userDetails.getUserId(), request);
    }

    @GetMapping
    public List<ProductResponse> getProducts(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return productService.getProducts(userDetails.getUserId());
    }

    @PutMapping("/{productId}")
    public ProductResponse updateProduct(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long productId,
            @Valid @RequestBody UpdateProductRequest request) {
        return productService.updateProduct(userDetails.getUserId(), productId, request);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long productId) {
        productService.deleteProduct(userDetails.getUserId(), productId);
        return ResponseEntity.noContent().build();
    }
}
