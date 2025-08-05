import reviews from "@/services/mockData/reviews.json";

class ReviewService {
  constructor() {
    this.reviews = [...reviews];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.reviews]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const review = this.reviews.find(r => r.Id === parseInt(id));
        if (review) {
          resolve({ ...review });
        } else {
          reject(new Error("리뷰를 찾을 수 없습니다."));
        }
      }, 200);
    });
  }

  async getByProgramId(programId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const programReviews = this.reviews.filter(r => r.programId === parseInt(programId));
        resolve([...programReviews]);
      }, 250);
    });
  }

  async create(reviewData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview = {
          Id: Math.max(...this.reviews.map(r => r.Id)) + 1,
          date: new Date().toISOString().split('T')[0],
          verified: false,
          helpful: 0,
          ...reviewData
        };
        this.reviews.push(newReview);
        resolve({ ...newReview });
      }, 300);
    });
  }

  async update(id, reviewData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.reviews.findIndex(r => r.Id === parseInt(id));
        if (index !== -1) {
          this.reviews[index] = { ...this.reviews[index], ...reviewData };
          resolve({ ...this.reviews[index] });
        } else {
          reject(new Error("리뷰를 찾을 수 없습니다."));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.reviews.findIndex(r => r.Id === parseInt(id));
        if (index !== -1) {
          this.reviews.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error("리뷰를 찾을 수 없습니다."));
        }
      }, 200);
    });
  }
}

export const reviewService = new ReviewService();