import EmployeeList from "../organisums/EmployeeListView";
import Header from "../organisums/Header";
import withAuthentication from "@/hocs/withAuthentication";

/**
 * A Component that will responsible for rendering list all employee page
 *
 * @author Aravinda Meewalaarachchi
 *
 */

function EmployeeListPage(): JSX.Element {
  return (
    <main>
      <Header />
      <EmployeeList />
    </main>
  );
}

export default withAuthentication(EmployeeListPage);