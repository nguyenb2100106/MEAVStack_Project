<template>
  <div class="page row">
    <div class="mt-3 col-md-12">
      <h4 class="text-center">Kiểm tra mượn sách</h4>
      <CheckingBorrowList
        v-if="pendingTrackingsCount > 0"
        :trackings="pendingTrackings"
        v-model:activeIndex="activeIndex"
        @refresh-list="refreshList"
      />
      <p v-else>Không có đơn mượn sách.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BookBorrowService from "@/services/bookborrow.service";
import CheckingBorrowList from "@/components/CheckingBorrowList.vue";
export default {
  components: {
    CheckingBorrowList,
  },
  data() {
    return {
      trackings: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    pendingTrackings() {
      return this.trackings.filter(
        (tracking) => tracking.user_id == localStorage.getItem("_id")
      );
    },

    activeTracking() {
      return this.filteredTrackings[this.activeIndex] || null;
    },

    pendingTrackingsCount() {
      return this.pendingTrackings.length;
    },
  },
  methods: {
    async retrieveTrackings() {
      try {
        this.trackings = await BookBorrowService.getAllBorrows();
        console.log("Danh sách đơn mượn:", this.trackings);
        console.log(this.trackings);
      } catch (error) {
        console.error(error);
      }
    },
    refreshList() {
      this.retrieveTrackings();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
