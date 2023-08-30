export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  employmentDate: Date;
  skillsIds: string[];
  managerId: string;
}
