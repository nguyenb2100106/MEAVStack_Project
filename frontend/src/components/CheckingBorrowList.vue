<script>
import userService from "@/services/user.service";
import bookService from "@/services/book.service";

export default {
  props: {
    trackings: { type: Array, required: true },
    activeIndex: { type: Number, required: true },
  },
  emits: ["update:activeIndex", "refresh-list"],
  data() {
    return {
      users: [],
      books: [],
    };
  },
  mounted() {
    this.fetchAllData();
  },
  methods: {
    async fetchAllData() {
      try {
        for (const tracking of this.trackings) {
          await this.fetchUser(tracking.user_id);
          await this.fetchBook(tracking.book_id);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    async fetchUser(userId) {
      try {
        const response = await userService.getUser(userId);
        this.users.push(response);
      } catch (error) {
        console.error("Lỗi khi lấy người mượn:", error);
      }
    },

    async fetchBook(bookId) {
      try {
        const response = await bookService.getBook(bookId);
        this.books.push(response);
      } catch (error) {
        console.error("Lỗi khi lấy sách:", error);
      }
    },

    async refreshList() {
      await this.fetchAllData();
      this.activeIndex = -1;
    },
  },
};
</script>

<template>
  <div class="container mt-3">
    <!-- Tiêu đề căn giữa và nổi bật -->
    <!-- <h4 class="text-center text-primary mb-3">📚 Đơn Mượn Sách Cần Duyệt</h4> -->

    <div class="table-responsive">
      <table class="table table-hover table-bordered text-center">
        <thead class="thead-dark">
          <tr>
            <th>STT</th>
            <th>Tên Sách</th>
            <th>Ngày Mượn</th>
            <th>Ngày Trả</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(tracking, index) in trackings"
            :key="tracking._id"
            :class="{ 'table-active': index === activeIndex }"
            @click="$emit('update:activeIndex', index)"
            class="clickable-row"
          >
            <td>{{ index + 1 }}</td>
            <td v-if="books[index]">{{ books[index].title }}</td>
            <td>{{ tracking.borrow_date }}</td>
            <td>{{ tracking.return_date }}</td>
            <td>
              <span
                class="badge"
                :class="tracking.staff_id ? 'badge-success' : 'badge-warning'"
              >
                {{ tracking.staff_id ? "✅ Đã duyệt" : "⏳ Chưa duyệt" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Căn giữa và làm nổi bật tiêu đề */
h4 {
  font-weight: bold;
}

/* Tăng độ tương phản và làm mượt hiệu ứng hover */
.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.clickable-row:hover {
  background-color: #f1f5ff; /* Màu xanh nhạt */
}

/* Tăng kích thước badge và màu sắc */
.badge-success {
  background-color: #28a745;
  color: white;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 8px;
}

.badge-warning {
  background-color: #ffc107;
  color: black;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 8px;
}

/* Căn giữa nội dung bảng */
.table th,
.table td {
  vertical-align: middle;
}

/* Làm đẹp header bảng */
.thead-dark th {
  background-color: #cfe2ff; /* Màu xanh nhạt */
  color: black;
  text-transform: uppercase;
  font-weight: bold;
  padding: 12px;
  text-align: center;
}

/* Viền tròn góc trên cùng */
.thead-dark th:first-child {
  border-top-left-radius: 10px;
}

.thead-dark th:last-child {
  border-top-right-radius: 10px;
}

/* Làm đẹp hàng dữ liệu */
.table tbody tr {
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s ease-in-out;
}

.table tbody tr:hover {
  background-color: #e9f2ff; /* Xanh nhạt */
}

/* Làm nổi bật hàng được chọn */
.table-active {
  background-color: #b6d4fe !important; /* Màu xanh đậm hơn */
  font-weight: bold;
}
</style>
