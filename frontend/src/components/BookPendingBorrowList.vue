<template>
  <div class="container mt-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên Sách</th>
          <th>Người Mượn</th>
          <th>Ngày Mượn</th>
          <th>Ngày Trả</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tracking, index) in trackings"
          :key="tracking._id"
          :class="{ active: index === activeIndex }"
          @click="$emit('update:activeIndex', index)"
        >
          <td>{{ index + 1 }}</td>
          <td v-if="books[index]">{{ books[index].title }}</td>
          <td v-if="users[index]">{{ users[index].name }}</td>
          <td>{{ tracking.borrow_date }}</td>
          <td>{{ tracking.return_date }}</td>
          <td>
            <button
              class="btn btn-sm btn-success me-2"
              @click="approveTracking(tracking._id)"
            >
              Duyệt đơn
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import bookService from "@/services/book.service";
import bookBorrowService from "@/services/bookborrow.service";

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
  watch: {
    trackings: {
      handler() {
        this.fetchAllData();
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async fetchAllData() {
      this.users = [];
      this.books = [];
      try {
        const promises = this.trackings.map(async (tracking) => {
          const [user, book] = await Promise.all([
            userService.getUser(tracking.user_id),
            bookService.getBook(tracking.book_id),
          ]);
          return { user, book };
        });

        const results = await Promise.all(promises);
        results.forEach(({ user, book }) => {
          this.users.push(user);
          this.books.push(book);
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    async approveTracking(trackingId) {
      try {
        const staffId = localStorage.getItem("_id");
        if (!staffId) {
          alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!");
          return;
        }

        // Lấy thông tin mượn sách
        const tracking = await bookBorrowService.getBorrowById(trackingId);

        // Kiểm tra và cập nhật số lượng sách
        const book = await bookService.getBook(tracking.book_id);
        if (!book) {
          alert("Không tìm thấy thông tin sách!");
          return;
        }

        if (book.quantity <= 0) {
          alert("Không đủ sách để mượn!");
          return;
        }

        // Cập nhật thông tin mượn sách trước
        const updatedTracking = { ...tracking, staff_id: staffId };
        await bookBorrowService.updateBorrow(trackingId, updatedTracking);

        // Sau đó mới cập nhật số lượng sách
        const updatedBook = { ...book, quantity: book.quantity - 1 };
        await bookService.updateBook(book._id, updatedBook);

        alert("Đã duyệt thành công đơn mượn sách!");
        this.$emit("refresh-list");
      } catch (error) {
        console.error("Lỗi khi duyệt:", error);
        alert("Có lỗi xảy ra khi duyệt đơn mượn sách!");
      }
    },
  },
};
</script>

<style scoped>
/* Căn giữa container */
.container {
  max-width: 100%;
  padding: 10px;
}

/* Tùy chỉnh bảng */
.table {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
}

/* Định dạng tiêu đề bảng */
thead {
  background-color: #d6e4ff !important; /* Màu xanh nhạt */
  font-weight: bold !important;
}

thead th {
  padding: 12px !important;
  text-align: center !important;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}

/* Định dạng hàng dữ liệu */
tbody tr {
  transition: background-color 0.3s ease-in-out;
}

tbody tr:hover {
  background-color: #f1f5ff;
}

/* Hàng đang active */
.active {
  background-color: #b6d4fe !important;
  font-weight: bold;
}

/* Căn giữa nội dung */
.table th,
.table td {
  vertical-align: middle;
  text-align: center;
  padding: 12px;
}

/* Nút duyệt đơn */
.btn-success {
  background-color: #28a745;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}

.btn-success:hover {
  background-color: #218838;
}
</style>
