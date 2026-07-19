package com.parfait.logistics.warehouse.entity;

import com.parfait.logistics.common.entity.BaseEntity;
import com.parfait.logistics.company.entity.Company;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "warehouses")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Warehouse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 소속 회사
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    // 창고 코드 (WH-001)
    @Column(nullable = false, unique = true, length = 30)
    private String code;

    // 창고명
    @Column(nullable = false, length = 100)
    private String name;

    // 주소
    @Column(length = 255)
    private String address;

    // 담당자
    @Column(length = 50)
    private String manager;

    // 사용 여부
    @Column(nullable = false)
    private Boolean active;

    @Builder
    public Warehouse(
            Company company,
            String code,
            String name,
            String address,
            String manager,
            Boolean active) {

        this.company = company;
        this.code = code;
        this.name = name;
        this.address = address;
        this.manager = manager;
        this.active = active;
    }

    public void update(
            String name,
            String address,
            String manager,
            Boolean active) {

        this.name = name;
        this.address = address;
        this.manager = manager;
        this.active = active;
    }
}