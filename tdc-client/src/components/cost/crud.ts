import toast from "react-hot-toast";
import { costInit } from "../../common/constant";
import { _createCost, _getAllCosts, _updateCost } from "./service";
import type { Cost } from "./types";

export async function getCostList(): Promise<Cost[]> {
  const response = await _getAllCosts();
  if (response.success && response.data) {
    return response.data;
  }
  return [];
}

export async function createOrUpdate(cost: Cost): Promise<Cost> {
  if (cost.id === costInit.id) {
    const response = await _createCost(cost);
    if (response.success && response.data) {
      return response.data;
    }
    toast.error(`_createCost success : ${response.success} `);

    return cost;
  } else {
    const response = await _updateCost(cost.id, cost);
    if (response.success && response.data) {
      return response.data;
    }
    toast.error(`_updateCost success : ${response.success} `);

    return cost;
  }
}
