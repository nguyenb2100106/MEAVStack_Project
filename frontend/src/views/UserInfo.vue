<template>
  <div class="account-info">
    <h1 class="account-title">Thông tin cá nhân</h1>
    <table class="account-table">
      <tbody>
        <tr>
          <td class="label"><strong>Tên Độc giả:</strong></td>
          <td>{{ user.name }}</td>
        </tr>
        <tr>
          <td class="label"><strong>Tên đăng nhập:</strong></td>
          <td>{{ user.username }}</td>
        </tr>
        <tr>
          <td class="label"><strong>Ngày sinh:</strong></td>
          <td>{{ user.birth }}</td>
        </tr>
        <tr>
          <td class="label"><strong>Giới tính:</strong></td>
          <td>{{ user.gender ? "Nam" : "Nữ" }}</td>
        </tr>
        <tr>
          <td class="label"><strong>Địa chỉ:</strong></td>
          <td>{{ user.address }}</td>
        </tr>
        <tr>
          <td class="label"><strong>Số điện thoại:</strong></td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>

    <button class="btn-edit" @click="editProfile">Chỉnh sửa thông tin</button>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    try {
      const userId = localStorage.getItem("_id");
      if (userId) {
        const userData = await UserService.getUser(userId);
        this.user = userData;
      } else {
        this.$router.push({ name: "loginuser" });
      }
    } catch (error) {
      console.error("Không thể tải thông tin cá nhân", error);
    }
  },
  methods: {
    editProfile() {
      const userId = localStorage.getItem("_id");
      if (userId) {
        this.$router.push({ name: "editinfo", params: { id: userId } });
      } else {
        console.error("Không tìm thấy id người dùng.");
      }
    },
  },
};
</script>

<style scoped>
/* Giao diện tổng thể */
.account-info {
  max-width: 600px;
  margin: 40px auto;
  padding: 25px;
  background: #e6f0ff; /* Xanh lam nhạt */
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Tiêu đề */
.account-title {
  font-size: 26px;
  font-weight: bold;
  color: #004085; /* Xanh lam đậm */
  margin-bottom: 20px;
}

/* Bảng thông tin */
.account-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.account-table tbody tr {
  border-bottom: 1px solid #cce5ff; /* Viền nhạt giữa các dòng */
}

.account-table td {
  padding: 12px 15px;
  text-align: left;
}

.account-table .label {
  font-weight: bold;
  color: black;
  width: 180px;
  background: #f8f9fa; /* Màu nền nhẹ cho label */
}

/* Nút chỉnh sửa */
.btn-edit {
  margin-top: 20px;
  padding: 10px 18px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-edit:hover {
  background-color: #0056b3;
}
</style>
