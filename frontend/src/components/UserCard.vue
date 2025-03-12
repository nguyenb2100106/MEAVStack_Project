<template>
  <div class="user-info-card shadow-sm">
    <h5 class="card-header bg-primary text-white text-center">
      Thông tin người dùng
    </h5>
    <div class="card-body">
      <div class="info-item">
        <i class="fas fa-user"></i>
        <strong>Họ và tên:</strong>
        <span>{{ user.name }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-user-circle"></i>
        <strong>Tên đăng nhập:</strong>
        <span>{{ user.username }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-birthday-cake"></i>
        <strong>Ngày sinh:</strong>
        <span>{{ user.birth }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-venus-mars"></i>
        <strong>Giới tính:</strong>
        <span>{{ user.gender }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-map-marker-alt"></i>
        <strong>Địa chỉ:</strong>
        <span>{{ user.address }}</span>
      </div>

      <div class="info-item">
        <i class="fas fa-phone"></i>
        <strong>Số điện thoại:</strong>
        <span>{{ user.phone }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
  },
};
</script>

<style scoped>
/* Card chứa thông tin */
.user-info-card {
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
