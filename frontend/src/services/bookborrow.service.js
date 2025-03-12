import createApiClient from "./api.service";

class BookborrowService {
  constructor(baseUrl = "/api/bookborrows") {
    this.api = createApiClient(baseUrl);
  }

  async getAllBorrows() {
    return (await this.api.get("/")).data;
  }

  async getBorrowById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async createBorrow(data) {
    return (await this.api.post("/", data)).data;
  }

  async updateBorrow(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async deleteBorrow(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async deleteAllBorrows() {
    return (await this.api.delete("/")).data;
  }
}

export default new BookborrowService();
