import AdminNav from "./AdminNav";

function AdminDashboard({ children }) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}

export default AdminDashboard;
