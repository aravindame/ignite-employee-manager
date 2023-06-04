import mongoose, { Document, Model, Schema } from 'mongoose';

/**
 * Represents an Employee document.
 *
 * @interface Employee
 * @extends Document
 * @property {string} first_name - The first name of the employee.
 * @property {string} last_name - The last name of the employee.
 * @property {string} email - The email of the employee.
 * @property {string} number - The phone number of the employee.
 * @property {string} gender - The gender of the employee.
 * @property {string} photo - The photo URL of the employee.
 * @author Aravinda Meewalaarachchi 
 */
interface Employee extends Document {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
  photo: string;
}

// Define the EmployeeSchema
const EmployeeSchema = new Schema<Employee>({
  first_name: String,
  last_name: String,
  email: String,
  number: String,
  gender: String,
  photo: String,
});

// Define the EmployeeModel
const EmployeeModel: Model<Employee> = mongoose.models.Employee || mongoose.model<Employee>('Employee', EmployeeSchema);

export default EmployeeModel;
