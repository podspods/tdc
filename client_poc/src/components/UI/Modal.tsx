import React from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void; // ← Optionnel maintenant
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
  padding: 16px;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
`;

const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    color: #374151;
  }
`;

const ModalContent = styled.div`
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {(title || onClose) && (
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            {onClose && (
              <CloseButton onClick={onClose} aria-label="Close">
                ×
              </CloseButton>
            )}
          </ModalHeader>
        )}
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Overlay>
  );
};
