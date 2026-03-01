function PackageTable({ packages, onEdit, onDelete }) {
  if (packages.length === 0) {
    return (
      <p className="empty-state">
        No packages found. Add one using the form above.
      </p>
    );
  }

  return (
    <table className="package-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Product IDs</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((pkg) => (
          <tr key={pkg.id}>
            <td>{pkg.name}</td>
            <td>{pkg.description}</td>
            <td className="product-ids-cell">
              {pkg.productIds && pkg.productIds.length > 0 ? (
                pkg.productIds.join(", ")
              ) : (
                <span className="muted">—</span>
              )}
            </td>
            <td>${pkg.price != null ? pkg.price.toFixed(2) : "—"}</td>
            <td className="actions-cell">
              <button className="btn btn-edit" onClick={() => onEdit(pkg)}>
                Edit
              </button>
              <button className="btn btn-delete" onClick={() => onDelete(pkg)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PackageTable;
