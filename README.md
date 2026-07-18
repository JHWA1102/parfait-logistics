# 🚚 PARFAIT Logistics ERP

<p align="center">
  <b>Enterprise Resource Planning (ERP) & Warehouse Management System (WMS)</b><br>
  Built with Vue 3, Spring Boot and PostgreSQL.
</p>

<p align="center">
  <a href="https://parfait-logistics.vercel.app" target="_blank">
    🌐 Live Demo
  </a>
</p>

---

# 📖 Overview

**PARFAIT Logistics ERP**는 실제 물류 및 유통 업무를 기반으로 개발 중인 ERP/WMS 프로젝트입니다.

단순한 CRUD 예제가 아닌 실제 기업에서 사용하는 업무 흐름을 구현하는 것을 목표로 하고 있습니다.

프로젝트의 핵심 목표는 다음과 같습니다.

- 회사(Company) 관리
- 사용자 및 권한 관리
- 창고(Warehouse) 관리
- 품목(Product) 관리
- 재고(Inventory) 관리
- 입고(Inbound)
- 출고(Outbound)
- 거래처(Customer)
- 주문(Order)
- 대시보드(Dashboard)

향후 모바일 앱과 연동 가능한 구조까지 고려하여 설계하고 있습니다.

---

# 🏗 Architecture

```
Vue 3
      │
      ▼
Spring Boot REST API
      │
      ▼
PostgreSQL
```

---

# 🛠 Tech Stack

## Frontend

- Vue 3
- Vite
- Pinia
- Vue Router
- CSS3

## Backend

- Java 17
- Spring Boot 4.1
- Spring Security
- Spring Data JPA
- PostgreSQL
- Gradle

## Deployment

Frontend

- Vercel

Backend

- Render (Planned)

Database

- PostgreSQL

---

# 📂 Project Structure

```
parfait-logistics
├── frontend
│   ├── src
│   └── ...
└── backend
    ├── src
    └── ...
```

---

# ✅ Implemented

## Frontend

- Dashboard
- Inventory UI
- Customer UI
- Search
- Reusable Components
- Pinia State Management

## Backend

- Company Entity
- User Entity
- Spring Security
- BCrypt Password Encryption
- User Registration API
- Login API
- Global Exception Handler
- JPA Auditing
- PostgreSQL Integration

---

# 🚧 In Progress

- JWT Authentication
- Warehouse Management

---

# 📅 Roadmap

## Authentication

- [x] Sign Up
- [x] Login
- [ ] JWT Authentication
- [ ] Refresh Token

## ERP

- [ ] Warehouse
- [ ] Product
- [ ] Inventory
- [ ] Inbound
- [ ] Outbound
- [ ] Customer
- [ ] Supplier
- [ ] Order
- [ ] Dashboard

---

# 📸 Screenshots

## Dashboard

<img width="1918" height="878" alt="image" src="https://github.com/user-attachments/assets/c3460852-f640-4eec-9c76-09e8a8a98255" />

## Inventory

<img width="1917" height="878" alt="image" src="https://github.com/user-attachments/assets/1f9eabbb-28a6-456d-bd0e-3a06dbef1b7f" />

## Customer

<img width="1916" height="873" alt="image" src="https://github.com/user-attachments/assets/8ce9f23d-6ab1-43b9-b1a3-6c458c3f00f3" />

---

# 💡 Why This Project?

대부분의 개인 프로젝트는 게시판이나 쇼핑몰에 집중되어 있습니다.

PARFAIT Logistics ERP는 실제 물류 업무 프로세스를 이해하고 구현하기 위해 시작한 프로젝트입니다.

프로젝트를 진행하면서 다음과 같은 내용을 경험하는 것을 목표로 합니다.

- ERP 도메인 설계
- REST API 설계
- 인증 및 권한 관리
- 재고 관리 로직
- 트랜잭션 처리
- 데이터 모델링
- 실무 수준의 프로젝트 구조

---

# 🎯 Future Goals

- JWT 인증
- ERP 핵심 기능 구현
- 모바일 앱 연동
- Docker 배포
- CI/CD 구축
- AWS 배포

---

# 👨‍💻 Developer

**Joy**

Backend

- Spring Boot
- Java

Frontend

- Vue 3

---

## ⭐ Project Status

**Actively Developing**
