<template>
  <div class="container mt-4">
    <div class="table-responsive">
      <table class="table table-hover align-middle shadow-sm rounded">
        <thead class="table-primary">
          <tr>
            <th class="text-center">#</th>
            <th>Tên Sách</th>
            <th>Người Mượn</th>
            <th>Nhân viên</th>
            <th>Ngày Mượn</th>
            <th>Ngày Trả</th>
            <th class="text-center">Trạng thái</th>
            <th class="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(tracking, index) in trackings"
            :key="tracking._id"
            @click="$emit('update:activeIndex', index)"
            :class="{ 'table-active': index === activeIndex }"
          >
            <td class="text-center fw-bold">{{ index + 1 }}</td>
            <td v-if="books[index]">{{ books[index].title }}</td>
            <td v-if="users[index]">{{ users[index].name }}</td>
            <td>
              {{
                tracking.staff_id && staffs[index] ? staffs[index].name : "---"
              }}
            </td>
            <td>{{ formatDate(tracking.borrow_date) }}</td>
            <td>{{ formatDate(tracking.return_date) }}</td>
            <td class="text-center">
              <span
                v-if="tracking.staff_id && tracking.staff_id !== ''"
                class="badge bg-success"
              >
                <i class="fas fa-check-circle"></i> Đã duyệt
              </span>
              <span v-else class="badge bg-warning text-dark">
                <i class="fas fa-hourglass-half"></i> Chưa duyệt
              </span>
            </td>
            <td class="text-center">
              <router-link
                :to="{
                  name: 'bookborrow.edit',
                  params: { id: tracking._id },
                }"
                class="btn btn-sm btn-warning"
              >
                <i class="fas fa-edit"></i> Sửa
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import staffService from "@/services/staff.service";
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
      staffs: [],
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
          await this.fetchStaff(tracking.staff_id);
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

    async fetchStaff(staffId) {
      try {
        const response = await staffService.getStaffById(staffId);
        this.staffs.push(response);
      } catch (error) {
        console.error("Lỗi khi lấy nhân viên:", error);
      }
    },

    async fetchBook(bookId) {
      if (!bookId) return;
      try {
        const response = await bookService.getBook(bookId);
        this.books.push(response);
      } catch (error) {
        console.error("Lỗi khi lấy sách:", error);
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return "---";
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN");
    },
  },
};
</script>

<style scoped>
/* Làm bo góc bảng */
.table {
  border-radius: 8px;
  overflow: hidden;
}

/* Màu nền tiêu đề */
.table-primary {
  background-color: #007bff !important;
  color: #ffffff;
}

/* Căn giữa trạng thái */
.badge {
  font-size: 0.9rem;
  padding: 6px 10px;
  border-radius: 12px;
}

/* Hover sáng màu khi rê chuột */
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

/* Bóng đổ nhẹ cho bảng */
.shadow-sm {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Căn giữa text trong cột trạng thái và nút */
.text-center {
  text-align: center;
}

/* Bo tròn nút */
.btn {
  border-radius: 6px;
}
</style>
