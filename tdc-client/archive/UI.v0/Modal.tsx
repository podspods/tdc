import React, { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 90%;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  animation: fadeIn 0.2s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 600px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 800px;
  }
`;

const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 10;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xl};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray500};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer onClick={handleContainerClick}>
        {(title || onClose) && (
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            {onClose && <CloseButton onClick={onClose}>✕</CloseButton>}
          </ModalHeader>
        )}
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Overlay>
  );
}
