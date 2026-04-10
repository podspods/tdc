import { useState, useCallback } from "react";
import type { Invoice, InvoiceFormData, Owner, Vehicle } from "../components/Invoice/Invoice.types";
import * as invoiceService from "../components/Invoice/Invoice.service";

export function useInvoice() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInvoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceService.getAllInvoices();
      setInvoices(data);
    } catch (err) {
      setError("Failed to load invoices");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadInvoice = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceService.getInvoiceById(id);
      setCurrentInvoice(data);
    } catch (err) {
      setError("Failed to load invoice");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createInvoice = useCallback(
    async (data: InvoiceFormData) => {
      setLoading(true);
      setError(null);
      try {
        const newInvoice = await invoiceService.createInvoice(data);
        if (newInvoice) {
          await loadInvoices();
          return newInvoice;
        }
        return null;
      } catch (err) {
        setError("Failed to create invoice");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [loadInvoices],
  );

  const updateInvoice = useCallback(
    async (id: string, data: Partial<Invoice>) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await invoiceService.updateInvoice(id, data);
        if (updated) {
          await loadInvoices();
          if (currentInvoice?.id === id) {
            setCurrentInvoice(updated);
          }
        }
        return updated;
      } catch (err) {
        setError("Failed to update invoice");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [loadInvoices, currentInvoice],
  );

  const deleteInvoice = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const success = await invoiceService.deleteInvoice(id);
        if (success) {
          await loadInvoices();
          if (currentInvoice?.id === id) {
            setCurrentInvoice(null);
          }
        }
        return success;
      } catch (err) {
        setError("Failed to delete invoice");
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadInvoices, currentInvoice],
  );

  const addLaborItem = useCallback(
    async (invoiceId: string, item: any) => {
      setLoading(true);
      try {
        const success = await invoiceService.addLaborItem(invoiceId, item);
        if (success && currentInvoice?.id === invoiceId) {
          await loadInvoice(invoiceId);
        }
        return success;
      } catch (err) {
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [currentInvoice, loadInvoice],
  );

  const addPartItem = useCallback(
    async (invoiceId: string, item: any) => {
      setLoading(true);
      try {
        const success = await invoiceService.addPartItem(invoiceId, item);
        if (success && currentInvoice?.id === invoiceId) {
          await loadInvoice(invoiceId);
        }
        return success;
      } catch (err) {
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [currentInvoice, loadInvoice],
  );

  const addConsumableItem = useCallback(
    async (invoiceId: string, item: any) => {
      setLoading(true);
      try {
        const success = await invoiceService.addConsumableItem(invoiceId, item);
        if (success && currentInvoice?.id === invoiceId) {
          await loadInvoice(invoiceId);
        }
        return success;
      } catch (err) {
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [currentInvoice, loadInvoice],
  );

  const addPayment = useCallback(
    async (invoiceId: string, amount: number, method: string) => {
      setLoading(true);
      try {
        const success = await invoiceService.addPayment(invoiceId, amount, method);
        if (success && currentInvoice?.id === invoiceId) {
          await loadInvoice(invoiceId);
        }
        return success;
      } catch (err) {
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [currentInvoice, loadInvoice],
  );

  return {
    invoices,
    currentInvoice,
    owners,
    vehicles,
    loading,
    error,
    loadInvoices,
    loadInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    addLaborItem,
    addPartItem,
    addConsumableItem,
    addPayment,
  };
}
