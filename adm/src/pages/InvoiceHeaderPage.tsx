import styled from "styled-components";
import { InvoiceHeaderManager } from "../components/InvoiceHeader/InvoiceHeaderManager";

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.3s ease;
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
  }
`;

const PageDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray600};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

export function InvoiceHeaderPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Invoice Headers</PageTitle>
        <PageDescription>
          Manage your invoice header templates. Create, edit, and set default headers for your
          invoices.
        </PageDescription>
      </PageHeader>
      <InvoiceHeaderManager />
    </PageContainer>
  );
}
