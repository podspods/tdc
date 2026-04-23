import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #1f2937;
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" | "danger" | "success" }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  min-height: 44px;
  background-color: ${({ variant }) =>
    variant === "primary"
      ? "#2563eb"
      : variant === "secondary"
        ? "#6b7280"
        : variant === "danger"
          ? "#ef4444"
          : variant === "success"
            ? "#10b981"
            : "#2563eb"};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 20px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-height: 44px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const Textarea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f9fafb;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
`;

export const Span = styled.span`
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  backgroundColor: invoice.status === "paid" ? "#dcfce7" : "#fef3c7",
  color: invoice.status === "paid" ? "#166534" : "#92400e",
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  min-width: 36px;
  min-height: 36px;

  &:hover {
    opacity: 0.7;
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ status }) =>
    status === "paid"
      ? "#dcfce7"
      : status === "pending"
        ? "#fef3c7"
        : status === "overdue"
          ? "#fee2e2"
          : status === "partially_paid"
            ? "#dbeafe"
            : "#f3f4f6"};
  color: ${({ status }) =>
    status === "paid"
      ? "#166534"
      : status === "pending"
        ? "#92400e"
        : status === "overdue"
          ? "#991b1b"
          : status === "partially_paid"
            ? "#1e40af"
            : "#374151"};
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

export const SummaryItem = styled.div`
  text-align: right;
  padding: 8px 0;
`;

export const SummaryLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const SummaryValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-left: 16px;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
  border-top: 2px solid #e5e7eb;
  margin-top: 16px;
`;

export const TotalLabel = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

export const TotalValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #2563eb;
  margin-left: 24px;
`;

// export const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
// `;

// export const ModalContent = styled.div`
//   background-color: white;
//   border-radius: 12px;
//   max-width: 600px;
//   width: 90%;
//   max-height: 90vh;
//   overflow: auto;
// `;

// export const ModalHeader = styled.div`
//   padding: 16px 20px;
//   border-bottom: 1px solid #e5e7eb;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// export const ModalTitle = styled.h3`
//   font-size: 18px;
//   font-weight: 600;
//   margin: 0;
// `;

// export const ModalBody = styled.div`
//   padding: 20px;
// `;

// export const ModalFooter = styled.div`
//   padding: 16px 20px;
//   border-top: 1px solid #e5e7eb;
//   display: flex;
//   justify-content: flex-end;
//   gap: 12px;
// `;
