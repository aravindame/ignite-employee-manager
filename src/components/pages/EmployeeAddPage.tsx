"use client";

import { EmployeeForm } from "../templates/EmployeeForm";
import Header from "../organisums/Header";
import withAuthentication from "@/hocs/withAuthentication";

/**
 * A Component that will responsible for rendering employee add page
 * @author Aravinda Meewalaarachchi
 *
 */

function EmployeeAddPage(): JSX.Element {
  return (
    <main>
      <Header />
      <EmployeeForm />
    </main>
  );
}

export default withAuthentication(EmployeeAddPage);
