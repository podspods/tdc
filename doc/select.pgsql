select 

  invoice.invoice_Id,
  invoice.invoice_Number,
   invoice.issue_Date,
   invoice.due_Date,
   invoice.status_code,
correspondance.value,
   owners.first_name,
   owners.last_name,
   
   motorcycle_brands.brand_name,
   motorcycle_models.model_name,
   vehicle.color,
   vehicle.plate_number



from 
invoice,
owners,
motorcycle_models,
motorcycle_brands,
correspondance,
vehicle


where 
vehicle.id = invoice.vehicle_id
and invoice.status_code = correspondance.code
and correspondance.subject_code =1
and owners.id = vehicle.owner_id
and motorcycle_models.model_id = vehicle.model_id
and motorcycle_models.brand_id = motorcycle_brands.brand_id

