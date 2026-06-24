import type { InvoiceLine } from "./types";
import { headerLine, InvoiceLineInit, totalLine } from "../../common/constant";
import { useTranslation } from "react-i18next";
import { Description, Discount, Gross, Id, Net, Quantity } from "./view.style";
import { Input } from "../UI/Input";
import { Button, LineContainer } from "../../common/common.styled";
import { useEffect, useState } from "react";
import { deleteInvoiceLine, saveInvoiceLine } from "./crud";

export type BadgeLineProps = {
  value: InvoiceLine;
  index: number;
  typeLine: number;
  editMode?: boolean;
  onChange?: () => void;
};

export default function BadgeLine({ ...props }: BadgeLineProps) {
  const { t } = useTranslation(["invoice", "partAndLaborDb"]);
  const [line, setLine] = useState<InvoiceLine>(InvoiceLineInit);

  useEffect(() => {
    setLine(props.value);
  }, [props.value]);

  const HandleQuatityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value);
    const newInvoiceLine = { ...line, quantity: quantity };
    setLine(newInvoiceLine);
    const newLine: InvoiceLine = await saveInvoiceLine(newInvoiceLine.id, newInvoiceLine);
    setLine(newLine);
    props.onChange?.();
  };
  const HandleDiscountChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const discount = Number(event.target.value);
    const newInvoiceLine = { ...line, discountRate: discount };

    const newLine: InvoiceLine = await saveInvoiceLine(newInvoiceLine.id, newInvoiceLine);
    setLine(newLine);
    props.onChange?.();
  };
  const handleDelete = async () => {
    await deleteInvoiceLine(line.id);
    props.onChange?.();
  };
  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------

  const renderContent = () => {
    switch (props.typeLine) {
      case headerLine: // en-tête des colonnes
        return (
          <LineContainer style={{ fontWeight: "500", paddingBottom: "1rem" }}>
            <Id style={{ textAlign: "left" }}>{t("n°")}</Id>
            <Description style={{ textAlign: "left" }}>{t("description")}</Description>
            <Quantity style={{ textAlign: "right" }}>{t("quantity")}</Quantity>
            <Gross style={{ textAlign: "right" }}>{t("grossPrice")}</Gross>
            <Discount style={{ textAlign: "right" }}>{t("discountRate")}</Discount>
            <Net style={{ textAlign: "right" }}>{t("amount")}</Net>
          </LineContainer>
        );
      case totalLine: // ligne de total général
        return (
          <LineContainer>
            <Id></Id>
            <Description>{t("subtotal")}</Description>
            <Quantity></Quantity>
            <Gross>
              {props.value.unitPrice.toLocaleString()} {t("currency")}
            </Gross>
            <Discount></Discount>
            <Net>
              {props.value.amount.toLocaleString()} {t("currency")}
            </Net>
          </LineContainer>
        );
      default: // ligne normale de détail
        return (
          <LineContainer>
            <Id>
              {props.editMode ? (
                <Button
                  style={{ width: "100%" }}
                  $iconOnly
                  onClick={handleDelete}
                  title={t("Delete line")}
                >
                  ❌
                </Button>
              ) : (
                `${props.typeLine}.${props.index}`
              )}
            </Id>

            <Description>{t(`partAndLaborDb:${props.value.description}`)}</Description>
            <Quantity>
              {props.editMode ? (
                <Input
                  label=""
                  value={line.quantity}
                  type="number"
                  onChange={HandleQuatityChange}
                />
              ) : (
                props.value.quantity
              )}
            </Quantity>

            {/* <Quantity>{props.value.quantity}</Quantity> */}
            <Gross>
              {props.value.unitPrice.toLocaleString()} {t("currency")}
            </Gross>
            {/* <Discount>{props.value.}%</Discount> */}
            <Discount>
              {props.editMode ? (
                <Input
                  label=""
                  value={line.discountRate ? line.discountRate : ""}
                  type="number"
                  onChange={HandleDiscountChange}
                />
              ) : (
                `${line.discountRate} %`
              )}
            </Discount>
            <Net>
              {line.amount.toLocaleString()} {t("currency")}
            </Net>
          </LineContainer>
        );
    }
  };

  return <>{renderContent()}</>;
}
