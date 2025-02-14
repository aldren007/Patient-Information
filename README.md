# Patient-Information
Patient Information System

For the system, I use Laravel for the backend to handle data, security, and logic, and React for the frontend to create interactive and user-friendly interfaces. Inertia.js helps me connect the two seamlessly, making development faster and smoother. 

So far these are the features i've done:

<p>1. Patient Registration <br>
Created a patient model and database to store patient details - only the demographic data. Also added validation rules to ensure accurate data. For the frontend, built a registration form with input fields,\ dropdowns and date picker using react and used inertia to send form data to laravel and display validations errors.</p><br>
<p>2. View patient details<br>
Created a route and controller to fetch patient detail by ID and used eloquent to retrieve data </p><br>
<p>3. Edit Patient Information<br>
Used laravel validation for data integrity and created an edit form pre-filled with patient data</p>
<p>4. Soft Delete Functionality<br>
Enabled soft deletes by adding the SoftDeletes trait to the Patient model. Added a Delete button for soft delete records.</p>
<p>5. Data Privacy and Compliance<br>
Still in progress</p>

<p>6. Advanced Search & Filtering<br>
Built a search bar for filters by patient, gender, and age. Also added sorting option
Added pagination to handle large datasets </p>
