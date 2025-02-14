<?php

namespace App\Http\Controllers;

use App\Models\Patient;
//use Illuminate\Http\Request;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use Inertia\Inertia;
use App\Http\Resources\PatientResource;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Patient::query();
        //dd($query->get());
        $search = request("fullname");

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if($search ){
            $query->searchByFullName($search);
        }

        if(request("sex")){
             $query->where("sex", request("sex"));
        }
        //dd($query);

        $patients = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)->onEachSide(1);

        return inertia::render('Patient/Index',[
            'patients'=> $patients,
            'queryParams' => request()->query()? : null ,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Patient/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        
        $data = $request->validated();
        $id = auth()->user()->id;
        
        $data['assigned_user_id'] = $id;
        $data['created_by'] = $id;
        $data['updated_by'] = $id;

        $patient = Patient::create($data);

        return to_route('patient.index')->with('success', 'Patient was Successfully Added!');

    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return inertia('Patient/Show', [
            'patient' => new PatientResource($patient)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        //dd($patient);
        return inertia('Patient/Edit', [
            'patient' => new PatientResource($patient)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        //dd($request->all());
        $data = $request->validated();

       //dd($data);

        $id = auth()->user()->id;

        $name = $patient->last_name. ", ". $patient->first_name;
        
        $data['assigned_user_id'] = $id;
        $data['created_by'] = $id;
        $data['updated_by'] = $id;

        $patient->update($data);

         return to_route('patient.index')->with('success',"Patient \"$name \"was Updated!!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $name = $patient->last_name. ", ". $patient->first_name;
        
;        $patient->delete();

        return to_route("patient.index")->with('success', "Patient \"$name \" was deleted!");
    }
}
