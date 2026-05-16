import { StickerRow, StickerLabel, StickerValue } from "./Sticker.styled";

type StickerProps = {
  label: string; // texte du tooltip (prop `title`)
  icon: string; // émoji ou icône (💰, 🏷️, etc.)
  value: string | number;
  isVisible?: boolean; // default true
  color?: boolean; // default false
};

export function Sticker({ label, icon, value, isVisible = true, color = false }: StickerProps) {
  return (
    <StickerRow>
      <StickerLabel title={label}>{icon}</StickerLabel>
      <StickerValue $isVisible={isVisible} $alert={color}>
        {value}
      </StickerValue>
    </StickerRow>
  );
}
