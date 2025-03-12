<!-- <template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Nhà xuất bản
        <i class="fas fa-book"></i>
      </h4>
      <PublisherList
        v-if="filteredPublishersCount > 0"
        :publishers="filteredPublishers"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có nhà xuất bản nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success w-auto" @click="goToAddPublisher">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button
          class="btn btn-sm btn-danger w-auto"
          @click="removeAllPublishers"
        >
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="page row">
    <div class="content">
      <!-- Ô tìm kiếm -->
      <InputSearch v-model="searchText" class="search-box" />

      <!-- Tiêu đề -->
      <h4 class="mt-3">
        Nhà xuất bản
        <i class="fas fa-book"></i>
      </h4>

      <!-- Danh sách nhà xuất bản -->
      <PublisherList
        v-if="filteredPublishersCount > 0"
        :publishers="filteredPublishers"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có nhà xuất bản nào.</p>

      <!-- Các nút chức năng -->
      <div class="btn-group">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddPublisher">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllPublishers">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  max-width: 600px; /* Giữ nội dung không bị trải rộng */
  width: 100%;
}

.search-box {
  margin-bottom: 15px; /* Giữ khoảng cách hợp lý giữa input và nội dung */
}

h4 {
  font-weight: bold;
  margin-bottom: 15px; /* Giữ tiêu đề gần danh sách hơn */
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 10px; /* Khoảng cách giữa các nút */
  margin-top: 15px;
}
</style>

<script>
import InputSearch from "@/components/InputSearch.vue";
import PublisherList from "@/components/PublisherList.vue";
import PublisherService from "@/services/publisher.service";

export default {
  components: {
    InputSearch,
    PublisherList,
  },
  data() {
    return {
      publishers: [],
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
    publisherStrings() {
      return this.publishers.map((publisher) => {
        const { name, address } = publisher;
        return [name, address].join("");
      });
    },
    filteredPublishers() {
      if (!this.searchText) return this.publishers;
      return this.publishers.filter((_publisher, index) =>
        this.publisherStrings[index].includes(this.searchText)
      );
    },
    activePublisher() {
      if (this.activeIndex < 0) return null;
      return this.filteredPublishers[this.activeIndex];
    },
    filteredPublishersCount() {
      return this.filteredPublishers.length;
    },
  },
  methods: {
    async retrievePublishers() {
      try {
        this.publishers = await PublisherService.getAllPublishers();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrievePublishers();
      this.activeIndex = -1;
    },
    async removeAllPublishers() {
      if (confirm("Bạn muốn xóa tất cả nhà xuất bản?")) {
        try {
          await PublisherService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddPublisher() {
      this.$router.push({ name: "publisher.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
