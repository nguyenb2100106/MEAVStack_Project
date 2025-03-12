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
  max-width: 400px;
  margin: auto;
  border-radius: 8px;
  overflow: hidden;
}

/* Header của card */
.card-header {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Nội dung của card */
.card-body {
  padding: 15px;
  background-color: #f8f9fa;
}

/* Mỗi dòng thông tin */
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1rem;
}

/* Icon */
.info-item i {
  width: 24px;
  color: #007bff;
  margin-right: 8px;
}

/* Label (tên thuộc tính) */
.info-item strong {
  color: #007bff;
  min-width: 120px;
  display: inline-block;
}

/* Nội dung (giá trị) */
.info-item span {
  color: #333;
  font-weight: 500;
}
</style>
