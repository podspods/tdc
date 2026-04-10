import "styled-components";

// Import your theme type
import { Theme } from "./styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
