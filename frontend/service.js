import http from "./http-common";

class DataService {
  getAll() {
    return http.get("/");
  }
  /*
  get(id) {
    return http.get(`/tutorials/${id}`);
  }
  */

  create(data) {
    return http.post("/new-post", data);
  }
  /*
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }
*/
  deleteAll() {
    return http.delete(`/delete`);
  }
/*
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
  */
}

export default new DataService();