import React from "react";
import AppLayout from "@/layout/commonLayout";


export default function Home() {
  return (
    <AppLayout sideContent={<>side</>}>
      <h1>Home Page</h1>
    </AppLayout>
  );
}
