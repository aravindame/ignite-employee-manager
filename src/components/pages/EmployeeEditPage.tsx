
import withAuthentication from '@/hocs/withAuthentication';
import Header from '../organisums/Header';
import { EmployeeForm } from '../templates/EmployeeForm';

/**
 * A Component that will responsible for rendering employee edit page
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.employeeId - The ID of the employee to be edited.
 * @returns {JSX.Element} The rendered EmployeeEditPage component.
 * @author Aravinda Meewalaarachchi
 *
 */

interface EmployeeEditPageProps {
    employeeId?: string | undefined;
}

function EmployeeEditPage({ employeeId } : EmployeeEditPageProps): JSX.Element {

  return (
    <>
    <main>
      <Header />
      <EmployeeForm employeeId={employeeId} />
    </main>
    </>
  );
}

export default withAuthentication(EmployeeEditPage);
