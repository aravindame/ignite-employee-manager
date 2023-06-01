"use client";
import EmployeeEditPage from "@/components/pages/EmployeeEditPage";

/**
 * A Component that will responsible for rendering employee add page
 * @author Aravinda Meewalaarachchi
 *
 */

interface EmployeeEditPageProps {
    params: {
      employeeId?: string;
    };
}

export default function Page({ params: { employeeId }} : EmployeeEditPageProps): JSX.Element {
  return <EmployeeEditPage employeeId = {employeeId}/>;
}