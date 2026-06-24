import { _createPartAndLabor, _getAllPartAndLabor, _updatePartAndLabor } from "./service";
import type { PartAndLabor } from "./types";

export async function getAllPartAndLabor(): Promise<PartAndLabor[]> {
  const response = await _getAllPartAndLabor({ limit: 0 });
  if (response.success && response.data) {
    return response.data;
  }
  return [];
}

export async function AddPartAndLabor(partAndLabor: PartAndLabor): Promise<PartAndLabor> {
  const response = await _createPartAndLabor(partAndLabor);
  if (response.success && response.data) {
    return response.data;
  }
  return partAndLabor;
}

export async function InserOrUpdatePartAndLabor(partAndLabor: PartAndLabor): Promise<PartAndLabor> {
  const response = await _createPartAndLabor(partAndLabor);
  if (response.success && response.data) {
    return response.data;
  }
  const responseUpdate = await _updatePartAndLabor(partAndLabor.id, partAndLabor);
  if (responseUpdate.success && responseUpdate.data) {
    return responseUpdate.data;
  }
  return partAndLabor;
}

export async function UpdatePartAndLabor(partAndLabor: PartAndLabor): Promise<PartAndLabor> {
  const responseUpdate = await _updatePartAndLabor(partAndLabor.id, partAndLabor);
  if (responseUpdate.success && responseUpdate.data) {
    return responseUpdate.data;
  }
  return partAndLabor;
}
