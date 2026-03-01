import { useState, useEffect } from "react";
import "./App.css";
import * as api from "./api/packageApi";
import PackageTable from "./components/PackageTable";
import AddPackageForm from "./components/AddPackageForm";
import EditPackageModal from "./components/EditPackageModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

function App() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPkg, setEditingPkg] = useState(null);
  const [deletingPkg, setDeletingPkg] = useState(null);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAll();
      setPackages(data);
    } catch (err) {
      setError(
        "Could not load packages. Is the server running on localhost:8080?",
      );
    } finally {
      setLoading(false);
    }
  }

  async function add(newPkg) {
    const created = await api.create(newPkg);
    setPackages((prev) => [...prev, created]);
  }

  async function update(id, updatedFields) {
    await api.update(id, { id, ...updatedFields });
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
    );
    setEditingPkg(null);
  }

  async function deleteProduct(id) {
    await api.remove(id);
    setPackages((prev) => prev.filter((p) => p.id !== id));
    setDeletingPkg(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Package Manager</h1>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            {error}
            <button className="btn-link" onClick={loadPackages}>
              Retry
            </button>
          </div>
        )}

        <AddPackageForm onAdd={add} onError={setError} />

        <section className="packages-section">
          <h2>All Packages</h2>
          {loading ? (
            <p className="status-message">Loading...</p>
          ) : (
            <PackageTable
              packages={packages}
              onEdit={setEditingPkg}
              onDelete={setDeletingPkg}
            />
          )}
        </section>
      </main>

      <EditPackageModal
        pkg={editingPkg}
        onSave={update}
        onClose={() => setEditingPkg(null)}
        onError={setError}
      />

      <DeleteConfirmModal
        pkg={deletingPkg}
        onConfirm={deleteProduct}
        onClose={() => setDeletingPkg(null)}
      />
    </div>
  );
}

export default App;
