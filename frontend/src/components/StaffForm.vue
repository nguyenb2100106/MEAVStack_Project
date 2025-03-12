<template>
  <Form @submit="submitStaff" :validation-schema="staffFormSchema">
    <div class="form-group">
      <label for="name">Tên Nhân viên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="staffLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="username">Tên đăng nhập</label>
      <Field
        name="username"
        type="text"
        class="form-control"
        v-model="staffLocal.username"
      />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field
        name="password"
        type="password"
        class="form-control"
        v-model="staffLocal.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="position">Chức vụ</label>
      <Field
        name="position"
        type="text"
        class="form-control"
        v-model="staffLocal.position"
      />
      <ErrorMessage name="position" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="staffLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Số điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="staffLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="staffLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button
        v-if="staffLocal._id"
        type="button"
        class="mr-2 btn btn-danger"
        @click="deleteStaff"
      >
        <i class="fas fa-trash-alt"></i> Xóa
      </button>
      <button type="button" class="mr-2 btn btn-danger" @click="cancel">
        <i class="fas fa-times"></i> Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:staff", "delete:staff"],
  props: {
    staff: { type: Object, required: true },
  },
  data() {
    const staffFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên không được bỏ trống.")
        .max(50, "Tối đa 50 ký tự."),
      username: yup
        .string()
        .required("Tên đăng nhập không được bỏ trống.")
        .max(50, "Tối đa 50 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu không được bỏ trống.")
        .min(8, "Tối thiểu 8 ký tự."),
      position: yup.string().max(50, "Tối đa 50 ký tự."),
      address: yup.string().max(100, "Tối đa 100 ký tự."),
      email: yup
        .string()
        .required("Email không được bỏ trống.")
        .email("Email không hợp lệ."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });

    return {
      staffLocal: this.staff,
      staffFormSchema,
    };
  },
  methods: {
    submitStaff() {
      this.$emit("submit:staff", this.staffLocal);
    },
    deleteStaff() {
      this.$emit("delete:staff", this.staffLocal.id);
    },
    cancel() {
      const reply = window.confirm(
        "Bạn có chắc muốn rời khỏi mà không lưu thay đổi?"
      );
      if (reply) {
        this.$router.push({ name: "staffs" });
      }
    },
  },
};
</script>
