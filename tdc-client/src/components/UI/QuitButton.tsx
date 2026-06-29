import { Button } from "../../common/common.styled";

export type QuitButtonProps = {
  onClick: () => void;
  title?: string;
};
export default function QuitButton({ ...props }: QuitButtonProps) {
  return (
    <>
      <Button
        $iconOnly
        type="button"
        $variant="secondary"
        onClick={props.onClick}
        title={props.title}
      >
        ❌
      </Button>
    </>
  );
}
