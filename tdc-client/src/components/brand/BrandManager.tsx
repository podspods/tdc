import React, { useState, useEffect } from "react";
import { _getAllBrands, _createBrand, _updateBrand, _deleteBrand } from "./brand.service";
import type { MotorcycleBrand, CreateBrandDto } from "./brand.types";
import {
  Button,
  Input,
  Table,
  Th,
  Td,
  Tr,
  Thead,
  Tbody,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../common/common.styled";

export function BrandManager() {
  const [brands, setBrands] = useState<MotorcycleBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MotorcycleBrand | null>(null);
  const [form, setForm] = useState<CreateBrandDto>({
    brandName: "",
    countryOfOrigin: "",
    createdBy: "admin",
  });
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const loadBrands = async () => {
    setLoading(true);
    const res = await _getAllBrands({ search: search || undefined });
    if (res.success) setBrands(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadBrands();
  }, [search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await _updateBrand(editing.brandId, form);
    } else {
      await _createBrand(form);
    }
    setShowModal(false);
    setEditing(null);
    setForm({ brandName: "", countryOfOrigin: "", createdBy: "admin" });
    await loadBrands();
  };

  const handleEdit = (brand: MotorcycleBrand) => {
    setEditing(brand);
    setForm({
      brandName: brand.brandName,
      countryOfOrigin: brand.countryOfOrigin,
      createdBy: brand.createdBy,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await _deleteBrand(id);
      await loadBrands();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Motorcycle Brands</CardTitle>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Brand
        </Button>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Search by name or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 16, width: "100%" }}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Brand Name</Th>
                <Th>Country</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {brands.map((b) => (
                <Tr key={b.brandId}>
                  <Td>{b.brandId}</Td>
                  <Td>{b.brandName}</Td>
                  <Td>{b.countryOfOrigin}</Td>
                  <Td>
                    <Button variant="secondary" onClick={() => handleEdit(b)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(b.brandId)}
                      style={{ marginLeft: 8 }}
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
          <div style={{ background: "white", padding: 24, borderRadius: 12, width: 400 }}>
            <h2>{editing ? "Edit Brand" : "New Brand"}</h2>
            <form onSubmit={handleSubmit}>
              <Input
                name="brandName"
                placeholder="Brand name"
                value={form.brandName}
                onChange={handleInputChange}
                required
              />
              <Input
                name="countryOfOrigin"
                placeholder="Country"
                value={form.countryOfOrigin}
                onChange={handleInputChange}
                required
                style={{ marginTop: 8 }}
              />
              <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8 }}>
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
