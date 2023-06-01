
import { useRouter } from 'next/navigation';
import Header from '../organisums/Header';
import { EmployeeForm } from '../templates/EmployeeForm';

/**
 * A Component that will responsible for rendering employee edit page
 * @author Aravinda Meewalaarachchi
 *
 */

interface EmployeeEditPageProps {
    employeeId: string | undefined;
}

export default function EmployeeEditPage({ employeeId } : EmployeeEditPageProps): JSX.Element {
  const router = useRouter();

  return (
    <main>
      <Header />
      <EmployeeForm employeeId={employeeId} />
    </main>
  );
}
