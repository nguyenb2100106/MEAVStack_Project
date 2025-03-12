<template>
  <div class="container mt-3">
    <h4 class="text-center">Mượn Sách</h4>
    <BookBorrowList
      v-if="filteredTrackingsCount > 0"
      :trackings="filteredTrackings"
      v-model:activeIndex="activeIndex"
      @refresh-list="refreshList"
    />
    <p v-else>Không có thông tin mượn sách.</p>
    <div class="mt-3 row justify-content-around align-items-center">
      <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
        <i class="fas fa-redo"></i> Làm mới
      </button>
      <button class="btn btn-sm btn-success w-auto" @click="goToAddBookBorrow">
        <i class="fas fa-plus"></i> Thêm mới
      </button>
    </div>
  </div>
</template>

<script>
import BookBorrowList from "@/components/BookBorrowList.vue";
import BookBorrowService from "@/services/bookborrow.service";

export default {
  components: { BookBorrowList },
  data() {
    return {
      trackings: [],
      activeIndex: -1,
    };
  },
  computed: {
    filteredTrackings() {
      return this.trackings.filter((tracking) => tracking.staff_id != "");
    },
    filteredTrackingsCount() {
      return this.filteredTrackings.length;
    },
  },
  // computed: {
  //   filteredTrackings() {
  //     return (
  //       this.trackings?.filter((tracking) => tracking.staff_id != "") || []
  //     );
  //   },
  //   filteredTrackingsCount() {
  //     return this.filteredTrackings.length;
  //   },
  // },

  methods: {
    async retrieveTrackings() {
      try {
        this.trackings = await BookBorrowService.getAllBorrows();
      } catch (error) {
        console.error(error);
      }
    },
    goToAddBookBorrow() {
      this.$router.push({ name: "bookborrow.add" });
    },
    refreshList() {
      this.retrieveTrackings();
      this.activeIndex = -1;
    },
    // async retrieveTrackings() {
    //   try {
    //     const response = await BookBorrowService.getAllBorrows();
    //     if (response && Array.isArray(response)) {
    //       this.trackings = response;
    //     } else {
    //       console.warn("API trả về dữ liệu không hợp lệ:", response);
    //       this.trackings = [];
    //     }
    //   } catch (error) {
    //     console.error("Lỗi khi lấy dữ liệu mượn sách:", error);
    //     this.trackings = [];
    //   }
    // },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
