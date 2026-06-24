// backend/src/entities/partAndLabor/types.ts
export type PartAndLabor = {
  id: number;
  typeLineCode: string;
  categoryCode: string;
  subCategoryCode: string;
  brandCode: string;
  duration: number;
  skillLevel: number;
  cost: number; // percentage (integer)
  margin: number; // integer
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  lastTimeUsed: Date;

  createdBy: string;
};

export type CreatePartAndLaborDto = Partial<Omit<PartAndLabor, "id" | "createdAt">>;

export type UpdatePartAndLaborDto = Partial<Omit<CreatePartAndLaborDto, "createdBy">>;

export type PartAndLaborQueryParams = PartAndLaborFilter & {
  page?: number;
  limit?: number;
  search?: string;
};

export type PartAndLaborFilter = {
  typeLineCode?: string;
  categoryCode?: string;
  subCategoryCode?: string;
  brandCode?: string;
};

// typeLineCode =

// select
// valuestr , description
// -- *
// from correspondance
// where
// subject_code = 200

// order by code

// valuestr
// character varying
// description
// text
// 1	TA	Task / labor
// 2	SP	Spare part
// 3	CO	Consumable item (oil, etc.)
// 4	SA	Sales item
// 5	OT	Other service

// categoryCode =

// select
// valuestr
// -- *
// from correspondance
// where
// subject_code = 500
// -- code = 200
// order by code

// 1 MA
// 2	DI
// 3	RE
// OT pour OT	Other service

// subCategoryCode =

// select
// valuestr , description
// -- *
// from correspondance
// where
// subject_code = 600
// order by code

// valuestr
// character varying
// description
// text
// 1	EN	engine
// 2	BR	brakes
// 3	EC	electronic
// 4	CA	chassis

// OT pour OT	Other service
// brandCode =

// select code, name  from brand  order by name

// code
// character varying
// name
// character varying
// 1	BE	Benelli
// 2	BM	BMW
// 3	CF	CFMOTO
// 4	DE	Detech
// 5	DU	Ducati
// 6	HA	Harley-Davidson
// 7	HO	Honda
// 8	IN	Indian Motorcycle
// 9	KA	Kawasaki
// 10	KT	KTM
// 11	KY	Kymco
// 12	LI	Lifan
// 13	MO	Moto Guzzi
// 14	PE	Pega
// 15	PI	Piaggio
// 16	QJ	QJMotor
// 17	RO	Royal Enfield
// 18	SU	Suzuki
// 19	SY	SYM
// 20	TR	Triumph
// 21	VI	VinFast
// 22	YD	Yadea
// 23	YA	Yamaha
// 24	ZO	Zongshen

// AL  pour toutes marque

// exemple pour PartAndLabor.code  TA-MA-EN-BE
