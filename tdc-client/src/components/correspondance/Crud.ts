import { _getCorrespondanceBySubject } from "./service";
import type { Correspondance } from "./types";

export async function getCorrespondanceBySubject(subject: number): Promise<Correspondance[]> {
  const ownerResponse = await _getCorrespondanceBySubject(subject);
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return [];
}
