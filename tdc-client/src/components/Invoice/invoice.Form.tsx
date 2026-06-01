import { useState, useEffect } from "react";
import { _getAllOwners, _createOwner } from "../owner/service";

import { Button, Table, Th, Td, Thead, Tbody, Tr } from "../../common/common.styled";
import type { CreateOwnerDto, Owner } from "../owner/owner.types";
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
import type { FullInvoicePayload, Invoice, InvoiceFormLine } from "./invoice.types";
import { _createFullInvoice } from "./invoice.service";
import { generateTempInvoiceNumber } from "./invoice.helper";
import {
  dateInit,
  invoiceFormLineInit,
  ownerInit,
  saleTypeSubjectCode,
} from "../../common/constant";
import { Select } from "../UI/Select";
import type { OptionValue } from "../../common/commun.types";
import { _getAllCorrespondances } from "../correspondance/service";
import type { Correspondance } from "../correspondance/types";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";
import toast from "react-hot-toast";
import Modal from "../owner/Modal";

type InvoiceFormProps = {
  garageId: number;
  createdBy: string;
  onSuccess: () => void;
  currentInvoice: Invoice;
};

export function InvoiceForm({ ...props }: InvoiceFormProps) {
  const { t } = useTranslation(["invoice"]);

  const [ownerList, setOwnerList] = useState<Owner[]>([]);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [correspondanceList, setCorrespondanceList] = useState<Correspondance[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<number>(0);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number>(0);
  const [currentOwner, setCurrentOwner] = useState<Owner>(ownerInit);
  const [vehicleForm, setVehicleForm] = useState<CreateVehicleDto>(createVehicleDtoInit);
  const [showNewOwner, setShowNewOwner] = useState<boolean>(false);
  const [updateOwner, setUpdateOwner] = useState<boolean>(false);
  const [showNewVehicle, setShowNewVehicle] = useState<boolean>(false);
  const [lines, setLines] = useState<InvoiceFormLine[]>([invoiceFormLineInit]);
  const [dueDate, setDueDate] = useState<Date>(dateInit);
  const [notes, setNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    // Load existing list
    _getAllOwners().then((res) => res.success && setOwnerList(res.data || []));
    _vehicleList().then((res) => res.success && setVehicleList(res.data || []));
    _getAllCorrespondances({ limit: 0 }).then(
      (res) => res.success && setCorrespondanceList(res.data || []),
    );
  }, []);

  // Filter owner's vehicle
  const filteredVehicles = vehicleList.filter((v) => v.ownerId === selectedOwnerId);
  const saleType: OptionValue[] =
    correspondanceList
      .filter((v) => v.subjectCode === saleTypeSubjectCode)
      .map((saleType) => ({ value: saleType.code.toString(), label: saleType.valueStr })) || [];

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
    setLines([...lines, invoiceFormLineInit]);
  };

  const removeLine = (index: number) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  // const handleCreateOwner = async () => {
  //   const response = await _createOwner({ ...ownerForm, createdBy });

  //   console.log("_createOwner", response);
  //   if (response.success && response.data) {
  //     setOwnerList([...ownerList, response.data]);
  //     setSelectedOwnerId(response.data.id);
  //     setShowNewOwner(false);
  //     setOwnerForm(createOwnerDtoInit);
  //   }
  // };

  const handleCreateVehicle = async () => {
    console.log("handleCreateVehicle", vehicleForm);
    const res = await _createVehicle({ ...vehicleForm, createdBy, ownerId: selectedOwnerId });
    if (res.success && res.data) {
      setVehicleList([...vehicleList, res.data]);
      setSelectedVehicleId(res.data.id);
      setShowNewVehicle(false);
      setVehicleForm(createVehicleDtoInit);
    }
  };

  const resetSubit = () => {
    setSubmitting(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------

  const handleSubmit = async () => {
    if (!selectedOwnerId || !selectedVehicleId || !dueDate) {
      toast.error("Please select owner, vehicle and due date");
      return;
    }
    const payload: FullInvoicePayload = {
      invoiceNumber: generateTempInvoiceNumber(garageId, selectedOwnerId, selectedVehicleId),
      garageId,
      vehicleId: selectedVehicleId,
      issueDate: new Date(),
      dueDate,
      statusCode: 2, // pending
      notes,
      createdBy,
      lines: lines.map(({ tempId, amount, ...rest }) => rest),
    };
    setSubmitting(true);
    const response = await _createFullInvoice(payload);
    console.log("response", response);
    if (response.success) {
      toast.success("Invoice created successfully");

      onSuccess();
    } else {
      toast.error("Error: " + response.error);
    }
    setSubmitting(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOnClose = () => {
    setShowNewOwner(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const handleOnSuccess = () => {
    setShowNewOwner(false);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  const updateCurentUser = () => {
    setUpdateOwner(true);
    setShowNewOwner(true);

    console.log("", currentOwner);
  };
  //--------------------------------------------------------------------------------------------------------------------------
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <h2>{t("createInvoice")}</h2>
      {/* <GarageBadge id={props.currentInvoice.garageId} /> */}
      {/* <VehicleSection /> */}
      {/* Owner selection */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SelectOwner
          selectedOwnerId={selectedOwnerId}
          setSelectedOwnerId={setSelectedOwnerId}
          ownerList={ownerList}
        />

        <Button variant="secondary" onClick={() => setShowNewOwner(!showNewOwner)}>
          {showNewOwner ? t("cancel") : "➕ 👨‍💼"}
        </Button>
        <Button variant="secondary" onClick={updateCurentUser}>
          update user
        </Button>
        {showNewOwner && (
          <Modal
            owner={updateOwner ? currentOwner : ownerInit}
            setCurrentOwner={setCurrentOwner}
            onClose={handleOnClose}
            onSuccess={handleOnSuccess}
            isOpen={showNewOwner}
          />
        )}
        {/* Vehicle selection */}
        {selectedOwnerId !== 0 && (
          <div style={{ marginBottom: 20 }}>
            <SelectVehicle
              selectedVehicleId={selectedVehicleId}
              setSelectedVehicleId={setSelectedVehicleId}
              filteredVehicles={filteredVehicles}
            />
            <Button variant="secondary" onClick={() => setShowNewVehicle(!showNewVehicle)}>
              {showNewVehicle ? t("cancel") : "➕ 🏍"}
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
      </div>

      {/* Invoice lines */}
      {selectedVehicleId !== 0 && (
        <>
          <Table>
            <Thead>
              <Tr>
                <Th>{t("type")}</Th>
                <Th>{t("description")}</Th>
                <Th>{t("quantity")}</Th>
                <Th>{t("unitPrice")}</Th>
                <Th>{t("discount")}</Th>
                <Th>{t("amount")}</Th>

                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {lines.map((line, idx) => (
                <Tr key={line.tempId} style={{ verticalAlign: "middle", border: "1px solid red" }}>
                  <Td style={{ verticalAlign: "middle" }}>
                    <Select
                      style={{ width: "8rem" }}
                      label={t("type")}
                      value={line.lineTypeCode}
                      onChange={(e) =>
                        handleLineChange(idx, "lineTypeCode", Number(e.target.value))
                      }
                      options={saleType}
                    />
                  </Td>
                  <Td style={{ verticalAlign: "middle" }}>
                    <Input
                      name="description"
                      label={t("description")}
                      value={line.description}
                      onChange={(e) => handleLineChange(idx, "description", e.target.value)}
                    />
                  </Td>
                  <Td style={{ verticalAlign: "middle" }}>
                    <Input
                      name="quantity"
                      label={t("quantity")}
                      type="number"
                      value={line.quantity}
                      onChange={(e) => handleLineChange(idx, "quantity", Number(e.target.value))}
                      min={1}
                    />
                  </Td>
                  <Td style={{ verticalAlign: "middle" }}>
                    <Input
                      name="unitPrice"
                      label={t("unitPrice")}
                      type="number"
                      value={line.unitPrice}
                      onChange={(e) => handleLineChange(idx, "unitPrice", Number(e.target.value))}
                    />
                  </Td>
                  <Td style={{ verticalAlign: "middle" }}>
                    <Input
                      name="discount"
                      label={t("discount")}
                      type="number"
                      value={line.discountRate}
                      onChange={(e) =>
                        handleLineChange(idx, "discountRate", Number(e.target.value))
                      }
                    />
                  </Td>
                  <Td style={{ verticalAlign: "middle" }}>
                    <Input
                      name="amount"
                      label={t("amount")}
                      value={line.amount}
                      disabled
                      style={{ border: "1px solid blue" }}
                    />
                  </Td>

                  <Td style={{ verticalAlign: "middle" }}>
                    <Button
                      variant="danger"
                      onClick={() => removeLine(idx)}
                      style={{ border: "1px solid blue", marginTop: "1rem" }}
                    >
                      ❌
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
            <Input
              type="date"
              name="dueDate"
              label={t("dueDate")}
              value={dueDate.toString()}
              onChange={(e) => setDueDate(new Date(e.target.value))}
            />
            <Textarea
              label={t("notes")}
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? t("creating") : t("createInvoice")}
            </Button>
            <Button variant="secondary" onClick={resetSubit}>
              {t("resetSubmit")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
