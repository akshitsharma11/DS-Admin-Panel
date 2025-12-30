import { useState, useEffect } from "react";
import { FormDialog } from "../../../components/ui/FormDialog";
import "./UserDialog.css";

export function UserDialog({ user, mode, onClose, onSave, isLoading = false }) {
  const [formData, setFormData] = useState({
    tabName: "",
    fullName: "",
    email: "",
    hourlyRate: "",
    role: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        tabName: user.shortName || "",
        fullName: user.fullName || "",
        email: user.email || "",
        hourlyRate: user.hourlyRate || "",
        role: user.role || "",
        status: user.status || "ACTIVE",
      });
    } else {
      setFormData({
        tabName: "",
        fullName: "",
        email: "",
        hourlyRate: "",
        role: "",
        status: "ACTIVE",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      hourlyRate: parseFloat(formData.hourlyRate) || 0,
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
      id: "tabName",
      name: "tabName",
      label: "Short Name *",
      value: formData.tabName,
      placeholder: "Enter short name",
      required: true,
    },
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
      disabled: mode === "edit", // Disable email in edit mode
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
      type: "text",
      id: "role",
      name: "role",
      label: "Role *",
      value: formData.role,
      placeholder: "Enter role",
      required: true,
    },
    {
      type: "select",
      id: "status",
      name: "status",
      label: "Status *",
      value: formData.status,
      required: true,
      options: [
        { value: "ACTIVE", label: "Active" },
        { value: "INACTIVE", label: "Inactive" },
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
      isLoading={isLoading}
    />
  );
}
