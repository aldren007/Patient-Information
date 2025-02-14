# Patient-Information
Patient Information System

For the system, I use Laravel for the backend to handle data, security, and logic, and React for the frontend to create interactive and user-friendly interfaces. Inertia.js helps me connect the two seamlessly, making development faster and smoother. 

So far these are the features i've done:

1.Patient Registration 
Created a patient model and database to store patient details - only the demographic data. Also added validation rules to ensure accurate data. For the frontend, built a registration form with input fields,\ dropdowns and date picker using react and used inertia to send form data to laravel and display validations errors.
2. View patient details
Created a route and controller to fetch patient detail by ID and used eloquent to retrieve data 
3. Edit Patient Information
Used laravel validation for data integrity and created an edit form pre-filled with patient data
4. Soft Delete Functionality
Enabled soft deletes by adding the SoftDeletes trait to the Patient model. Added a Delete button for soft delete records.
5. Data Privacy and Compliance
Still in progress

6. Advanced Search & Filtering
Built a search bar for filters by patient, gender, and age. Also added sorting option
Added pagination to handle large datasets 
