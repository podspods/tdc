import { useState, useEffect } from "react";
import { _getAllOwners, _createOwner } from "../owner/owner.service";

import { Button, Input, Select, Table, Th, Td, Thead, Tbody, Tr } from "../../common/common.styled";
import { createOwnerDtoInit, type CreateOwnerDto, type Owner } from "../owner/owner.types";
import {
  createVehicleDtoInit,
  type CreateVehicleDto,
  type Vehicle,
} from "../vehicle/vehicle.types";
import { _createVehicle, _vehicleList } from "../vehicle/vehicle.service";
import NewOwner from "../owner/NewOwner";
import { useTranslation } from "react-i18next";
import NewVehicle from "../vehicle/NewVehicle";
import SelectOwner from "../owner/SelectOwner";
import SelectVehicle from "../vehicle/SelectVehicle";
import type { InvoiceFormLine } from "./invoice.types";

type InvoiceFormProps = {
  garageId: number;
  createdBy: string;
  onSuccess: () => void;
};

export function InvoiceForm({ garageId, createdBy, onSuccess }: InvoiceFormProps) {
  const { t } = useTranslation(["invoice"]);

  const [owners, setOwners] = useState<Owner[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<number>(0);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number>(0);
  const [ownerForm, setOwnerForm] = useState<CreateOwnerDto>(createOwnerDtoInit);
  const [vehicleForm, setVehicleForm] = useState<CreateVehicleDto>(createVehicleDtoInit);
  const [showNewOwner, setShowNewOwner] = useState(false);
  const [showNewVehicle, setShowNewVehicle] = useState(false);
  const [lines, setLines] = useState<InvoiceFormLine[]>([
    {
      tempId: Date.now(),
      lineTypeCode: 1,
      description: "",
      quantity: 1,
      unitPrice: 0,
      discountRate: 0,
      amount: 0,
    },
  ]);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Charger les listes existantes
    _getAllOwners().then((res) => res.success && setOwners(res.data || []));
    _vehicleList().then((res) => res.success && setVehicles(res.data || []));
  }, []);

  // Filtrer les véhicules appartenant au propriétaire sélectionné
  const filteredVehicles = vehicles.filter((v) => v.ownerId === selectedOwnerId);

  const updateLineAmount = (index: number) => {
    const line = lines[index];
    const amount = line.quantity * line.unitPrice * (1 - line.discountRate / 100);
    setLines((prev) => {
      const updated = [...prev];
      updated[index].amount = amount;
      return updated;
    });
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleLineChange = (
    index: number,
    field: keyof InvoiceFormLine,
    value: string | number,
  ) => {
    setLines((prevLines) => {
      const updated = [...prevLines];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    updateLineAmount(index);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const addLine = () => {
    setLines([
      ...lines,
      {
        tempId: Date.now(),
        lineTypeCode: 1,
        description: "",
        quantity: 1,
        unitPrice: 0,
        discountRate: 0,
        amount: 0,
      },
    ]);
  };

  const removeLine = (index: number) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  const handleCreateOwner = async () => {
    const response = await _createOwner({ ...ownerForm, createdBy });

    console.log("_createOwner", response);
    if (response.success && response.data) {
      setOwners([...owners, response.data]);
      setSelectedOwnerId(response.data.id);
      setShowNewOwner(false);
      setOwnerForm(createOwnerDtoInit);
    }
  };

  const handleCreateVehicle = async () => {
    const res = await _createVehicle({ ...vehicleForm, ownerId: selectedOwnerId, createdBy });
    if (res.success && res.data) {
      setVehicles([...vehicles, res.data]);
      setSelectedVehicleId(res.data.id);
      setShowNewVehicle(false);
      setVehicleForm(createVehicleDtoInit);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOwnerId || !selectedVehicleId || !dueDate) {
      alert("Please select owner, vehicle and due date");
      return;
    }
    const payload: FullInvoicePayload = {
      garageId,
      ownerId: selectedOwnerId,
      vehicleId: selectedVehicleId,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate,
      statusCode: 2, // pending
      notes,
      createdBy,
      lines: lines.map(({ tempId, amount, ...rest }) => rest),
    };
    setSubmitting(true);
    const res = await _createFullInvoice(payload);
    if (res.success) {
      alert("Invoice created successfully");
      onSuccess();
    } else {
      alert("Error: " + res.error);
    }
    setSubmitting(false);
  };

  const lineTypeOptions = [
    { value: 1, label: "Task" },
    { value: 2, label: "Spare part" },
    { value: 3, label: "Consumable" },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <h2>{t("createInvoice")}</h2>

      {/* Owner selection */}
      <div style={{ marginBottom: 20 }}>
        <SelectOwner
          selectedOwnerId={selectedOwnerId}
          setSelectedOwnerId={setSelectedOwnerId}
          ownerList={owners}
        />

        <Button variant="secondary" onClick={() => setShowNewOwner(!showNewOwner)}>
          {showNewOwner ? "Cancel" : "+ New Owner"}
        </Button>
        {showNewOwner && (
          <NewOwner
            owner={ownerForm}
            setOwner={setOwnerForm}
            handleCreateOwner={handleCreateOwner}
          />
        )}
      </div>

      {/* Vehicle selection */}
      {selectedOwnerId !== 0 && (
        <div style={{ marginBottom: 20 }}>
          <SelectVehicle
            selectedVehicleId={selectedVehicleId}
            setSelectedVehicleId={setSelectedVehicleId}
            filteredVehicles={filteredVehicles}
          />
          <Button variant="secondary" onClick={() => setShowNewVehicle(!showNewVehicle)}>
            {showNewVehicle ? "Cancel" : "+ New Vehicle"}
          </Button>
          {showNewVehicle && (
            <NewVehicle
              vehicleForm={vehicleForm}
              setVehicleForm={setVehicleForm}
              handleCreate={handleCreateVehicle}
            />
          )}
        </div>
      )}

      {/* Invoice lines */}
      {selectedVehicleId !== 0 && (
        <>
          <Table>
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th>Quantity</Th>
                <Th>Unit Price</Th>
                <Th>Discount (%)</Th>
                <Th>Amount</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {lines.map((line, idx) => (
                <Tr key={line.tempId}>
                  <Td>
                    <Select
                      value={line.lineTypeCode}
                      onChange={(e) =>
                        handleLineChange(idx, "lineTypeCode", Number(e.target.value))
                      }
                    >
                      {lineTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Select>
                  </Td>
                  <Td>
                    <Input
                      value={line.description}
                      onChange={(e) => handleLineChange(idx, "description", e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={line.quantity}
                      onChange={(e) => handleLineChange(idx, "quantity", Number(e.target.value))}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={line.unitPrice}
                      onChange={(e) => handleLineChange(idx, "unitPrice", Number(e.target.value))}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={line.discountRate}
                      onChange={(e) =>
                        handleLineChange(idx, "discountRate", Number(e.target.value))
                      }
                    />
                  </Td>
                  <Td>{line.amount.toLocaleString()} VND</Td>
                  <Td>
                    <Button variant="danger" onClick={() => removeLine(idx)}>
                      ✕
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button variant="secondary" onClick={addLine}>
            + Add line
          </Button>

          <div style={{ marginTop: 20 }}>
            <label>Due date</label>
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
