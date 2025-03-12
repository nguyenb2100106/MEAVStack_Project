<template>
  <nav class="navbar navbar-expand navbar-dark justify-content-center">
    <div class="navbar-nav d-flex justify-content-around w-100">
      <template v-if="role === 'staff'">
        <router-link
          :to="{ name: 'publishers' }"
          class="nav-link"
          :class="{ active: $route.name === 'publishers' }"
        >
          Nhà xuất bản
        </router-link>
        <router-link
          :to="{ name: 'users' }"
          class="nav-link"
          :class="{ active: $route.name === 'users' }"
        >
          Độc giả
        </router-link>
        <router-link
          :to="{ name: 'staffs' }"
          class="nav-link"
          :class="{ active: $route.name === 'staffs' }"
        >
          Nhân viên
        </router-link>
        <router-link
          :to="{ name: 'books' }"
          class="nav-link"
          :class="{ active: $route.name === 'books' }"
        >
          Sách
        </router-link>
        <router-link
          :to="{ name: 'bookborrow' }"
          class="nav-link"
          :class="{ active: $route.name === 'bookborrow' }"
        >
          Mượn sách
        </router-link>
        <router-link
          :to="{ name: 'bookPendingBorrow' }"
          class="nav-link"
          :class="{ active: $route.name === 'bookPendingBorrow' }"
        >
          Đơn mượn sách
        </router-link>
      </template>
      <template v-else-if="role === 'user'">
        <router-link
          :to="{ name: 'bookuser' }"
          class="nav-link"
          :class="{ active: $route.name === 'bookuser' }"
        >
          Danh sách Sách
        </router-link>
        <router-link
          :to="{ name: 'checkingBorrow' }"
          class="nav-link"
          :class="{ active: $route.name === 'checkingBorrow' }"
        >
          Kiểm tra mượn sách
        </router-link>
        <router-link
          :to="{ name: 'info' }"
          class="nav-link"
          :class="{ active: $route.name === 'info' }"
        >
          Thông tin cá nhân
        </router-link>
      </template>
    </div>

    <div class="avatar-container position-relative">
      <div
        class="avatar rounded-circle d-flex justify-content-center align-items-center text-white"
        @mouseenter="showLogout = true"
      >
        {{ avatarText }}
      </div>
      <div
        class="logout-box text-center bg-light text-dark py-2 rounded shadow"
        v-if="showLogout"
        @mouseleave="showLogout = false"
        @click="logout"
      >
        Thoát
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showLogout: false,
    };
  },
  computed: {
    name() {
      return localStorage.getItem("name") || "";
    },
    role() {
      return localStorage.getItem("role") || "";
    },
    avatarText() {
      return this.name ? this.name.charAt(0).toUpperCase() : "?";
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    checkAuthentication() {
      if (this.name == "") {
        this.logout();
      }
      if (this.role == "") {
        this.logout();
      }
    },
  },
  mounted() {
    this.checkAuthentication();
  },
};
</script>

<style scoped>
.navbar {
  padding: 0.5rem 1rem;
  background-color: #007bff; /* 🔹 Màu xanh lam */
  color: #000; /* 🔹 Chữ màu đen */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.navbar-nav .nav-link {
  font-size: 1rem;
  color: #000; /* 🔹 Chữ màu đen */
  font-weight: normal;
  transition: color 0.3s;
}

.navbar-nav .nav-link:hover {
  color: #fbfbfb; /* 🔹 Giữ nguyên màu đen khi hover */
  font-weight: bold;
}

.navbar-nav .nav-link.active {
  font-weight: bold;
  color: #fdfdfd; /* 🔹 Chữ màu đen khi active */
}

.avatar {
  width: 50px;
  height: 50px;
  background-color: #0056b3; /* 🔹 Màu xanh đậm hơn */
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 0.3s, box-shadow 0.3s;
}

.avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

.logout-box {
  position: absolute;
  top: 60px;
  right: 0;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-box:hover {
  background-color: #0056b3; /* 🔹 Màu xanh hover */
  color: #fff; /* 🔹 Chữ trắng khi hover */
}
</style>
