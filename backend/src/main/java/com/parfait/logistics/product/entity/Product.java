package com.parfait.logistics.product.entity;

import com.parfait.logistics.common.entity.BaseEntity;
import com.parfait.logistics.company.entity.Company;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(
        name = "products",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_products_company_code",
                columnNames = { "company_id", "code" }))
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false, length = 30)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 20)
    private String unit;

    @Column(nullable = false)
    private Boolean active;

    @Builder
    public Product(Company company, String code, String name, String unit, Boolean active) {
        this.company = company;
        this.code = code;
        this.name = name;
        this.unit = unit;
        this.active = active;
    }

    public void update(String name, String unit, Boolean active) {
        this.name = name;
        this.unit = unit;
        this.active = active;
    }
}
