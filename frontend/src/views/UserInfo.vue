<template>
  <div class="account-info">
    <h1>Thông tin tài khoản</h1>
    <table class="account-table">
      <tr>
        <td><strong>Tên Độc giả:</strong></td>
        <td>{{ user.name }}</td>
      </tr>
      <tr>
        <td><strong>Tên đăng nhập:</strong></td>
        <td>{{ user.username }}</td>
      </tr>
      <tr>
        <td><strong>Ngày sinh:</strong></td>
        <td>{{ user.birth }}</td>
      </tr>
      <tr>
        <td><strong>Giới tính:</strong></td>
        <td>{{ user.gender ? "Nam" : "Nữ" }}</td>
      </tr>
      <tr>
        <td><strong>Địa chỉ:</strong></td>
        <td>{{ user.address }}</td>
      </tr>
      <tr>
        <td><strong>Số điện thoại:</strong></td>
        <td>{{ user.phone }}</td>
      </tr>
    </table>

    <button class="btn btn-primary" @click="editProfile">
      Chỉnh sửa thông tin
    </button>
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
      console.error("Không thể tải thông tin tài khoản", error);
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
.account-info {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.account-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.account-table td {
  padding: 10px;
  border: none; /* Xóa các viền */
}

.account-table td:first-child {
  width: 200px;
}

.account-table td:nth-child(2) {
  word-wrap: break-word;
}

button {
  margin-top: 20px;
}
</style>
