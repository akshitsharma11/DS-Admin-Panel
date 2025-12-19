import { useState, useEffect } from "react";
import { FormDialog } from "../../../components/ui/FormDialog";
import "./UserDialog.css";

export function UserDialog({ user, mode, onClose, onSave }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    hourlyRate: "",
    role: "Employee",
    status: "Active",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        hourlyRate: user.hourlyRate || "",
        role: user.role || "Employee",
        status: user.status || "Active",
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        hourlyRate: "",
        role: "Employee",
        status: "Active",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      hourlyRate: parseFloat(formData.hourlyRate),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formFields = [
    {
      type: "text",
      id: "fullName",
      name: "fullName",
      label: "Full Name *",
      value: formData.fullName,
      placeholder: "Enter full name",
      required: true,
    },
    {
      type: "email",
      id: "email",
      name: "email",
      label: "Email *",
      value: formData.email,
      placeholder: "Enter email address",
      required: true,
    },
    {
      type: "number",
      id: "hourlyRate",
      name: "hourlyRate",
      label: "Hourly Rate ($) *",
      value: formData.hourlyRate,
      placeholder: "Enter hourly rate",
      required: true,
      min: "0",
      step: "0.01",
    },
    {
      type: "select",
      id: "role",
      name: "role",
      label: "Role *",
      value: formData.role,
      required: true,
      options: [
        { value: "Employee", label: "Employee" },
        { value: "Manager", label: "Manager" },
      ],
    },
    {
      type: "select",
      id: "status",
      name: "status",
      label: "Status *",
      value: formData.status,
      required: true,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
    },
  ];

  return (
    <FormDialog
      title={mode === "add" ? "Add New User" : "Edit User"}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel={mode === "add" ? "Add User" : "Save Changes"}
      formFields={formFields}
      onChange={handleChange}
    />
  );
}
