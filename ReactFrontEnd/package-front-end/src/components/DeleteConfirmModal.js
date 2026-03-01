function DeleteConfirmModal({ pkg, onConfirm, onClose }) {
  if (!pkg) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal modal--confirm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="form-title">Delete Package</h2>
        <p className="confirm-message">
          Are you sure you want to delete <strong>"{pkg.name}"</strong>?
          <br />
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-delete-solid"
            onClick={() => onConfirm(pkg.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
