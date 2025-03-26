<template>
  <div class="user-form-container">
    <h3 class="form-title">Thông tin người dùng</h3>

    <Form @submit="submitUser" :validation-schema="userFormSchema">
      <div class="form-group">
        <label for="name">Tên người dùng</label>
        <Field
          name="name"
          type="text"
          class="form-control"
          v-model="userLocal.name"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>

      <div class="form-group">
        <label for="username">Tên đăng nhập</label>
        <Field
          name="username"
          type="text"
          class="form-control"
          v-model="userLocal.username"
        />
        <ErrorMessage name="username" class="error-feedback" />
      </div>

      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          v-model="userLocal.password"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <div class="form-row">
        <div class="form-group half-width">
          <label for="birth">Ngày sinh</label>
          <Field
            name="birth"
            type="date"
            class="form-control"
            v-model="userLocal.birth"
          />
          <ErrorMessage name="birth" class="error-feedback" />
        </div>

        <div class="form-group half-width">
          <label for="gender">Giới tính</label>
          <Field
            as="select"
            name="gender"
            class="form-control"
            v-model="userLocal.gender"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Field>
          <ErrorMessage name="gender" class="error-feedback" />
        </div>
      </div>

      <div class="form-group">
        <label for="address">Địa chỉ</label>
        <Field
          name="address"
          type="text"
          class="form-control"
          v-model="userLocal.address"
        />
        <ErrorMessage name="address" class="error-feedback" />
      </div>

      <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <Field
          name="phone"
          type="tel"
          class="form-control"
          v-model="userLocal.phone"
        />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>

      <div class="form-actions">
        <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
        <button type="button" class="btn btn-danger" @click="cancel">
          <i class="fas fa-times"></i> Quay về trang thông tin
        </button>
      </div>
    </Form>
  </div>
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
  emits: ["submit:user"],
  props: {
    user: { type: Object, required: true },
  },
  data() {
    const userFormSchema = yup.object().shape({
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
      birth: yup.date().required("Ngày sinh không được bỏ trống."),
      gender: yup.string().required("Giới tính không được bỏ trống."),
      address: yup.string().max(100, "Tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });

    return {
      userLocal: this.user,
      userFormSchema,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.userLocal);
    },
    cancel() {
      const reply = window.confirm(
        "Bạn có chắc muốn rời khỏi mà không lưu thay đổi?"
      );
      if (reply) {
        this.$router.push({ name: "info" });
      }
    },
  },
};
</script>
