import programs from "@/services/mockData/programs.json";

class ProgramService {
  constructor() {
    this.programs = [...programs];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.programs]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const program = this.programs.find(p => p.Id === parseInt(id));
        if (program) {
          resolve({ ...program });
        } else {
          reject(new Error("프로그램을 찾을 수 없습니다."));
        }
      }, 200);
    });
  }

  async getBySlug(slug) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const program = this.programs.find(p => p.slug === slug);
        if (program) {
          resolve({ ...program });
        } else {
          reject(new Error("프로그램을 찾을 수 없습니다."));
        }
      }, 250);
    });
  }

  async create(programData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProgram = {
          Id: Math.max(...this.programs.map(p => p.Id)) + 1,
          ...programData
        };
        this.programs.push(newProgram);
        resolve({ ...newProgram });
      }, 300);
    });
  }

  async update(id, programData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.programs.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          this.programs[index] = { ...this.programs[index], ...programData };
          resolve({ ...this.programs[index] });
        } else {
          reject(new Error("프로그램을 찾을 수 없습니다."));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.programs.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          this.programs.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error("프로그램을 찾을 수 없습니다."));
        }
      }, 200);
    });
  }
}

export const programService = new ProgramService();