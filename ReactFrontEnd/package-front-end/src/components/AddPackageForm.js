import { useState } from "react";

const EMPTY_FORM = { name: "", description: "", productIds: "", price: "" };

function AddPackageForm({ onAdd, onError }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  function change(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onAdd({
        name: form.name.trim(),
        description: form.description.trim(),
        productIds: form.productIds
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        price: parseFloat(form.price),
      });
      setForm(EMPTY_FORM);
    } catch (err) {
      onError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <h2 className="form-title">Add Package</h2>
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={change}
            required
            placeholder="Package name"
          />
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
            placeholder="0.00"
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
          placeholder="Package description"
          rows={3}
        />
      </label>
      <label>
        Product IDs (comma-separated)
        <input
          name="productIds"
          value={form.productIds}
          onChange={change}
          placeholder="id1, id2, id3"
        />
      </label>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Package"}
      </button>
    </form>
  );
}

export default AddPackageForm;
