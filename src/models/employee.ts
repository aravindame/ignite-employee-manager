import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the Employee interface
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
