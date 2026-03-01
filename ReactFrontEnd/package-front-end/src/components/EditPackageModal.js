import { useState, useEffect } from "react";

function EditPackageModal({ pkg, onSave, onClose, onError }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    productIds: "",
    price: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (pkg) {
      setForm({
        name: pkg.name,
        description: pkg.description,
        productIds: pkg.productIds ? pkg.productIds.join(", ") : "",
        price: pkg.price != null ? String(pkg.price) : "",
      });
    }
  }, [pkg]);

  if (!pkg) return null;

  function change(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(pkg.id, {
        name: form.name.trim(),
        description: form.description.trim(),
        productIds: form.productIds
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        price: parseFloat(form.price),
      });
    } catch (err) {
      onError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-title">Edit Package</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>
              Name
              <input name="name" value={form.name} onChange={change} required />
            </label>
            <label>
              Price ($)
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={change}
                required
              />
            </label>
          </div>
          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={change}
              required
              rows={3}
            />
          </label>
          <label>
            Product IDs(comma-separated)
            <input
              name="productIds"
              value={form.productIds}
              onChange={change}
              placeholder="id1, id2, id3"
            />
          </label>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPackageModal;
