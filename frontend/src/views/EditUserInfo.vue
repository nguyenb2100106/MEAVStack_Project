<template>
  <div v-if="user" class="page">
    <h4>Chỉnh sửa thông tin</h4>
    <UserInfoForm :user="user" @submit:user="updateUser" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import UserInfoForm from "@/components/UserInfoform.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    UserInfoForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      user: null,
      message: "",
    };
  },
  methods: {
    async getUser(id) {
      try {
        this.user = await UserService.getUser(id);
      } catch (error) {
        console.error(error);
        this.$router.push({ name: "notfound" });
      }
    },
    async updateUser(data) {
      try {
        await UserService.updateUser(this.user._id, data);
        alert("Độc giả đã được cập nhật thành công.");
        this.$router.push({ name: "info" });
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getUser(this.id);
  },
};
</script>
