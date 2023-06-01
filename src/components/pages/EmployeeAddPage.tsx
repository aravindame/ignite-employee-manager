import { EmployeeForm } from "../templates/EmployeeForm";
import Header from "../organisums/Header";


/**
 * A Component that will responsible for rendering employee add page
 * @author Aravinda Meewalaarachchi
 *
 */
export default function EmployeeAddPage(): JSX.Element {
  return (
    <main>
      <Header />
      <EmployeeForm />
    </main>
  );
}