<!-- <template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh sách độc giả
        <i class="fas fa-book-user"></i>
      </h4>
      <UserList
        v-if="filteredUsersCount > 0"
        :users="filteredUsers"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có độc giả nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary w-auto" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success w-auto" @click="goToAddUser">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger w-auto" @click="removeAllUsers">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeUser">
        <h4>
          Chi tiết độc giả
          <i class="fas fa-id-card"></i>
        </h4>
        <UserCard :user="activeUser" />
        <router-link
          :to="{ name: 'user.edit', params: { id: activeUser._id } }"
        >
          <span class="mt-2 badge bg-warning">
            <i class="fas fa-edit"></i> Chỉnh sửa
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    UserCard,
    InputSearch,
    UserList,
  },
  data() {
    return {
      users: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    userStrings() {
      return this.users.map((user) => {
        const { name, birth, gender, address, phone } = user;
        return [name, birth, gender, address, phone].join("");
      });
    },
    filteredUsers() {
      if (!this.searchText) return this.users;
      return this.users.filter((_reader, index) =>
        this.userStrings[index].includes(this.searchText)
      );
    },
    activeUser() {
      if (this.activeIndex < 0) return null;
      return this.filteredUsers[this.activeIndex];
    },
    filteredUsersCount() {
      return this.filteredUsers.length;
    },
  },
  methods: {
    async retrieveUsers() {
      try {
        this.users = await UserService.getAllUsers();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveUsers();
      this.activeIndex = -1;
    },
    async removeAllUsers() {
      if (confirm("Bạn muốn xóa tất cả độc giả?")) {
        try {
          await UserService.deleteAllUser();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddUser() {
      this.$router.push({ name: "user.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script> -->

<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6 user-section">
      <h4 class="section-title">
        Danh sách người dùng
        <i class="fas fa-book-user"></i>
      </h4>
      <UserList
        v-if="filteredUsersCount > 0"
        :users="filteredUsers"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có người dùng nào.</p>
      <div
        class="mt-3 row justify-content-around align-items-center button-group"
      >
        <button class="btn btn-sm btn-primary w-auto" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success w-auto" @click="goToAddUser">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger w-auto" @click="removeAllUsers">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6 user-section">
      <div v-if="activeUser">
        <h4 class="section-title">
          Chi tiết người dùng
          <i class="fas fa-id-card"></i>
        </h4>
        <UserCard :user="activeUser" />
        <router-link
          :to="{ name: 'user.edit', params: { id: activeUser._id } }"
          class="edit-link"
        >
          <span class="mt-2 badge bg-warning">
            <i class="fas fa-edit"></i> Chỉnh sửa
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    UserCard,
    InputSearch,
    UserList,
  },
  data() {
    return {
      users: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    userStrings() {
      return this.users.map((user) => {
        const { name, birth, gender, address, phone } = user;
        return [name, birth, gender, address, phone].join("");
      });
    },
    filteredUsers() {
      if (!this.searchText) return this.users;
      return this.users.filter((_reader, index) =>
        this.userStrings[index].includes(this.searchText)
      );
    },
    activeUser() {
      if (this.activeIndex < 0) return null;
      return this.filteredUsers[this.activeIndex];
    },
    filteredUsersCount() {
      return this.filteredUsers.length;
    },
  },
  methods: {
    async retrieveUsers() {
      try {
        this.users = await UserService.getAllUsers();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveUsers();
      this.activeIndex = -1;
    },
    async removeAllUsers() {
      if (confirm("Bạn muốn xóa tất cả người dùng?")) {
        try {
          await UserService.deleteAllUser();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddUser() {
      this.$router.push({ name: "user.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
/* Đảm bảo các cột có cùng padding và margin */
.user-section {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* Tiêu đề của cả hai cột */
.section-title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

/* Đảm bảo UserCard và UserList có cùng chiều rộng tối đa */
.user-section > * {
  max-width: 400px; /* Đồng bộ với max-width của UserList */
  margin: 0 auto;
  width: 100%;
}

/* Nhóm nút bên trái */
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px; /* Khoảng cách giữa các nút */
}

/* Căn chỉnh nút "Chỉnh sửa" */
.edit-link {
  display: block;
  text-align: center;
  margin-top: 20px;
}

/* Đảm bảo nút "Chỉnh sửa" có kích thước tương tự các nút bên trái */
.edit-link .badge {
  padding: 8px 16px;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* Responsive */
@media (max-width: 768px) {
  .user-section {
    align-items: center;
  }

  .section-title {
    justify-content: center;
  }
}
</style>
