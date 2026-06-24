import { correspondanceInit } from "../../common/constant";
import { _getCorrespondanceBySubject, _getCorrespondanceBySubjectAndCode } from "./service";
import type { Correspondance } from "./types";

export async function getCorrespondanceBySubject(subject: number): Promise<Correspondance[]> {
  const ownerResponse = await _getCorrespondanceBySubject(subject);
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return [];
}

export async function getCorrespondanceBySubjectAndCode(
  subject: number,
  code: number,
): Promise<Correspondance> {
  const ownerResponse = await _getCorrespondanceBySubjectAndCode(subject, code);
  if (ownerResponse.success && ownerResponse.data) {
    return ownerResponse.data;
  }
  return correspondanceInit;
}
