import React from "react";
import { Form } from "./components/Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpendingList } from "./components/SpendingList";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Form />
        <SpendingList />
      </Layout>
    </QueryClientProvider>
  );
}
