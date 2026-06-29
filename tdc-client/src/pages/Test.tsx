import { BrandManager } from "../components/brand/BrandManager";
import { ModelList } from "../components/model/ModelList";
import { Input } from "../components/UI/Input";

export default function Test() {
  return (
    <>
      <h1>Test</h1>
      <Input label="label" />
      <BrandManager />
      <ModelList />
    </>
  );
}
