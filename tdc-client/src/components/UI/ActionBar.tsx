import { useTranslation } from "react-i18next";
import { Button } from "../../common/common.styled";
import QuitButton from "./QuitButton";

export type ActionBarProps = {
  handleSave: () => void;
  handleReset: () => void;
  handleQuit: () => void;
  isBusy: boolean;
};
export default function ActionBar({ ...props }: ActionBarProps) {
  const { t } = useTranslation(["common"]);

  return (
    <>
      <div className="modal-buttons">
        <Button
          $iconOnly
          onClick={props.handleSave}
          $variant="success"
          title={t("save")}
          disabled={props.isBusy}
        >
          {props.isBusy ? "⏳" : "✔"}
        </Button>
        <Button
          $iconOnly
          type="button"
          $variant="warning"
          onClick={props.handleReset}
          title={t("reset")}
        >
          ⭮
        </Button>
        <QuitButton onClick={props.handleQuit} title={t("quit")} />
      </div>
    </>
  );
}
