import { useCallback, useState } from "react";
import type { Invoice } from "./invoice.types";
import { INVOICE_INIT } from "../../common/constant";
import { _getInvoiceById } from "./invoice.service";

export function useInvoice() {
  const [currentInvoiceId, setCurrentInvoiceId] = useState<number>(0);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(INVOICE_INIT);
  const [error, setError] = useState<string>("init-no-error");
  const [loading, setLoading] = useState(false);
  console.log("useInvoice", currentInvoiceId);

  const getInvoiceById = useCallback(async () => {
    console.log("getInvoiceById", currentInvoiceId);

    setLoading(true);
    setError("");
    try {
      const response = await _getInvoiceById(currentInvoiceId);
      console.log("getInvoiceById", currentInvoiceId);

      if (response.success) {
        setCurrentInvoice(response.data || INVOICE_INIT);
      } else {
        setError(response.error || "Failed to load owners");
      }
    } catch (error) {
      setError("Failed to load invoice - catch error");

      return { success: false, error: "Failed to fetch owner" };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    currentInvoiceId,
    currentInvoice,
    loading,
    error,
    setCurrentInvoiceId,
    setCurrentInvoice,
    refresh: getInvoiceById,
  };
}
