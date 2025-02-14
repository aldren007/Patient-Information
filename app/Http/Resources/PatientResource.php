<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'prefix' => $this->prefix,
            'last_name' => $this->last_name,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'suffix' => $this->suffix,
            'sex' => $this->sex,
            'birth_date' => (new Carbon($this->birth_date))->format('Y,m.d'),
            'birth_place' => $this->birth_place,
            'civil_status' => $this->civil_status,
            'educ_attainment' => $this->educ_attainment,
            'religion' => $this->religion,
            'indigenous' => $this->indigenous,
            'bloodtype' => $this->bloodtype,
            'phic_no' => $this->phic_no,
            'assigned_user_id' => auth()->user()->id,
            'created_by' => $this->createdBy,
            'updated_by' => $this->updatedBy
        ];
    }
}
