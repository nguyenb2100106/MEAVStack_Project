<template>
  <div class="login container">
    <nav class="nav justify-content-center mb-4">
      <router-link to="/login/user" class="nav-link" :class="{ active: isUser }"
        >Người dùng</router-link
      >
      <router-link to="/login" class="nav-link" :class="{ active: !isUser }"
        >Nhân viên</router-link
      >
    </nav>
    <h2 class="text-center mb-4">Đăng nhập</h2>
    <form @submit.prevent="handleLogin" class="form-signin">
      <div class="mb-3">
        <label for="username" class="form-label">Tên đăng nhập:</label>
        <input
          type="text"
          id="username"
          class="form-control"
          v-model="username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
      <p v-if="errorMessage" class="error text-center mt-3">
        {{ errorMessage }}
      </p>
    </form>
    <p class="text-center mt-3">
      Bạn chưa có tài khoản?
      <router-link to="/register" class="text-primary">Đăng ký</router-link>
    </p>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  computed: {
    isUser() {
      return this.$route.path.includes("user");
    },
  },
  methods: {
    async handleLogin() {
      try {
        const response = await UserService.login(this.username, this.password);

        // Kiểm tra API có trả về token không
        // console.log("Dữ liệu trả về từ API:", response?.data);

        if (response?.data?.token) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("_id", response.data.user.id);
          localStorage.setItem("role", "user");
          this.$router.push("/bookuser");
        } else {
          this.errorMessage =
            "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.";
        }
      } catch (error) {
        console.error("Lỗi đăng nhập:", error.response?.data || error);
        this.errorMessage =
          error.response?.data?.message || "Đăng nhập thất bại. Đã xảy ra lỗi.";
      }
    },
  },
};
</script>

<style scoped>
/* Tạo bố cục trung tâm */
.login {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  border-radius: 10px;
  background: #e3f2fd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Căn giữa các nút chuyển tab */
.nav {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 5px;
}

.nav-link {
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  color: #333;
  transition: 0.3s;
}

.nav-link:hover {
  background: #007bff;
  color: white;
}

.nav-link.active {
  background: #007bff;
  color: white;
  font-weight: bold;
}

/* Tiêu đề form */
h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

/* Cấu trúc form */
.form-signin .form-label {
  font-weight: 500;
  color: #333;
}

/* Thiết kế input đẹp hơn */
.form-control {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: 0.3s;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Hiệu ứng nút đăng nhập */
.btn-primary {
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: bold;
  transition: 0.3s;
}

.btn-primary:hover {
  background: #0056b3;
}

/* Thông báo lỗi */
.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
}
</style>
