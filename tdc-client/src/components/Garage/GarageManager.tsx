import React, { useState, useEffect } from "react";
import { _getAllGarages, _createGarage, _updateGarage, _deleteGarage } from "./garage.service";

import type { CreateGarageDto, Garage } from "./garage.types";
import { CreateGarageDtoInit } from "../../common/constant";
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  CardHeader,
} from "../../common/common.styled";

export function GarageManager() {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<Garage | null>(null);
  const [form, setForm] = useState<CreateGarageDto>(CreateGarageDtoInit);
  const [showModal, setShowModal] = useState<boolean>(false);

  const loadGarages = async () => {
    setLoading(true);
    const res = await _getAllGarages();
    if (res.success) setGarages(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadGarages();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await _updateGarage(editing.id, form);
    } else {
      await _createGarage(form);
    }
    setShowModal(false);
    setEditing(null);
    setForm(CreateGarageDtoInit);
    await loadGarages();
  };

  const handleEdit = (garage: Garage) => {
    setEditing(garage);
    setForm({
      name: garage.name,
      address: garage.address || "",
      zipcode: garage.zipcode || "",
      city: garage.city || "",
      phone: garage.phone || "",
      email: garage.email || "",
      logoUrl: garage.logoUrl || "",
      taxCode: garage.taxCode || "",
      website: garage.website || "",
      bankName: garage.bankName || "",
      bankAccount: garage.bankAccount || "",
      createdBy: "admin",
      taxRate: garage.taxRate,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await _deleteGarage(id);
      await loadGarages();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Garages</CardTitle>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Garage
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>City</Th>
                <Th>Phone</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {garages.map((g) => (
                <Tr key={g.id}>
                  <Td>{g.id}</Td>
                  <Td>{g.name}</Td>
                  <Td>{g.city || "-"}</Td>
                  <Td>{g.phone || "-"}</Td>
                  <Td>
                    <Button variant="secondary" onClick={() => handleEdit(g)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(g.id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </CardContent>

      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: "white", padding: 24, borderRadius: 12, width: 500 }}>
            <h2>{editing ? "Edit Garage" : "New Garage"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleInputChange}
                required
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="zipcode"
                placeholder="Zipcode"
                value={form.zipcode}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="logoUrl"
                placeholder="Logo URL"
                value={form.logoUrl}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="taxCode"
                placeholder="Tax Code"
                value={form.taxCode}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="website"
                placeholder="Website"
                value={form.website}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="bankName"
                placeholder="Bank Name"
                value={form.bankName}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <input
                name="bankAccount"
                placeholder="Bank Account"
                value={form.bankAccount}
                onChange={handleInputChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
}
