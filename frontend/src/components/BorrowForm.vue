<template>
  <Form
    @submit="submitBorrowRecord"
    :validation-schema="borrowFormSchema"
    ref="form"
  >
    <div class="form-group">
      <label for="book_id">Sách</label>
      <select name="book_id" class="form-control" v-model="borrowLocal.book_id">
        <option value="">-- Chọn sách --</option>
        <option v-for="book in books" :key="book._id" :value="book._id">
          {{ book.title }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="user_id">Độc giả</label>
      <select name="user_id" class="form-control" v-model="borrowLocal.user_id">
        <option value="">-- Chọn độc giả --</option>
        <option v-for="user in users" :key="user._id" :value="user._id">
          {{ user.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="staff_id">Nhân viên</label>
      <select
        name="staff_id"
        class="form-control"
        v-model="borrowLocal.staff_id"
      >
        <option value="">-- Chọn nhân viên --</option>
        <option v-for="staff in staffs" :key="staff._id" :value="staff._id">
          {{ staff.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="borrow_date">Ngày mượn</label>
      <Field
        name="borrow_date"
        type="date"
        class="form-control"
        v-model="borrowLocal.borrow_date"
      />
      <ErrorMessage name="borrow_date" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="return_date">Ngày trả</label>
      <Field
        name="return_date"
        type="date"
        class="form-control"
        v-model="borrowLocal.return_date"
      />
      <ErrorMessage name="return_date" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button
        v-if="borrowLocal._id"
        type="button"
        class="mr-2 btn btn-danger"
        @click="deleteBorrow"
      >
        <i class="fas fa-trash-alt"></i> Xóa
      </button>
      <button type="button" class="mr-2 btn btn-danger" @click="Cancel">
        <i class="fas fa-times"></i> Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import BookService from "@/services/book.service";
import UserService from "@/services/user.service";
import StaffService from "@/services/staff.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    borrow: { type: Object, required: true },
  },
  data() {
    const borrowFormSchema = yup.object().shape({
      borrow_date: yup.string().required("Vui lòng chọn ngày mượn."),
      return_date: yup
        .string()
        .required("Vui lòng chọn ngày trả.")
        .test(
          "is-after-borrow-date",
          "Ngày trả phải sau ngày mượn.",
          function (value) {
            return new Date(value) > new Date(this.parent.borrow_date);
          }
        ),
    });

    return {
      borrowLocal: { ...this.borrow },
      books: [],
      users: [],
      staffs: [],
      borrowFormSchema,
    };
  },
  async created() {
    this.normalizeDates(); // Chuẩn hóa ngày tháng
    await this.fetchBooks();
    await this.fetchUsers();
    await this.fetchStaffs();
  },
  methods: {
    normalizeDates() {
      if (this.borrowLocal.borrow_date) {
        this.borrowLocal.borrow_date = this.formatDate(
          this.borrowLocal.borrow_date
        );
      }
      if (this.borrowLocal.return_date) {
        this.borrowLocal.return_date = this.formatDate(
          this.borrowLocal.return_date
        );
      }
    },
    formatDate(dateString) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    },
    async fetchBooks() {
      try {
        this.books = await BookService.getAllBook();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    async fetchUsers() {
      try {
        this.users = await UserService.getAllUsers();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách độc giả:", error);
      }
    },
    async fetchStaffs() {
      try {
        this.staffs = await StaffService.getAllStaff();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      }
    },
    async submitBorrowRecord() {
      const borrowData = {
        ...this.borrowLocal,
        borrow_date: this.reverseFormatDate(this.borrowLocal.borrow_date),
        return_date: this.reverseFormatDate(this.borrowLocal.return_date),
      };
      this.$emit("submit:borrow", borrowData);
    },
    reverseFormatDate(dateString) {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    },
    deleteBorrow() {
      this.$emit("delete:borrow", this.borrowLocal._id);
    },
    Cancel() {
      const reply = window.confirm("Bạn chưa lưu thay đổi! Bạn muốn thoát?");
      if (!reply) return;
      this.$router.push({ name: "bookborrow" });
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.9rem;
}
</style>
