<template>
  <div class="page">
    <h4>Đăng ký</h4>
    <UserForm :user="user" :isRegisterPage="true" @submit:user="addUser" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    UserForm,
  },
  data() {
    return {
      user: {
        name: "",
        username: "",
        password: "",
        birth: "",
        gender: "",
        address: "",
        phone_number: "",
        email: "",
      },
      message: "",
    };
  },
  methods: {
    async addUser(data) {
      try {
        await UserService.create(data);
        alert("Người dùng đã được thêm thành công.");
        this.$router.push({ name: "loginuser" });
      } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        this.message = "Không thể thêm người dùng. Vui lòng thử lại.";
      }
    },
  },
};
</script>
