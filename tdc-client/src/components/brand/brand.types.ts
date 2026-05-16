export type Brand = CreateBrandDto & {
  id: number;
  createDate: Date;
};

export type CreateBrandDto = UpdateBrandDto & {
  createdBy: string;
};

export type UpdateBrandDto = {
  brandName: string;
  countryOfOrigin?: string;
};

export type BrandQueryParams = {
  page?: number;
  limit?: number;
  search?: string; // search in brand_name or country
};
