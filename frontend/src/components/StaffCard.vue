<template>
  <div class="staff-info-card shadow-sm">
    <h5 class="card-header bg-primary text-white text-center">
      Thông tin nhân viên
    </h5>
    <div class="card-body">
      <div class="info-item">
        <i class="fas fa-user"></i>
        <strong>Họ và tên:</strong>
        <span>{{ staff.name }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-user-circle"></i>
        <strong>Tên đăng nhập:</strong>
        <span>{{ staff.username }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-briefcase"></i>
        <strong>Chức vụ:</strong>
        <span>{{ staff.position }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-map-marker-alt"></i>
        <strong>Địa chỉ:</strong>
        <span>{{ staff.address }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-phone"></i>
        <strong>Số điện thoại:</strong>
        <span>{{ staff.phone }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-envelope"></i>
        <strong>Email:</strong>
        <span>{{ staff.email }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    staff: { type: Object, required: true },
  },
};
</script>

<style scoped>
/* Card chứa thông tin */
.staff-info-card {
  max-width: 400px; /* Đồng bộ với StaffList */
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Header của card */
.card-header {
  font-size: 1.25rem;
  font-weight: 600;
  padding: 12px 0;
}

/* Nội dung của card */
.card-body {
  padding: 20px;
  background-color: #f8f9fa;
}

/* Mỗi dòng thông tin */
.info-item {
  display: grid;
  grid-template-columns: 30px 130px 1fr;
  align-items: center;
  margin-bottom: 14px;
  font-size: 1rem;
  line-height: 1.5;
}

/* Icon */
.info-item i {
  font-size: 1.1rem;
  color: #007bff;
  text-align: center;
}

/* Label (tên thuộc tính) */
.info-item strong {
  color: #007bff;
  font-weight: 600;
  padding-right: 10px;
}

/* Nội dung (giá trị) */
.info-item span {
  color: #333;
  font-weight: 500;
  word-break: break-word;
}

/* Responsive */
@media (max-width: 576px) {
  .staff-info-card {
    max-width: 100%;
  }

  .info-item {
    grid-template-columns: 25px 110px 1fr;
    font-size: 0.95rem;
  }
}
</style>
