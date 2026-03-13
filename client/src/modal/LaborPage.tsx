import React, { useState } from "react";
import LaborEdit from "../components/LaborEdit";

export type LaborPageProps = {};
export default function LaborPage({ ...props }: LaborPageProps) {
  const [showLaborEdit, setShowLaborEdit] = useState(false);

  return (
    <div>
      <button onClick={() => setShowLaborEdit(true)}>Manage Labor Catalog</button>

      {showLaborEdit && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
            }}
          >
            <LaborEdit onClose={() => setShowLaborEdit(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
