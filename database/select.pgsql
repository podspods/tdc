-- ALTER TABLE part_and_labor ADD COLUMN last_time_used TIMESTAMP NULL DEFAULT NULL;
update correspondance set description = 'otherService' where id = 58;

select * from correspondance WHERE subject_code = 101 or subject_code = 200; 
select * from correspondance order by  subject_code ; 
update correspondance set subject_code = 104  where subject_code = 700; 
update correspondance set code = 101  where code = 200; 
-- delete from correspondance WHERE subject_code = 103;
select * from correspondance where  subject_code =10 ; 
select * from correspondance where  code =200 ; 


select * from invoice_line WHERE invoice_id=1;
delete from invoice_line where id= 54;
SELECT LPAD(id::TEXT, 4, '0') AS formatted_id, *
FROM part_and_labor;
update part_and_labor set code = type_line_code|| category_code || sub_category_code || brand_code ||  LPAD(id::TEXT, 4, '0');
select  type_line_code|| category_code || sub_category_code || brand_code ||  LPAD(id::TEXT, 4, '0'),*
from part_and_labor;
select * from part_and_labor;
update part_and_labor set code = 'TAREENAL0013'  WHERE id = 13;
INSERT INTO part_and_labor (    type_line_code, category_code, sub_category_code, brand_code,    duration, skill_level, cost, margin, code, name, description, created_by
) VALUES ('SP', 'RE', 'EN', 'AL', 0, 0, 50000, 150, 'SPREENAL0007', 'Fuse Change - ALl',  'Standard fuse for  motorcycles', 'system'); 

SELECT currval(pg_get_serial_sequence('part_and_labor', 'id'));

delete from vehicle where plate_number = 'init';

select * from vehicle where id=1 ;

-- ALTER TABLE invoice ALTER COLUMN due_date TYPE TIMESTAMPTZ;

delete from  invoice where vehicle_id = 0 ;
select id,garage_id,vehicle_id, invoice_number, issue_date, due_date,created_at, updated_at from invoice order by id;

delete from  invoice where id >1 ;

select * from invoice order by id;


update invoice set status_code = 1 where status_code = 0 ;


SELECT
      i.*,
    --   c.valueStr AS "statusText",
      o.id AS "ownerId",
      o.first_name AS "ownerFirstName",
      o.last_name AS "ownerLastName",
      o.address AS "ownerAddress",
      o.city AS "ownerCity",
      o.phone_number AS "ownerPhone",
      b.name AS "vehicleBrand",
      m.id AS "vehicleModelId",
      m.name AS "vehicleModel",
      v.color AS "vehicleColor",
      v.plate_number AS "vehiclePlateNumber",
      b.id AS "vehicleBrandId",
      v.id AS "vehicleId"
    FROM invoice i
    -- JOIN correspondance c ON i.status_code = c.code AND c.subject_code = 1
    JOIN vehicle v ON i.vehicle_id = v.id
    JOIN owners o ON v.owner_id = o.id
    JOIN model m ON v.model_id = m.id
    JOIN brand b ON m.brand_id = b.id
    ORDER BY i.issue_date DESC ;
  


INSERT INTO correspondance ( subject_code, code, valueStr, description, sort_order) VALUES


( 103,1, 'EN',  'engine', 1),
( 103,2, 'BR',  'brakes', 2),
( 103,3, 'EC',  'electronic', 3),
( 103,4, 'CA',  'chassis', 4);



select code,name,* from part_and_labor where id < 65 order by id;

delete from invoice_line where id < 65;


update  invoice_line set  description = 'TARECAAL0033' where id =  72;
select * from invoice_line;


select * from part_and_labor where margin = 200;
update part_and_labor set margin = 100 where margin = 200;

select * from invoice_line where line_type_code = 2;

update invoice_line set unit_price = unit_price /2 where line_type_code = 2;
update invoice_line set discount_rate = 100 where line_type_code = 1;
select * from correspondance where subject_code = 101;

select * from model;

 SELECT m.*
    FROM model m
    LEFT JOIN brand b ON m.brand_id = b.id
    ORDER BY b.name, m.name;

    SELECT m.*, b.name
     FROM model m
     LEFT JOIN brand b ON m.brand_id = b.id
     WHERE m.id = 27;

     select * from vehicle




     selec