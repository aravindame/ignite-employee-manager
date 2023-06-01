import EmployeeList from "../organisums/EmployeeListView";
import Header from "../organisums/Header";

/**
 * A Component that will responsible for rendering list all employee page
 *
 * @author Aravinda Meewalaarachchi
 *
 */

export default function EmployeeListPage(): JSX.Element {
  return (
    <main>
      <Header />
      <EmployeeList />
    </main>
  );
}
