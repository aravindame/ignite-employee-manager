"use client"

import { EmployeeButtonGroup } from "@/components/molecules/EmployeeButtonGroup";
import React, { useState } from 'react';


export default function Home() {
  const [gridView, setGridView] = useState(false);

  return (<EmployeeButtonGroup gridView={gridView} setGridView={setGridView}/>);
}
